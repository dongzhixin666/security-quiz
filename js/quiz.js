/**
 * 数据库安全技术测验核心逻辑
 * 依赖：data.js（题目数据）
 */

// ==================== 全局数据引用 ====================
const questions = window.questions || [];
const knowledgeBase = window.knowledgeBase || {};

// ==================== 配置常量 ====================
const ANSWER_HISTORY_KEY = 'quiz_answer_history';
const AUTO_ADVANCE_DELAY = 800; // 正确答题后自动跳转延迟（毫秒）
const THEME_KEY = 'quiz_theme';
const FAVORITES_KEY = 'quiz_favorites';

// ==================== 全局状态变量 ====================
let currentQuestionIndex = 0;
let currentMode = 'practice';
let userAnswers = {};
let markedQuestions = [];
let startTime = 0;
let timerInterval = null;
let consecutiveCorrect = 0;
let totalAnswered = 0;
let totalCorrect = 0;
let hasSubmittedCurrent = false;
let autoAdvanceTimer = null;

// ==================== 评分标准 ====================
const scoringRules = {
    excellent: { min: 80, label: "优秀", color: "#10B981", feedback: "掌握得很好！继续保持！" },
    good: { min: 60, label: "良好", color: "#F59E0B", feedback: "表现不错！还有提升空间。" },
    needImprove: { min: 0, label: "需改进", color: "#EF4444", feedback: "需要加强学习这部分知识。" }
};

// ==================== 语音反馈消息 ====================
const praiseMessages = [
    '太棒了！继续保持！',
    '非常正确！你真聪明！',
    '答对了！做得好！',
    '完美！继续加油！',
    '优秀！你是最棒的！',
    '太厉害了！再接再厉！'
];

const encouragementMessages = [
    '没关系，再试一次！',
    '加油！你可以的！',
    '别灰心，继续努力！',
    '答错了也没关系，学习就是一个不断尝试的过程！',
    '再接再厉，下次一定能答对！'
];

// ═════════════════════════════════════════════════════
// 一、工具函数
// ═════════════════════════════════════════════════════

/**
 * HTML转义函数，防止XSS攻击
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 计算编辑距离（Levenshtein Distance）
 */
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

// ═════════════════════════════════════════════════════
// 二、本地存储管理
// ═════════════════════════════════════════════════════

/**
 * 从 localStorage 读取答题历史记录
 */
function getAnswerHistory() {
    try {
        return JSON.parse(localStorage.getItem(ANSWER_HISTORY_KEY) || '{}');
    } catch (e) {
        console.warn('读取答题历史失败:', e);
        return {};
    }
}

/**
 * 将答题历史保存到 localStorage
 */
function saveAnswerHistory(history) {
    try {
        localStorage.setItem(ANSWER_HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
        console.warn('保存答题历史失败:', e);
    }
}

/**
 * 记录当前题目的作答结果到 localStorage（做题留痕功能）
 */
function recordAnswerHistory(questionId, userAnswer, isCorrect, scoreResult) {
    const history = getAnswerHistory();
    const question = questions.find(function(q) { return q.id === questionId; });

    history[questionId] = {
        userAnswer: userAnswer,
        isCorrect: isCorrect,
        submitTime: new Date().toISOString(),
        timestamp: Date.now(),
        questionType: question ? question.type : '',
        scoreResult: scoreResult,
        hasViewedAnalysis: true
    };

    saveAnswerHistory(history);
}

/**
 * 清除所有历史记录
 */
function clearAllHistory() {
    try {
        localStorage.removeItem(ANSWER_HISTORY_KEY);
        userAnswers = {};
        console.log('历史记录已清除');
    } catch (e) {
        console.warn('清除历史记录失败:', e);
    }
}

// ═════════════════════════════════════════════════════
// 三、评分引擎
// ═════════════════════════════════════════════════════

/**
 * 简答题评分：基于关键词匹配率和答案长度计算最终得分
 */
function calculateEssayScore(userAnswer, standardAnswer, question) {
    let score = 0;
    let details = [];

    // 提取标准答案关键词
    const keywords = extractKeywords(standardAnswer);
    let matchedCount = 0;

    keywords.forEach(function(keyword) {
        if (userAnswer.toLowerCase().includes(keyword.toLowerCase())) {
            matchedCount++;
            details.push('✓ 包含关键词："' + keyword + '"');
        }
    });

    const keywordScore = Math.round((matchedCount / Math.max(keywords.length, 1)) * 60);

    // 长度评分
    const lengthScore = Math.min(40, userAnswer.length / 10);

    score = Math.min(100, Math.round(keywordScore + lengthScore));

    return {
        score: score,
        details: details,
        matchedKeywords: matchedCount,
        totalKeywords: keywords.length,
        suggestion: getEssaySuggestion(score, userAnswer, standardAnswer)
    };
}

/**
 * 提取关键词（用于简答题评分）
 */
function extractKeywords(text) {
    const stopWords = ["的", "是", "在", "和", "了", "也", "都", "而", "及", "与", "或", "但", "如果", "因为", "所以", "因此", "可以", "能够", "使用", "通过", "需要", "进行", "等", "这", "那", "个", "有", "没", "不", "也", "还", "就", "都", "很", "最", "更", "比", "让", "被", "把", "给", "上", "下", "中", "里", "外", "内", "前", "后", "左", "右", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    const words = text.split(/[,。；、\s]+/);
    const keywords = [];

    words.forEach(function(word) {
        if (word.length >= 2 && !stopWords.includes(word)) {
            keywords.push(word);
        }
    });

    const uniqueKeywords = [];
    keywords.forEach(function(word) {
        if (!uniqueKeywords.includes(word)) {
            uniqueKeywords.push(word);
        }
    });

    return uniqueKeywords.slice(0, 10);
}

/**
 * 获取简答题评分建议
 */
function getEssaySuggestion(score, userAnswer, standardAnswer) {
    let suggestions = [];

    if (score < 40) {
        suggestions.push("建议先认真阅读课程内容，理解基本概念");
    } else if (score < 70) {
        suggestions.push("建议补充更多相关的细节");
    } else {
        suggestions.push("回答得不错！可以再提升内容更全面");
    }

    return suggestions;
}

/**
 * 填空题智能评分：通过完全匹配、部分包含和编辑距离进行智能判分
 */
function calculateFillScore(userAnswer, standardAnswer) {
    const normalizedUser = userAnswer.trim().toLowerCase();
    const normalizedStandard = standardAnswer.trim().toLowerCase();

    let score = 0;
    let details = [];

    if (normalizedUser === normalizedStandard) {
        score = 100;
        details.push("✓ 答案完全正确");
    } else if (normalizedStandard.includes(normalizedUser) || normalizedUser.includes(normalizedStandard)) {
        score = 70;
        details.push("△ 答案部分正确");
    } else if (levenshteinDistance(normalizedUser, normalizedStandard) <= 2) {
        score = 50;
        details.push("△ 答案接近正确");
    } else {
        score = 0;
        details.push("✗ 答案错误");
    }

    return {
        score: score,
        details: details,
        suggestion: score < 70 ? "建议复习相关知识" : "很好！"
    };
}

/**
 * 获取评分等级
 */
function getScoreLevel(score) {
    if (score >= scoringRules.excellent.min) return 'excellent';
    if (score >= scoringRules.good.min) return 'good';
    return 'needImprove';
}

// ═════════════════════════════════════════════════════
// 四、知识讲解
// ═════════════════════════════════════════════════════

/**
 * 获取知识讲解内容
 */
function getKnowledgeContent(category) {
    let content = "";

    const matchedCategory = Object.keys(knowledgeBase).find(function(key) {
        return category.includes(key) || key.includes(category);
    }) || category;

    if (knowledgeBase[matchedCategory]) {
        const knowledge = knowledgeBase[matchedCategory];

        content = '<div class="knowledge-title">📖 核心概念</div><ul class="knowledge-list">';
        knowledge.basic.forEach(function(item) {
            content += '<li>' + escapeHtml(item) + '</li>';
        });
        content += '</ul><div class="knowledge-title" style="margin-top: 20px;">🔗 知识延伸</div><ul class="knowledge-list">';
        knowledge.extend.forEach(function(item) {
            content += '<li>' + escapeHtml(item) + '</li>';
        });
        content += '</ul>';
    } else {
        content = '<div class="knowledge-title">📖 核心概念</div><p style="color: #666; line-height: 1.8;">这部分知识的要点。</p>';
    }

    return content;
}

/**
 * 展开/收起知识讲解
 */
function toggleKnowledge() {
    const content = document.getElementById('knowledge-content');
    const icon = document.getElementById('knowledge-toggle-icon');

    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        icon.textContent = '▼';
    }
}

// ═════════════════════════════════════════════════════
// 五、语音反馈
// ═════════════════════════════════════════════════════

/**
 * 语音播报
 */
function speak(text) {
    if ('speechSynthesis' in window && typeof speechSynthesis !== 'undefined') {
        try {
            speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.9;
            speechSynthesis.speak(utterance);
        } catch (e) {
            console.warn('语音播放失败:', e);
        }
    }
}

/**
 * 播放表扬语音
 */
function showPraise() {
    const message = praiseMessages[Math.floor(Math.random() * praiseMessages.length)];
    speak(message);
}

/**
 * 播放鼓励语音
 */
function showEncouragement() {
    const message = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
    speak(message);
}

// ═════════════════════════════════════════════════════
// 六、主题切换
// ═════════════════════════════════════════════════════

/**
 * 获取当前主题
 */
function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
}

