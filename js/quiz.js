// ==================== 数据库安全题库核心逻辑 ====================
// 功能：答题、判分、计时、本地存储、针对性知识讲解

// ==================== 全局数据引用 ====================
let questions = window.questions || [];
const quizMeta = window.quizMeta || {};

// ==================== 考试模式配置 ====================
const EXAM_CONFIG = {
    // 各题型题目数量配置
    questionCount: {
        '单选题': 20,
        '多选题': 10,
        '判断题': 10,
        '填空题': 10,
        '简答题': 5
    },
    // 考试总时长（分钟）
    totalTime: 60,
    // 及格分数
    passScore: 60
};

// ==================== 数据格式适配 ====================
// 将线上格式（answer字段）转换为本地格式（correct字段）
function adaptQuestionData(rawQuestions) {
    if (!rawQuestions || rawQuestions.length === 0) return [];
    // 已经是本地格式则跳过
    if (rawQuestions[0].correct !== undefined && rawQuestions[0].explanation !== undefined) {
        return rawQuestions;
    }
    const letterMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7 };
    return rawQuestions.map(q => {
        const adapted = {
            id: q.id,
            type: q.type,
            category: q.category || '其他',
            difficulty: '基础',
            question: q.question,
            options: q.options || [],
            explanation: q.analysis || '',
            knowledge: generateDefaultKnowledge(q)
        };
        if (q.type === '单选题') {
            adapted.correct = letterMap[q.answer] !== undefined ? letterMap[q.answer] : 0;
        } else if (q.type === '多选题') {
            adapted.correct = Array.isArray(q.answer) ? q.answer.map(a => letterMap[a] !== undefined ? letterMap[a] : 0) : [];
        } else if (q.type === '判断题') {
            adapted.correct = q.answer === true ? 0 : 1; // 0=正确, 1=错误
            adapted.options = ['A. 正确', 'B. 错误'];
        } else if (q.type === '填空题') {
            adapted.correct = Array.isArray(q.answer) ? q.answer : [q.answer];
        } else if (q.type === '简答题') {
            adapted.correct = q.answer || '';
        }
        return adapted;
    });
}

function generateDefaultKnowledge(q) {
    return {
        coreConcepts: [`本题考查${q.category || '相关'}知识点，请仔细阅读解析。`],
        extendedKnowledge: [`题目ID：${q.id}`],
        practicalScenarios: [],
        commonMistakes: []
    };
}

function hasKnowledgeContent(q) {
    if (!q.knowledge) return false;
    const k = q.knowledge;
    const hasContent = (arr) => Array.isArray(arr) && arr.length > 0 && arr.some(item => item && item.trim().length > 0);
    return hasContent(k.coreConcepts) || hasContent(k.extendedKnowledge) || hasContent(k.practicalScenarios) || hasContent(k.commonMistakes);
}

questions = adaptQuestionData(questions);

// 保存原始题库，确保每次进入考试模式都能从完整题库中随机抽取
if (!window.originalQuestions) {
    window.originalQuestions = [...questions];
}

// ==================== 状态变量 ====================
let currentMode = 'practice';
let currentQuestionIndex = 0;
let userAnswers = [];
let markedQuestions = new Set();
let timerInterval = null;
let startTime = null;
let quizHistory = [];
let currentQuestionAnswered = false;
let autoAdvanceTimer = null;
const AUTO_ADVANCE_DELAY = 3500; // 答对后自动跳转延迟（毫秒）
const OBJECTIVE_AUTO_DELAY = 800; // 客观题（单选/判断）选择后自动跳转延迟（毫秒）

// ==================== 页面初始化 ====================
function init() {
    initTheme();
    showConsentModal();
    loadHistory();
    initEventListeners();
}

function initEventListeners() {
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('quiz-page').style.display === 'none') return;
        if (e.key === 'ArrowLeft') prevQuestion();
        if (e.key === 'ArrowRight') nextQuestion();
    });
}

// ==================== 主题切换 ====================
function initTheme() {
    const savedTheme = localStorage.getItem('quiz-theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('theme-toggle').textContent = '☀️';
    }
}

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('quiz-theme', 'light');
        document.getElementById('theme-toggle').textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('quiz-theme', 'dark');
        document.getElementById('theme-toggle').textContent = '☀️';
    }
}

// ==================== 知情同意弹窗 ====================
function showConsentModal() {
    document.getElementById('consent-overlay').style.display = 'block';
    document.getElementById('consent-modal').style.display = 'block';
}

