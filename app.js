// Plataforma Simplifica - Main Application Logic

const state = {
    user: JSON.parse(localStorage.getItem('user')) || {
        id: 1, // Linked to Maria Clara for testing student view
        name: "Maria Clara",
        role: "student",
        photo: null,
        isLoggedIn: false
    },


    theme: localStorage.getItem('theme') || 'dark',
    currentView: 'login',
    sidebarOpen: true,
    courses: JSON.parse(localStorage.getItem('courses')) || [],

    logos: {
        light: 'logo/LOGO SIMPLIFICA ENEM (2).png',
        dark: 'logo/LOGO SIMPLIFICA ENEM VERDE E BRANCO.png'
    },


    students: JSON.parse(localStorage.getItem('students')) || [
        { id: 1, name: "Maria Clara", email: "maria@email.com", progress: 85, liveClasses: 12, simulations: 3, mentorshipEnabled: false, tutoringEnabled: false },
        { id: 2, name: "João Pedro", email: "joao@email.com", progress: 62, liveClasses: 8, simulations: 2, mentorshipEnabled: true, tutoringEnabled: false },
        { id: 3, name: "Ana Luiza", email: "ana@email.com", progress: 45, liveClasses: 4, simulations: 1, mentorshipEnabled: false, tutoringEnabled: false },
        { id: 4, name: "Lucas Silva", email: "lucas@email.com", progress: 30, liveClasses: 10, simulations: 4, mentorshipEnabled: true, tutoringEnabled: true },
        { id: 5, name: "Beatriz Oliveira", email: "bia@email.com", progress: 92, liveClasses: 15, simulations: 5, mentorshipEnabled: true, tutoringEnabled: true },
    ],

    adminStats: {
        totalStudents: 154,
        activeThisWeek: 128,
        avgProgress: 68,
        pendingQuestions: 12
    },
    planning: JSON.parse(localStorage.getItem('planning')) || (() => {
        const mat1 = [
            "ESTRATÉGIA DE PROVA E TRI", "RAZÃO E PROPORÇÃO", "GRANDEZAS PROPORCIONAIS", "DIVISÃO EM PARTES PROPORCIONAIS",
            "REGRA DE 3 SIMPLES", "REGRA DE 3 COMPOSTA", "ESCALA LINEAR", "ESCALA ÁREA E VOLUME",
            "MODELAGEM DE EQUAÇÃO DO 1° GRAU", "SISTEMAS LINEARES", "INTRODUÇÃO À FUNÇÃO (PLANO CARTESIANO)",
            "FUNÇÃO POLINOMIAL DO 1° GRAU", "FUNÇÃO POLINOMIAL DO 2° GRAU", "FUNÇÃO POLINOMIAL DO 2° GRAU",
            "FUNÇÃO POLINOMIAL DO 2° GRAU", "FUNÇÃO EXPONENCIAL", "FUNÇÃO EXPONENCIAL", "LOGARITMOS",
            "LOGARITMOS", "JUROS SIMPLES e JUROS COMPOSTOS", "ANTECIPAÇÃO DE PARCELAS", "MATRIZES",
            "CONJUNTOS", "RECESSO", "ESTATÍSTICA: GRÁFICOS E MEDIDAS", "ESTATÍSTICA: DISPERSÃO E MÉDIAS",
            "PRINCÍPIO FUNDAMENTAL DA CONTAGEM", "PRINCÍPIO FUNDAMENTAL DA CONTAGEM", "TÉCNICAS DE CONTAGEM",
            "TÉCNICAS DE CONTAGEM", "OUTRAS TÉCNICAS DE CONTAGEM", "OUTRAS TÉCNICAS DE CONTAGEM",
            "OUTRAS TÉCNICAS DE CONTAGEM", "INTRODUÇÃO AO CÁLCULO DE PROBABILIDADES", "PROBABILIDADE CONDICIONAL",
            "PROBABILIDADE DA UNIÃO DE EVENTOS", "PROVAS ANTERIORES", "PROVAS ANTERIORES", "PROVAS ANTERIORES", "PROVAS ANTERIORES"
        ];
        
        const mat2 = [
            "FUNDAMENTOS DA GEOMETRIA NO ENEM", "SIMPLI SIMULADO COM CORREÇÃO", "POLÍGONOS", "POLÍGONOS (INSCRITOS/CIRCUNS)",
            "ÁREAS POLIGONAIS", "ÁREAS POLIGONAIS", "CIRNCUNFERÊNCIA E CÍRCULOS", "CIRNCUNFERÊNCIA E CÍRCULOS",
            "SEMELHANÇA DE TRIÂNGULOS", "SEMELHANÇA DE TRIÂNGULOS", "RELAÇÕES MÉTRICAS (PITÁGORAS)",
            "RAZÕES TRIGONOMÉTRICAS", "RAZÕES TRIGONOMÉTRICAS", "CÍRCULO TRIGONOMÉTRICO", "CÍRCULO TRIGONOMÉTRICO",
            "EQUAÇÕES TRIGONOMÉTRICAS", "FUNÇÕES TRIGONOMÉTRICAS", "FUNÇÕES TRIGONOMÉTRICAS", "LEI DOS SENOS/COSSENOS",
            "LEI DOS SENOS/COSSENOS", "PROGRESSÃO ARITMÉTICA", "PROGRESSÃO GEOMÉTRICA", "REVISÃO DE MAT II", "RECESSO",
            "GEOMETRIA ESPACIAL BÁSICA", "POLIEDROS", "POLIEDROS", "PRISMA", "PRISMA", "CILINDRO", "CILINDRO",
            "PIRÂMIDE", "PIRÂMIDE", "CONE", "CONE", "ESFERAS", "PROVAS ANTERIORES", "PROVAS ANTERIORES",
            "PROVAS ANTERIORES", "PROVAS ANTERIORES"
        ];

        const fri = [
            "X", "X", "SIMPLI SIMULADO COM CORREÇÃO", "SIMPLI SIMULADO COM CORREÇÃO", "SIMPLI SIMULADO COM CORREÇÃO",
            "SIMPLI SIMULADO COM CORREÇÃO", "SIMPLI SIMULADO COM CORREÇÃO", "SIMPLI SIMULADO COM CORREÇÃO",
            "CORREÇÃO DO SIMULADO", "SIMPLI SIMULADO COM CORREÇÃO", "SIMPLI SIMULADO COM CORREÇÃO",
            "SIMPLI SIMULADO COM CORREÇÃO", "CORREÇÃO DO SIMULADO", "SIMPLI SIMULADO COM CORREÇÃO",
            "SIMPLI SIMULADO COM CORREÇÃO", "SIMPLI SIMULADO COM CORREÇÃO", "SIMPLI SIMULADO COM CORREÇÃO",
            "CORREÇÃO DO SIMULADO", "SIMPLI SIMULADO COM CORREÇÃO", "SIMPLI SIMULADO COM CORREÇÃO",
            "SIMPLI SIMULADO COM CORREÇÃO", "CORREÇÃO DO SIMULADO", "REVISÃO DE MAT I", "RECESSO",
            "SIMPLI SIMULADO COM CORREÇÃO", "SIMPLI SIMULADO COM CORREÇÃO", "SIMPLI SIMULADO COM CORREÇÃO",
            "SIMPLI SIMULADO COM CORREÇÃO", "SIMPLI SIMULADO COM CORREÇÃO", "SIMPLI SIMULADO COM CORREÇÃO",
            "CORREÇÃO DO SIMULADO", "SIMPLI SIMULADO COM CORREÇÃO", "SIMPLI SIMULADO COM CORREÇÃO",
            "SIMPLI SIMULADO COM CORREÇÃO", "CORREÇÃO DO SIMULADO", "SIMPLI SIMULADO COM CORREÇÃO",
            "PROVAS ANTERIORES", "PROVAS ANTERIORES", "PROVAS ANTERIORES", "PROVAS ANTERIORES"
        ];

        return Array.from({length: 40}).map((_, i) => {
            const weekNum = i + 1;
            const isRecesso = weekNum === 24;
            return {
                id: weekNum,
                week: `Semana ${String(weekNum).padStart(2, '0')}`,
                days: [
                    { day: 'Segunda', topic: isRecesso ? 'RECESSO' : 'SIMPLI-FREE', willOccur: !isRecesso, time: '20:00', teacher: 'Guilherme' },
                    { day: 'Terça', topic: mat1[i], willOccur: mat1[i] !== 'RECESSO', time: '20:00', teacher: 'Guilherme' },
                    { day: 'Quarta', topic: isRecesso ? 'RECESSO' : 'Aula extra', willOccur: !isRecesso, time: '20:00', teacher: 'Ambos' },
                    { day: 'Quinta', topic: mat2[i], willOccur: mat2[i] !== 'RECESSO', time: '20:00', teacher: 'Bruno' },
                    { day: 'Sexta', topic: fri[i], willOccur: fri[i] !== 'X' && fri[i] !== 'RECESSO', time: '20:00', teacher: 'Ambos' },
                ],
                meetLink: 'https://meet.google.com/tci-hyzn-xni'
            };
        });
    })(),
    courseStartDate: "2026-02-09",
    adminEditingCourse: null,
    adminEditingChapter: null,
    adminEditingLesson: null,
    isCropping: false,
    tempCourseCover: null,
    adminQuickEditingCourseId: null,
    adminQuickEditingChapterId: null,
    lastViewedCourseId: localStorage.getItem('lastViewedCourseId') || 'math1',
    lastViewedLessonId: localStorage.getItem('lastViewedLessonId') || 'l1',
    currentLessonId: 'l1'
};

let cropperInstance = null;

async function autoSaveToServer() {
    if (state.user && state.user.role === 'admin') {
        try {
            const res = await fetch('http://n8n-v5yewk50yi2c3m02f109vjn7.2.24.202.235.sslip.io/webhook/update-courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courses: state.courses })
            });
            if (!res.ok) {
                alert('Aten��o: A plataforma n�o conseguiu sincronizar com o N8N. As altera��es n�o est�o sendo salvas na nuvem! Status: ' + res.status);
            }
        } catch(e) {
            alert('Aten��o: Erro de conex�o com o N8N. Servidor fora do ar ou Webhook n�o ativado! As altera��es n�o est�o sendo salvas na nuvem.');
        }
    }
}

const saveState = () => {
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('courses', JSON.stringify(state.courses));
    autoSaveToServer();
    localStorage.setItem('students', JSON.stringify(state.students));
    localStorage.setItem('planning', JSON.stringify(state.planning));
    localStorage.setItem('courseStartDate', state.courseStartDate);
    localStorage.setItem('lastViewedCourseId', state.lastViewedCourseId);
    localStorage.setItem('lastViewedLessonId', state.lastViewedLessonId);
};



const getLogo = () => `<img src="${state.logos[state.theme]}" alt="Simplifica ENEM" style="height: 50px; width: auto; object-fit: contain;">`;
const BRAND_ICON = `<img src="logo/LOGO SIMPLIFICA ENEM ICONE (1).png" alt="Simplifica Icon" style="height: 40px; width: auto; object-fit: contain;">`;


// --- Initialization ---

