// 游戏逻辑文件
let currentTask = null;
let selectedChars = new Set();

// 初始化游戏
function initGame() {
    loadGameData();
    generateTasks();
    updateUI();
    console.log('Game initialized with', gameData.texts.length, 'chapters');
}

// 加载游戏数据
function loadGameData() {
    try {
        const saved = localStorage.getItem('standaloneGameData');
        if (saved) {
            const parsed = JSON.parse(saved);
            gameData.user.balance = parsed.user.balance || "30.00";
            gameData.user.completed = parsed.user.completed || 0;
            if (parsed.tasks) gameData.tasks = parsed.tasks;
        }
    } catch (error) {
        console.error('Load error:', error);
    }
}

// 保存游戏数据
function saveGameData() {
    try {
        localStorage.setItem('standaloneGameData', JSON.stringify(gameData));
    } catch (error) {
        console.error('Save error:', error);
    }
}

// 生成任务
function generateTasks() {
    if (!gameData.tasks || gameData.tasks.length === 0) {
        gameData.tasks = gameData.texts.map(text => ({
            id: text.id,
            textId: text.id,
            reward: "30.00",
            status: "pending",
            foundTypos: 0,
            totalTypos: text.typos ? text.typos.length : 0,
            text: text
        }));
    }
}

// 更新UI
function updateUI() {
    updateBalance();
    updateTaskList();
}

// 更新余额显示
function updateBalance() {
    document.getElementById('userBalance').textContent = '¥' + gameData.user.balance;
    document.getElementById('userCompleted').textContent = gameData.user.completed;
}

// 更新任务列表
function updateTaskList() {
    const taskList = document.getElementById('taskList');
    if (!taskList) {
        console.error('TaskList element not found');
        return;
    }
    
    taskList.innerHTML = '';
    console.log('Updating task list with', gameData.tasks.length, 'tasks');

    gameData.tasks.forEach(task => {
        const isCompleted = task.status === 'completed';
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        
        // 获取章节标题
        let chapterTitle = '非强迫宠爱第' + task.id + '章';
        if (task.text && task.text.content) {
            const firstLine = task.text.content.split('\n')[0];
            if (firstLine && firstLine.includes('章')) {
                chapterTitle = firstLine;
            }
        }
        
        taskCard.innerHTML = 
            '<div class="task-header">' +
                '<div class="task-icon ' + (isCompleted ? 'completed' : 'pending') + '">' +
                    (isCompleted ? '✓' : '📄') +
                '</div>' +
                '<div class="task-content">' +
                    '<div class="task-title">' + chapterTitle + '</div>' +
                    '<div class="task-status ' + (isCompleted ? 'completed' : '') + '">' +
                        (isCompleted ? '已完成 - 已到账' : '点击任意文字获得奖励') +
                    '</div>' +
                '</div>' +
                '<div class="task-reward">' +
                    '<div class="task-amount ' + (isCompleted ? 'completed' : '') + '">' +
                        '+¥' + task.reward +
                    '</div>' +
                    '<button class="task-button ' + (isCompleted ? 'completed' : '') + '"' +
                            (isCompleted ? ' disabled' : '') + '>' +
                        (isCompleted ? '已完成' : '进行修改') +
                    '</button>' +
                '</div>' +
            '</div>';

        if (!isCompleted) {
            taskCard.onclick = function() { openTask(task); };
        }

        taskList.appendChild(taskCard);
        console.log('Added task card for chapter:', chapterTitle);
    });
}

// 打开任务
function openTask(task) {
    currentTask = task;
    selectedChars.clear();
    
    document.getElementById('modalReward').textContent = task.reward;
    document.getElementById('textContent').innerHTML = createClickableText(task.text.content);
    document.getElementById('taskModal').style.display = 'block';
    
    updateCharDisplay();
    updateSubmitButton();
}

// 创建可点击的文本
function createClickableText(content) {
    return content.split('').map(function(char, index) {
        if (char === '\n') return '<br>';
        return '<span class="clickable-char" data-index="' + index + '">' + char + '</span>';
    }).join('');
}

// 切换字符选择状态
function toggleChar(index) {
    if (selectedChars.has(index)) {
        selectedChars.delete(index);
    } else {
        selectedChars.add(index);
    }
    updateCharDisplay();
    updateSubmitButton();
}

// 更新字符显示
function updateCharDisplay() {
    const chars = document.querySelectorAll('.clickable-char');
    chars.forEach(function(char, index) {
        char.onclick = function() { toggleChar(index); };
        if (selectedChars.has(index)) {
            char.classList.add('selected-char');
        } else {
            char.classList.remove('selected-char');
        }
    });
}

// 更新提交按钮状态
function updateSubmitButton() {
    const submitBtn = document.getElementById('submitButton');
    submitBtn.disabled = selectedChars.size === 0;
}

// 提交任务
function submitTask() {
    if (!currentTask || selectedChars.size === 0) return;

    const currentBalance = parseFloat(gameData.user.balance);
    const rewardAmount = parseFloat(currentTask.reward);
    const newBalance = (currentBalance + rewardAmount).toFixed(2);
    
    // 更新用户数据
    gameData.user.balance = newBalance;
    gameData.user.completed += 1;
    
    // 更新任务状态
    currentTask.status = 'completed';
    currentTask.foundTypos = selectedChars.size;
    
    // 保存数据
    saveGameData();
    
    // 关闭模态框
    closeModal();
    
    // 显示奖励通知
    showRewardNotification(rewardAmount);
    
    // 更新UI
    updateUI();
}

// 显示奖励通知
function showRewardNotification(amount) {
    const notification = document.getElementById('rewardNotification');
    const rewardAmount = document.getElementById('rewardAmount');
    
    if (notification && rewardAmount) {
        rewardAmount.textContent = '+¥' + amount.toFixed(2);
        notification.style.display = 'block';
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.style.display = 'none';
            notification.classList.remove('show');
        }, 3000);
    }
}

// 关闭模态框
function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
    currentTask = null;
    selectedChars.clear();
}

// 重置任务
function resetTasks() {
    if (confirm('确定要重置所有进度吗？这将清除所有已完成的任务和余额。')) {
        // 重置用户数据
        gameData.user.balance = "30.00";
        gameData.user.completed = 0;
        
        // 重置所有任务状态
        gameData.tasks.forEach(task => {
            task.status = 'pending';
            task.foundTypos = 0;
        });
        
        // 保存并更新
        saveGameData();
        updateUI();
        
        alert('游戏已重置！');
    }
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('taskModal');
    if (event.target === modal) {
        closeModal();
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', function() {
    initGame();
});