function agreeAndStart() {
    document.getElementById('consent-overlay').style.display = 'none';
    document.getElementById('consent-modal').style.display = 'none';
    localStorage.setItem('consent-agreed', 'true');
}

// ==================== 答题流程 ====================
function startQuiz(mode) {
    if (questions.length === 0) {
        alert('题库为空，请检查数据文件！');
        return;
    }
    currentMode = mode;
    currentQuestionIndex = 0;
    markedQuestions.clear();
    currentQuestionAnswered = false;

    // 考试模式：随机抽取题目
    if (mode === 'exam') {
        questions = generateExamQuestions();
    }

    userAnswers = new Array(questions.length).fill(null);
    startTime = Date.now();

    document.getElementById('home-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';

    startTimer();
    renderQuestion();
    updateProgress();
    renderJumpPanel();
}

// ==================== 考试题目生成 ====================
function generateExamQuestions() {
    // 确保从完整的原始题库中抽取题目
    const rawQuestions = window.originalQuestions || questions;
    
    if (!rawQuestions || rawQuestions.length === 0) {
        console.error('原始题库为空');
        return [];
    }

    const examQuestions = [];
    const typeOrder = ['单选题', '多选题', '判断题', '填空题', '简答题'];

    // 按题型随机抽取题目
    typeOrder.forEach(type => {
        const count = EXAM_CONFIG.questionCount[type] || 0;
        const typeQuestions = rawQuestions.filter(q => q.type === type);
        
        if (typeQuestions.length === 0) {
            console.warn(`题库中没有${type}类型的题目`);
            return;
        }

        // 每次考试都重新随机打乱并抽取
        const shuffled = shuffleArray([...typeQuestions]);
        const selected = shuffled.slice(0, Math.min(count, shuffled.length));
        
        examQuestions.push(...selected);
    });

    // 最后再打乱所有题目的顺序
    return shuffleArray(examQuestions);
}

// 数组随机打乱
function shuffleArray(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function startTimer() {
    clearInterval(timerInterval);
    const timerEl = document.getElementById('timer');
    
    if (currentMode === 'exam') {
        // 考试模式：倒计时
        let remaining = EXAM_CONFIG.totalTime * 60;
        updateExamTimer(timerEl, remaining);
        
        timerInterval = setInterval(() => {
            remaining--;
            updateExamTimer(timerEl, remaining);
            
            if (remaining <= 0) {
                clearInterval(timerInterval);
                alert('考试时间到！系统将自动提交试卷。');
                finishQuiz();
            }
        }, 1000);
    } else {
        // 练习模式：正计时
        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
            const secs = String(elapsed % 60).padStart(2, '0');
            timerEl.textContent = `⏱️ ${mins}:${secs}`;
        }, 1000);
    }
}