/**
 * 设置主题
 */
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    // 更新主题切换按钮图标
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        toggleBtn.title = theme === 'dark' ? '切换到浅色模式' : '切换到深色模式';
    }
}

/**
 * 切换深色/浅色主题
 */
function toggleTheme() {
    const current = getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
}

// ═════════════════════════════════════════════════════
// 七、收藏功能
// ═════════════════════════════════════════════════════

/**
 * 获取收藏的题目ID列表
 */
function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    } catch (e) {
        console.warn('读取收藏失败:', e);
        return [];
    }
}

/**
 * 保存收藏列表
 */
function saveFavorites(favorites) {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
        console.warn('保存收藏失败:', e);
    }
}

/**
 * 切换题目收藏状态
 * @returns {boolean} 切换后是否为收藏状态
 */
function toggleFavorite(questionId) {
    const favorites = getFavorites();
    const index = favorites.indexOf(questionId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(questionId);
    }
    saveFavorites(favorites);
    return index === -1;
}

// ═════════════════════════════════════════════════════
// 八、计时器
// ═════════════════════════════════════════════════════

/**
 * 启动做题计时器
 */
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timerInterval = setInterval(updateTimer, 1000);
}

/**
 * 更新计时器显示
 */
function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timerEl = document.getElementById('timer');
    if (timerEl) {
        timerEl.textContent = '⏱️ ' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    }
}

// ═════════════════════════════════════════════════════
// 九、页面导航与测验生命周期
// ═════════════════════════════════════════════════════

/**
 * 开始测验
 */
function startQuiz(mode) {
    // 检查是否有历史答题记录
    const history = getAnswerHistory();
    const hasHistory = Object.keys(history).length > 0;

    // 如果有历史记录，询问用户是否重新开始
    if (hasHistory) {
        const choice = confirm('检测到您有历史答题记录，是否重新开始做题？\n\n点击"确定"：清除历史记录，重新开始\n点击"取消"：保留历史记录，继续查看');
        if (choice) {
            clearAllHistory();
        }
    }

    currentMode = mode;
    currentQuestionIndex = 0;
    userAnswers = {};
    markedQuestions = [];
    startTime = Date.now();
    consecutiveCorrect = 0;
    totalAnswered = 0;
    totalCorrect = 0;
    hasSubmittedCurrent = false;

    // 清除自动跳转计时器
    if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }

    document.getElementById('home-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('wrongbook-page').style.display = 'none';
    document.getElementById('stats-page').style.display = 'none';

    startTimer();
    showQuestion();
}

/**
 * 返回首页
 */
function goHome() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // 清除自动跳转计时器
    if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }

    document.getElementById('home-page').style.display = 'block';
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('wrongbook-page').style.display = 'none';
    document.getElementById('stats-page').style.display = 'none';
    document.getElementById('data-collection-page').style.display = 'none';
}

/**
 * 确认退出答题
 */
function confirmExit() {
    if (confirm('确定要退出答题吗？当前答题进度将不会保存。')) {
        goHome();
    }
}

/**
 * 同意协议并开始
 */
function agreeAndStart() {
    document.getElementById('consent-overlay').style.display = 'none';
    document.getElementById('consent-modal').style.display = 'none';
}

// ═════════════════════════════════════════════════════
// 十、题目渲染
// ═════════════════════════════════════════════════════

/**
 * 根据 currentQuestionIndex 渲染当前题目、选项和进度条
 */
