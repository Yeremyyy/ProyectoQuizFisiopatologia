import { QuizModel } from './model.js';
import { QuizView } from './view.js';

export class QuizController {
    constructor() {
        this.model = new QuizModel();
        this.view = new QuizView();
        this.timer = null;
        this.timeLeft = 15;
        this.init();
    }

    init() {
        // Pasamos dos callbacks: uno para iniciar, otro para ver récords
        this.view.renderMenu(
            (name, level) => {
                this.model.user.name = name;
                this.model.user.level = level;
                this.view.updateHeader(this.model.user);
                this.startQuestion();
            },
            () => {
                // Recuperar y mostrar historial
                const records = this.model.getRecords();
                this.view.renderRecordsModal(records);
            }
        );
    }

    startQuestion() {
        clearInterval(this.timer);
        this.timeLeft = 15;
        this.updateTimerUI();
        
        const q = this.model.getCurrentQuestion();
        this.view.renderQuestion(q, (ans) => this.handleAnswer(ans));

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerUI();
            
            if (this.timeLeft === 3) this.view.playSound('tick'); 

            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.handleAnswer(null);
            }
        }, 1000);
    }

    updateTimerUI() {
        const countEl = document.getElementById('timer-count');
        const faceEl = document.getElementById('timer-face');
        if(!countEl) return;
        
        countEl.innerText = this.timeLeft;
        if (this.timeLeft > 10) faceEl.innerText = "😊";
        else if (this.timeLeft > 5) faceEl.innerText = "😐";
        else faceEl.innerText = "😰";
    }

    handleAnswer(ans) {
        clearInterval(this.timer);
        const result = this.model.checkAnswer(ans);
        
        if (ans !== null) {
            this.view.playSound(result.isCorrect ? 'success' : 'error');
        }

        Swal.fire({
            title: ans === null ? '¡Tiempo Agotado!' : (result.isCorrect ? '¡Excelente!' : 'Análisis Erróneo'),
            text: result.exp,
            icon: result.isCorrect ? 'success' : 'error',
            confirmButtonColor: '#00d2ff'
        }).then(() => {
            this.view.updateHeader(this.model.user);
            if (this.model.currentIndex < this.model.currentQuestions.length - 1) {
                this.model.currentIndex++;
                this.startQuestion();
            } else {
                this.showResult();
            }
        });
    }

    showResult() {
        // --- NUEVO: Guardar en el historial antes de terminar ---
        this.model.saveRecord();

        Swal.fire({
            title: 'Reporte Final FisioPatologia',
            text: `Especialista: ${this.model.user.name} - Score: ${this.model.user.score}`,
            icon: 'info',
            confirmButtonText: 'Ver Récords',
            confirmButtonColor: '#00d2ff'
        }).then(() => {
            location.reload(); 
        });
    }
}