function updateExamTimer(el, remaining) {
    const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
    const secs = String(remaining % 60).padStart(2, '0');
    
    // 剩余时间少于10分钟时显示警告颜色
    if (remaining <= 600) {
        el.style.color = remaining <= 300 ? '#EF4444' : '#F59E0B';
        el.style.fontWeight = 'bold';
    } else {
        el.style.color = '';
        el.style.fontWeight = '';
    }
    
    el.textContent = `⏱️ ${mins}:${secs}`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

// ==================== 题目渲染 ====================
function renderQuestion() {
    const q = questions[currentQuestionIndex];
    if (!q) return;

    currentQuestionAnswered = userAnswers[currentQuestionIndex] !== null;

    document.getElementById('current-question').textContent = `第 ${currentQuestionIndex + 1} 题`;
    document.getElementById('question-category').textContent = `${q.category} · ${q.difficulty}`;
    document.getElementById('question-text').textContent = q.question;

    const contentDiv = document.getElementById('question-content');
    contentDiv.innerHTML = '';

    if (q.type === '单选题' || q.type === '判断题') {
        const opts = q.type === '判断题' ? ['A. 正确', 'B. 错误'] : q.options;
        opts.forEach((opt, idx) => {
            const div = document.createElement('div');
            div.className = 'option';
            div.dataset.index = idx;
            const text = opt.replace(/^[A-Z]\.\s*/, '');
            div.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + idx)}</span><span class="option-text">${text}</span>`;
            div.onclick = () => selectOption(idx);
            contentDiv.appendChild(div);
        });
    } else if (q.type === '多选题') {
        q.options.forEach((opt, idx) => {
            const div = document.createElement('div');
            div.className = 'option';
            div.dataset.index = idx;
            const text = opt.replace(/^[A-Z]\.\s*/, '');
            div.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + idx)}</span><span class="option-text">${text}</span>`;
            div.onclick = () => toggleMultiOption(idx);
            contentDiv.appendChild(div);
        });
    } else if (q.type === '填空题') {
        const fbDiv = document.createElement('div');
        fbDiv.className = 'fillblank-area';
        fbDiv.style.cssText = 'display:flex;flex-direction:column;gap:12px;margin-top:10px;';
        const blankCount = q.blankCount || (Array.isArray(q.correct) ? q.correct.length : 1);
        for (let i = 0; i < blankCount; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'fill-input fillblank-input';
            input.dataset.blankIndex = i;
            input.placeholder = `请输入第 ${i + 1} 空答案`;
            input.oninput = () => updateFillBlankAnswer();
            fbDiv.appendChild(input);
        }
        contentDiv.appendChild(fbDiv);
    } else if (q.type === '简答题') {
        const saDiv = document.createElement('div');
        saDiv.className = 'shortanswer-area';
        saDiv.style.cssText = 'display:flex;flex-direction:column;gap:12px;margin-top:10px;';
        const textarea = document.createElement('textarea');
        textarea.className = 'fill-input shortanswer-textarea';
        textarea.placeholder = '请输入您的答案...';
        textarea.rows = 6;
        textarea.style.cssText = 'width:100%;padding:12px;border-radius:8px;border:1px solid var(--border-color);font-family:inherit;font-size:15px;resize:vertical;';
        textarea.oninput = () => updateShortAnswer();
        saDiv.appendChild(textarea);
        contentDiv.appendChild(saDiv);
    }

    // 恢复已选答案
    restoreAnswerState();

    // 隐藏反馈和知识讲解（未作答时）
    document.getElementById('error-feedback').style.display = 'none';
    document.getElementById('correct-feedback').style.display = 'none';
    document.getElementById('analysis').style.display = 'none';
    document.getElementById('knowledge-content').style.display = 'none';
    document.getElementById('knowledge-toggle-icon').textContent = '▼';

    // 动态控制知识讲解显示
    const knowledgeSection = document.getElementById('knowledge-section');
    if (hasKnowledgeContent(q)) {
        knowledgeSection.style.display = 'block';
    } else {
        knowledgeSection.style.display = 'none';
    }

    // 如果已作答，显示反馈和知识讲解（做题留痕：返回时保持可见）
    if (currentQuestionAnswered) {
        showFeedback(q, userAnswers[currentQuestionIndex]);
        if (hasKnowledgeContent(q)) {
            renderKnowledge(q);
            // 自动展开知识讲解区域，确保历史记录可访问
            document.getElementById('knowledge-content').style.display = 'block';
            document.getElementById('knowledge-toggle-icon').textContent = '▲';
        }
    }

    // 更新标记按钮
    updateMarkButton();
    updateSubmitButton();
    updateProgress();
}

function selectOption(index) {
    if (currentQuestionAnswered) return;
    const options = document.querySelectorAll('.option');
    options.forEach((opt, idx) => {
        opt.classList.toggle('selected', idx === index);
    });
    userAnswers[currentQuestionIndex] = index;
    updateSubmitButton();

    // 客观题（单选/判断）自动判断并跳转
    const q = questions[currentQuestionIndex];
    if (q.type === '单选题' || q.type === '判断题') {
        // 短暂延迟让用户看到选中效果，然后自动提交
        setTimeout(() => {
            if (!currentQuestionAnswered) {
                submitAnswer(true);
            }
        }, 300);
    }
}

function toggleMultiOption(index) {
    if (currentQuestionAnswered) return;
    const options = document.querySelectorAll('.option');
    const current = userAnswers[currentQuestionIndex];
    let selected = current === null ? [] : (Array.isArray(current) ? [...current] : []);

    const pos = selected.indexOf(index);
    if (pos > -1) {
        selected.splice(pos, 1);
        options[index].classList.remove('selected');
    } else {
        selected.push(index);
        options[index].classList.add('selected');
    }

    userAnswers[currentQuestionIndex] = selected.length > 0 ? selected : null;
    updateSubmitButton();
}

