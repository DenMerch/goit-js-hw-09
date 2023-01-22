import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css"


const form = document.querySelector("form");
let delay = 0;
let step = 0;
let amount = 0;
let position = 0;
let timerId = 0;

form.addEventListener("input", throttle(handlInput, 300));

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
    } else {
      reject(
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`))
    }
  })
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  setTimeout(() => {
    timerId = setInterval(() => {
      position++
      createPromise(position, delay)
        .then((position, delay) => {
        })
        .catch((position, delay) => {
        }).finally(() => { console.log("finaly"); });
      if (position === amount) {
        clearInterval(timerId);
        position = 0;
        return;
      }
      delay += step;

    }, step)
  }, delay)
  event.currentTarget.reset();
});
function handlInput(event) {
  event.preventDefault();
  delay = +form.delay.value;
  step = +form.step.value;
  amount = +form.amount.value;
}