function showQuestion() {
    const question = questions[currentQuestionIndex];
    if (!question) return;

    document.getElementById('current-question').textContent = question.id;
    document.getElementById('question-category').textContent = question.category;
    const questionTextEl = document.getElementById('question-text');
    // 去掉题目文本前面的"题型X、"前缀
    let cleanQuestion = question.question;
    cleanQuestion = cleanQuestion.replace(/^(单选题|多选题|判断题|填空题|简答题)\d+、/, '');
    questionTextEl.innerHTML = escapeHtml(cleanQuestion);

    const contentDiv = document.getElementById('question-content');
    // 清理旧的事件监听器
    const oldOptions = contentDiv.querySelectorAll('.option');
    oldOptions.forEach(function(opt) {
        opt.onclick = null;
    });
    contentDiv.innerHTML = '';

    // 隐藏所有新增元素（默认状态）
    document.getElementById('analysis').style.display = 'none';
    document.getElementById('knowledge-section').style.display = 'none';
    document.getElementById('knowledge-content').style.display = 'none';
    document.getElementById('score-card').style.display = 'none';
    document.getElementById('error-feedback').style.display = 'none';
    document.getElementById('correct-feedback').style.display = 'none';

    // 清除自动跳转计时器
    if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }

    // Reset submission flag for new question
    hasSubmittedCurrent = false;

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';

    // Configure submit button based on question type
    const submitBtn = document.getElementById('submit-btn');
    if (question.type === '多选题') {
        submitBtn.textContent = '确认答案';
        submitBtn.style.opacity = '0.6';
    } else {
        submitBtn.textContent = '提交答案';
        submitBtn.style.opacity = '1';
    }

    // 检查是否有答题历史
    const history = getAnswerHistory();
    const questionHistory = history[question.id];

    if (question.type === '单选题' || question.type === '多选题') {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        question.options.forEach(function(option, index) {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.innerHTML = '<span class="option-letter">' + String.fromCharCode(65 + index) + '</span>' + escapeHtml(option.substring(2));
            optionDiv.onclick = function() { selectOption(index, question.type); };
            optionsDiv.appendChild(optionDiv);
        });
        contentDiv.appendChild(optionsDiv);
    } else if (question.type === '判断题') {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        ['对', '错'].forEach(function(option, index) {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.innerHTML = '<span class="option-letter">' + (index === 0 ? '✓' : '✗') + '</span>' + escapeHtml(option);
            optionDiv.onclick = function() { selectOption(index === 0, question.type); };
            optionsDiv.appendChild(optionDiv);
        });
        contentDiv.appendChild(optionsDiv);
    } else if (question.type === '填空题') {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'fill-input';
        input.placeholder = '请输入答案';
        input.value = userAnswers[question.id] || '';
        input.oninput = function() { saveAnswer(question.id, input.value); };
        contentDiv.appendChild(input);
    } else if (question.type === '简答题') {
        const textarea = document.createElement('textarea');
        textarea.className = 'essay-input';
        textarea.placeholder = '请输入答案...';
        textarea.value = userAnswers[question.id] || '';
        textarea.oninput = function() { saveAnswer(question.id, textarea.value); };
        contentDiv.appendChild(textarea);
    }

    // 如果有答题历史，恢复答题状态（做题留痕）
    if (questionHistory) {
        restoreQuestionState(question, questionHistory);
    }

    updateMarkButton();
    updateJumpPanel();
}

/**
 * 从 localStorage 恢复已作答题目的状态、答案和反馈信息
 */
function restoreQuestionState(question, history) {
    hasSubmittedCurrent = true;

    // 恢复用户答案到userAnswers
    userAnswers[question.id] = history.userAnswer;

    if (question.type === '单选题' || question.type === '多选题' || question.type === '判断题') {
        const options = document.querySelectorAll('.option');

        if (question.type === '多选题') {
            // 恢复多选题选择状态
            if (Array.isArray(history.userAnswer)) {
                history.userAnswer.forEach(function(letter) {
                    const index = letter.charCodeAt(0) - 65;
                    if (options[index]) {
                        options[index].classList.add('selected');
                    }
                });
            }
        } else if (question.type === '判断题') {
            // 恢复判断题选择状态
            const selectedIndex = history.userAnswer === '对' ? 0 : 1;
            if (options[selectedIndex]) {
                options[selectedIndex].classList.add('selected');
            }
        } else {
            // 恢复单选题选择状态
            const selectedIndex = history.userAnswer.charCodeAt(0) - 65;
            if (options[selectedIndex]) {
                options[selectedIndex].classList.add('selected');
            }
        }

        // 恢复结果展示（正确/错误标识）
        restoreOptionResults(question, options, history);
    } else if (question.type === '填空题' || question.type === '简答题') {
        const input = document.querySelector('.fill-input, .essay-input');
        if (input) {
            input.value = history.userAnswer;
        }
    }

    // 恢复反馈显示
    if (history.isCorrect) {
        document.getElementById('correct-feedback').style.display = 'block';
        document.getElementById('correct-feedback-content').textContent =
            question.type === '简答题' || question.type === '填空题' ?
            '做得很好！继续保持！' : '回答正确！';
    } else {
        document.getElementById('error-feedback').style.display = 'block';
        document.getElementById('error-feedback-content').textContent =
            '这道题答错了，没关系，认真看解析学习！';
    }

    // 恢复评分卡片（针对主观题）
    if ((question.type === '填空题' || question.type === '简答题') && history.scoreResult) {
        const scoreLevel = getScoreLevel(history.scoreResult.score);
        const levelInfo = scoringRules[scoreLevel];

        document.getElementById('score-card').style.display = 'block';
        document.getElementById('score-value').textContent = history.scoreResult.score;
        document.getElementById('score-value').style.color = levelInfo.color;

        const levelElement = document.getElementById('score-level');
        levelElement.textContent = levelInfo.label;
        levelElement.className = 'score-level ' + scoreLevel;

        let detailsText = '<p>' + levelInfo.feedback + '</p>';

        if (history.scoreResult.details && history.scoreResult.details.length > 0) {
            detailsText += '<p>' + history.scoreResult.details.map(function(d) { return escapeHtml(d); }).join('<br>') + '</p>';
        }

        document.getElementById('score-details').innerHTML = detailsText;
    }

    // 恢复答案解析
    let standardAnswer = (question.type === '多选题') ? question.answer.join(', ') : question.answer;
    document.getElementById('analysis-text').textContent = '标准答案：' + standardAnswer + '\n\n' + question.analysis;
    document.getElementById('analysis').style.display = 'block';

    // 恢复知识讲解
    document.getElementById('knowledge-section').style.display = 'block';
    document.getElementById('knowledge-content').innerHTML = getKnowledgeContent(question.category);

    // 更新提交按钮状态
    const submitBtn = document.getElementById('submit-btn');
    if (history.isCorrect) {
        submitBtn.textContent = '已正确回答';
        submitBtn.style.opacity = '0.6';
    } else {
        submitBtn.textContent = '已回答（错误）';
        submitBtn.style.opacity = '0.6';
    }
}

/**
 * 恢复选项结果标识
 */