function restoreAnswerState() {
    const answer = userAnswers[currentQuestionIndex];
    if (answer === null) return;

    const q = questions[currentQuestionIndex];
    if (q.type === '填空题') {
        const inputs = document.querySelectorAll('.fillblank-input');
        if (Array.isArray(answer)) {
            answer.forEach((val, idx) => {
                if (inputs[idx]) inputs[idx].value = val;
            });
        } else if (inputs[0]) {
            inputs[0].value = answer;
        }
        return;
    }

    if (q.type === '简答题') {
        const textarea = document.querySelector('.shortanswer-textarea');
        if (textarea && typeof answer === 'string') {
            textarea.value = answer;
        }
        return;
    }

    const options = document.querySelectorAll('.option');
    if (Array.isArray(answer)) {
        answer.forEach(idx => {
            if (options[idx]) options[idx].classList.add('selected');
        });
    } else {
        if (options[answer]) options[answer].classList.add('selected');
    }
}

function updateFillBlankAnswer() {
    if (currentQuestionAnswered) return;
    const inputs = document.querySelectorAll('.fillblank-input');
    const values = Array.from(inputs).map(input => input.value.trim());
    const hasValue = values.some(v => v !== '');
    userAnswers[currentQuestionIndex] = hasValue ? values : null;
    updateSubmitButton();
}

function updateShortAnswer() {
    if (currentQuestionAnswered) return;
    const textarea = document.querySelector('.shortanswer-textarea');
    if (textarea) {
        const value = textarea.value.trim();
        userAnswers[currentQuestionIndex] = value || null;
        updateSubmitButton();
    }
}

function updateSubmitButton() {
    const btn = document.getElementById('submit-btn');
    if (currentQuestionAnswered) {
        btn.textContent = '已提交 ➡';
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.onclick = nextQuestion;
    } else {
        btn.textContent = '提交答案';
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.onclick = submitAnswer;
    }
}

// ==================== 答案提交与判分 ====================
function submitAnswer(isAuto = false) {
    if (currentQuestionAnswered) return;

    const answer = userAnswers[currentQuestionIndex];
    const q = questions[currentQuestionIndex];

    if (answer === null) {
        let msg = '请先选择答案！';
        if (q.type === '填空题') msg = '请先填写答案！';
        if (q.type === '简答题') msg = '请先输入答案！';
        alert(msg);
        return;
    }

    currentQuestionAnswered = true;

    showFeedback(q, answer);
    if (hasKnowledgeContent(q)) {
        renderKnowledge(q);
    }
    updateSubmitButton();
    updateJumpPanel();
    saveAnswerRecord(q, answer);

    const isCorrect = checkAnswer(q, answer);
    if (isCorrect) {
        // 客观题自动提交使用更短的延迟
        const delay = (isAuto && (q.type === '单选题' || q.type === '判断题')) ? OBJECTIVE_AUTO_DELAY : AUTO_ADVANCE_DELAY;
        startAutoAdvance(delay);
    } else {
        // 客观题自动提交答错时也自动跳转（需求5：选择后立即判断，短暂延迟后自动跳转）
        if (isAuto && (q.type === '单选题' || q.type === '判断题')) {
            startAutoAdvance(OBJECTIVE_AUTO_DELAY);
        } else {
            // 答错：明确提示需手动操作，不自动跳转
            showManualAdvanceHint();
        }
    }
}

function startAutoAdvance(delay = AUTO_ADVANCE_DELAY) {
    cancelAutoAdvance();
    const isShortDelay = delay <= 1500;
    const feedbackEl = document.getElementById('correct-feedback');
    const errorFeedbackEl = document.getElementById('error-feedback');

    // 更新反馈标题显示倒计时
    if (!isShortDelay) {
        const originalTitle = feedbackEl.querySelector('.correct-feedback-title');
        if (originalTitle) {
            originalTitle.dataset.original = originalTitle.textContent;
            originalTitle.textContent = `✅ 回答正确（${delay / 1000}秒后自动进入下一题）`;
        }
    }

    let remaining = Math.ceil(delay / 1000);
    autoAdvanceTimer = setInterval(() => {
        remaining--;
        if (!isShortDelay) {
            const originalTitle = feedbackEl.querySelector('.correct-feedback-title');
            if (originalTitle) {
                originalTitle.textContent = `✅ 回答正确（${remaining}秒后自动进入下一题）`;
            }
        }
        if (remaining <= 0) {
            cancelAutoAdvance();
            if (currentQuestionIndex < questions.length - 1) {
                nextQuestion();
            } else {
                finishQuiz();
            }
        }
    }, 1000);

    // 短延迟时使用 setTimeout 作为精确备份，确保即使 interval 有偏差也能跳转
    if (isShortDelay) {
        setTimeout(() => {
            if (currentQuestionAnswered && !autoAdvanceTimer) return; // 已被 interval 处理
            cancelAutoAdvance();
            if (currentQuestionIndex < questions.length - 1) {
                nextQuestion();
            } else {
                finishQuiz();
            }
        }, delay);
    }
}

