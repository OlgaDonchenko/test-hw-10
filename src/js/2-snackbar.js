//бібліотека
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import iconFulfilled from "../img/bi_check.png";
import iconRejected from "../img/octagon.png"
const form = document. querySelector ('form');
form.addEventListener('submit', createPromise);

  function createPromise(event) {
    event.preventDefault();
  
    const delayInput = document.querySelector('input[name="delay"]');
    const stateInput = document.querySelector('input[name="state"]:checked');
  
    const delay = delayInput.value;
    const state = stateInput.value;
  
    const promise = new Promise((resolve, reject) => {
      if (state === 'fulfilled') {
        setTimeout(() => resolve(delay), delay);
      } else if (state === 'rejected') {
        setTimeout(() => reject(delay), delay);
      }
    });
  
    promise
    .then((delay) => {
        
        iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
        timeout: 5000,
        width: 440,
        height: 64,
        close: true,
        position: "topRight",
        color: "#59a10d",
        messageSize: 16,
        messageColor: "	#fff",
        title: "Ok   ",
        titleSize: 16,
        titleColor: "#fff",
        iconUrl: iconFulfilled,
        });
        
    }).catch((delay) => {
        
        iziToast.error({
        message: `Rejected promise in ${delay}ms`,
        timeout: 5000,
        close: false,
        position: "topRight",
        color: "#ef4040",
        messageSize: 16,
        messageColor: "	#fff",
        title: "Error",
        titleSize: 16,
        titleColor: "#fff",
        iconUrl: iconRejected,
        });
        
    }).finally(() => form.reset());
  }






        
        
        

    