function init() {
    let needsWipe = false;
    if (!Array.isArray(state.planning) || state.planning.length === 0 || !state.planning[0].days) {
        localStorage.removeItem('planning');
        needsWipe = true;
    }
    if (!Array.isArray(state.students) || state.students.length === 0) {
        localStorage.removeItem('students');
        needsWipe = true;
    }
    if (needsWipe) {
        location.reload();
        return;
    }

    document.documentElement.setAttribute('data-theme', state.theme);
    
    // Migration: Update any 19:xx to 20:xx in existing local storage data
    let migrated = false;
    state.planning.forEach(week => {
        week.days.forEach(day => {
            if (day.time && day.time.startsWith('19:')) {
                day.time = day.time.replace('19:', '20:');
                migrated = true;
            }
        });
    });

    // Migration: New Curriculum structure (Module > Chapter > Lesson)
    state.courses.forEach(course => {
        if (!course.curriculum) {
            course.curriculum = [];
            if (course.lessons && course.lessons.length > 0) {
                course.curriculum.push({
                    id: 'chapter_' + Date.now(),
                    title: 'Aulas Gerais',
                    lessons: course.lessons
                });
            }
            delete course.lessons;
            delete course.chapters; // Remove the old count field
            migrated = true;
        }

        // Global Link Repair: Ensure every video link is a valid YouTube embed
        if (course.curriculum) {
            course.curriculum.forEach(chap => {
                if (chap.lessons) {
                    chap.lessons.forEach(l => {
                        const videoId = getYouTubeId(l.videoUrl);
                        if (videoId) {
                            const expectedUrl = `https://www.youtube.com/embed/${videoId}`;
                            if (l.videoUrl !== expectedUrl) {
                                l.videoUrl = expectedUrl;
                                migrated = true;
                            }
                        }
                    });
                }
            });
        }
    });

    if (!state.courses || !Array.isArray(state.courses) || (state.courses.length > 0 && !state.courses[0].id)) {
        state.courses = [];
        localStorage.setItem('courses', JSON.stringify([]));
    }

    if (migrated) saveState();

    // Inicia a carga de dados em DataLayer
    fetchServerData();

    render();
}

async function fetchServerData() {
    try {
        // O Endereço oficial em Nuvem do Webhook do seu N8N hospedado de forma definitiva no Coolify (produção)
        const N8N_URL = 'http://n8n-v5yewk50yi2c3m02f109vjn7.2.24.202.235.sslip.io/webhook/courses'; 
        
        // Timeout defensivo de 3 segundos
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const res = await fetch(N8N_URL, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (res.ok) {
            let data = await res.json();
            console.log("N8N Payload Recebido:", data);
            
            // Corrige se o N8N retornar o array encapsulado do Postgres
            if (data && data.courses && Array.isArray(data.courses)) {
                data = data.courses;
            } else if (data && data.length > 0 && data[0].courses) {
                data = data[0].courses;
            }

            if (data && Array.isArray(data)) {
                // Atualiza em background e salva cache
                state.courses = data;
                localStorage.setItem('courses', JSON.stringify(data));
                
                // Se a view atual depender disso, renderizamos
                if (state.currentView === 'courses' || state.currentView === 'dashboard') {
                    render();
                }
            } else {
                console.warn("N8N Payload não é um Array de Cursos válido.", data);
            }
        }
    } catch (e) {
        console.warn("Plataforma Simplifica: Motor Offline First carregando do cache. Integração N8N inacessível.", e);
    }
}


// --- Theme Management ---
function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
    render();
}

// --- Admin Actions ---
function toggleStudentFeature(studentId, feature) {
    const student = state.students.find(s => s.id === studentId);
    if (student) {
        student[feature] = !student[feature];
        saveState();
        render();
    }
}

function addNewChapter(event) {
    event.preventDefault();
    const courseId = state.adminEditingCourse;
    const title = document.getElementById('chapterTitle').value;
    const course = state.courses.find(c => c.id === courseId);
    
    if (course && title) {
        if (!course.curriculum) course.curriculum = [];
        course.curriculum.push({
            id: 'c' + Date.now(),
            title: title,
            lessons: []
        });
        saveState();
        render();
    }
}

function selectChapterForLesson(chapterId) {
    state.adminEditingChapter = chapterId;
    render();
}

function getYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|live\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function openEditLesson(courseId, chapterId, lessonId) {
    state.adminEditingCourse = courseId;
    state.adminEditingChapter = chapterId;
    state.adminEditingLesson = lessonId;
    render();
}

function deleteLesson(courseId, chapterId, lessonId) {
    if (confirm('Tem certeza que deseja excluir esta aula? Esta ação não pode ser desfeita.')) {
        const course = state.courses.find(c => c.id === courseId);
        if (course && course.curriculum) {
            const chapter = course.curriculum.find(chap => chap.id === chapterId);
            if (chapter && chapter.lessons) {
                chapter.lessons = chapter.lessons.filter(l => l.id !== lessonId);
                saveState();
                render();
            }
        }
    }
}

function addNewCourse(event) {
    event.preventDefault();
    const title = document.getElementById('newCourseTitle').value;
    const professor = document.getElementById('newCourseProfessor').value;
    
    if (!title) return;

    const newCourse = {
        id: title.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now(),
        title: title,
        professor: professor || 'Simplifica',
        cover: state.tempCourseCover, // New field
        curriculum: []
    };

    state.courses.push(newCourse);
    state.tempCourseCover = null; // Clear
    saveState();
    render();
}

function handleCourseCoverSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Resize and compress the image using Canvas to avoid localStorage quota limits
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 600;
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height = height * (MAX_WIDTH / width);
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Compress to JPEG with 70% quality
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                state.tempCourseCover = compressedBase64;
                
                // Visual feedback
                const preview = document.getElementById('coverPreview');
                if (preview) {
                    preview.src = state.tempCourseCover;
                    preview.style.display = 'block';
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function toggleCourseEdit(courseId) {
    state.adminQuickEditingCourseId = state.adminQuickEditingCourseId === courseId ? null : courseId;
    render();
}

function saveCourseEdit(courseId) {
    const course = state.courses.find(c => c.id === courseId);
    if (course) {
        const newTitle = document.getElementById(`editTitle_${courseId}`).value;
        const newProfessor = document.getElementById(`editProf_${courseId}`).value;
        course.title = newTitle;
        course.professor = newProfessor;
        state.adminQuickEditingCourseId = null;
        saveState();
        render();
    }
}

function deleteCourse(courseId) {
    const course = state.courses.find(c => c.id === courseId);
    if (!course) return;

    if (confirm(`AVISO CRÍTICO: Você tem certeza que deseja excluir o módulo "${course.title}"? \n\nIsso apagará permanentemente todos os capítulos e aulas dentro deste módulo!`)) {
        state.courses = state.courses.filter(c => c.id !== courseId);
        saveState();
        render();
    }
}

function handleProfilePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            state.isCropping = true;
            render();
            
            const image = document.getElementById('cropping-image');
            image.src = e.target.result;
            
            if (cropperInstance) cropperInstance.destroy();
            
            cropperInstance = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
                dragMode: 'move',
                autoCropArea: 0.8,
                restore: false,
                guides: false,
                center: true,
                highlight: false,
                cropBoxMovable: true,
                cropBoxResizable: true,
                toggleDragModeOnDblclick: false,
            });
        };
        reader.readAsDataURL(file);
    }
}

function confirmCrop() {
    if (cropperInstance) {
        const canvas = cropperInstance.getCroppedCanvas({
            width: 300,
            height: 300
        });
        state.user.photo = canvas.toDataURL();
        cancelCrop();
    }
}

function cancelCrop() {
    if (cropperInstance) {
        cropperInstance.destroy();
        cropperInstance = null;
    }
    state.isCropping = false;
    saveState();
    render();
}

function saveLesson(event) {
    event.preventDefault();
    const courseId = state.adminEditingCourse;
    const chapterId = state.adminEditingChapter;
    const title = document.getElementById('lessonTitle').value;
    const rawUrl = document.getElementById('lessonUrl').value;
    const pdfUrl = document.getElementById('lessonPdfUrl').value || '#';
    
    const videoId = getYouTubeId(rawUrl);
    if (!videoId) {
        alert('URL do YouTube inválida. Por favor, cole um link válido.');
        return;
    }

    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    const course = state.courses.find(c => c.id === courseId);
    
    if (course && chapterId) {
        const chapter = course.curriculum.find(chap => chap.id === chapterId);
        if (chapter) {
            if (state.adminEditingLesson) {
                // Modo Edição
                const lesson = chapter.lessons.find(l => l.id === state.adminEditingLesson);
                if (lesson) {
                    lesson.title = title;
                    lesson.videoUrl = videoUrl;
                    lesson.pdfUrl = pdfUrl;
                }
            } else {
                // Modo Inclusão
                const newLesson = {
                    id: 'l' + Date.now(),
                    title: title,
                    videoUrl: videoUrl,
                    pdfUrl: pdfUrl
                };
                if (!chapter.lessons) chapter.lessons = [];
                chapter.lessons.push(newLesson);
            }
            state.adminEditingLesson = null;
            state.adminEditingChapter = null; // Volta para a lista de capítulos
            saveState();
            render();
        }
    }
}

function selectCourseForLesson(courseId) {
    state.adminEditingCourse = courseId;
    state.adminEditingChapter = null;
    render();
}

function selectLesson(courseId, lessonId) {
    state.lastViewedCourseId = courseId;
    state.lastViewedLessonId = lessonId;
    state.currentLessonId = lessonId;
    saveState();
    navigate('lesson');
}

function navigate(viewId) {
    state.currentView = viewId;
    window.scrollTo(0, 0);
    render();
}


// --- Navigation ---
function getCurrentWeek() {
    const start = new Date(state.courseStartDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) + 1;
    return Math.min(Math.max(diffWeeks, 1), 40);
}

function updatePlanningDay(weekId, dayName, field, value) {
    const week = state.planning.find(w => w.id === weekId);
    if (week) {
        const day = week.days.find(d => d.day === dayName);
        if (day) {
            day[field] = value;
            // No longer calling saveState() or render() here to avoid page jumps
        }
    }
}

function savePlanning() {
    saveState();
    // Visual feedback
    const btn = document.getElementById('save-planning-btn');
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check"></i> Salvo com Sucesso!';
        btn.style.background = 'var(--success)';
        if (window.lucide) window.lucide.createIcons();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            if (window.lucide) window.lucide.createIcons();
        }, 2000);
    }
}

// --- Auth ---
window.handleLogin = function(event) {
    try {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        
        if (email === 'professor@simplifica.com' && password === 'admin') {
            state.user.role = 'admin';
            state.user.name = "Prof. Bruno / Guilherme";
            state.user.id = 'admin';
            state.user.isLoggedIn = true;
            state.currentView = 'admin_dashboard';
            saveState();
            render();
        } else if (email === 'aluno@simplifica.com' && password === '123') {
            state.user.role = 'student';
            const student = state.students && state.students[0] ? state.students[0] : { name: 'Aluno Simplifica', id: 1 };
            state.user.name = student.name;
            state.user.id = student.id;
            state.user.isLoggedIn = true;
            state.currentView = 'dashboard';
            saveState();
            render();
        } else {
            const errorEl = document.getElementById('loginError');
            if (errorEl) {
                errorEl.style.display = 'block';
                setTimeout(() => { errorEl.style.display = 'none'; }, 3000);
            }
        }
    } catch (e) {
        alert("Ocorreu um erro no cache do seu navegador que corrompeu o Cronograma. O sistema será reaberto do zero. Erro: " + e.message);
        localStorage.clear();
        location.reload();
    }
}

function logout() {
    state.user.isLoggedIn = false;
    saveState();
    render();
}


// --- Render Logic ---
function render() {
    const app = document.getElementById('app');
    
    if (!state.user.isLoggedIn) {
        app.innerHTML = renderLogin();
    } else {
        app.innerHTML = `
            ${state.isCropping ? `
                <div id="cropper-modal">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <h2 style="color: white; margin-bottom: 8px;">Ajuste sua Foto</h2>
                        <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">Arraste e aproxime para centralizar</p>
                    </div>
                    <div class="cropper-container-box">
                        <img id="cropping-image" style="max-width: 100%;">
                    </div>
                    <div style="display: flex; gap: 16px;">
                        <button class="btn" style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2);" onclick="cancelCrop()">Cancelar</button>
                        <button class="btn btn-primary" onclick="confirmCrop()">
                            <i data-lucide="check"></i> Confirmar Foto
                        </button>
                    </div>
                </div>
            ` : ''}

            ${renderSidebar()}
            <main class="main-content">
                ${renderHeader()}
                <div class="view-container fade-in">
                    ${renderCurrentView()}
                </div>
            </main>
              ${renderMobileNav()}
        `;
    }
    
    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// --- Components ---