function cancelAutoAdvance() {
    if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }
    // 恢复标题
    const feedbackEl = document.getElementById('correct-feedback');
    const originalTitle = feedbackEl.querySelector('.correct-feedback-title');
    if (originalTitle && originalTitle.dataset.original) {
        originalTitle.textContent = originalTitle.dataset.original;
    }
}

function showManualAdvanceHint() {
    const feedbackEl = document.getElementById('error-feedback');
    const titleEl = feedbackEl.querySelector('.error-feedback-title');
    if (titleEl) {
        titleEl.dataset.original = titleEl.textContent;
        titleEl.textContent = '❌ 答题错误 — 请查看解析后手动点击"下一题"继续';
    }
}

function showFeedback(q, answer) {
    const isCorrect = checkAnswer(q, answer);
    const options = document.querySelectorAll('.option');

    if (q.type === '单选题' || q.type === '判断题') {
        const correctIndex = q.type === '判断题' ? q.correct : q.correct;
        options.forEach((opt, idx) => {
            opt.classList.remove('selected');
            if (idx === correctIndex) {
                opt.classList.add('correct');
            } else if (idx === answer && !isCorrect) {
                opt.classList.add('wrong');
            }
            opt.style.pointerEvents = 'none';
        });
    } else if (q.type === '多选题') {
        const correctSet = new Set(q.correct);
        const answerSet = new Set(answer);
        options.forEach((opt, idx) => {
            opt.classList.remove('selected');
            if (correctSet.has(idx)) {
                opt.classList.add('correct');
            } else if (answerSet.has(idx) && !correctSet.has(idx)) {
                opt.classList.add('wrong');
            }
            opt.style.pointerEvents = 'none';
        });
    } else if (q.type === '填空题') {
        const inputs = document.querySelectorAll('.fillblank-input');
        const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];
        const userAnswersArr = Array.isArray(answer) ? answer : [answer];
        inputs.forEach((input, idx) => {
            input.disabled = true;
            const userVal = (userAnswersArr[idx] || '').trim();
            const correctVal = (correctAnswers[idx] || '').trim();
            if (userVal.toLowerCase() === correctVal.toLowerCase()) {
                input.style.borderColor = 'var(--border-success)';
                input.style.background = 'rgba(var(--color-success-rgb), 0.1)';
            } else {
                input.style.borderColor = 'var(--border-danger)';
                input.style.background = 'rgba(var(--color-danger-rgb), 0.1)';
            }
        });
    } else if (q.type === '简答题') {
        const textarea = document.querySelector('.shortanswer-textarea');
        if (textarea) {
            textarea.disabled = true;
            textarea.style.opacity = '0.8';
        }
    }

    if (isCorrect) {
        document.getElementById('correct-feedback').style.display = 'block';
        document.getElementById('error-feedback').style.display = 'none';
        document.getElementById('correct-feedback-content').textContent = '';
    } else {
        document.getElementById('error-feedback').style.display = 'block';
        document.getElementById('correct-feedback').style.display = 'none';
        document.getElementById('error-feedback-content').textContent = '';
    }

    document.getElementById('analysis').style.display = 'block';
    document.getElementById('analysis-text').textContent = q.explanation;
}

function checkAnswer(q, answer) {
    if (answer === null) return false;
    if (q.type === '单选题' || q.type === '判断题') {
        return answer === q.correct;
    } else if (q.type === '多选题') {
        if (!Array.isArray(answer)) return false;
        const correctSet = new Set(q.correct);
        const answerSet = new Set(answer);
        if (correctSet.size !== answerSet.size) return false;
        for (const c of correctSet) {
            if (!answerSet.has(c)) return false;
        }
        return true;
    } else if (q.type === '填空题') {
        const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];
        const userAnswersArr = Array.isArray(answer) ? answer : [answer];
        if (correctAnswers.length !== userAnswersArr.length) return false;
        for (let i = 0; i < correctAnswers.length; i++) {
            if ((userAnswersArr[i] || '').trim().toLowerCase() !== (correctAnswers[i] || '').trim().toLowerCase()) {
                return false;
            }
        }
        return true;
    } else if (q.type === '简答题') {
        return typeof answer === 'string' && answer.trim().length > 0;
    }
    return false;
}