function restoreOptionResults(question, options, history) {
    if (question.type === '单选题' || question.type === '多选题') {
        options.forEach(function(opt, index) {
            opt.style.pointerEvents = 'none';
            const optionLetter = String.fromCharCode(65 + index);

            if (question.type === '多选题') {
                if (question.answer.includes(optionLetter)) {
                    opt.classList.add('correct');
                    opt.classList.remove('wrong', 'selected');
                    if (!opt.querySelector('.result-icon')) {
                        const icon = document.createElement('span');
                        icon.className = 'result-icon';
                        icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                        icon.textContent = '✓';
                        opt.appendChild(icon);
                    }
                } else if (opt.classList.contains('selected')) {
                    opt.classList.add('wrong');
                    if (!opt.querySelector('.result-icon')) {
                        const icon = document.createElement('span');
                        icon.className = 'result-icon';
                        icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                        icon.textContent = '✗';
                        opt.appendChild(icon);
                    }
                }
            } else {
                if (optionLetter === question.answer) {
                    opt.classList.add('correct');
                    if (!opt.querySelector('.result-icon')) {
                        const icon = document.createElement('span');
                        icon.className = 'result-icon';
                        icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                        icon.textContent = '✓';
                        opt.appendChild(icon);
                    }
                }
                if (opt.classList.contains('selected') && optionLetter !== question.answer) {
                    opt.classList.add('wrong');
                    if (!opt.querySelector('.result-icon')) {
                        const icon = document.createElement('span');
                        icon.className = 'result-icon';
                        icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                        icon.textContent = '✗';
                        opt.appendChild(icon);
                    }
                }
            }
        });
    } else if (question.type === '判断题') {
        options.forEach(function(opt, index) {
            opt.style.pointerEvents = 'none';
            const isTrue = index === 0;
            if (isTrue === question.answer) {
                opt.classList.add('correct');
                if (!opt.querySelector('.result-icon')) {
                    const icon = document.createElement('span');
                    icon.className = 'result-icon';
                    icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                    icon.textContent = '✓';
                    opt.appendChild(icon);
                }
            }
            if (opt.classList.contains('selected') && isTrue !== question.answer) {
                opt.classList.add('wrong');
                if (!opt.querySelector('.result-icon')) {
                    const icon = document.createElement('span');
                    icon.className = 'result-icon';
                    icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                    icon.textContent = '✗';
                    opt.appendChild(icon);
                }
            }
        });
    }
}

// ═════════════════════════════════════════════════════
// 十一、交互处理
// ═════════════════════════════════════════════════════

/**
 * 选择题/判断题选项点击处理
 */
function selectOption(index, type) {
    const options = document.querySelectorAll('.option');

    if (type === '多选题') {
        const option = document.querySelectorAll('.option')[index];
        option.classList.toggle('selected');
        const selectedOptions = Array.from(options).filter(function(opt) {
            return opt.classList.contains('selected');
        }).map(function(opt, i) {
            return String.fromCharCode(65 + Array.from(options).indexOf(opt));
        });
        saveAnswer(questions[currentQuestionIndex].id, selectedOptions);

        // Update submit button text based on selection
        const submitBtn = document.getElementById('submit-btn');
        if (selectedOptions.length > 0) {
            submitBtn.textContent = '确认答案 (' + selectedOptions.length + '项)';
            submitBtn.style.opacity = '1';
        } else {
            submitBtn.textContent = '确认答案';
            submitBtn.style.opacity = '0.6';
        }
    } else {
        // Single-choice and true/false: select immediately and auto-submit
        options.forEach(function(opt) { opt.classList.remove('selected'); });
        const option = document.querySelectorAll('.option')[typeof index === 'number' ? index : (index ? 0 : 1)];
        option.classList.add('selected');
        const answer = typeof index === 'number' ? String.fromCharCode(65 + index) : (index ? '对' : '错');
        saveAnswer(questions[currentQuestionIndex].id, answer);

        // Auto-submit for single-choice and true/false questions
        setTimeout(function() {
            submitAnswer();
        }, 150);
    }
}

/**
 * 保存用户答案到内存
 */
function saveAnswer(questionId, answer) {
    userAnswers[questionId] = answer;
}

/**
 * 提交答案并判分
 */
function submitAnswer() {
    const question = questions[currentQuestionIndex];
    const userAnswer = userAnswers[question.id];

    if (!userAnswer) {
        alert('请先作答！');
        return;
    }

    // Prevent duplicate submissions for the same question
    if (hasSubmittedCurrent) {
        // If already submitted, allow navigation to next question
        if (getAnswerHistory()[question.id] && !getAnswerHistory()[question.id].isCorrect) {
            nextQuestion();
        }
        return;
    }
    hasSubmittedCurrent = true;

    totalAnswered++;

    let isCorrect = false;
    let scoreResult = null;

    if (question.type === '多选题') {
        isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(question.answer.sort());
    } else if (question.type === '判断题') {
        isCorrect = (userAnswer === '对') === question.answer;
    } else if (question.type === '填空题') {
        scoreResult = calculateFillScore(userAnswer, question.answer);
        isCorrect = scoreResult.score >= 70;
    } else if (question.type === '简答题') {
        scoreResult = calculateEssayScore(userAnswer, question.answer, question);
        isCorrect = scoreResult.score >= 60;
    } else {
        isCorrect = userAnswer === question.answer;
    }

    // 记录答题历史（做题留痕）
    recordAnswerHistory(question.id, userAnswer, isCorrect, scoreResult);

    if (isCorrect) {
        totalCorrect++;
        consecutiveCorrect++;
        if (consecutiveCorrect >= 3) {
            showPraise();
            consecutiveCorrect = 0;
        }

        showResult(isCorrect, question, scoreResult, userAnswer);
        updateStats();

        // 正确答题后延迟自动跳转（可配置时间）
        if (question.type !== '多选题') {
            // 显示即将跳转提示
            showAutoAdvanceNotice();

            autoAdvanceTimer = setTimeout(function() {
                hideAutoAdvanceNotice();
                nextQuestion();
            }, AUTO_ADVANCE_DELAY);
        }

        return;
    } else {
        consecutiveCorrect = 0;
        showEncouragement();
        addToWrongBook(question, userAnswer);
    }

    showResult(isCorrect, question, scoreResult, userAnswer);
    updateStats();

    // 错误答题时显示手动操作提示
    showManualNavigationPrompt();
}

/**
 * 显示自动跳转提示
 */
function showAutoAdvanceNotice() {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.textContent = '回答正确！' + (AUTO_ADVANCE_DELAY / 1000) + '秒后自动跳转...';
    submitBtn.style.opacity = '1';
}

/**
 * 隐藏自动跳转提示
 */
function hideAutoAdvanceNotice() {
    // 颜色保持原有样式不变
}

/**
 * 显示手动操作提示（错误答题时）
 */
function showManualNavigationPrompt() {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.textContent = '查看解析后点击前往下一题 →';
    submitBtn.style.opacity = '1';
}

/**
 * 展示答题结果（对错标识、解析、知识讲解等）
 */
