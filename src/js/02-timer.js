import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector('#datetime-picker');
input.addEventListener('input', flatpickr);

const btn = document.querySelector('[data-start]');
btn.disabled = true;
btn.style.borderRadius = "10%";
btn.style.fontSize = "25px";

const dayField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

let timerId = null;

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

const enableButton = () => {
    btn.disabled = false;
    btn.style.backgroundColor = "green";
    btn.style.color = "white";
    btn.style.border = "none";
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
         
        if (selectedDates[0] < options.defaultDate) {
            btn.disabled = true;
            window.alert("Please choose a date in the future");
        } else {
            enableButton()
            btn.addEventListener('click', onBtnClick);
        
            function onBtnClick() {
                clearTimeout(timerId);
                let totalMs = selectedDates[0] - new Date();
        
                const updateTimer = (ms) => {
                    const { days, minutes, hours, seconds } = convertMs(ms)
                    dayField.textContent = addLeadingZero(days); 
                    hoursField.textContent = addLeadingZero(hours);
                    minutesField.textContent = addLeadingZero(minutes);
                    secondsField.textContent = addLeadingZero(seconds);
                }
        
                updateTimer(totalMs);
        
                timerId = setInterval(() => {
                    if (totalMs < 1000) {
                        return;
                    }
                    totalMs -= 1000;
                    updateTimer(totalMs)
                }, 1000)
        
                function addLeadingZero(numberValue) {
                    const stringValue = numberValue.toString()
                    return stringValue.padStart(2, "0");
                }
                    
            }
        }
    }
};

flatpickr(input, options);

// style

const wrapper = document.querySelector('.timer');
wrapper.style.display = "flex";

const label = document.querySelectorAll('.label');
Array.from(label).forEach((el) => {
    el.style.fontSize = "20px";
})

const value = document.querySelectorAll('.value');
Array.from(value).forEach((el) => {
    el.style.fontSize = "30px";
    el.style.backgroundColor = "orange";
})