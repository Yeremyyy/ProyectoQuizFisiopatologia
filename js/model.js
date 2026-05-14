export class QuizModel {
    constructor() {
        this.user = { name: "", level: "facil", score: 0 };
        this.currentIndex = 0;
        this.activeQuestions = []; // Aquí guardaremos las preguntas únicas barajadas
        
        this.questionsBank = {
            facil: [
                { type: 'multiple', question: "¿Qué hormona es la principal responsable de disminuir la glucemia?", options: ["Glucagón", "Insulina", "Cortisol", "Adrenalina"], answer: "Insulina", exp: "La insulina facilita la entrada de glucosa a las células, reduciendo su nivel en sangre." },
                { type: 'tf', question: "La Diabetes Tipo 1 se caracteriza por una destrucción autoinmune de las células beta.", answer: true, exp: "El sistema inmune ataca las células beta del páncreas, eliminando la producción de insulina." },
                { type: 'multiple', question: "El término 'Polidipsia' se refiere a:", options: ["Hambre excesiva", "Orina frecuente", "Sed excesiva", "Visión borrosa"], answer: "Sed excesiva", exp: "Es una respuesta a la deshidratación osmótica causada por la hiperglucemia." },
                { type: 'tf', question: "¿La glucosa requiere del transportador GLUT4 para entrar al tejido muscular?", answer: true, exp: "El GLUT4 es el transportador específico dependiente de insulina en músculo y grasa." },
                { type: 'multiple', question: "Un valor de glucemia en ayunas normal es:", options: ["126-140 mg/dL", "70-100 mg/dL", "40-60 mg/dL", "150-200 mg/dL"], answer: "70-100 mg/dL", exp: "Valores entre 100 y 125 mg/dL se consideran prediabetes." },
                { type: 'multiple', question: "¿Qué célula pancreática secreta insulina?", options: ["Célula Alfa", "Célula Delta", "Célula Beta", "Célula F"], answer: "Célula Beta", exp: "Las células beta conforman el núcleo de los islotes de Langerhans." },
                { type: 'tf', question: "La Diabetes Tipo 2 siempre requiere insulina desde el primer día de diagnóstico.", answer: false, exp: "Suele iniciarse con cambios en el estilo de vida y fármacos orales." },
                { type: 'multiple', question: "El examen de HbA1c mide el promedio de glucosa de:", options: ["1 semana", "15 días", "3 meses", "1 año"], answer: "3 meses", exp: "Mide la saturación de glucosa en la hemoglobina durante la vida media del eritrocito." },
                { type: 'tf', question: "¿La obesidad es un factor de riesgo principal para la resistencia a la insulina?", answer: true, exp: "El exceso de tejido adiposo libera ácidos grasos que bloquean la señalización insulínica." },
                { type: 'multiple', question: "La 'Polifagia' es un síntoma que consiste en:", options: ["Mucho sueño", "Mucha hambre", "Mucha sed", "Mareos"], answer: "Mucha hambre", exp: "Al no entrar glucosa a las células, el cuerpo percibe falta de energía." }
            ],
            intermedio: [
                { type: 'multiple', question: "¿Cuál es el mecanismo de acción de la Metformina?", options: ["Estimula la secreción de insulina", "Inhibe la gluconeogénesis hepática", "Aumenta el glucagón", "Bloquea los canales de potasio"], answer: "Inhibe la gluconeogénesis hepática", exp: "Reduce la producción de glucosa por parte del hígado." },
                { type: 'tf', question: "¿La acantosis nigricans es un signo clínico de hiperinsulinemia?", answer: true, exp: "La alta insulina estimula receptores de crecimiento en la piel, oscureciéndola." },
                { type: 'multiple', question: "Criterio de Síndrome Metabólico (ATP III) para Triglicéridos:", options: [">100 mg/dL", ">150 mg/dL", ">200 mg/dL", ">250 mg/dL"], answer: ">150 mg/dL", exp: "Es uno de los componentes clave junto con la presión y el perímetro abdominal." },
                { type: 'tf', question: "¿El péptido C se secreta en cantidades equimolares a la insulina?", answer: true, exp: "Es un indicador útil para medir la producción endógena de insulina." },
                { type: 'multiple', question: "Complicación aguda más frecuente en Diabetes Tipo 1:", options: ["Estado Hiperosmolar", "Cetoacidosis Diabética", "Neuropatía", "Retinopatía"], answer: "Cetoacidosis Diabética", exp: "La falta absoluta de insulina lleva a la formación de cuerpos cetónicos." },
                { type: 'tf', question: "¿La microalbuminuria es un marcador de daño renal temprano?", answer: true, exp: "Indica pérdida de proteínas por el glomérulo debido a la hiperglucemia crónica." },
                { type: 'multiple', question: "¿Qué efecto tiene el Glucagón?", options: ["Baja la glucosa", "Sube la glucosa", "Sube el colesterol", "Baja la presión"], answer: "Sube la glucosa", exp: "Estimula la glucogenólisis y gluconeogénesis hepática." },
                { type: 'multiple', question: "La dislipidemia en el Síndrome Metabólico se caracteriza por:", options: ["HDL alto", "Triglicéridos bajos", "HDL bajo y Triglicéridos altos", "LDL muy bajo"], answer: "HDL bajo y Triglicéridos altos", exp: "Es el perfil lipídico aterogénico clásico de este cuadro." },
                { type: 'tf', question: "¿La resistencia a la insulina ocurre principalmente en músculo, hígado y tejido adiposo?", answer: true, exp: "Son los tres órganos diana donde la señalización del receptor se ve alterada." },
                { type: 'multiple', question: "¿Cuál es el transportador de glucosa que actúa como sensor en la célula beta?", options: ["GLUT1", "GLUT2", "GLUT4", "SGLT2"], answer: "GLUT2", exp: "Tiene una alta Km, permitiendo detectar variaciones de glucemia." }
            ],
            avanzado: [
                { type: 'desarrollo', question: "Explique la fisiopatología de la resistencia a la insulina mediada por inflamación (TNF-alfa).", keywords: ["TNF-alfa", "serina", "IRS-1", "fosforilación", "quinasa"], answer_guide: "El TNF-α activa quinasas que fosforilan el IRS-1 en residuos de serina en lugar de tirosina, bloqueando la señalización." },
                { type: 'desarrollo', question: "Analice el mecanismo por el cual la hiperglucemia crónica produce sorbitol y daño osmótico.", keywords: ["polioles", "sorbitol", "aldosa reductasa", "osmótico", "edema"], answer_guide: "La glucosa en exceso entra en la vía de los polioles, convirtiéndose en sorbitol, el cual no sale de la célula y causa daño osmótico." },
                { type: 'desarrollo', question: "Describa la relación entre el estrés del Retículo Endoplasmático y la apoptosis de la célula Beta.", keywords: ["UPR", "proteínas", "plegamiento", "apoptosis", "estrés"], answer_guide: "La alta demanda de insulina causa mal plegamiento proteico, activando la respuesta UPR que puede llevar a la muerte celular." },
                { type: 'tf', question: "¿La lipotoxicidad contribuye a la resistencia a la insulina mediante la acumulación de diacilglicerol (DAG)?", answer: true, exp: "El DAG activa la PKC-theta, la cual interfiere con el receptor de insulina." },
                { type: 'multiple', question: "¿Qué enzima es la 'llave de paso' para la entrada de ácidos grasos a la mitocondria?", options: ["Hexoquinasa", "CPT-1", "Piruvato deshidrogenasa", "Lipasa"], answer: "CPT-1", exp: "La Carnitina Palmitoiltransferasa 1 es inhibida por el Malonil-CoA." }
            ]
        };
    }

    // --- NUEVO: Función para barajar y no repetir ---
    startLevel(level) {
        this.user.level = level;
        this.user.score = 0;
        this.currentIndex = 0;

        // 1. Clonar el banco de preguntas correspondiente
        let bank = [...this.questionsBank[level]];

        // 2. Barajar aleatoriamente (Algoritmo Fisher-Yates)
        for (let i = bank.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [bank[i], bank[j]] = [bank[j], bank[i]];
        }

        // 3. Tomar solo las primeras 5 (o menos si hay poquitas en avanzado)
        this.activeQuestions = bank.slice(0, 5);
    }

    get currentQuestions() { return this.activeQuestions; }
    getCurrentQuestion() { return this.activeQuestions[this.currentIndex]; }
    
    checkAnswer(answer) {
        const q = this.getCurrentQuestion();
        let isCorrect = false;
        if(q.type === 'desarrollo') {
            const matches = q.keywords.filter(k => answer.toLowerCase().includes(k.toLowerCase()));
            isCorrect = matches.length >= 2; 
        } else {
            isCorrect = answer === q.answer;
        }
        if(isCorrect) this.user.score += (this.user.level === 'avanzado' ? 20 : 10);
        return { isCorrect, exp: q.exp || q.answer_guide };
    }

    // Persistencia de Datos
    saveRecord() {
        const record = {
            date: new Date().toLocaleDateString(),
            name: this.user.name,
            level: this.user.level.toUpperCase(),
            score: this.user.score
        };
        let records = JSON.parse(localStorage.getItem('fisio_records')) || [];
        records.push(record);
        records.sort((a, b) => b.score - a.score);
        localStorage.setItem('fisio_records', JSON.stringify(records));
    }

    getRecords() {
        return JSON.parse(localStorage.getItem('fisio_records')) || [];
    }
}