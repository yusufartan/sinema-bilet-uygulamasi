// js/confirm.js

// HTML'e eklemen gereken confirm yapısı:
// <div id="customConfirm" class="confirm-modal hidden">
//   <div class="confirm-box">
//     <p>Emin misin?</p>
//     <div class="confirm-buttons">
//       <button id="confirmYes">Evet</button>
//       <button id="confirmNo">Hayır</button>
//     </div>
//   </div>
// </div>

const customConfirm = document.getElementById("customConfirm");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

// Bu fonksiyon dışarıdan çağrıldığında confirm açar
function showConfirm(callbackIfYes) {
  customConfirm.classList.remove("hidden");

  confirmYes.onclick = () => {
    customConfirm.classList.add("hidden");
    callbackIfYes(); // Evet'e basılırsa bu fonksiyon çağrılır
  };

  confirmNo.onclick = () => {
    customConfirm.classList.add("hidden");
  };
}