function showResult(isCorrect, question, scoreResult, userAnswer) {
    const options = document.querySelectorAll('.option');

    if (question.type === '单选题' || question.type === '多选题') {
        options.forEach(function(opt, index) {
            opt.style.pointerEvents = 'none';
            const optionLetter = String.fromCharCode(65 + index);

            if (question.type === '多选题') {
                if (question.answer.includes(optionLetter)) {
                    opt.classList.add('correct');
                    opt.classList.remove('wrong', 'selected');
                    // Add checkmark icon for correct answers
                    if (!opt.querySelector('.result-icon')) {
                        const icon = document.createElement('span');
                        icon.className = 'result-icon';
                        icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                        icon.textContent = '✓';
                        opt.appendChild(icon);
                    }
                } else if (opt.classList.contains('selected')) {
                    opt.classList.add('wrong');
                    // Add X icon for wrong selections
                    if (!opt.querySelector('.result-icon')) {
                        const icon = document.createElement('span');
                        icon.className = 'result-icon';
                        icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                        icon.textContent = '✗';
                        opt.appendChild(icon);
                    }
                }
            } else {
                if (optionLetter === question.answer) {
                    opt.classList.add('correct');
                    // Add checkmark icon for correct answer
                    if (!opt.querySelector('.result-icon')) {
                        const icon = document.createElement('span');
                        icon.className = 'result-icon';
                        icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                        icon.textContent = '✓';
                        opt.appendChild(icon);
                    }
                }
                if (opt.classList.contains('selected') && optionLetter !== question.answer) {
                    opt.classList.add('wrong');
                    // Add X icon for wrong answer
                    if (!opt.querySelector('.result-icon')) {
                        const icon = document.createElement('span');
                        icon.className = 'result-icon';
                        icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                        icon.textContent = '✗';
                        opt.appendChild(icon);
                    }
                }
            }
        });
    } else if (question.type === '判断题') {
        options.forEach(function(opt, index) {
            opt.style.pointerEvents = 'none';
            const isTrue = index === 0;
            if (isTrue === question.answer) {
                opt.classList.add('correct');
                // Add checkmark icon
                if (!opt.querySelector('.result-icon')) {
                    const icon = document.createElement('span');
                    icon.className = 'result-icon';
                    icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                    icon.textContent = '✓';
                    opt.appendChild(icon);
                }
            }
            if (opt.classList.contains('selected') && isTrue !== question.answer) {
                opt.classList.add('wrong');
                // Add X icon
                if (!opt.querySelector('.result-icon')) {
                    const icon = document.createElement('span');
                    icon.className = 'result-icon';
                    icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                    icon.textContent = '✗';
                    opt.appendChild(icon);
                }
            }
        });
    }

    // 显示正确/错误反馈
    if (isCorrect) {
        document.getElementById('correct-feedback').style.display = 'block';
        document.getElementById('correct-feedback-content').textContent =
            question.type === '简答题' || question.type === '填空题' ?
            '做得很好！继续保持！' : '回答正确！';
    } else {
        document.getElementById('error-feedback').style.display = 'block';
        document.getElementById('error-feedback-content').textContent =
            '这道题答错了，没关系，认真看解析学习！';
    }

    // 显示评分卡片（针对主观题）
    if ((question.type === '填空题' || question.type === '简答题') && scoreResult) {
        const scoreLevel = getScoreLevel(scoreResult.score);
        const levelInfo = scoringRules[scoreLevel];

        document.getElementById('score-card').style.display = 'block';
        document.getElementById('score-value').textContent = scoreResult.score;
        document.getElementById('score-value').style.color = levelInfo.color;

        const levelElement = document.getElementById('score-level');
        levelElement.textContent = levelInfo.label;
        levelElement.className = 'score-level ' + scoreLevel;

        let detailsText = '<p>' + levelInfo.feedback + '</p>';

        if (scoreResult.details && scoreResult.details.length > 0) {
            detailsText += '<p>' + scoreResult.details.map(function(d) { return escapeHtml(d); }).join('<br>') + '</p>';
        }

        document.getElementById('score-details').innerHTML = detailsText;
    }

    // 显示答案解析
    let standardAnswer = (question.type === '多选题') ? question.answer.join(', ') : question.answer;
    document.getElementById('analysis-text').textContent = '标准答案：' + standardAnswer + '\n\n' + question.analysis;
    document.getElementById('analysis').style.display = 'block';

    // 显示知识讲解
    document.getElementById('knowledge-section').style.display = 'block';
    document.getElementById('knowledge-content').innerHTML = getKnowledgeContent(question.category);
}

/**
 * 下一题
 */
function nextQuestion() {
    // 清除自动跳转计时器
    if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        finishQuiz();
    }
}

/**
 * 上一题
 */
function prevQuestion() {
    // 清除自动跳转计时器
    if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }

    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

// ═════════════════════════════════════════════════════
// 十二、标记题目与跳转面板
// ═════════════════════════════════════════════════════

/**
 * 切换当前题目的标记状态
 */
function toggleMark() {
    const questionId = questions[currentQuestionIndex].id;
    const index = markedQuestions.indexOf(questionId);

    if (index > -1) {
        markedQuestions.splice(index, 1);
    } else {
        markedQuestions.push(questionId);
    }

    updateMarkButton();
}

/**
 * 更新标记按钮的显示状态
 */
function updateMarkButton() {
    const btn = document.getElementById('mark-btn');
    const questionId = questions[currentQuestionIndex].id;

    if (markedQuestions.includes(questionId)) {
        btn.classList.add('marked');
        btn.textContent = '📌 已标记';
    } else {
        btn.classList.remove('marked');
        btn.textContent = '📌 标记题目';
    }
}

/**
 * 更新题目跳转面板
 */
function updateJumpPanel() {
    const panel = document.getElementById('jump-panel');
    panel.innerHTML = '';

    // 按题型分组
    const groups = {};
    questions.forEach(function(q, index) {
        if (!groups[q.type]) {
            groups[q.type] = [];
        }
        groups[q.type].push({ question: q, index: index });
    });

    // 按顺序显示各题型
    const typeOrder = ['单选题', '多选题', '判断题', '填空题', '简答题'];
    typeOrder.forEach(function(type) {
        if (groups[type]) {
            // 创建分组标题
            const titleDiv = document.createElement('div');
            titleDiv.className = 'jump-group-title';
            titleDiv.textContent = type;
            panel.appendChild(titleDiv);

            // 创建分组容器
            const groupDiv = document.createElement('div');
            groupDiv.className = 'jump-group';

            groups[type].forEach(function(item) {
                const btn = document.createElement('button');
                btn.className = 'jump-btn';
                // 直接显示完整id
                btn.textContent = item.question.id;

                if (item.index === currentQuestionIndex) btn.classList.add('current');
                if (userAnswers[item.question.id]) btn.classList.add('answered');
                if (markedQuestions.includes(item.question.id)) btn.classList.add('marked');

                btn.onclick = function() {
                    currentQuestionIndex = item.index;
                    showQuestion();
                };

                groupDiv.appendChild(btn);
            });

            panel.appendChild(groupDiv);
        }
    });
}

// ═════════════════════════════════════════════════════
// 十三、错题本
// ═════════════════════════════════════════════════════

/**
 * 将错题加入错题本
 */