// ==================== 针对性知识讲解（核心功能） ====================
function renderKnowledge(q) {
    const container = document.getElementById('knowledge-content');
    if (!q.knowledge) {
        container.innerHTML = '<p style="color:#999">本题暂无详细知识讲解。</p>';
        return;
    }

    const k = q.knowledge;
    let html = '';

    // 核心概念
    if (k.coreConcepts && k.coreConcepts.length > 0) {
        html += `
        <div class="knowledge-block">
            <div class="knowledge-block-title">💡 核心概念</div>
            <div class="knowledge-block-content">
                ${k.coreConcepts.map(item => `<div class="knowledge-item"><span class="knowledge-bullet">💡</span><span>${item}</span></div>`).join('')}
            </div>
        </div>`;
    }

    // 知识延伸
    if (k.extendedKnowledge && k.extendedKnowledge.length > 0) {
        html += `
        <div class="knowledge-block">
            <div class="knowledge-block-title">🔗 知识延伸</div>
            <div class="knowledge-block-content">
                ${k.extendedKnowledge.map(item => `<div class="knowledge-item"><span class="knowledge-bullet">🔗</span><span>${item}</span></div>`).join('')}
            </div>
        </div>`;
    }

    // 实际应用场景
    if (k.practicalScenarios && k.practicalScenarios.length > 0) {
        html += `
        <div class="knowledge-block">
            <div class="knowledge-block-title">🎯 实际应用场景</div>
            <div class="knowledge-block-content">
                ${k.practicalScenarios.map(item => `<div class="knowledge-item"><span class="knowledge-bullet">🎯</span><span>${item}</span></div>`).join('')}
            </div>
        </div>`;
    }

    // 常见错误分析
    if (k.commonMistakes && k.commonMistakes.length > 0) {
        html += `
        <div class="knowledge-block">
            <div class="knowledge-block-title">⚠️ 常见错误分析</div>
            <div class="knowledge-block-content">
                ${k.commonMistakes.map(item => `<div class="knowledge-item"><span class="knowledge-bullet">⚠️</span><span>${item}</span></div>`).join('')}
            </div>
        </div>`;
    }

    container.innerHTML = html;
}

function toggleKnowledge() {
    const content = document.getElementById('knowledge-content');
    const icon = document.getElementById('knowledge-toggle-icon');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        icon.textContent = '▼';
    }
}

// ==================== 题目导航 ====================
function prevQuestion() {
    cancelAutoAdvance();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
        updateJumpPanel();
    }
}

function nextQuestion() {
    cancelAutoAdvance();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        updateJumpPanel();
    } else {
        finishQuiz();
    }
}

