export class QuizView {
    constructor() {
        this.container = document.getElementById('main-content');
        this.header = document.getElementById('main-header');
        this.sounds = {
            click: new Audio('https://actions.google.com/sounds/v1/foley/button_click.ogg'),
            success: new Audio('https://actions.google.com/sounds/v1/cartoon/claping.ogg'),
            error: new Audio('https://actions.google.com/sounds/v1/foley/glass_break.ogg'),
            tick: new Audio('https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg')
        };
    }

    playSound(type) {
        this.sounds[type].currentTime = 0;
        this.sounds[type].play().catch(e => console.log("Audio play blocked", e));
    }

    renderMenu(onStart, onShowRecords) {
        this.header.classList.add('hidden');
        this.container.innerHTML = `
            <div class="menu-card animate__animated animate__zoomIn">
                <i class="fas fa-dna fa-5x animate__animated animate__pulse animate__infinite" style="color: var(--primary); margin-bottom: 15px;"></i>
                <h1>FisioPatologia</h1>
                <p>Clinical Analysis & Pathophysiology Suite</p>
                
                <input type="text" id="username" placeholder="Identificación del Especialista">
                
                <div class="level-grid">
                    <div class="lvl-option active" data-lvl="facil">
                        <i class="fas fa-leaf"></i> Básico
                    </div>
                    <div class="lvl-option" data-lvl="intermedio">
                        <i class="fas fa-atom"></i> Intermedio
                    </div>
                    <div class="lvl-option" data-lvl="avanzado">
                        <i class="fas fa-brain"></i> Avanzado
                    </div>
                </div>

                <div class="button-group">
                    <button id="btn-begin" class="main-btn">Acceder al Sistema</button>
                    <button id="btn-records" class="secondary-btn"><i class="fas fa-list-ol"></i> Récords</button>
                </div>
            </div>
        `;

        const options = document.querySelectorAll('.lvl-option');
        options.forEach(opt => opt.onclick = () => {
            this.playSound('click');
            options.forEach(x => x.classList.remove('active'));
            opt.classList.add('active');
        });

        document.getElementById('btn-begin').onclick = () => {
            this.playSound('click');
            const name = document.getElementById('username').value || "Especialista";
            const level = document.querySelector('.lvl-option.active').dataset.lvl;
            onStart(name, level);
        };

        // Escuchador para mostrar el historial
        document.getElementById('btn-records').onclick = () => {
            this.playSound('click');
            onShowRecords();
        };
    }

    renderQuestion(q, onAnswer) {
        this.header.classList.remove('hidden');
        this.container.innerHTML = `
            <div class="question-box animate__animated animate__fadeInRight">
                <h3 style="margin-bottom: 20px; font-size: 1.3rem;">${q.question}</h3>
                <div id="options-box"></div>
            </div>
        `;
        const box = document.getElementById('options-box');

        if (q.type === 'multiple') {
            q.options.forEach(o => {
                const b = document.createElement('button');
                b.className = 'option-btn animate__animated animate__fadeInUp';
                b.innerText = o;
                b.onclick = () => { this.playSound('click'); onAnswer(o); };
                box.appendChild(b);
            });
        } else if (q.type === 'tf') {
            [true, false].forEach(v => {
                const b = document.createElement('button');
                b.className = 'option-btn animate__animated animate__fadeInUp';
                b.innerText = v ? "Verdadero" : "Falso";
                b.onclick = () => { this.playSound('click'); onAnswer(v); };
                box.appendChild(b);
            });
        } else if (q.type === 'desarrollo') {
            const container = document.createElement('div');
            container.className = 'textarea-container animate__animated animate__fadeInUp';
            
            const t = document.createElement('textarea');
            t.className = 'custom-textarea';
            t.placeholder = "Redacte su análisis técnico aquí...";
            
            const s = document.createElement('button');
            s.className = 'main-btn';
            s.style.width = '100%';
            s.innerText = "Enviar para Análisis de IA";
            s.onclick = () => { this.playSound('click'); onAnswer(t.value); };
            
            container.append(t, s);
            box.appendChild(container);
        }
    }

    updateHeader(user) {
        document.getElementById('display-username').innerText = user.name;
        document.getElementById('current-score').innerText = user.score.toString().padStart(3, '0');
        document.getElementById('display-level').innerText = user.level.toUpperCase();
    }

    // --- NUEVO: Manejo del Modal de Récords ---
    renderRecordsModal(records) {
        const modal = document.getElementById('records-modal');
        const tbody = document.getElementById('records-body');
        tbody.innerHTML = '';

        if(records.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">No hay registros aún. ¡Sé el primero!</td></tr>`;
        } else {
            records.forEach(rec => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${rec.date}</td>
                    <td>${rec.name}</td>
                    <td>${rec.level}</td>
                    <td style="color: var(--primary); font-weight: bold;">${rec.score}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        modal.classList.remove('hidden');

        document.getElementById('close-records-btn').onclick = () => {
            this.playSound('click');
            modal.classList.add('hidden');
        };
    }
}