function addToWrongBook(question, userAnswer) {
    let wrongBook = [];
    try {
        wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
    } catch (e) {
        console.warn('读取错题本失败:', e);
    }
    const exists = wrongBook.find(function(w) { return w.id === question.id; });

    if (!exists) {
        wrongBook.push({
            id: question.id,
            type: question.type,
            question: question.question,
            options: question.options,
            answer: question.answer,
            userAnswer: userAnswer,
            analysis: question.analysis,
            category: question.category
        });
        try {
            localStorage.setItem('wrongBook', JSON.stringify(wrongBook));
        } catch (e) {
            console.warn('保存错题本失败:', e);
        }
    }
}

/**
 * 显示错题本页面
 */
function showWrongBook() {
    let wrongBook = [];
    try {
        wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
    } catch (e) {
        console.warn('读取错题本失败:', e);
    }
    const content = document.getElementById('wrongbook-content');

    if (wrongBook.length === 0) {
        content.innerHTML = '<div class="empty-state"><div class="empty-icon">🎉</div><p>太棒了！暂无错题！</p></div>';
    } else {
        let html = '';
        html += '<div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">';
        html += '<p style="color: #666;">共 ' + wrongBook.length + ' 道错题</p>';
        html += '<button class="btn btn-secondary" onclick="clearWrongBook()">🗑️ 清空错题</button>';
        html += '</div>';
        html += '<div class="error-list">';
        wrongBook.map(function(w, index) {
            let cleanQuestion = w.question;
            cleanQuestion = cleanQuestion.replace(/^(单选题|多选题|判断题|填空题|简答题)\d+、/, '');
            html += '<div class="error-item" onclick="reviewWrong(' + index + ')">';
            html += '<div class="error-question"><strong>' + escapeHtml(w.type) + '</strong> ' + escapeHtml(cleanQuestion) + '</div>';
            html += '<div class="error-category">' + w.category + '</div>';
            html += '</div>';
        });
        html += '</div>';
        content.innerHTML = html;
    }

    document.getElementById('home-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('wrongbook-page').style.display = 'block';
    document.getElementById('stats-page').style.display = 'none';
}

/**
 * 复习指定错题
 */
function reviewWrong(index) {
    let wrongBook = [];
    try {
        wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
    } catch (e) {
        console.warn('读取错题本失败:', e);
    }
    const wrong = wrongBook[index];

    currentQuestionIndex = questions.findIndex(function(q) { return q.id === wrong.id; });
    if (currentQuestionIndex === -1) {
        alert('题目不存在');
        return;
    }

    document.getElementById('wrongbook-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    showQuestion();
}

/**
 * 清空错题本
 */
function clearWrongBook() {
    if (confirm('确定要清空所有错题吗？')) {
        try {
            localStorage.removeItem('wrongBook');
        } catch (e) {
            console.warn('清空错题本失败:', e);
        }
        showWrongBook();
    }
}

// ═════════════════════════════════════════════════════
// 十四、统计与更新
// ═════════════════════════════════════════════════════

/**
 * 更新答题统计（写入 localStorage）
 */
function updateStats() {
    let stats = {total: 0, correct: 0};
    try {
        stats = JSON.parse(localStorage.getItem('quizStats') || '{"total":0,"correct":0}');
    } catch (e) {
        console.warn('读取统计失败:', e);
    }
    stats.total++;
    const question = questions[currentQuestionIndex];
    let isCorrect = false;

    if (question.type === '多选题') {
        isCorrect = JSON.stringify((userAnswers[question.id] || []).sort()) === JSON.stringify(question.answer.sort());
    } else if (question.type === '判断题') {
        isCorrect = (userAnswers[question.id] === '对') === question.answer;
    } else if (question.type === '填空题') {
        isCorrect = (userAnswers[question.id] || '').trim().toLowerCase() === question.answer.trim().toLowerCase();
    } else if (question.type === '简答题') {
        const scoreResult = calculateEssayScore(userAnswers[question.id] || '', question.answer, question);
        isCorrect = scoreResult.score >= 60;
    } else {
        isCorrect = userAnswers[question.id] === question.answer;
    }

    if (isCorrect) stats.correct++;
    try {
        localStorage.setItem('quizStats', JSON.stringify(stats));
    } catch (e) {
        console.warn('保存统计失败:', e);
    }
}

/**
 * 显示统计页面
 */
function showStats() {
    let stats = {total: 0, correct: 0};
    try {
        stats = JSON.parse(localStorage.getItem('quizStats') || '{"total":0,"correct":0}');
    } catch (e) {
        console.warn('读取统计失败:', e);
    }
    let wrongBook = [];
    try {
        wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
    } catch (e) {
        console.warn('读取错题本失败:', e);
    }
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

    document.getElementById('stats-total').textContent = stats.total;
    document.getElementById('stats-correct').textContent = stats.correct;
    document.getElementById('stats-accuracy').textContent = accuracy + '%';
    document.getElementById('stats-wrong').textContent = wrongBook.length;

    document.getElementById('home-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('wrongbook-page').style.display = 'none';
    document.getElementById('stats-page').style.display = 'block';
}

// ═════════════════════════════════════════════════════
// 十五、测验结束与结果报告
// ═════════════════════════════════════════════════════

/**
 * 结束测验并展示结果
 */
function finishQuiz() {
    clearInterval(timerInterval);

    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeStr = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

    const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

    document.getElementById('result-score').textContent = accuracy + '分';
    document.getElementById('result-label').textContent = getScoreLabel(accuracy);
    document.getElementById('stat-answered').textContent = totalAnswered;
    document.getElementById('stat-correct').textContent = totalCorrect;
    document.getElementById('stat-accuracy').textContent = accuracy + '%';
    document.getElementById('stat-time').textContent = timeStr;

    // 收集错题数据
    const wrongQuestions = [];
    questions.forEach(function(q) {
        const userAnswer = userAnswers[q.id];
        let isWrong = false;

        if (q.type === '多选题') {
            isWrong = JSON.stringify((userAnswer || []).sort()) !== JSON.stringify(q.answer.sort());
        } else if (q.type === '判断题') {
            isWrong = (userAnswer === '对') !== q.answer;
        } else if (q.type === '填空题') {
            isWrong = (userAnswer || '').trim().toLowerCase() !== q.answer.trim().toLowerCase();
        } else if (q.type === '简答题') {
            const scoreResult = calculateEssayScore(userAnswer || '', q.answer, q);
            isWrong = scoreResult.score < 60;
        } else {
            isWrong = userAnswer !== q.answer;
        }

        if (isWrong) {
            wrongQuestions.push({
                id: q.id,
                type: q.type,
                question: q.question,
                category: q.category,
                userAnswer: userAnswer,
                correctAnswer: q.answer
            });
        }
    });

    // 保存答题记录
    saveQuizResult(totalCorrect, totalAnswered, wrongQuestions);

    showWeaknessAnalysis();
    showErrorList();

    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
}

/**
 * 根据正确率获取评价标签
 */
function getScoreLabel(score) {
    if (score >= 90) return '🏆 优秀！继续保持！';
    if (score >= 80) return '👍 良好！再接再厉！';
    if (score >= 60) return '💪 及格！还需努力！';
    return '📚 需要多加练习！';
}

/**
 * 显示薄弱知识点分析
 */
function showWeaknessAnalysis() {
    const weaknessList = document.getElementById('weakness-list');
    weaknessList.innerHTML = '';

    const categoryStats = {};
    questions.forEach(function(q) {
        if (!categoryStats[q.category]) {
            categoryStats[q.category] = { total: 0, wrong: 0 };
        }
        categoryStats[q.category].total++;

        const userAnswer = userAnswers[q.id];
        let isWrong = false;

        if (q.type === '多选题') {
            isWrong = JSON.stringify((userAnswer || []).sort()) !== JSON.stringify(q.answer.sort());
        } else if (q.type === '判断题') {
            isWrong = (userAnswer === '对') !== q.answer;
        } else if (q.type === '填空题') {
            isWrong = (userAnswer || '').trim().toLowerCase() !== q.answer.trim().toLowerCase();
        } else if (q.type !== '简答题') {
            isWrong = userAnswer !== q.answer;
        }

        if (isWrong) categoryStats[q.category].wrong++;
    });

    const weaknesses = Object.entries(categoryStats)
        .filter(function(entry) { return entry[1].wrong > 0; })
        .sort(function(a, b) { return b[1].wrong - a[1].wrong; })
        .slice(0, 5);

    if (weaknesses.length === 0) {
        weaknessList.innerHTML = '<span class="weakness-tag">🎉 暂无薄弱知识点！</span>';
    } else {
        weaknesses.forEach(function(entry) {
            const category = entry[0];
            const stats = entry[1];
            const tag = document.createElement('span');
            tag.className = 'weakness-tag';
            tag.textContent = category + ' (错误' + stats.wrong + '次)';
            weaknessList.appendChild(tag);
        });
    }
}

/**
 * 显示结果页错误列表
 */
function showErrorList() {
    const errorList = document.getElementById('result-errors');
    errorList.innerHTML = '';

    questions.forEach(function(q) {
        const userAnswer = userAnswers[q.id];
        let isWrong = false;

        if (!userAnswer) return;

        if (q.type === '多选题') {
            isWrong = JSON.stringify((userAnswer || []).sort()) !== JSON.stringify(q.answer.sort());
        } else if (q.type === '判断题') {
            isWrong = (userAnswer === '对') !== q.answer;
        } else if (q.type === '填空题') {
            isWrong = (userAnswer || '').trim().toLowerCase() !== q.answer.trim().toLowerCase();
        } else if (q.type !== '简答题') {
            isWrong = userAnswer !== q.answer;
        }

        if (isWrong) {
            let cleanQuestion = q.question;
            cleanQuestion = cleanQuestion.replace(/^(单选题|多选题|判断题|填空题|简答题)\d+、/, '');
            const item = document.createElement('div');
            item.className = 'error-item';
            item.innerHTML = '<div class="error-question">' + escapeHtml(cleanQuestion) + '</div><div class="error-category">' + escapeHtml(q.category) + '</div>';
            item.onclick = function() {
                currentQuestionIndex = questions.indexOf(q);
                document.getElementById('result-page').style.display = 'none';
                document.getElementById('quiz-page').style.display = 'block';
                showQuestion();
                submitAnswer();
            };
            errorList.appendChild(item);
        }
    });
}

/**
 * 切换结果页标签
 */
function showResultTab(tab, clickedElement) {
    document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
    if (clickedElement) clickedElement.classList.add('active');

    if (tab === 'overview') {
        document.getElementById('result-overview').style.display = 'block';
        document.getElementById('result-errors').style.display = 'none';
    } else {
        document.getElementById('result-overview').style.display = 'none';
        document.getElementById('result-errors').style.display = 'block';
    }
}

/**
 * 保存测验结果到本地记录
 */
function saveQuizResult(correctCount, totalQuestions, wrongQuestions) {
    const record = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        totalQuestions: totalQuestions,
        correctCount: correctCount,
        accuracy: totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0,
        wrongQuestions: wrongQuestions
    };

    let quizRecords = [];
    try {
        quizRecords = JSON.parse(localStorage.getItem('quizRecords') || '[]');
    } catch (e) {
        console.warn('读取答题记录失败:', e);
    }

    quizRecords.push(record);

    try {
        localStorage.setItem('quizRecords', JSON.stringify(quizRecords));
    } catch (e) {
        console.warn('保存答题记录失败:', e);
    }
}

// ═════════════════════════════════════════════════════
// 十六、数据导出
// ═════════════════════════════════════════════════════

/**
 * 导出全部本地数据（JSON）
 */
function exportAllData() {
    // 收集所有数据
    const data = {
        exportTime: new Date().toISOString(),
        quizRecords: [],
        wrongBook: [],
        feedbacks: []
    };

    try {
        data.quizRecords = JSON.parse(localStorage.getItem('quizRecords') || '[]');
    } catch (e) {
        console.warn('读取答题记录失败:', e);
    }

    try {
        data.wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
    } catch (e) {
        console.warn('读取错题本失败:', e);
    }

    try {
        data.feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    } catch (e) {
        console.warn('读取反馈失败:', e);
    }

    // 生成文件名
    const fileName = '题库数据_' + new Date().toLocaleDateString('zh-CN').replace(/\//g, '-') + '.json';

    // 导出为JSON文件
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('数据导出成功！文件已下载。\n请将此文件发送给老师汇总。');
}

/**
 * 导出错题本
 * @param {string} format - 'txt' 或 'json'
 */
function exportWrongBook(format) {
    let wrongBook = [];
    try {
        wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
    } catch (e) {
        console.warn('读取错题本失败:', e);
        alert('导出失败：无法读取错题本数据');
        return;
    }

    if (wrongBook.length === 0) {
        alert('错题本为空，无需导出');
        return;
    }

    let content = '';
    let mimeType = '';
    let extension = '';

    if (format === 'txt') {
        content = '===== 数据库安全技术测验错题本 =====\n';
        content += '导出时间：' + new Date().toLocaleString('zh-CN') + '\n';
        content += '错题数量：' + wrongBook.length + '\n';
        content += '=====================================\n\n';
        wrongBook.forEach(function(w, i) {
            let cleanQuestion = w.question.replace(/^(单选题|多选题|判断题|填空题|简答题)\d+、/, '');
            content += '【' + (i + 1) + '】' + w.type + '\n';
            content += '题目：' + cleanQuestion + '\n';
            content += '分类：' + (w.category || '未分类') + '\n';
            if (w.options && w.options.length > 0) {
                content += '选项：\n';
                w.options.forEach(function(opt, idx) {
                    content += '  ' + String.fromCharCode(65 + idx) + '. ' + opt.substring(2) + '\n';
                });
            }
            const ans = Array.isArray(w.answer) ? w.answer.join(', ') : w.answer;
            content += '正确答案：' + ans + '\n';
            const uAns = Array.isArray(w.userAnswer) ? w.userAnswer.join(', ') : (w.userAnswer || '未作答');
            content += '你的答案：' + uAns + '\n';
            content += '解析：' + (w.analysis || '暂无解析') + '\n';
            content += '-------------------------------------\n\n';
        });
        mimeType = 'text/plain';
        extension = 'txt';
    } else if (format === 'json') {
        content = JSON.stringify({
            exportTime: new Date().toISOString(),
            count: wrongBook.length,
            wrongBook: wrongBook
        }, null, 2);
        mimeType = 'application/json';
        extension = 'json';
    } else {
        alert('不支持的格式：' + format);
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '错题本_' + new Date().toLocaleDateString('zh-CN').replace(/\//g, '-') + '.' + extension;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('错题本导出成功！');
}

/**
 * 导出测评报告（包含正确率、薄弱知识点、用时等）
 */
function exportQuizReport() {
    let quizRecords = [];
    try {
        quizRecords = JSON.parse(localStorage.getItem('quizRecords') || '[]');
    } catch (e) {
        console.warn('读取答题记录失败:', e);
    }

    let wrongBook = [];
    try {
        wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
    } catch (e) {
        console.warn('读取错题本失败:', e);
    }

    let stats = { total: 0, correct: 0 };
    try {
        stats = JSON.parse(localStorage.getItem('quizStats') || '{"total":0,"correct":0}');
    } catch (e) {
        console.warn('读取统计失败:', e);
    }

    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

    // 统计薄弱知识点
    const categoryStats = {};
    wrongBook.forEach(function(w) {
        const cat = w.category || '未分类';
        if (!categoryStats[cat]) categoryStats[cat] = 0;
        categoryStats[cat]++;
    });
    const weaknesses = Object.entries(categoryStats)
        .sort(function(a, b) { return b[1] - a[1]; });

    const report = {
        exportTime: new Date().toISOString(),
        summary: {
            totalAnswered: stats.total,
            totalCorrect: stats.correct,
            accuracy: accuracy + '%',
            wrongCount: wrongBook.length,
            totalQuizCount: quizRecords.length
        },
        weaknesses: weaknesses.map(function(entry) {
            return { category: entry[0], wrongCount: entry[1] };
        }),
        recentRecords: quizRecords.slice(-10)
    };

    const content = JSON.stringify(report, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '测评报告_' + new Date().toLocaleDateString('zh-CN').replace(/\//g, '-') + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('测评报告导出成功！');
}

// ═════════════════════════════════════════════════════
// 十七、数据收集与反馈
// ═════════════════════════════════════════════════════

/**
 * 显示数据收集页面
 */
function showDataCollection() {
    // 读取本地数据
    let quizRecords = [];
    try {
        quizRecords = JSON.parse(localStorage.getItem('quizRecords') || '[]');
    } catch (e) {
        console.warn('读取答题记录失败:', e);
    }

    let wrongBook = [];
    try {
        wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
    } catch (e) {
        console.warn('读取错题本失败:', e);
    }

    // 计算统计数据
    const totalRecords = quizRecords.length;
    let totalQuestions = 0;
    let totalCorrect = 0;
    const categoryErrors = {};

    quizRecords.forEach(function(record) {
        totalQuestions += record.totalQuestions || 0;
        totalCorrect += record.correctCount || 0;

        // 统计错题知识点
        if (record.wrongQuestions) {
            record.wrongQuestions.forEach(function(q) {
                const cat = q.category || '未分类';
                categoryErrors[cat] = (categoryErrors[cat] || 0) + 1;
            });
        }
    });

    // 计算平均正确率
    const avgAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    // 更新显示
    document.getElementById('my-total').textContent = totalRecords;
    document.getElementById('my-avg-accuracy').textContent = avgAccuracy + '%';

    // 显示薄弱知识点
    const weaknessDiv = document.getElementById('my-weakness');
    if (Object.keys(categoryErrors).length > 0) {
        let weaknessHtml = '<div style="display:flex;flex-wrap:wrap;gap:8px;">';
        const sortedCategories = Object.entries(categoryErrors).sort(function(a, b) { return b[1] - a[1]; });
        sortedCategories.forEach(function(entry) {
            weaknessHtml += '<span class="knowledge-tag">' + entry[0] + ' (' + entry[1] + '次)</span>';
        });
        weaknessHtml += '</div>';
        weaknessDiv.innerHTML = weaknessHtml;
    } else {
        weaknessDiv.innerHTML = '<p>暂无错题记录</p>';
    }

    // 切换页面
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('wrongbook-page').style.display = 'none';
    document.getElementById('stats-page').style.display = 'none';
    document.getElementById('data-collection-page').style.display = 'block';
}

/**
 * 提交用户反馈
 */
function submitFeedback() {
    const name = document.getElementById('feedback-name').value.trim();
    const content = document.getElementById('feedback-content').value.trim();

    if (!content) {
        alert('请填写反馈内容！');
        return;
    }

    const feedback = {
        id: Date.now(),
        name: name || '匿名用户',
        content: content,
        timestamp: new Date().toISOString()
    };

    // 保存到本地
    let feedbacks = [];
    try {
        feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    } catch (e) {
        console.warn('读取反馈失败:', e);
    }

    feedbacks.push(feedback);

    try {
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    } catch (e) {
        console.warn('保存反馈失败:', e);
    }

    alert('感谢您的反馈！🎉');
    document.getElementById('feedback-name').value = '';
    document.getElementById('feedback-content').value = '';
}

/**
 * 预览本地数据
 */
function viewLocalData() {
    const data = {
        quizRecords: JSON.parse(localStorage.getItem('quizRecords') || '[]'),
        wrongBook: JSON.parse(localStorage.getItem('wrongBook') || '[]'),
        feedbacks: JSON.parse(localStorage.getItem('feedbacks') || '[]')
    };

    const preview = '📊 本地数据预览：\n\n' +
        '答题次数：' + data.quizRecords.length + '\n' +
        '错题数量：' + data.wrongBook.length + '\n' +
        '反馈数量：' + data.feedbacks.length + '\n\n' +
        '如需查看详细数据，请点击"导出全部数据"按钮。';

    alert(preview);
}

// ═════════════════════════════════════════════════════
// 十八、页面初始化与事件绑定
// ═════════════════════════════════════════════════════

/**
 * 初始化主题（页面加载时调用）
 */
function initTheme() {
    const savedTheme = getTheme();
    document.body.setAttribute('data-theme', savedTheme);
}

// 页面卸载时清理资源
window.addEventListener('beforeunload', function() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if ('speechSynthesis' in window && typeof speechSynthesis !== 'undefined') {
        try {
            speechSynthesis.cancel();
        } catch (e) {}
    }
});

// 页面初始化（兼容 defer 脚本：DOMContentLoaded 可能已触发）
function initApp() {
    initTheme();
    var overlay = document.getElementById('consent-overlay');
    var modal = document.getElementById('consent-modal');
    if (overlay) overlay.style.display = 'block';
    if (modal) modal.style.display = 'block';
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// quiz.js 加载完成
