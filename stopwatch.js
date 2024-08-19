let startTime;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function updateTime() {
    const now = Date.now();
    const timeDiff = now - startTime + elapsedTime;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now();
        intervalId = setInterval(updateTime, 1000);
        isRunning = true;
    }
});

pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    display.textContent = "00:00:00";
    elapsedTime = 0;
    isRunning = false;
    lapsList.innerHTML = "";
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = display.textContent;
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapsList.appendChild(li);
    }
});
