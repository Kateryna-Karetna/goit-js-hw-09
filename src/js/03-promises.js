// викликає функцію стільки разів, скільки ввели в поле amount. Під час кожного виклику передай їй номер промісу (position), що створюється, і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).

const form = document.querySelector('.form');
form.addEventListener('input', onInputValue);

function onInputValue (evt) {
  if (evt.target.name === 'amount') {
    console.log(evt.target.value);
  };
}

const btn = document.querySelector('button');
btn.addEventListener('submit', createPromise);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

for (let i = 0; i < 5; i++) {
  createPromise()
}