// ==================== GAME STATE ====================
let gameState = {
    score: 0,
    timeLeft: 30,
    highScore: 0,
    isPlaying: false,
    difficulty: 'easy',
    combo: 0,
    maxCombo: 0,
    clickTimes: [],
    soundEnabled: true
};

const difficulties = {
    easy: 30,
    medium: 20,
    hard: 10
};

// ==================== DOM ELEMENTS ====================
const startScreen = document.getElementById('startScreen');
const playingScreen = document.getElementById('playingScreen');
const gameoverScreen = document.getElementById('gameoverScreen');
const leaderboardScreen = document.getElementById('leaderboardScreen');

const startBtn = document.getElementById('startBtn');
const clickButton = document.getElementById('clickButton');
const playAgainBtn = document.getElementById('playAgainBtn');
const viewLeaderboardBtn = document.getElementById('viewLeaderboardBtn');
const backToMenuBtn = document.getElementById('backToMenuBtn');

const scoreDisplay = document.getElementById('scoreDisplay');
const timerDisplay = document.getElementById('timerDisplay');
const highScoreDisplay = document.getElementById('highScoreDisplay');
const finalScore = document.getElementById('finalScore');
const cpsDisplay = document.getElementById('cpsDisplay');
const maxComboDisplay = document.getElementById('maxComboDisplay');
const resultTitle = document.getElementById('resultTitle');
const newRecord = document.getElementById('newRecord');

const clickAnimation = document.getElementById('clickAnimation');
const comboDisplay = document.getElementById('comboDisplay');
const comboCount = document.getElementById('comboCount');
const comboProgress = document.getElementById('comboProgress');

const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const soundToggle = document.getElementById('soundToggle');

let timerInterval = null;
let comboTimeout = null;

// ==================== WEB AUDIO API SETUP ====================
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

function playSound(frequency = 440, duration = 0.1, type = 'sine') {
    if (!gameState.soundEnabled) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

function playClickSound() {
    const baseFreq = 440;
    const comboBonus = gameState.combo * 50;
    playSound(baseFreq + comboBonus, 0.05, 'square');
}

function playSuccessSound() {
    playSound(523.25, 0.1, 'sine'); // C
    setTimeout(() => playSound(659.25, 0.1, 'sine'), 100); // E
    setTimeout(() => playSound(783.99, 0.2, 'sine'), 200); // G
}

function playGameOverSound() {
    playSound(392, 0.2, 'sawtooth'); // G
    setTimeout(() => playSound(349.23, 0.2, 'sawtooth'), 200); // F
    setTimeout(() => playSound(293.66, 0.4, 'sawtooth'), 400); // D
}

// ==================== LOCAL STORAGE ====================
function loadHighScore() {
    const saved = localStorage.getItem('clickMasterHighScore');
    gameState.highScore = saved ? parseInt(saved) : 0;
    highScoreDisplay.textContent = gameState.highScore;
}

function saveHighScore() {
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('clickMasterHighScore', gameState.highScore);
        return true;
    }
    return false;
}

function saveToLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('clickMasterLeaderboard') || '[]');

    const entry = {
        score: gameState.score,
        difficulty: gameState.difficulty,
        date: new Date().toLocaleDateString(),
        cps: calculateCPS()
    };

    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard.splice(10); // Keep top 10

    localStorage.setItem('clickMasterLeaderboard', JSON.stringify(leaderboard));
}