function renderLogin() {
    return `
        <div class="login-page flex-center">
            <!-- Fotos dos Professores -->
            <div class="professor-container">
                <img src="fotos/Prancheta 3.png" alt="Professor Guilherme" class="professor-photo professor-left">
                <img src="fotos/2D102E4E-D3F0-4959-8F6E-633D95C8BFB0_L0_001-02_11_2025, 00_56_58.png" alt="Professor Bruno" class="professor-photo professor-right">
            </div>
            <div style="position: absolute; top: 20px; right: 20px;">
                <button class="btn glass" onclick="toggleTheme()" style="padding: 10px; border-radius: 50%;">
                    <i data-lucide="${state.theme === 'light' ? 'moon' : 'sun'}"></i>
                </button>
            </div>
            <!-- Card de Login -->
            <div class="login-card-container">
                <div class="glass" style="padding: 48px; width: 440px; text-align: center; border: 1px solid var(--border); backdrop-filter: blur(10px);">
                <div style="margin-bottom: 2rem;">${getLogo()}</div>
                <h1 style="margin-bottom: 8px;">Bem-vindo</h1>
                <p style="margin-bottom: 32px; color: var(--text-muted);">Seu portal oficial para o sucesso no ENEM</p>
                
                <form onsubmit="handleLogin(event)" style="display: flex; flex-direction: column; gap: 16px; text-align: left;">
                    <div>
                        <label style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px; display: block;">E-mail</label>
                        <input type="email" id="loginEmail" required class="glass" style="width: 100%; padding: 12px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);" placeholder="Digite seu e-mail">
                    </div>
                    <div>
                        <label style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px; display: block;">Senha</label>
                        <input type="password" id="loginPassword" required class="glass" style="width: 100%; padding: 12px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);" placeholder="Sua senha">
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="justify-content: center; height: 50px; margin-top: 8px;">
                        Entrar na Plataforma
                    </button>
                    <p id="loginError" style="color: var(--danger); font-size: 0.85rem; text-align: center; display: none; margin-top: 4px;">E-mail ou senha incorretos.</p>
                </form>
            </div>
        </div>
    </div>
    `;
}




function renderSidebar() {
    const menuItems = state.user.role === 'student' ? [
        { id: 'dashboard', icon: 'layout-dashboard', label: 'Dashboard' },
        { id: 'courses', icon: 'book-open', label: 'Meus Cursos' },
        { id: 'desempenho', icon: 'line-chart', label: 'Desempenho' },
        { id: 'simulados', icon: 'file-text', label: 'Simulados' },
        { id: 'repo_questoes', icon: 'search', label: 'Questões' },
        { id: 'cronograma', icon: 'calendar', label: 'Cronograma' },
        { id: 'downloads', icon: 'download', label: 'Provas & PDFs' },
        { id: 'mentoria', icon: 'users', label: 'Mentoria & Aulas' },

    ] : [
        { id: 'admin_dashboard', icon: 'bar-chart-3', label: 'Estatísticas' },
        { id: 'admin_students', icon: 'users', label: 'Alunos' },
        { id: 'admin_content', icon: 'upload-cloud', label: 'Gerenciar Aulas' },
        { id: 'admin_planning', icon: 'calendar', label: 'Planejamento do Curso' },
    ];

    return `
        <aside class="sidebar">
            <div class="logo-container" style="margin-bottom: 40px; padding: 0 8px; transform: scale(0.9); transform-origin: left center;">
                ${getLogo()}
            </div>


            <nav style="flex: 1;">

                <ul style="list-style: none;">
                    ${menuItems.map(item => `
                        <li style="margin-bottom: 8px;">
                            <a href="#" onclick="navigate('${item.id}')" 
                               style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; text-decoration: none; 
                               color: ${state.currentView === item.id ? (state.theme === 'dark' ? 'var(--secondary)' : 'var(--primary)') : 'var(--text-muted)'}; 
                               background: ${state.currentView === item.id ? 'var(--glass-bg)' : 'transparent'}; 
                               font-weight: ${state.currentView === item.id ? '600' : '400'}; transition: all 0.2s;">
                                <i data-lucide="${item.icon}" style="width: 20px; height: 20px;"></i>
                                <span>${item.label}</span>
                            </a>

                        </li>
                    `).join('')}
                </ul>
            </nav>

            <div class="sidebar-footer" style="padding-top: 24px; border-top: 1px solid var(--border);">
                <button onclick="toggleTheme()" class="btn" style="width: 100%; justify-content: flex-start; margin-bottom: 8px; background: transparent; color: var(--text-muted);">
                    <i data-lucide="${state.theme === 'dark' ? 'sun' : 'moon'}" style="width: 20px; height: 20px;"></i>
                    <span>Modo ${state.theme === 'dark' ? 'Claro' : 'Escuro'}</span>
                </button>
                <button onclick="logout()" class="btn" style="width: 100%; justify-content: flex-start; background: transparent; color: var(--danger);">
                    <i data-lucide="log-out" style="width: 20px; height: 20px;"></i>
                    <span>Sair</span>
                </button>
            </div>
        </aside>
    `;
}