function jumpToQuestion(index) {
    cancelAutoAdvance();
    if (index >= 0 && index < questions.length) {
        currentQuestionIndex = index;
        renderQuestion();
        updateJumpPanel();
        // 平滑滚动到题目内容区域，确保题目完全显示在视窗可见范围内
        setTimeout(() => {
            const questionTextEl = document.querySelector('.question-text');
            if (questionTextEl) {
                const quizHeader = document.querySelector('.quiz-header');
                const offsetTop = quizHeader ? quizHeader.offsetTop - 20 : questionTextEl.offsetTop - 20;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        }, 50);
    }
}

function toggleMark() {
    if (markedQuestions.has(currentQuestionIndex)) {
        markedQuestions.delete(currentQuestionIndex);
    } else {
        markedQuestions.add(currentQuestionIndex);
    }
    updateMarkButton();
    updateJumpPanel();
}

function updateMarkButton() {
    const btn = document.getElementById('mark-btn');
    if (markedQuestions.has(currentQuestionIndex)) {
        btn.textContent = '📍 取消标记';
        btn.classList.add('marked');
    } else {
        btn.textContent = '📌 标记题目';
        btn.classList.remove('marked');
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
}

// ==================== 答题卡面板 ====================
function renderJumpPanel() {
    const panel = document.getElementById('jump-panel');
    let html = '';

    // 按题型分组
    const groups = {};
    questions.forEach((q, i) => {
        const type = q.type || '其他';
        if (!groups[type]) groups[type] = [];
        groups[type].push(i);
    });

    // 定义题型显示顺序
    const typeOrder = ['单选题', '多选题', '判断题', '填空题', '简答题'];

    typeOrder.forEach(type => {
        if (groups[type] && groups[type].length > 0) {
            html += `<div class="jump-group">`;
            html += `<div class="jump-group-title">${type}</div>`;
            groups[type].forEach(i => {
                let cls = 'jump-btn';
                // 根据答题对错区分颜色（优先级低于 current）
                if (userAnswers[i] !== null) {
                    const isCorrect = checkAnswer(questions[i], userAnswers[i]);
                    if (isCorrect) cls += ' correct';
                    else cls += ' wrong';
                }
                if (markedQuestions.has(i)) cls += ' marked';
                if (i === currentQuestionIndex) cls += ' current';
                const label = questions[i].id || (i + 1);
                html += `<button class="${cls}" onclick="jumpToQuestion(${i})">${label}</button>`;
            });
            html += `</div>`;
        }
    });

    panel.innerHTML = html;
}

function updateJumpPanel() {
    renderJumpPanel();
}

// ==================== 结束答题 ====================
function finishQuiz() {
    stopTimer();

    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');

    let correct = 0;
    const weaknessMap = {};

    questions.forEach((q, i) => {
        const isCorrect = checkAnswer(q, userAnswers[i]);
        if (isCorrect) {
            correct++;
        } else {
            weaknessMap[q.category] = (weaknessMap[q.category] || 0) + 1;
        }
    });

    const accuracy = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;

    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';

    // 根据模式设置结果标签
    let labelText;
    if (currentMode === 'exam') {
        // 考试模式：及格/不及格
        labelText = accuracy >= EXAM_CONFIG.passScore ? '🎉 及格' : '😢 不及格';
    } else {
        // 练习模式：优秀/良好/及格/需改进
        labelText = accuracy >= 90 ? '优秀' : accuracy >= 70 ? '良好' : accuracy >= 60 ? '及格' : '需改进';
    }

    document.getElementById('result-score').textContent = accuracy;
    document.getElementById('result-label').textContent = labelText;
    document.getElementById('stat-answered').textContent = userAnswers.filter(a => a !== null).length;
    document.getElementById('stat-correct').textContent = correct;
    document.getElementById('stat-accuracy').textContent = accuracy + '%';
    document.getElementById('stat-time').textContent = `${mins}:${secs}`;

    // 薄弱知识点
    const weaknessList = Object.entries(weaknessMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([cat, count]) => `<div class="weakness-item">${cat}：答错 ${count} 题</div>`)
        .join('');
    document.getElementById('weakness-list').innerHTML = weaknessList || '<div class="weakness-item">暂无薄弱知识点</div>';

    // 保存到历史
    saveQuizHistory({
        mode: currentMode,
        total: questions.length,
        correct: correct,
        accuracy: accuracy,
        time: `${mins}:${secs}`,
        weakness: weaknessMap,
        date: new Date().toLocaleString('zh-CN')
    });
}

function submitExam() {
    const answeredCount = userAnswers.filter(a => a !== null).length;
    const totalCount = questions.length;
    const msg = answeredCount < totalCount
        ? `您已作答 ${answeredCount} / ${totalCount} 题，还有 ${totalCount - answeredCount} 题未完成。\n确定要提交试卷并查看结果吗？`
        : `您已完成全部 ${totalCount} 题。\n确定要提交试卷并查看结果吗？`;
    if (confirm(msg)) {
        finishQuiz();
    }
}

function confirmExit() {
    if (confirm('确定要退出答题吗？当前进度将保存。')) {
        stopTimer();
        cancelAutoAdvance();
        goHome();
    }
}

function goHome() {
    stopTimer();
    cancelAutoAdvance();
    
    // 重置题库为原始题库（考试模式会抽取部分题目，返回首页时需要恢复）
    if (window.originalQuestions) {
        questions = [...window.originalQuestions];
    }
    
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('wrongbook-page').style.display = 'none';
    document.getElementById('stats-page').style.display = 'none';
    document.getElementById('data-collection-page').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
}

// ==================== 错题本 ====================
function showWrongBook() {
    const history = JSON.parse(localStorage.getItem('quiz-history') || '[]');
    const wrongQuestions = [];

    history.forEach(record => {
        if (record.answers) {
            record.answers.forEach((ans, idx) => {
                const q = questions[idx];
                if (q && !checkAnswer(q, ans)) {
                    wrongQuestions.push({ ...q, userAnswer: ans });
                }
            });
        }
    });

    const content = document.getElementById('wrongbook-content');
    if (wrongQuestions.length === 0) {
        content.innerHTML = '<p style="text-align:center;color:#999;padding:40px;">暂无错题记录，快去答题吧！</p>';
    } else {
        content.innerHTML = wrongQuestions.map((q, i) => `
            <div class="wrong-item" style="margin-bottom:20px;padding:20px;background:var(--bg-card);border-radius:12px;border-left:4px solid var(--color-danger);">
                <div style="font-weight:bold;margin-bottom:10px;">${i + 1}. [${q.category}] ${q.question}</div>
                <div style="color:var(--color-danger);margin-bottom:5px;">你的答案：${formatAnswer(q.userAnswer)}</div>
                <div style="color:var(--color-success);margin-bottom:5px;">正确答案：${formatAnswer(q.correct)}</div>
                <div style="color:#666;font-size:14px;">${q.explanation}</div>
            </div>
        `).join('');
    }

    document.getElementById('home-page').style.display = 'none';
    document.getElementById('wrongbook-page').style.display = 'block';
}

function formatAnswer(answer) {
    if (answer === null) return '未作答';
    if (Array.isArray(answer)) {
        return answer.map(a => String.fromCharCode(65 + a)).join(', ');
    }
    return String.fromCharCode(65 + answer);
}

// ==================== 学习统计 ====================
function showStats() {
    const history = JSON.parse(localStorage.getItem('quiz-history') || '[]');
    let total = 0, correct = 0;
    history.forEach(h => {
        total += h.total || 0;
        correct += h.correct || 0;
    });
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    document.getElementById('stats-total').textContent = total;
    document.getElementById('stats-correct').textContent = correct;
    document.getElementById('stats-accuracy').textContent = accuracy + '%';
    document.getElementById('stats-wrong').textContent = total - correct;

    document.getElementById('home-page').style.display = 'none';
    document.getElementById('stats-page').style.display = 'block';
}

// ==================== 数据收集页 ====================
function showDataCollection() {
    const history = JSON.parse(localStorage.getItem('quiz-history') || '[]');
    const totalSessions = history.length;
    const avgAccuracy = totalSessions > 0
        ? Math.round(history.reduce((s, h) => s + (h.accuracy || 0), 0) / totalSessions)
        : 0;

    document.getElementById('my-total').textContent = totalSessions;
    document.getElementById('my-avg-accuracy').textContent = avgAccuracy + '%';

    const weaknessMap = {};
    history.forEach(h => {
        if (h.weakness) {
            Object.entries(h.weakness).forEach(([cat, count]) => {
                weaknessMap[cat] = (weaknessMap[cat] || 0) + count;
            });
        }
    });
    const weaknessHtml = Object.entries(weaknessMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([cat, count]) => `<div>• ${cat}：累计答错 ${count} 次</div>`)
        .join('') || '<div>暂无数据</div>';
    document.getElementById('my-weakness').innerHTML = weaknessHtml;

    document.getElementById('home-page').style.display = 'none';
    document.getElementById('data-collection-page').style.display = 'block';
}

function submitFeedback() {
    const name = document.getElementById('feedback-name').value.trim();
    const content = document.getElementById('feedback-content').value.trim();
    if (!content) {
        alert('请填写反馈内容！');
        return;
    }
    const feedbacks = JSON.parse(localStorage.getItem('quiz-feedbacks') || '[]');
    feedbacks.push({ name: name || '匿名', content, date: new Date().toLocaleString('zh-CN') });
    localStorage.setItem('quiz-feedbacks', JSON.stringify(feedbacks));
    alert('反馈提交成功！');
    document.getElementById('feedback-content').value = '';
}

function exportAllData() {
    const data = {
        history: JSON.parse(localStorage.getItem('quiz-history') || '[]'),
        feedbacks: JSON.parse(localStorage.getItem('quiz-feedbacks') || '[]'),
        exportTime: new Date().toLocaleString('zh-CN')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function viewLocalData() {
    const data = {
        history: JSON.parse(localStorage.getItem('quiz-history') || '[]'),
        feedbacks: JSON.parse(localStorage.getItem('quiz-feedbacks') || '[]')
    };
    alert(JSON.stringify(data, null, 2).substring(0, 2000) + '...');
}

// ==================== 本地存储 ====================
function saveAnswerRecord(q, answer) {
    // 单题记录暂不单独存储，在结束答题时统一保存
}

function saveQuizHistory(record) {
    const history = JSON.parse(localStorage.getItem('quiz-history') || '[]');
    record.answers = [...userAnswers];
    history.push(record);
    localStorage.setItem('quiz-history', JSON.stringify(history));
}

function loadHistory() {
    // 加载历史记录用于统计展示
}

// ==================== 结果页Tab切换 ====================
function showResultTab(tab, el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('result-overview').style.display = tab === 'overview' ? 'block' : 'none';
    document.getElementById('result-errors').style.display = tab === 'errors' ? 'block' : 'none';
}

// ==================== 初始化入口 ====================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