function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('clickMasterLeaderboard') || '[]');
    const tbody = document.getElementById('leaderboardBody');
    const noScores = document.getElementById('noScores');

    tbody.innerHTML = '';

    if (leaderboard.length === 0) {
        noScores.classList.remove('hidden');
        return;
    }

    noScores.classList.add('hidden');

    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${entry.score}</strong></td>
            <td>${entry.difficulty.toUpperCase()}</td>
            <td>${entry.date}</td>
        `;
        tbody.appendChild(row);
    });
}

// ==================== DIFFICULTY SELECTION ====================
difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        difficultyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gameState.difficulty = btn.getAttribute('data-difficulty');
    });
});

// ==================== SOUND TOGGLE ====================
soundToggle.addEventListener('change', (e) => {
    gameState.soundEnabled = e.target.checked;
});

// ==================== SCREEN TRANSITIONS ====================
function showScreen(screen) {
    [startScreen, playingScreen, gameoverScreen, leaderboardScreen].forEach(s => {
        s.classList.add('hidden');
    });
    screen.classList.remove('hidden');
}

// ==================== GAME FUNCTIONS ====================
function startGame() {
    gameState.score = 0;
    gameState.timeLeft = difficulties[gameState.difficulty];
    gameState.isPlaying = true;
    gameState.combo = 0;
    gameState.maxCombo = 0;
    gameState.clickTimes = [];

    updateScore();
    updateTimer();
    showScreen(playingScreen);

    timerInterval = setInterval(() => {
        gameState.timeLeft--;
        updateTimer();

        if (gameState.timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // Resume audio context (browsers require user interaction)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    playSuccessSound();
}

function endGame() {
    gameState.isPlaying = false;
    clearInterval(timerInterval);
    comboDisplay.classList.remove('active');

    const isNewRecord = saveHighScore();
    saveToLeaderboard();

    finalScore.textContent = gameState.score;
    cpsDisplay.textContent = calculateCPS().toFixed(2);
    maxComboDisplay.textContent = gameState.maxCombo;

    if (isNewRecord) {
        newRecord.classList.remove('hidden');
        resultTitle.textContent = '🎉 New High Score!';
        playSuccessSound();
    } else {
        newRecord.classList.add('hidden');
        resultTitle.textContent = getResultMessage(gameState.score);
    }

    highScoreDisplay.textContent = gameState.highScore;

    showScreen(gameoverScreen);
    playGameOverSound();
}

function getResultMessage(score) {
    if (score >= 100) return 'Incredible! 🔥';
    if (score >= 75) return 'Awesome! 🌟';
    if (score >= 50) return 'Great Job! 👏';
    if (score >= 25) return 'Good Effort! 👍';
    return 'Keep Practicing! 💪';
}

function calculateCPS() {
    const duration = difficulties[gameState.difficulty];
    return gameState.score / duration;
}

function updateScore() {
    scoreDisplay.textContent = gameState.score;
}

function updateTimer() {
    timerDisplay.textContent = gameState.timeLeft;

    // Change color based on time
    const timerStat = document.querySelector('.timer-stat');
    if (gameState.timeLeft <= 5) {
        timerStat.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)';
    } else if (gameState.timeLeft <= 10) {
        timerStat.style.background = 'linear-gradient(135deg, #ffe66d 0%, #ffb347 100%)';
    } else {
        timerStat.style.background = 'var(--gradient-game)';
    }
}

function updateCombo() {
    comboCount.textContent = gameState.combo;

    if (gameState.combo > 0) {
        comboDisplay.classList.add('active');
        const progress = Math.min((gameState.combo / 20) * 100, 100);
        comboProgress.style.width = progress + '%';
    } else {
        comboDisplay.classList.remove('active');
        comboProgress.style.width = '0%';
    }

    if (gameState.combo > gameState.maxCombo) {
        gameState.maxCombo = gameState.combo;
    }
}

// ==================== CLICK HANDLER ====================
clickButton.addEventListener('click', (e) => {
    if (!gameState.isPlaying) return;

    // Increment score
    gameState.score++;
    gameState.combo++;
    updateScore();
    updateCombo();

    // Track click time for CPS calculation
    gameState.clickTimes.push(Date.now());

    // Play sound
    playClickSound();

    // Show +1 animation
    clickAnimation.classList.remove('active');
    void clickAnimation.offsetWidth; // Force reflow
    clickAnimation.classList.add('active');

    // Ripple effect
    const ripple = clickButton.querySelector('.button-ripple');
    const rect = clickButton.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.remove('active');
    void ripple.offsetWidth;
    ripple.classList.add('active');

    // Create particle
    createParticle(e.clientX, e.clientY);

    // Combo timeout
    clearTimeout(comboTimeout);
    comboTimeout = setTimeout(() => {
        gameState.combo = 0;
        updateCombo();
    }, 1500);
});

// ==================== PARTICLE EFFECTS ====================
function createParticle(x, y) {
    const particles = document.getElementById('particles');
    const particle = document.createElement('div');
    particle.className = 'particle';

    const emojis = ['⭐', '✨', '💥', '🔥', '💫', '🌟', '⚡'];
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    particles.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// ==================== EVENT LISTENERS ====================
startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', () => {
    showScreen(startScreen);
});

viewLeaderboardBtn.addEventListener('click', () => {
    loadLeaderboard();
    showScreen(leaderboardScreen);
});

backToMenuBtn.addEventListener('click', () => {
    showScreen(startScreen);
});

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && gameState.isPlaying) {
        e.preventDefault();
        clickButton.click();
    }

    if (e.code === 'Enter' && !gameState.isPlaying && !startScreen.classList.contains('hidden')) {
        startGame();
    }

    if (e.code === 'Escape' && gameState.isPlaying) {
        endGame();
    }
});

// ==================== PREVENT DOUBLE TAP ZOOM ON MOBILE ====================
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ==================== PREVENT CONTEXT MENU ON GAME BUTTON ====================
clickButton.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// ==================== INITIALIZATION ====================
function init() {
    loadHighScore();
    console.log('%c🎮 Click Master Game', 'color: #FF6B6B; font-size: 24px; font-weight: bold;');
    console.log('%cTip: Press SPACE to click, ENTER to start, ESC to end game', 'color: #4ECDC4; font-size: 12px;');
    console.log('%cChallenge: Can you beat 100 clicks?', 'color: #FFE66D; font-size: 14px;');
}

init();

// ==================== AUTO-SAVE HIGH SCORE ====================
window.addEventListener('beforeunload', () => {
    if (gameState.score > 0) {
        saveHighScore();
    }
});

// ==================== EASTER EGG: KONAMI CODE ====================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

    if (konamiCode.join(',').includes(konamiSequence.join(','))) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    const body = document.body;
    body.style.animation = 'rainbow 2s linear infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        body.style.animation = '';
        style.remove();
    }, 10000);

    console.log('%c🎉 RAINBOW MODE ACTIVATED!', 'color: #FF6B6B; font-size: 20px; font-weight: bold;');
}

// ==================== PERFORMANCE TRACKING ====================
if (performance && performance.mark) {
    performance.mark('game-loaded');
    console.log('%cGame loaded successfully!', 'color: #51CF66; font-size: 12px;');
}

// ==================== BONUS FEATURES ====================

// Add visual feedback for high combos
function checkHighCombo() {
    if (gameState.combo >= 10) {
        comboDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => {
            comboDisplay.style.transform = 'scale(1)';
        }, 300);
    }
}

// Update the updateCombo function to include this
const originalUpdateCombo = updateCombo;
updateCombo = function() {
    originalUpdateCombo();
    checkHighCombo();
};

// ==================== ACHIEVEMENTS (Optional Enhancement) ====================
const achievements = {
    firstClick: { name: 'First Click!', unlocked: false },
    speed10: { name: 'Speed Demon', unlocked: false, requirement: 10 },
    combo20: { name: 'Combo Master', unlocked: false, requirement: 20 },
    score100: { name: 'Century Club', unlocked: false, requirement: 100 }
};

function checkAchievements() {
    if (gameState.score === 1 && !achievements.firstClick.unlocked) {
        unlockAchievement('firstClick');
    }
    if (calculateCPS() >= 10 && !achievements.speed10.unlocked) {
        unlockAchievement('speed10');
    }
    if (gameState.combo >= 20 && !achievements.combo20.unlocked) {
        unlockAchievement('combo20');
    }
    if (gameState.score >= 100 && !achievements.score100.unlocked) {
        unlockAchievement('score100');
    }
}

function unlockAchievement(key) {
    achievements[key].unlocked = true;
    console.log(`🏆 Achievement Unlocked: ${achievements[key].name}`);
    // You could add a toast notification here
}

// Call checkAchievements in the click handler
const originalClickHandler = clickButton.onclick;
clickButton.addEventListener('click', function(e) {
    if (gameState.isPlaying) {
        checkAchievements();
    }
}, true);