function renderHeader() {
    return `
        <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
            <div>
                <h3 style="color: var(--text-muted); font-weight: 400;">Olá, ${state.user.name.split(' ')[0]} 👋</h3>
                <h1 style="font-size: 1.75rem;">Que bom te ver de novo!</h1>
            </div>
            
            <div style="display: flex; align-items: center; gap: 24px;">
                <input type="file" id="profile-upload" accept="image/*" style="display: none;" onchange="handleProfilePhotoUpload(event)">
                
                <div class="user-profile" style="display: flex; align-items: center; gap: 12px; cursor: pointer;" onclick="document.getElementById('profile-upload').click()">
                    <span style="font-weight: 600; font-size: 0.95rem; color: var(--text-main);">${state.user.name}</span>
                    <div style="position: relative;">
                        <div style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid var(--primary); overflow: hidden; display: flex; align-items: center; justify-content: center; background: var(--bg-main); transition: transform 0.2s;" class="profile-avatar">
                            ${state.user.photo ? 
                                `<img src="${state.user.photo}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                                `<i data-lucide="user" style="color: var(--primary); width: 24px; height: 24px;"></i>`
                            }
                        </div>
                        <div style="position: absolute; bottom: -2px; right: -2px; background: var(--primary); width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid var(--bg-main);">
                            <i data-lucide="camera" style="width: 10px; height: 10px; color: white;"></i>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    `;
}


// --- View Router ---
function renderCurrentView() {
    switch(state.currentView) {
        case 'dashboard': return renderStudentDashboard();
        case 'courses': return renderCourses();
        case 'desempenho': return renderDesempenho();
        case 'lesson': return renderLessonView();

        case 'simulados': return renderSimulados();
        case 'repo_questoes': return renderQuestoes();
        case 'cronograma': return renderCronograma();
        case 'downloads': return renderDownloads();
        case 'mentoria': return renderMentoria();
        case 'profile': return renderProfile();
        case 'admin_dashboard': return renderAdminDashboard();
        case 'admin_content': return renderAdminContent();
        case 'admin_planning': return renderAdminPlanning();
        case 'admin_students': return renderAdminStudents();
        default: return `<h2>Em desenvolvimento: ${state.currentView}</h2>`;
    }
}

// --- Specific Views (Placeholders updated later) ---

function renderStudentDashboard() {
    const currentWeekNum = getCurrentWeek();
    const currentWeekData = state.planning.find(w => w.id === currentWeekNum) || state.planning[0];

    // Helper to get day color/teacher info
    const getDayStyle = (day, teacher) => {
        const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long' }).toLowerCase();
        const isToday = day.toLowerCase().includes(today) || (day === 'Segunda' && today.includes('segunda')); // Mapping seg-feira
        
        const colors = {
            'Guilherme': { bg: 'rgba(141, 178, 51, 0.1)', border: 'var(--secondary)', text: 'var(--secondary)', icon: '📐' },
            'Bruno': { bg: 'rgba(0, 0, 146, 0.1)', border: 'var(--primary)', text: 'var(--primary)', icon: '📊' },
            'Ambos': { bg: 'rgba(139, 92, 246, 0.1)', border: '#8b5cf6', text: '#8b5cf6', icon: '✨' },
            'default': { bg: 'var(--glass-bg)', border: 'var(--border)', text: 'var(--text-muted)', icon: '📅' }
        };

        const config = colors[teacher] || colors.default;
        return { ...config, isToday };
    };

    return `
        <div style="display: flex; flex-direction: column; gap: 40px;">
            <!-- Welcome Banner -->
            <div class="glass" style="padding: 40px; background: linear-gradient(135deg, var(--primary) 0%, #00005a 100%); color: #ffffff !important; border: none; display: flex; justify-content: space-between; align-items: center; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
                <div style="z-index: 1;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 12px; color: #ffffff !important;">Semana ${currentWeekNum} Iniciada! 🚀</h2>
                    <p style="color: rgba(255,255,255,0.8); font-size: 1.1rem; max-width: 600px;">Sua jornada rumo à aprovação continua aqui. Mantenha a constância e siga o plano!</p>
                </div>
                <div style="text-align: right; background: rgba(255,255,255,0.1); padding: 24px; border-radius: 24px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); z-index: 1;">
                    <div style="font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; opacity: 0.7; margin-bottom: 8px; text-transform: uppercase;">Hoje é dia</div>
                    <div style="font-size: 1.75rem; font-weight: 800;">${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}</div>
                </div>
            </div>

            <!-- New Timeline Schedule -->
            <section>
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px;">
                    <div>
                        <h3 style="font-size: 1.5rem; margin-bottom: 4px;">Sua Programação Semanal</h3>
                        <p style="font-size: 0.9rem;">Organização diária focada no seu rendimento.</p>
                    </div>
                    <div class="glass" style="padding: 8px 16px; font-size: 0.85rem; font-weight: 600; color: var(--secondary); background: rgba(141, 178, 51, 0.1); border-color: rgba(141, 178, 51, 0.2);">
                        ${currentWeekData.week}
                    </div>
                </div>

                <div class="grid-schedule">
                    ${currentWeekData.days.map(d => {
                        const style = getDayStyle(d.day, d.teacher);
                        return `
                            <div class="glass" style="padding: 24px; display: flex; flex-direction: column; gap: 16px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); min-width: 200px;
                                 ${style.isToday ? 'border: 2px solid var(--secondary); transform: scale(1.02); box-shadow: 0 10px 30px rgba(141, 178, 51, 0.15);' : 'opacity: 0.9;'} 
                                 ${d.topic === 'RECESSO' ? 'background: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.2);' : ''}"
                                 onmouseover="this.style.transform = 'translateY(-8px) ${style.isToday ? 'scale(1.02)' : ''}'"
                                 onmouseout="this.style.transform = '${style.isToday ? 'scale(1.02)' : 'translateY(0)'}'">
                                
                                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                    <div>
                                        <div style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">${d.day}</div>
                                        ${style.isToday ? '<span style="font-size: 0.65rem; background: var(--secondary); color: white; padding: 2px 8px; border-radius: 20px; font-weight: 700; margin-top: 4px; display: inline-block;">HOJE</span>' : ''}
                                    </div>
                                    <span style="font-size: 1.25rem;">${style.icon}</span>
                                </div>

                                <div style="flex: 1;">
                                    <h4 style="font-size: 1.1rem; line-height: 1.3; margin-bottom: 8px; font-weight: 700; color: ${d.topic === 'RECESSO' ? 'var(--danger)' : 'var(--text-main)'}">${d.topic}</h4>
                                    <div style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--text-muted);">
                                        <i data-lucide="clock" style="width: 12px; height: 12px;"></i>
                                        <span>${d.time}h</span>
                                         • 
                                        <span>Prof. ${d.teacher === 'Guilherme' ? 'Gui' : d.teacher === 'Bruno' ? 'Bru' : 'Ambos'}</span>
                                    </div>
                                </div>

                                ${d.willOccur ? `
                                    <button class="btn btn-primary" style="width: 100%; justify-content: center; font-size: 0.85rem; padding: 12px;" 
                                            onclick="window.open('${currentWeekData.meetLink}')">
                                        <i data-lucide="video"></i> Entrar na Aula
                                    </button>
                                ` : `
                                    <div style="text-align: center; padding: 12px; border: 1px dashed var(--border); border-radius: 12px; font-size: 0.8rem; color: var(--text-muted);">
                                        Sem aula ao vivo
                                    </div>
                                `}
                            </div>
                        `;
                    }).join('')}
                </div>
            </section>

            <!-- Bottom Grid (Resumo e Próximos Passos) -->
            <div class="grid-2-1">
                <div class="glass" style="padding: 32px;">
                    <h3 class="mb-6">Continue de onde parou</h3>
                    ${(() => {
                        const course = state.courses.find(c => c.id === state.lastViewedCourseId);
                        let lesson = null;
                        let chapter = null;
                        if (course && course.curriculum) {
                            course.curriculum.forEach(ch => {
                                const found = ch.lessons?.find(l => l.id === state.lastViewedLessonId);
                                if (found) {
                                    lesson = found;
                                    chapter = ch;
                                }
                            });
                        }
                        
                        // Default if nothing found (safety)
                        if (!lesson && state.courses?.[0]?.curriculum?.[0]?.lessons?.[0]) {
                            lesson = state.courses[0].curriculum[0].lessons[0];
                            chapter = state.courses[0].curriculum[0];
                        }

                        if (!lesson) {
                            return `<div style="padding: 16px; background: rgba(0,0,0,0.2); border-radius: 12px; text-align: center; color: var(--text-muted);">Nenhuma aula em andamento.</div>`;
                        }

                        const tubeId = getYouTubeId(lesson.videoUrl);
                        // Using higher quality thumbnail for better look
                        const thumbUrl = `https://img.youtube.com/vi/${tubeId}/mqdefault.jpg`;

                        return `
                            <div class="glass" style="padding: 16px; background: var(--bg-main); border: 1px solid var(--border); transition: all 0.3s;" 
                                 onmouseover="this.style.borderColor = 'var(--primary)'; this.style.transform = 'translateY(-4px)'"
                                 onmouseout="this.style.borderColor = 'var(--border)'; this.style.transform = 'translateY(0)'">
                                <div style="display: flex; gap: 24px; align-items: center;">
                                    <!-- Thumbnail 16:9 -->
                                    <div style="position: relative; width: 220px; aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); flex-shrink: 0; cursor: pointer;"
                                         onclick="selectLesson('${state.lastViewedCourseId}', '${lesson.id}')">
                                        <img src="${thumbUrl}" style="width: 100%; height: 100%; object-fit: cover;">
                                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;">
                                            <div style="width: 36px; height: 36px; background: rgba(255,255,255,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                                <i data-lucide="play" style="color: var(--primary); fill: var(--primary); width: 16px; height: 16px; margin-left: 2px;"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Info -->
                                    <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                                        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                                            <span style="font-size: 0.65rem; font-weight: 800; color: var(--primary); text-transform: uppercase; background: rgba(0,0,146,0.05); padding: 2px 8px; border-radius: 4px;">${course.title}</span>
                                            <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">• ${chapter.title}</span>
                                        </div>
                                        <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 8px; color: var(--text-main); line-height: 1.2;">${lesson.title}</h4>
                                        <button class="btn btn-primary" style="align-self: flex-start; padding: 8px 16px; font-size: 0.85rem;" 
                                                onclick="selectLesson('${state.lastViewedCourseId}', '${lesson.id}')">
                                            Continuar de onde parou
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    })()}
                </div>

                <div class="glass" style="padding: 32px; background: linear-gradient(135deg, rgba(141, 178, 51, 0.15) 0%, rgba(141, 178, 51, 0.05) 100%); border: 1px solid var(--secondary); position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -20px; right: -20px; opacity: 0.1; transform: rotate(15deg);">
                        <i data-lucide="calendar" style="width: 100px; height: 100px; color: var(--secondary);"></i>
                    </div>
                    
                    <h3 style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                        <i data-lucide="layout-dashboard" style="width: 20px; height: 20px; color: var(--secondary);"></i>
                        Monte seu Cronograma
                    </h3>
                    <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 24px; line-height: 1.5;">
                        Quer uma rotina de estudos organizada e focada na sua aprovação? Nossa tutora ajuda você a montar seu cronograma do zero!
                    </p>
                    
                    <button class="btn" style="width: 100%; justify-content: center; background: #25D366; color: white; border: none; padding: 14px; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);" 
                            onclick="window.open('https://wa.me/5511999999999?text=Olá! Vim pela plataforma Simplifica e gostaria de ajuda para montar meu cronograma de estudos.')">
                        <i data-lucide="message-circle" style="fill: white;"></i>
                        Chamar no WhatsApp
                    </button>
                    
                    <div style="margin-top: 16px; font-size: 0.75rem; text-align: center; color: var(--text-muted); font-weight: 600;">
                        <span style="display: inline-block; width: 8px; height: 8px; background: #25D366; border-radius: 50%; margin-right: 4px;"></span>
                        Tutoria Online agora
                    </div>
                </div>
            </div>
        </div>
    `;
}


function renderCourses() {
    return `
        <h2 class="mb-8">Biblioteca de Cursos</h2>
        <div class="grid-cards">
            ${state.courses.map(c => {
                const totalLessons = c.curriculum ? c.curriculum.reduce((acc, chap) => acc + (chap.lessons ? chap.lessons.length : 0), 0) : 0;
                const firstLessonId = c.curriculum?.[0]?.lessons?.[0]?.id;
                
                // Image mapping
                const courseImages = {
                    'math1': 'fotos/mat1.png',
                    'math2': 'fotos/mat2.png',
                    'math_basic': 'fotos/matbas.png',
                    'combinatorics': 'fotos/analcomb.png'
                };
                const coverImg = c.cover || courseImages[c.id] || null;
                
                return `
                <div class="glass" style="overflow: hidden; cursor: pointer; transition: transform 0.2s; height: 100%; display: flex; flex-direction: column;" 
                     onclick="${firstLessonId ? `selectLesson('${c.id}', '${firstLessonId}')` : `alert('Este curso ainda não possui aulas.')`}"
                     onmouseover="this.style.transform = 'translateY(-8px)'"
                     onmouseout="this.style.transform = 'translateY(0)'">
                    <div style="height: 180px; background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; position: relative; overflow: hidden;">
                        ${coverImg ? 
                            `<img src="${coverImg}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                            `<i data-lucide="book" style="width: 48px; height: 48px; opacity: 0.5;"></i>`
                        }
                    </div>

                    <div style="padding: 24px;">
                        <h3 style="margin-bottom: 4px;">${c.title}</h3>
                        <p style="font-size: 0.85rem; margin-bottom: 16px;">Prof. ${c.professor}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 0.85rem; font-weight: 600; color: ${state.theme === 'dark' ? 'var(--secondary)' : 'var(--primary)'};">
                                ${totalLessons} Aulas
                            </span>
                            <div style="width: 100px; height: 6px; background: var(--border); border-radius: 3px; overflow: hidden;">
                                <div style="width: ${Math.random()*80}%; height: 100%; background: var(--success);"></div>
                            </div>
                        </div>

                    </div>
                </div>
            `}).join('')}
        </div>
    `;
}

function renderLessonView() {
    // Find current lesson and its course
    let currentCourse = null;
    let currentLesson = null;
    
    state.courses.forEach(c => {
        if (c.curriculum) {
            c.curriculum.forEach(chap => {
                const found = chap.lessons?.find(l => l.id === state.currentLessonId);
                if (found) {
                    currentCourse = c;
                    currentLesson = found;
                }
            });
        }
    });

    if (!currentLesson) return `<button class="btn" onclick="navigate('courses')">Voltar aos Cursos</button><h2 class="mt-4">Aula não encontrada.</h2>`;

    // Detect file:// protocol which causes YouTube Error 153
    const isFileProtocol = window.location.protocol === 'file:';
    
    // Add parameters to bypass configuration errors on local files
    // enablejsapi=1 and origin=https://www.youtube.com help in some local environments
    const videoUrl = `${currentLesson.videoUrl}?enablejsapi=1&origin=https://www.youtube.com&widget_referrer=${encodeURIComponent(window.location.href)}`;

    return `
        ${state.user.role === 'admin' ? `
            <button class="btn" style="margin-bottom: 24px; background: transparent; border: 1px solid var(--border);" onclick="state.currentView = 'admin_content'; render();">
                <i data-lucide="arrow-left"></i> Voltar ao Gerenciador de Aulas
            </button>
        ` : ''}
        ${isFileProtocol ? `
            <div class="glass" style="margin-bottom: 20px; padding: 12px 20px; border: 1px solid var(--warning); background: rgba(255, 179, 0, 0.05); border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                <i data-lucide="info" style="color: var(--warning); width: 20px;"></i>
                <span style="font-size: 0.85rem; color: var(--text-muted);">
                    <strong>Aviso de Modo Local:</strong> Para evitar erros no player (Erro 153), recomendamos abrir a plataforma usando um "Local Server" (ex: Live Server do VS Code).
                </span>
            </div>
        ` : ''}
        
        <div class="grid-3-1">
            <div>
                <div class="glass" style="aspect-ratio: 16/9; margin-bottom: 24px; overflow: hidden; position: relative; background: #000; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="${videoUrl}" 
                        title="YouTube video player"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen 
                        referrerpolicy="strict-origin-when-cross-origin"
                        style="position: absolute; top: 0; left: 0;">
                    </iframe>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px;">
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <div style="width: 60px; height: 60px; border-radius: 15px; background: var(--primary); display: flex; align-items: center; justify-content: center; color: white;">
                            <i data-lucide="user"></i>
                        </div>
                        <div>
                            <h1 style="margin-bottom: 4px;">${currentLesson.title}</h1>
                            <p style="color: var(--text-muted);">${currentCourse.title} • Prof. ${currentCourse.professor}</p>
                        </div>
                    </div>


                    <div style="display: flex; gap: 12px;">
                        <button class="btn" style="background: var(--glass-bg); border: 1px solid var(--border);" onclick="window.open('${currentLesson.pdfUrl}')">
                            <i data-lucide="file-text"></i> PDF da Aula
                        </button>
                        <button class="btn btn-primary" onclick="alert('Aula concluída!')">Concluir Aula</button>

                    </div>
                </div>

                <div class="tabs" style="border-bottom: 1px solid var(--border); display: flex; gap: 32px; margin-bottom: 24px;">
                    <button style="background: none; border: none; padding: 12px 0; border-bottom: 2px solid ${state.theme === 'dark' ? 'var(--secondary)' : 'var(--primary)'}; color: var(--text-main); font-weight: 600; cursor: pointer;">Comentários</button>
                </div>


                <div class="comments">
                    <div style="display: flex; gap: 16px; margin-bottom: 32px;">
                        <div style="width: 40px; height: 40px; border-radius: 10px; background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700;">
                            ${state.user.name.charAt(0)}
                        </div>
                        <div style="flex: 1;">
                            <textarea id="newCommentText" class="glass" style="width: 100%; height: 80px; padding: 12px; border: 1px solid var(--border); border-radius: 12px; background: var(--bg-main); color: var(--text-main); margin-bottom: 8px;" placeholder="Deixe seu comentário ou dúvida..."></textarea>
                            <button class="btn btn-primary" style="font-size: 0.85rem;" onclick="addComment('${currentLesson.id}')">Enviar</button>
                        </div>
                    </div>
                    
                    <div id="commentsList" style="display: flex; flex-direction: column; gap: 24px;">
                        ${(currentLesson.comments || []).map(c => `
                            <div>
                                <div style="display: flex; gap: 16px;">
                                    <div style="width: 32px; height: 32px; border-radius: 8px; background: ${c.isAdmin ? 'var(--danger)' : 'var(--accent)'}; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.8rem;">
                                        ${c.author.charAt(0)}
                                    </div>
                                    <div style="flex: 1;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                            <div style="font-weight: 600; font-size: 0.9rem;">
                                                ${c.author} ${c.isAdmin ? '<span style="background: var(--danger); color: white; font-size: 0.6rem; padding: 2px 6px; border-radius: 10px; margin-left: 8px;">PROFESSOR</span>' : ''}
                                            </div>
                                            <div style="font-size: 0.75rem; color: var(--text-muted);">${c.date}</div>
                                        </div>
                                        <div style="background: var(--glass-bg); padding: 16px; border-radius: 12px; border: 1px solid var(--border); font-size: 0.9rem; color: var(--text-main);">
                                            ${c.text}
                                        </div>
                                        <div style="margin-top: 8px; display: flex; gap: 12px;">
                                            ${state.user.role === 'admin' ? `
                                                <button class="btn" style="padding: 0; background: transparent; color: var(--primary); font-size: 0.8rem;" onclick="openReply('${c.id}')"><i data-lucide="message-square" style="width: 14px;"></i> Responder</button>
                                                <button class="btn" style="padding: 0; background: transparent; color: var(--danger); font-size: 0.8rem;" onclick="deleteComment('${currentLesson.id}', '${c.id}')"><i data-lucide="trash-2" style="width: 14px;"></i> Excluir</button>
                                            ` : ''}
                                        </div>
                                        
                                        <!-- Formulário de Reposta -->
                                        ${state.user.role === 'admin' && state.replyingTo === c.id ? `
                                            <div style="margin-top: 12px; display: flex; gap: 12px;">
                                                <input type="text" id="replyText_${c.id}" class="glass" style="flex: 1; padding: 8px 12px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main); font-size: 0.85rem;" placeholder="Sua resposta...">
                                                <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.8rem;" onclick="submitReply('${currentLesson.id}', '${c.id}')">Enviar</button>
                                                <button class="btn" style="padding: 8px; background: transparent;" onclick="openReply(null)"><i data-lucide="x" style="width: 16px;"></i></button>
                                            </div>
                                        ` : ''}
                                        
                                        <!-- Render Replies -->
                                        ${c.replies && c.replies.length > 0 ? `
                                            <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 16px; padding-left: 20px; border-left: 2px solid var(--border);">
                                                ${c.replies.map(r => `
                                                    <div style="display: flex; gap: 12px;">
                                                         <div style="width: 24px; height: 24px; border-radius: 6px; background: var(--danger); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.6rem;">
                                                            ${r.author.charAt(0)}
                                                        </div>
                                                        <div style="flex: 1;">
                                                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                                                <div style="font-weight: 600; font-size: 0.85rem;">
                                                                    ${r.author} <span style="background: var(--danger); color: white; font-size: 0.6rem; padding: 2px 6px; border-radius: 10px; margin-left: 8px;">PROFESSOR</span>
                                                                </div>
                                                                <div style="font-size: 0.7rem; color: var(--text-muted);">${r.date}</div>
                                                            </div>
                                                            <div style="font-size: 0.85rem; color: var(--text-main);">
                                                                ${r.text}
                                                            </div>
                                                        </div>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                        ${(!currentLesson.comments || currentLesson.comments.length === 0) ? '<p style="color: var(--text-muted); font-size: 0.85rem;">Nenhum comentário ainda. Seja o primeiro!</p>' : ''}
                    </div>
                </div>
            </div>

            <div style="height: calc(100vh - 200px); overflow-y: auto; padding-right: 8px;">
                <h3 class="mb-4">Conteúdo do Curso</h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    ${currentCourse.curriculum.map(chap => `
                        <div>
                            <div style="font-size: 0.75rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; padding-left: 4px;">
                                ${chap.title}
                            </div>
                            <div class="glass" style="padding: 8px; display: flex; flex-direction: column; gap: 4px;">
                                ${chap.lessons.map(l => `
                                    <div onclick="selectLesson('${currentCourse.id}', '${l.id}')" 
                                         style="padding: 10px; border-radius: 8px; background: ${l.id === currentLesson.id ? 'var(--glass-bg)' : 'transparent'}; cursor: pointer; border: ${l.id === currentLesson.id ? '1px solid var(--primary)' : '1px solid transparent'}">
                                        <div style="font-size: 0.85rem; font-weight: 600; color: ${l.id === currentLesson.id ? 'var(--text-main)' : 'var(--text-muted)'}">${l.title}</div>
                                        <div style="display: flex; align-items: center; gap: 6px; font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">
                                            <i data-lucide="${l.id === currentLesson.id ? 'play' : 'play-circle'}" style="width: 12px; height: 12px; color: ${l.id === currentLesson.id ? 'var(--secondary)' : 'inherit'}"></i> 
                                            ${l.id === currentLesson.id ? 'Assistindo agora' : 'Assistir'}
                                        </div>
                                    </div>
                                `).join('')}
                                ${chap.lessons.length === 0 ? '<p style="font-size: 0.75rem; color: var(--text-muted); padding: 8px;">Sem aulas.</p>' : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}


function renderSimulados() {
    return `
        <h2 class="mb-4">Simulados Simplifica</h2>
        <p class="mb-8">Coloque seu conhecimento à prova com nossos simulados autorais e simulados de sexta-feira.</p>
        
        <div class="grid-1-1">
            <div class="glass" style="padding: 32px;">
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
                    <div style="background: var(--primary); padding: 12px; border-radius: 12px; color: white;">
                        <i data-lucide="clipboard-check"></i>
                    </div>
                    <div>
                        <h3 style="margin: 0;">Simulados Autorais</h3>
                        <p style="font-size: 0.85rem;">Grandes simulados mensais</p>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${[1, 2, 3].map(i => `
                        <div style="background: var(--bg-main); padding: 16px; border-radius: 12px; border: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-weight: 600;">Simulado Geral #${i}</div>
                                <div style="font-size: 0.75rem; color: var(--text-muted);">45 Questões • Matemática</div>
                            </div>
                            <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">Iniciar</button>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="glass" style="padding: 32px;">
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
                    <div style="background: var(--secondary); padding: 12px; border-radius: 12px; color: white;">
                        <i data-lucide="zap"></i>
                    </div>
                    <div>
                        <h3 style="margin: 0;">SIMPLI-SIMULADO</h3>
                        <p style="font-size: 0.85rem;">Toda sexta-feira às 20h</p>
                    </div>
                </div>

                <div class="glass" style="padding: 24px; border: 1px dashed var(--secondary); text-align: center;">
                    <h4 style="margin-bottom: 12px;">Preencher Gabarito</h4>
                    <p style="font-size: 0.85rem; margin-bottom: 20px;">Insira suas respostas para o simulado de hoje e receba feedback ao vivo.</p>
                    
                    <div class="grid-schedule">
                        ${Array.from({length: 10}).map((_, i) => `
                            <div>
                                <div style="font-size: 0.7rem; font-weight: 700; margin-bottom: 4px;">Q${i+1}</div>
                                <select style="width: 100%; padding: 4px; border-radius: 4px; border: 1px solid var(--border); background: var(--bg-main); color: var(--text-main);">
                                    <option>-</option><option>A</option><option>B</option><option>C</option><option>D</option><option>E</option>
                                </select>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="alert('Gabarito enviado!')">Enviar Gabarito</button>

                </div>
            </div>
        </div>
    `;
}

function renderQuestoes() {
    return `
        <h2 class="mb-8">Banco de Questões</h2>
        
        <div class="glass" style="padding: 24px; margin-bottom: 32px; display: flex; gap: 16px; flex-wrap: wrap;">
            <input type="text" class="glass" style="flex: 1; min-width: 200px; padding: 12px 16px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);" placeholder="Buscar por tema ou palavra-chave...">
            <select class="glass" style="padding: 12px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);">
                <option>Tema</option><option>Geometria</option><option>Álgebra</option><option>Estatística</option>
            </select>
            <select class="glass" style="padding: 12px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);">
                <option>Dificuldade</option><option>Fácil</option><option>Média</option><option>Difícil</option>
            </select>
            <select class="glass" style="padding: 12px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);">
                <option>Ano</option><option>2023</option><option>2022</option><option>2021</option>
            </select>
            <button class="btn btn-primary"><i data-lucide="search"></i> Filtrar</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
            ${[
                {t: 'Geometria Espacial', s: 'ENEM 2023', d: 'Média', q: 'Um reservatório de água tem o formato de um cilindro reto...'},
                {t: 'Análise Combinatória', s: 'FUVEST', d: 'Difícil', q: 'O número de anagramas da palavra SIMPLIFICA que não começam por...'},
            ].map(q => `
                <div class="glass" style="padding: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <div style="display: flex; gap: 8px;">
                            <span style="background: var(--glass-bg); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">${q.t}</span>
                            <span style="background: var(--primary); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">${q.s}</span>
                        </div>
                        <span style="color: ${q.d === 'Difícil' ? 'var(--danger)' : 'var(--warning)'}; font-size: 0.8rem; font-weight: 700;">${q.d}</span>
                    </div>
                    <p style="margin-bottom: 20px; font-size: 1rem; color: var(--text-main);">${q.q}</p>
                    <button class="btn" style="background: var(--glass-bg); font-size: 0.85rem;">Ver Resposta & Resolução</button>
                </div>
            `).join('')}
        </div>
    `;
}

function renderCronograma() {
    return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
            <h2 style="margin: 0;">Meu Cronograma Semanal</h2>
            <button class="btn" style="background: #25D366; color: white;" onclick="window.open('https://wa.me/5500000000000?text=Olá, desejo ajustar meu cronograma!')">
                <i data-lucide="message-circle"></i> Falar com Tutora
            </button>
        </div>

        <div class="glass" style="padding: 24px;">
            <div class="grid-schedule">
                ${['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map(day => `
                    <div style="text-align: center;">
                        <h4 style="margin-bottom: 16px; color: ${state.theme === 'dark' ? 'var(--secondary)' : 'var(--primary)'}; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">${day}</h4>
                        <div style="min-height: 200px; background: var(--bg-main); border-radius: 12px; border: 1px solid var(--border); padding: 12px; display: flex; flex-direction: column; gap: 12px;">

                            <div style="background: var(--glass-bg); padding: 12px; border-radius: 8px; text-align: left; font-size: 0.85rem;">
                                <div style="font-weight: 700;">${state.planning[0].time}</div>
                                <div style="margin-top: 4px;">Aula do Planejamento</div>
                            </div>
                            <div style="background: ${state.theme === 'dark' ? 'rgba(141, 178, 51, 0.1)' : 'rgba(0, 0, 146, 0.1)'}; border: 1px solid ${state.theme === 'dark' ? 'var(--secondary)' : 'var(--primary)'}; padding: 12px; border-radius: 8px; text-align: left; font-size: 0.85rem;">
                                <div style="font-weight: 700;">Autoestudo</div>
                                <div style="margin-top: 4px;">Lista de Exercícios</div>
                            </div>

                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderMentoria() {
    const student = state.students.find(s => s.id === state.user.id);
    const mentorshipLocked = !student || !student.mentorshipEnabled;
    const tutoringLocked = !student || !student.tutoringEnabled;

    return `
        <h2 class="mb-4">Mentoria & Aulas Privadas</h2>
        <p class="mb-8">Acesso exclusivo para impulsionar seu desempenho individual.</p>

        <div class="grid-1-1">
            <!-- Aulas Particulares -->
            <div class="glass" style="padding: 32px; position: relative; overflow: hidden;">
                ${tutoringLocked ? `
                    <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10; color: white; padding: 20px; text-align: center;">
                        <i data-lucide="lock" style="width: 48px; height: 48px; margin-bottom: 16px;"></i>
                        <h3 style="color: white;">Acesso Bloqueado</h3>
                        <p style="font-size: 0.85rem; color: rgba(255,255,255,0.8);">Esta funcionalidade é exclusiva para o Plano Particular. Fale com seu professor para desbloquear.</p>
                        <button class="btn btn-primary mt-6" onclick="window.open('https://wa.me/550000000000')">Saber mais</button>
                    </div>
                ` : ''}
                <h3 class="mb-4">Dúvidas com Professor</h3>
                <p style="margin-bottom: 24px;">Escolha o professor e tire sua dúvida direto no WhatsApp.</p>
                <div style="display: flex; gap: 16px;">
                    <div style="flex: 1; text-align: center;">
                        <button class="btn" style="width: 100%; border: 1px solid var(--border); height: 60px;" onclick="window.open('https://wa.me/5500000000000?text=Prof. Guilherme, tenho uma dúvida...')">
                            Guilherme
                        </button>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <button class="btn" style="width: 100%; border: 1px solid var(--border); height: 60px;" onclick="window.open('https://wa.me/5500000000000?text=Prof. Bruno, tenho uma dúvida...')">
                            Bruno
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mentoria Individual -->
            <div class="glass" style="padding: 32px; position: relative; overflow: hidden;">
                ${mentorshipLocked ? `
                    <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10; color: white; padding: 20px; text-align: center;">
                        <i data-lucide="lock" style="width: 48px; height: 48px; margin-bottom: 16px;"></i>
                        <h3 style="color: white;">Recurso Premium</h3>
                        <p style="font-size: 0.85rem; color: rgba(255,255,255,0.8);">A Mentoria Individual permite reuniões semanais de planejamento. Desbloqueie com o professor.</p>
                        <button class="btn btn-primary mt-6" onclick="window.open('https://wa.me/550000000000')">Quero Mentoria</button>
                    </div>
                ` : ''}
                <h3 class="mb-4">Mentoria Individual</h3>
                <p style="margin-bottom: 24px;">Planejamento estratégico e acompanhamento de metas.</p>
                <div style="padding: 24px; border: 1px dashed var(--border); border-radius: 12px; text-align: center;">
                    <i data-lucide="calendar" style="margin-bottom: 8px; color: var(--secondary);"></i>
                    <div style="font-size: 0.9rem; font-weight: 600;">Sua próxima mentoria coletiva:</div>
                    <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Quarta-feira, às 19:00</div>
                    <button class="btn btn-primary mt-4" style="width: 100%; justify-content: center;">Entrar na Reunião</button>
                </div>
            </div>
        </div>
    `;
}


function renderDownloads() {
    return `
        <h2 class="mb-8">Download de Provas Antigas</h2>
        <div class="glass" style="padding: 24px;">
            <div class="grid-small-cards">
                ${['ENEM', 'FUVEST', 'UNICAMP', 'UNESP', 'UERJ', 'UFSC', 'UFRGS'].map(v => `
                    <div class="glass" style="padding: 20px; text-align: center; cursor: pointer; background: var(--bg-main);">
                        <div style="background: var(--accent); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; margin: 0 auto 12px;">
                            <i data-lucide="archive"></i>
                        </div>
                        <h4 style="margin: 0;">${v}</h4>
                        <p style="font-size: 0.75rem; margin-top: 4px;">Todas as edições</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderAdminDashboard() {
    const stats = state.adminStats;
    return `
        <h2 class="mb-8">Visão Geral da Plataforma</h2>
        
        <div class="grid-stats">
            <div class="glass" style="padding: 24px;">
                <div style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 8px;">PROGRESSO MÉDIO</div>
                <div style="font-size: 2rem; font-weight: 700; color: ${state.theme === 'dark' ? 'var(--secondary)' : 'var(--primary)'};">${stats.avgProgress}%</div>
                <div style="font-size: 0.75rem; color: var(--success); margin-top: 4px;">+5% este mês</div>
            </div>

            <div class="glass" style="padding: 24px;">
                <div style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 8px;">ATIVOS ESTA SEMANA</div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--accent);">${stats.activeThisWeek}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">${Math.round((stats.activeThisWeek/stats.totalStudents)*100)}% de engajamento</div>
            </div>
            <div class="glass" style="padding: 24px;">
                <div style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 8px;">TOTAL ALUNOS</div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--warning);">${stats.totalStudents}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">Capacidade: 200</div>
            </div>

            <div class="glass" style="padding: 24px;">
                <div style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 8px;">DÚVIDAS PENDENTES</div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--danger);">${stats.pendingQuestions}</div>
                <div style="font-size: 0.75rem; color: var(--danger); margin-top: 4px;">Urgente: 3</div>
            </div>
        </div>

        <div class="grid-2-1">
            <div class="glass" style="padding: 32px;">
                <h3 class="mb-6">Atividade de Estudos (Últimos 7 dias)</h3>
                <div style="height: 300px; display: flex; align-items: flex-end; justify-content: space-between; padding-top: 20px;">
                    ${[45, 60, 35, 80, 55, 90, 70].map((h, i) => `
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 12px;">
                             <div style="width: 70%; background: ${state.theme === 'dark' ? 'var(--secondary)' : 'var(--primary)'}; height: ${h}%; border-radius: 8px 8px 0 0; position: relative;">
                                <div style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 0.75rem; font-weight: 700;">${h}%</div>
                            </div>

                            <div style="font-size: 0.75rem; color: var(--text-muted);">${['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'][i]}</div>
                        </div>
                    `).join('')}
                </div>

            </div>
            
            <div class="glass" style="padding: 32px;">
                <h3 class="mb-6">Cursos Mais Acessados</h3>
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    ${state.courses.map(c => `
                        <div>
                            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 8px;">
                                <span>${c.title}</span>
                                <span style="font-weight: 700;">${Math.floor(Math.random()*40 + 60)}%</span>
                            </div>
                            <div style="width: 100%; height: 8px; background: var(--border); border-radius: 4px; overflow: hidden;">
                                <div style="width: ${Math.floor(Math.random()*40 + 60)}%; height: 100%; background: var(--primary);"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderAdminStudents() {
    return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
            <h2 style="margin: 0;">Gerenciamento de Alunos</h2>
            <div style="display: flex; gap: 16px;">
                <input type="text" class="glass" style="padding: 8px 16px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);" placeholder="Buscar aluno...">
                <button class="btn btn-primary">Adicionar Novo</button>
            </div>
        </div>

        <div class="glass" style="padding: 0; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead style="background: var(--glass-bg);">
                    <tr>
                        <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 0.85rem;">ALUNO</th>
                        <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 0.85rem;">AVANÇO</th>
                        <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">LIVE CLASSES</th>
                        <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">SIMULADOS</th>
                        <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">PREMIUM (MENTORIA/PARTICULAR)</th>
                        <th style="padding: 16px; text-align: right; color: var(--text-muted); font-size: 0.85rem;">AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.students.map(s => `
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 16px;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 32px; height: 32px; border-radius: 8px; background: var(--accent); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700;">${s.name.charAt(0)}</div>
                                    <div>
                                        <div style="font-weight: 600;">${s.name}</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted);">${s.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td style="padding: 16px; font-weight: 600;">${s.progress}%</td>
                            <td style="padding: 16px; text-align: center;">${s.liveClasses}</td>
                            <td style="padding: 16px; text-align: center;">${s.simulations}</td>

                            <td style="padding: 16px;">
                                <div style="display: flex; justify-content: center; gap: 12px;">
                                    <button class="btn" onclick="toggleStudentFeature(${s.id}, 'mentorshipEnabled')" 
                                            style="padding: 6px 12px; font-size: 0.7rem; background: ${s.mentorshipEnabled ? 'var(--success)' : 'var(--glass-bg)'}; color: ${s.mentorshipEnabled ? 'white' : 'var(--text-muted)'}; border: 1px solid var(--border);">
                                        Mentoria ${s.mentorshipEnabled ? ' Ativa' : ' Inativa'}
                                    </button>
                                    <button class="btn" onclick="toggleStudentFeature(${s.id}, 'tutoringEnabled')" 
                                            style="padding: 6px 12px; font-size: 0.7rem; background: ${s.tutoringEnabled ? 'var(--primary)' : 'var(--glass-bg)'}; color: ${s.tutoringEnabled ? 'white' : 'var(--text-muted)'}; border: 1px solid var(--border);">
                                        Particular ${s.tutoringEnabled ? ' Ativo' : ' Inativo'}
                                    </button>
                                </div>
                            </td>
                            <td style="padding: 16px; text-align: right;">
                                <button class="btn" style="padding: 6px; background: transparent; color: var(--text-muted);"><i data-lucide="edit-3" style="width: 18px;"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderAdminContent() {
    // 1. Visão de Adicionar/Editar Aula
    if (state.adminEditingCourse && state.adminEditingChapter && (state.adminEditingLesson || state.adminEditingLesson === null)) {
        const course = state.courses.find(c => c.id === state.adminEditingCourse);
        const chapter = course.curriculum.find(chap => chap.id === state.adminEditingChapter);
        const lessonToEdit = state.adminEditingLesson ? chapter.lessons.find(l => l.id === state.adminEditingLesson) : null;
        
        return `
            <div style="max-width: 600px; margin: 0 auto;">
                <button class="btn mb-6" style="background: transparent; border: 1px solid var(--border);" onclick="state.adminEditingLesson = null; selectChapterForLesson(null)">
                    <i data-lucide="arrow-left"></i> Voltar para Capítulos
                </button>
                <div class="glass" style="padding: 40px;">
                    <h2 class="mb-2">${lessonToEdit ? 'Editar Aula' : 'Adicionar Aula'}</h2>
                    <p class="mb-8" style="color: var(--text-muted);">${course.title} > ${chapter.title}</p>
                    
                    <form onsubmit="saveLesson(event)">
                        <div style="margin-bottom: 24px;">
                            <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">Título da Aula</label>
                            <input type="text" id="lessonTitle" required class="glass" style="width: 100%; padding: 12px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);" 
                                   placeholder="Ex: Aula 05 - Geometria Plana" value="${lessonToEdit ? lessonToEdit.title : ''}">
                        </div>
                        <div style="margin-bottom: 24px;">
                            <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">Link do Vídeo (YouTube)</label>
                            <input type="text" id="lessonUrl" required class="glass" style="width: 100%; padding: 12px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);" 
                                   placeholder="https://www.youtube.com/watch?v=..." value="${lessonToEdit ? lessonToEdit.videoUrl : ''}">
                        </div>
                        <div style="margin-bottom: 32px;">
                            <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">Link do Material (PDF)</label>
                            <input type="text" id="lessonPdfUrl" class="glass" style="width: 100%; padding: 12px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);" 
                                   placeholder="https://link-do-pdf.com/arquivo.pdf" value="${lessonToEdit ? (lessonToEdit.pdfUrl === '#' ? '' : lessonToEdit.pdfUrl) : ''}">
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; height: 50px;">
                            ${lessonToEdit ? 'Salvar Alterações' : 'Publicar Aula no Capítulo'}
                        </button>
                    </form>
                </div>
            </div>
        `;
    }

    // 2. Visão de Gerenciar Capítulos de um Módulo
    if (state.adminEditingCourse) {
        const course = state.courses.find(c => c.id === state.adminEditingCourse);
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
                <div>
                    <button class="btn mb-4" style="background: transparent; border: 1px solid var(--border);" onclick="selectCourseForLesson(null)">
                        <i data-lucide="arrow-left"></i> Voltar aos Módulos
                    </button>
                    <h2 style="margin: 0;">${course.title} - Capítulos</h2>
                </div>
                <div class="glass" style="padding: 20px; border: 1px solid var(--secondary); background: rgba(141, 178, 51, 0.05);">
                    <h4 style="margin-bottom: 12px;">Novo Capítulo</h4>
                    <form onsubmit="addNewChapter(event)" style="display: flex; gap: 12px;">
                        <input type="text" id="chapterTitle" required class="glass" style="padding: 8px 12px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);" placeholder="Título do Capítulo...">
                        <button type="submit" class="btn btn-primary">Criar</button>
                    </form>
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 24px;">
                ${course.curriculum && course.curriculum.length > 0 ? course.curriculum.map(chap => `
                    <div class="glass" style="padding: 24px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border); padding-bottom: 12px;">
                            <div style="display: flex; gap: 8px; align-items: center;">
                                ${state.adminQuickEditingChapterId === chap.id ? `
                                    <input type="text" id="editChapterTitle_${chap.id}" class="glass" style="padding: 6px 10px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);" value="${chap.title}">
                                    <button class="btn" style="background: var(--success); color: white; padding: 6px; border: 1px solid var(--border);" onclick="saveChapterEdit('${course.id}', '${chap.id}')">
                                        <i data-lucide="check" style="width: 16px;"></i>
                                    </button>
                                    <button class="btn" style="background: transparent; color: var(--text-muted); padding: 6px; border: 1px solid var(--border);" onclick="state.adminQuickEditingChapterId = null; render()">
                                        <i data-lucide="x" style="width: 16px;"></i>
                                    </button>
                                ` : `
                                    <h3 style="color: var(--secondary); margin: 0;">${chap.title}</h3>
                                    <button class="btn" style="padding: 6px; background: transparent; color: var(--text-muted); border: none;" onclick="state.adminQuickEditingChapterId = '${chap.id}'; render()">
                                        <i data-lucide="edit-3" style="width: 16px;"></i>
                                    </button>
                                    <button class="btn" style="padding: 6px; background: transparent; color: var(--danger); border: none;" onclick="deleteChapter('${course.id}', '${chap.id}')">
                                        <i data-lucide="trash-2" style="width: 16px;"></i>
                                    </button>
                                `}
                            </div>
                            <button class="btn btn-primary" onclick="selectChapterForLesson('${chap.id}')">
                                <i data-lucide="plus"></i> Adicionar Aula
                            </button>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            ${chap.lessons && chap.lessons.length > 0 ? chap.lessons.map(l => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-main); border-radius: 8px;">
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <i data-lucide="video" style="width: 16px; color: var(--primary);"></i>
                                        <div>
                                            <div style="font-weight: 500;">${l.title}</div>
                                            <div style="font-size: 0.75rem; color: var(--text-muted);">${l.pdfUrl !== '#' ? '📄 PDF Incluso' : 'Sem PDF'}</div>
                                        </div>
                                    </div>
                                    <div style="display: flex; gap: 8px;">
                                        <button class="btn" style="padding: 6px; background: transparent; color: var(--primary);" 
                                                onclick="viewAdminLesson('${l.id}')" title="Ver e Gerenciar Comentários">
                                            <i data-lucide="eye" style="width: 16px;"></i>
                                        </button>
                                        <button class="btn" style="padding: 6px; background: transparent; color: var(--text-muted);" 
                                                onclick="openEditLesson('${course.id}', '${chap.id}', '${l.id}')">
                                            <i data-lucide="edit-3" style="width: 16px;"></i>
                                        </button>
                                        <button class="btn" style="padding: 6px; background: transparent; color: var(--danger);" 
                                                onclick="deleteLesson('${course.id}', '${chap.id}', '${l.id}')">
                                            <i data-lucide="trash-2" style="width: 16px;"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('') : '<p style="color: var(--text-muted); font-size: 0.85rem;">Nenhuma aula neste capítulo.</p>'}
                        </div>
                    </div>
                `).join('') : '<div class="glass" style="padding: 40px; text-align: center;">Nenhum capítulo criado para este curso.</div>'}
            </div>
        `;
    }

    // 3. Visão Geral (Seleção de Módulos)
    return `
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px;">
            <div>
                <h2 style="margin-bottom: 8px;">Gerenciamento de Conteúdo</h2>
                <p style="color: var(--text-muted);">Crie módulos e gerencie capítulos e aulas.</p>
            </div>
            
            <div class="glass" style="padding: 24px; border: 1px solid var(--secondary); background: rgba(141, 178, 51, 0.05); max-width: 600px;">
                <h4 style="margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                    <i data-lucide="plus-circle" style="color: var(--secondary);"></i> Novo Módulo
                </h4>
                <form onsubmit="addNewCourse(event)" style="display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; gap: 12px;">
                        <div style="flex: 2; display: flex; flex-direction: column; gap: 12px;">
                            <input type="text" id="newCourseTitle" required class="glass" style="width: 100%; padding: 10px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main); font-size: 0.85rem;" placeholder="Título do Módulo">
                            <input type="text" id="newCourseProfessor" class="glass" style="width: 100%; padding: 10px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main); font-size: 0.85rem;" placeholder="Professor">
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <input type="file" id="courseCover" accept="image/*" style="display: none;" onchange="handleCourseCoverSelect(event)">
                            <div onclick="document.getElementById('courseCover').click()" style="width: 100%; height: 80px; border: 2px dashed var(--border); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; overflow: hidden; background: var(--bg-main);">
                                <img id="coverPreview" style="width: 100%; height: 100%; object-fit: cover; display: none;">
                                <div id="coverPlaceholder">
                                    <i data-lucide="image" style="width: 20px; color: var(--text-muted);"></i>
                                    <div style="font-size: 0.6rem; color: var(--text-muted); margin-top: 4px;">Capa</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">Criar Novo Módulo</button>
                </form>
            </div>
        </div>
        
        <div class="grid-cards">
            ${state.courses.map(c => {
                const totalLessons = c.curriculum ? c.curriculum.reduce((acc, chap) => acc + (chap.lessons ? chap.lessons.length : 0), 0) : 0;
                const isEditing = state.adminQuickEditingCourseId === c.id;

                return `
                <div class="glass" style="padding: 24px; border: 1px solid ${isEditing ? 'var(--primary)' : 'var(--border)'}; transition: transform 0.2s;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                        <div style="flex: 1;">
                            ${isEditing ? `
                                <input type="text" id="editTitle_${c.id}" class="glass mb-2" style="width: 90%; padding: 8px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);" value="${c.title}">
                                <input type="text" id="editProf_${c.id}" class="glass" style="width: 90%; padding: 6px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main); font-size: 0.85rem;" value="${c.professor}">
                            ` : `
                                <h3 style="margin-bottom: 4px;">${c.title}</h3>
                                <p style="font-size: 0.85rem; color: var(--text-muted);">${c.professor} • ${totalLessons} Aulas</p>
                            `}
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn" onclick="${isEditing ? `saveCourseEdit('${c.id}')` : `toggleCourseEdit('${c.id}')`}" 
                                    style="background: ${isEditing ? 'var(--success)' : 'transparent'}; color: ${isEditing ? 'white' : 'var(--text-muted)'}; padding: 8px; border: 1px solid var(--border);">
                                <i data-lucide="${isEditing ? 'check' : 'edit-3'}" style="width: 18px;"></i>
                            </button>
                            <button class="btn" onclick="deleteCourse('${c.id}')" style="background: rgba(239, 68, 68, 0.1); color: var(--danger); padding: 8px; border: 1px solid rgba(239, 68, 68, 0.2);" title="Excluir Módulo">
                                <i data-lucide="trash-2" style="width: 18px;"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="selectCourseForLesson('${c.id}')">
                            <i data-lucide="settings"></i> Gerenciar Capítulos
                        </button>
                    </div>
                </div>
            `}).join('')}
        </div>
    `;
}


function renderAdminPlanning() {
    return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
            <h2 style="margin: 0;">Cronograma Diário (40 Semanas)</h2>
            <div style="display: flex; gap: 16px; align-items: center;">
                <button id="save-planning-btn" class="btn btn-primary" onclick="savePlanning()" style="box-shadow: 0 4px 12px rgba(141, 178, 51, 0.3);">
                    <i data-lucide="save"></i> Salvar Alterações
                </button>
                <span style="font-size: 0.85rem; color: var(--text-muted);">Início: <strong>09/02/2026</strong></span>
                <code class="glass" style="padding: 8px 12px; background: var(--bg-main); color: var(--primary); font-weight: 600;">Meet: ${state.planning[0].meetLink}</code>
            </div>
        </div>
        
        <div class="glass" style="padding: 0; overflow: hidden; display: flex; flex-direction: column; max-height: 75vh;">
            <div style="overflow: auto;">
                <table style="width: 100%; border-collapse: collapse; table-layout: fixed;">
                    <thead style="background: var(--glass-bg); position: sticky; top: 0; z-index: 20; border-bottom: 2px solid var(--border);">
                        <tr>
                            <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 0.85rem; width: 100px; background: var(--glass-bg);">SEMANA</th>
                            ${['SEG', 'TER', 'QUA', 'QUI', 'SEX'].map(d => `
                                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 0.85rem;">${d}</th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${state.planning.map(w => {
                            const isCurrent = w.id === getCurrentWeek();
                            const highlightStyle = isCurrent 
                                ? (state.theme === 'dark' ? 'background: rgba(0, 229, 255, 0.08);' : 'background: rgba(141, 178, 51, 0.08);') 
                                : '';
                                
                            return `
                            <tr style="border-bottom: 1px solid var(--border); ${highlightStyle}">
                                <td style="padding: 16px; font-weight: 700; color: var(--primary); ${isCurrent ? highlightStyle : 'background: var(--bg-main);'} position: sticky; left: 0; z-index: 10;">
                                    ${w.week}
                                    ${isCurrent ? '<div style="font-size: 0.65rem; color: var(--success);">ATUAL</div>' : ''}
                                </td>
                                ${w.days.map(d => `
                                    <td style="padding: 8px; vertical-align: top; border-right: 1px solid var(--border); ${d.topic === 'RECESSO' ? 'background: rgba(239, 68, 68, 0.05);' : ''}">
                                        <div style="display: flex; flex-direction: column; gap: 6px;">
                                            <div style="display: flex; align-items: center; gap: 4px;">
                                                <input type="checkbox" ${d.willOccur ? 'checked' : ''} 
                                                       style="width: 14px; height: 14px; accent-color: var(--primary);"
                                                       onchange="updatePlanningDay(${w.id}, '${d.day}', 'willOccur', this.checked)">
                                                <input type="text" class="glass" style="flex: 1; padding: 4px; font-size: 0.75rem; background: transparent; border: 1px solid transparent; min-width: 0;"
                                                       value="${d.topic}" onchange="updatePlanningDay(${w.id}, '${d.day}', 'topic', this.value)" placeholder="Meta...">
                                            </div>
                                            <div style="display: flex; gap: 4px;">
                                                <input type="time" style="width: 65px; font-size: 0.7rem; padding: 2px; border: 1px solid var(--border); border-radius: 4px; background: var(--bg-main);"
                                                       value="${d.time}" onchange="updatePlanningDay(${w.id}, '${d.day}', 'time', this.value)">
                                                <select style="flex: 1; font-size: 0.7rem; padding: 2px; border: 1px solid var(--border); border-radius: 4px; background: var(--bg-main);"
                                                        onchange="updatePlanningDay(${w.id}, '${d.day}', 'teacher', this.value)">
                                                    <option value="Guilherme" ${d.teacher === 'Guilherme' ? 'selected' : ''}>Gui</option>
                                                    <option value="Bruno" ${d.teacher === 'Bruno' ? 'selected' : ''}>Bru</option>
                                                    <option value="Ambos" ${d.teacher === 'Ambos' ? 'selected' : ''}>Amb</option>
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                `).join('')}
                            </tr>
                        `}).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        <p style="margin-top: 16px; color: var(--text-muted); font-size: 0.8rem;">
            * Semana vigente detectada automaticamente. Role para ver todo o ano (Planejamento de Fevereiro a Novembro).
        </p>
    `;
}

function renderDesempenho() {
    return `
        <h2 class="mb-4">Meu Desempenho Acadêmico</h2>
        <p class="mb-8">Acompanhe seu progresso real em cada área da plataforma Simplifica.</p>

        <div class="grid-stats">
            <div class="glass" style="padding: 24px; text-align: center;">
                <div style="color: var(--text-muted); font-size: 0.75rem; font-weight: 700; margin-bottom: 8px; text-transform: uppercase;">Planejamento</div>
                <div style="font-size: 2rem; font-weight: 700;">${state.planning.filter(p => p.willOccur).length}/52</div>
                <div style="font-size: 0.8rem; color: var(--success); margin-top: 4px;">Semanas Ativas</div>
            </div>
            <div class="glass" style="padding: 24px; text-align: center;">
                <div style="color: var(--text-muted); font-size: 0.75rem; font-weight: 700; margin-bottom: 8px; text-transform: uppercase;">Aulas Gravadas</div>
                <div style="font-size: 2rem; font-weight: 700;">42/64</div>
                <div style="font-size: 0.8rem; color: var(--secondary); margin-top: 4px;">65% Concluídas</div>
            </div>
            <div class="glass" style="padding: 24px; text-align: center;">
                <div style="color: var(--text-muted); font-size: 0.75rem; font-weight: 700; margin-bottom: 8px; text-transform: uppercase;">Exercícios</div>
                <div style="font-size: 2rem; font-weight: 700;">156</div>
                <div style="font-size: 0.8rem; color: var(--primary); margin-top: 4px;">Taxa de Acerto: 78%</div>
            </div>
            <div class="glass" style="padding: 24px; text-align: center;">
                <div style="color: var(--text-muted); font-size: 0.75rem; font-weight: 700; margin-bottom: 8px; text-transform: uppercase;">Simulados</div>
                <div style="font-size: 2rem; font-weight: 700;">03</div>
                <div style="font-size: 0.8rem; color: var(--warning); margin-top: 4px;">Média: 740 pts</div>
            </div>
        </div>

        <div class="grid-2-1">
            <div class="glass" style="padding: 32px;">
                <h3 class="mb-6">Progresso por Matéria</h3>
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    ${state.courses.map(c => `
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-weight: 600;">${c.title}</span>
                                <span style="font-size: 0.85rem;">${Math.floor(Math.random()*40 + 50)}%</span>
                            </div>
                            <div style="width: 100%; height: 8px; background: var(--border); border-radius: 4px; overflow: hidden;">
                                <div style="width: ${Math.floor(Math.random()*40 + 50)}%; height: 100%; background: var(--primary); border-radius: 4px;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="glass" style="padding: 32px;">
                <h3 class="mb-6">Dicas de Estudo</h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="padding: 16px; border-radius: 12px; border: 1px solid var(--border); background: var(--bg-main);">
                        <div style="font-weight: 700; margin-bottom: 4px; color: var(--secondary);">Foque em Geometria!</div>
                        <p style="font-size: 0.85rem;">Seu desempenho em simulados mostra que este é seu ponto de maior atenção no momento.</p>
                    </div>
                    <div style="padding: 16px; border-radius: 12px; border: 1px solid var(--border); background: var(--bg-main);">
                        <div style="font-weight: 700; margin-bottom: 4px; color: var(--primary);">Participação Ativa</div>
                        <p style="font-size: 0.85rem;">Continue participando das aulas de terça-feira; sua presença tem sido excelente!</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderProfile() {

    return `
        <h2 class="mb-8">Meu Perfil</h2>
        
        <div class="grid-3-1">
            <div class="glass" style="padding: 32px; text-align: center;">
                <div style="width: 120px; height: 120px; border-radius: 30px; background: var(--primary); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; font-weight: 700;">
                    ${state.user.name.charAt(0)}
                </div>
                <h3 style="margin-bottom: 4px;">${state.user.name}</h3>
                <p style="margin-bottom: 24px;">${state.user.role === 'admin' ? 'Coordenador(a)' : 'Estudante Simplifica'}</p>

                
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <button class="btn" style="width: 100%; border: 1px solid var(--border); background: var(--bg-main); justify-content: center;">Alterar Foto</button>
                                        <button class="btn" style="width: 100%; border: 1px solid var(--border); background: var(--bg-main); justify-content: center;">Alterar Foto</button>
                    <button class="btn" style="width: 100%; border: 1px solid var(--border); background: var(--bg-main); justify-content: center;">Redefinir Senha</button>
                    <!-- Botao Mobile Sair -->
                    <button class="btn" style="width: 100%; border: 1px solid var(--danger); background: rgba(239, 68, 68, 0.1); color: var(--danger); justify-content: center; margin-top: 12px;" onclick="logout()">
                        <i data-lucide="log-out"></i> Sair da Plataforma
                    </button>
                </div>
            </div>

            <div class="glass" style="padding: 32px;">
                <h3 class="mb-6">Informações Pessoais</h3>
                <div class="grid-1-1">
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">Nome Completo</label>
                        <input type="text" class="glass" style="width: 100%; padding: 12px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);" value="${state.user.name}">
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">Data de Nascimento</label>
                        <input type="date" class="glass" style="width: 100%; padding: 12px; background: var(--bg-main); border: 1px solid var(--border); color: var(--text-main);" value="${state.user.birthDate}">
                    </div>
                </div>
                
                <h3 class="mb-6">Preferências da Conta</h3>
                <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-weight: 600;">Notificações via WhatsApp</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Receba alertas de novas aulas e simulados</div>
                        </div>
                        <div style="width: 48px; height: 24px; background: var(--success); border-radius: 12px; position: relative; cursor: pointer;">
                            <div style="position: absolute; right: 2px; top: 2px; width: 20px; height: 20px; background: white; border-radius: 50%;"></div>
                        </div>
                    </div>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 16px;">
                    <button class="btn" style="border: 1px solid var(--border); background: transparent;">Cancelar</button>
                    <button class="btn btn-primary">Salvar Alterações</button>
                </div>
            </div>
        </div>
    `;
}


function saveChapterEdit(courseId, chapterId) {
    const course = state.courses.find(c => c.id === courseId);
    if (!course) return;
    const chapter = course.curriculum.find(chap => chap.id === chapterId);
    if (!chapter) return;
    
    const newTitle = document.getElementById(`editChapterTitle_${chapterId}`).value.trim();
    if (newTitle) {
        chapter.title = newTitle;
        state.adminQuickEditingChapterId = null;
        saveState();
        render();
    } else {
        alert("O título do capítulo não pode estar vazio.");
    }
}

function deleteChapter(courseId, chapterId) {
    if(confirm("Tem certeza que deseja excluir este capítulo e todas as suas aulas?")) {
        const course = state.courses.find(c => c.id === courseId);
        if (!course) return;
        course.curriculum = course.curriculum.filter(chap => chap.id !== chapterId);
        saveState();
        render();
    }
}

window.addComment = function(lessonId) {
    const textEl = document.getElementById('newCommentText');
    if (!textEl) return;
    const text = textEl.value.trim();
    if (!text) return;

    let lessonToUpdate = null;
    for (let c of state.courses) {
        if (c.curriculum) {
            for (let chap of c.curriculum) {
                const found = chap.lessons?.find(l => l.id === lessonId);
                if (found) { lessonToUpdate = found; break; }
            }
        }
        if (lessonToUpdate) break;
    }

    if (!lessonToUpdate) return;
    if (!lessonToUpdate.comments) lessonToUpdate.comments = [];

    lessonToUpdate.comments.push({
        id: 'cm_' + Date.now(),
        author: state.user.name,
        isAdmin: state.user.role === 'admin',
        text: text,
        date: new Date().toLocaleDateString('pt-BR'),
        replies: []
    });

    saveState();
    render();
}

window.deleteComment = function(lessonId, commentId) {
    if(!confirm('Excluir este comentário?')) return;
    let lessonToUpdate = null;
    for (let c of state.courses) {
        if (c.curriculum) {
            for (let chap of c.curriculum) {
                const found = chap.lessons?.find(l => l.id === lessonId);
                if (found) { lessonToUpdate = found; break; }
            }
        }
        if (lessonToUpdate) break;
    }
    
    if (lessonToUpdate && lessonToUpdate.comments) {
        lessonToUpdate.comments = lessonToUpdate.comments.filter(c => c.id !== commentId);
        saveState();
        render();
    }
}

window.openReply = function(commentId) {
    state.replyingTo = commentId;
    render();
}

window.submitReply = function(lessonId, commentId) {
    const textEl = document.getElementById(`replyText_${commentId}`);
    if (!textEl) return;
    const text = textEl.value.trim();
    if (!text) return;

    let lessonToUpdate = null;
    for (let c of state.courses) {
        if (c.curriculum) {
            for (let chap of c.curriculum) {
                const found = chap.lessons?.find(l => l.id === lessonId);
                if (found) { lessonToUpdate = found; break; }
            }
        }
        if (lessonToUpdate) break;
    }

    if (!lessonToUpdate || !lessonToUpdate.comments) return;
    
    const comment = lessonToUpdate.comments.find(c => c.id === commentId);
    if (!comment) return;

    if (!comment.replies) comment.replies = [];
    
    comment.replies.push({
        id: 'rp_' + Date.now(),
        author: state.user.name,
        text: text,
        date: new Date().toLocaleDateString('pt-BR')
    });
    
    state.replyingTo = null;
    saveState();
    render();
}

window.viewAdminLesson = function(lessonId) {
    state.currentLessonId = lessonId;
    state.currentView = 'lesson';
    render();
}

// Start the app
window.addEventListener('DOMContentLoaded', init);




function renderMobileNav() {
    const mobileMenuItems = state.user.role === 'student' ? [
        { id: 'dashboard', icon: 'layout-dashboard', label: 'Início' },
        { id: 'courses', icon: 'book-open', label: 'Cursos' },
        { id: 'cronograma', icon: 'calendar', label: 'Rotina' },
        { id: 'profile', icon: 'user', label: 'Perfil' }
    ] : [
        { id: 'admin_dashboard', icon: 'bar-chart-3', label: 'Estatísticas' },
        { id: 'admin_content', icon: 'upload-cloud', label: 'Aulas' },
        { id: 'profile', icon: 'user', label: 'Perfil' }
    ];

    return `
        <nav class="mobile-nav glass">
            ${mobileMenuItems.map(item => `
                <button class="mobile-nav-item ${state.currentView === item.id ? 'active' : ''}" onclick="navigate('${item.id}')">
                    <i data-lucide="${item.icon}"></i>
                    <span>${item.label}</span>
                </button>
            `).join('')}
        </nav>
    `;
}




