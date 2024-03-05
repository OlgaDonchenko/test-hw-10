//libraries
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
// icon for message
import icon from "../img/octagon.png";

let userSelectedDate;// оголосили глобально, бо це зачення буде потрібне поза межами методу onClose() об'єкта options 
// надаєм доступ в коді до  DOM елементів  
let startButton = document.querySelector("[data-start]"); 
let timerFieldDays = document.querySelector("[data-days]");
let timerFieldHours = document.querySelector("[data-hours]");
let timerFieldMinutes = document.querySelector("[data-minutes]");
let timerFieldSeconds = document.querySelector("[data-seconds]");
let input = document.querySelector(".inp");

// визначаєм початковий стан кнопки та поля введення після завантаження сторінки
startButton.disabled = true;
startButton.classList.add('inactive');
startButton.classList.remove('active');
input.disabled = false;

let timerId = null;// Змінна timerId  це цифровий ідентифікатор  таймера створеного методом setInterval(), яка потім буде використаним для його подальшого скасування 

// опції елемента ініціалізованого бібліотекою flatpickr, який надає можливість обрати час на сторінці в рядку повідомлення
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // при закриті елемента, ініціалізованого на інпуті,
  // ми передбачаєм у випадку обрання дати в минулому часі 
  // ініціалізацію елемента бібліотеки izitoast й задаєм 
  // йому опції та відповідно до вибору користувача налаштовуємо
  // стан кнопки та рядка введення дати
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    //  console.log(userSelectedDate);
    
     if (userSelectedDate < new Date()) {
      iziToast.error({
        message: "Please choose a date in the future",
        width: 300,
        height: 64,
        close: false,
        position: "topRight",
        timeout: 5000,
        closeOnEscape: true,
        messageSize: 16,
        messageColor: "	#fff",
        backgroundColor:"#ef4040",
        title: "Error",
        titleSize: 16,
        titleColor: "#fff",
        iconUrl: icon,
        iconColor:"#fff",
      })
      startButton.disabled = true;
      startButton.classList.remove("active");
      startButton.classList.add("inactive");
    } else {
      startButton.disabled = false;
      startButton.classList.remove("inactive");
      startButton.classList.add("active");
    }
  },
};

 // функція  повертає обраний час  у вигляді об'єкта
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// форматуєм значення властивостей { days, hours, minutes, seconds } 01, 02 замість 1, 2 і т.д.
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
// обновлюєм покази таймера з інтервалом 1сек й зупиняєм його, якщо залишок часу 0
function onTimerStart() {
  // запускаєм повторювальну дію з інтервалом 1 сек
    timerId = setInterval(() => {
    const startTime = new Date();// визначаєм поточну дату
    const countdown = userSelectedDate - startTime;//залишок часу
    // змінюємо стан кнопки та рядка введення 
      startButton.disabled = true;// кнопка старт стає неактивна
      startButton.classList.add('inactive');
      startButton.classList.remove('active');
    input.disabled = true;// рядок  введення стає неактивним
    if (countdown < 0) {
      clearInterval(timerId);// припинення виконання повторюваних дій, які були запущені за допомогою функції setInterval()
      input.disabled = false;//рядок введення стає активним для вибору нового часу
      startButton.disabled = false;// кнопка стає активною
      startButton.classList.add('active');
      startButton.classList.remove('inactive');
      return;// залишок часу стає 0, функція припиняє роботу
    }
    updateTimerFace(convertMs(countdown));// викликаєм функцію для зміни показів таймера на сторінці
  }, 1000);// задаєм інтервал оновлення показів на сторінці 1 секунда в милісекундах, другий аргумент методу, першим є колбек функція
}
// виведення значень властивостей { days, hours, minutes, seconds } на сторінку
function updateTimerFace({ days, hours, minutes, seconds }) {
  timerFieldDays.textContent = addLeadingZero(days);
  timerFieldHours.textContent = addLeadingZero(hours);
  timerFieldMinutes.textContent = addLeadingZero(minutes);
  timerFieldSeconds.textContent = addLeadingZero(seconds);
}
// ініціалізація бібліотеки
// на елементі в кінці скрипта, спочатку я зробила це після об'єкта
// options й значення змінної userSelectedDate в наступному коді стало 
// невизначеним
const flatp = flatpickr("#datetime-picker", options); 
// додаєм до кнопки слухача події клік
startButton.addEventListener("click", onTimerStart);









