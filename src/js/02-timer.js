// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
const currentTime = Date.now();
const btnStart = document.querySelector("[data-start]");
btnStart.disabled = true;
let timerId = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < currentTime) {
            window.alert("Please choose a date in the future");
            return
        }
        btnStart.disabled = false;
        // console.log(selectedDates[0].getTime());
    },
};
const inputElTime = flatpickr("#datetime-picker", options);
const outputValue = document.querySelectorAll(".value");


// console.log("🚀 ~ file: 02-timer.js:23 ~ selectedTime", selectedTime - currentTime)

btnStart.addEventListener("click", () => {
    let timeValue = inputElTime.selectedDates[0].getTime() - currentTime;
    // console.log("🚀 ~ file: 02-timer.js:32 ~ btnStart.addEventListener ~ timeValue", timeValue)
    timerId = setInterval(() => {
        if (timeValue < 0) {
            return
        }
        outputValue[0].textContent = convertMs(timeValue).days;
        outputValue[1].textContent = convertMs(timeValue).hours;
        outputValue[2].textContent = convertMs(timeValue).minutes;
        outputValue[3].textContent = convertMs(timeValue).seconds;
        timeValue -= 1000;

    }, 1000)
})

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

// console.log(convertMs(125165415)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
