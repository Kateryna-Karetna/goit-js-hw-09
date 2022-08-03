const body = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

stopButton.disabled = true;

function onStartBtnClick () {
    body.style.backgroundColor = getRandomHexColor();
    startButton.disabled = true;
    stopButton.disabled = false;

    timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

startButton.addEventListener('click', onStartBtnClick);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStopBtnClick () {
    clearInterval(timerId);
    startButton.disabled = false;
    stopButton.disabled = true;
}

stopButton.addEventListener('click', onStopBtnClick);
