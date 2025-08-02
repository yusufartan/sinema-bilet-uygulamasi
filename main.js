// === DOM Seçicileri ===
const container = document.querySelector(".container");
const selectMovie = document.querySelector("#selectMovie");

const amount = document.querySelector(".amount");
const count = document.querySelector(".count");

const buyButton = document.querySelector("#buyButton");
const clearButton = document.querySelector("#clearButton");

const pursheAudio = document.querySelector("#pursheAudio");
const deleteAudio = document.querySelector("#deleteAudio");

const seats = Array.from(document.querySelectorAll(".seat"));


// === Event Listener'ları Başlat ===
runEventListeners();

function runEventListeners() {
    container.addEventListener("click", select);
    selectMovie.addEventListener("change", changeMovie);
    document.addEventListener("DOMContentLoaded", runPageLoad);
    buyButton.addEventListener("click", buyTicket);
}


// === Sayfa Yüklendiğinde LocalStorage'dan Verileri Al ===
function runPageLoad() {
    const loadSelectedSeatsFromStorage = Storagex.getSelectedSeatFromStorage();
    const loadFullSeatsFromStorage = Storagex.getFullSeatsFromStorage();

    seats.forEach((seat, index) => {
        if (loadSelectedSeatsFromStorage.includes(index)) {
            seat.classList.add("selected");
        }

        if (loadFullSeatsFromStorage.includes(index)) {
            seat.classList.add("full");
        }
    });

    selectMovie.selectedIndex = Storagex.getSelectedMovieFromStorage();
    calculate();
}


// === Film Değişince Yapılacaklar ===
function changeMovie() {
    saveSelectedMovieIndexToStorage();
    calculate();
}


// === Koltuk Seçimi İşlemi ===
function select(e) {
    const selectedElement = e.target.parentElement;
    if (selectedElement.classList.contains("seat") && !selectedElement.classList.contains("full")) {
        selectedElement.classList.toggle("selected");
        calculate();
        saveSelectedSeatIndexToStorage();
        saveSelectedMovieIndexToStorage();
        console.log(getSelectedSeatIndex());
    }
}


// === Koltuk Seçimi Bilgilerini Getir ===
function getSelectedSeats() {
    const selectedList = [...container.querySelectorAll(".selected")];
    return selectedList;
}

function getSelectedSeatIndex() {
    const selectedList = getSelectedSeats();
    const selectedSeatIndex = selectedList.map(seat => {
        return seats.indexOf(seat);
    })
    return selectedSeatIndex;
}


// === Ücret Hesaplama ===
function calculate() {
    const countSelectedSeat = getSelectedSeats().length;
    const price = selectMovie.value;

    count.textContent = countSelectedSeat;
    amount.textContent = countSelectedSeat * price;
}


// === LocalStorage Kaydetme ===
function saveSelectedSeatIndexToStorage() {
    const selectedIndexStorage = getSelectedSeatIndex();
    Storagex.addSelectedSeatToStorage(selectedIndexStorage);
}

function saveSelectedMovieIndexToStorage() {
    const selectedMovieIndex = selectMovie.selectedIndex;
    Storagex.addSelectedMovieToStorage(selectedMovieIndex);
}


// === Bilet Satın Alma İşlemi ===
function buyTicket() {
    showConfirm(() => {
        const selectedSeats = getSelectedSeats();
        const selectedIndexes = getSelectedSeatIndex();

        selectedSeats.forEach(seat => {
            seat.classList.remove("selected");
            seat.classList.add("full");
        });

        // full koltukları kaydet
        Storagex.addFullSeatToStorage(selectedIndexes);

        // selected koltukları sıfırla
        Storagex.addSelectedSeatToStorage([]);

        calculate();

        pursheAudio.currentTime = 0;
        pursheAudio.play();
    });
}


// === Seçilen Koltukları Temizleme İşlemi ===
clearButton.addEventListener("click", () => {
    showConfirm(() => {
        const selectedSeats = getSelectedSeats();
        selectedSeats.forEach(seat => {
            seat.classList.remove("selected");
        });

        Storagex.addSelectedSeatToStorage([]);
        calculate();
        deleteAudio.currentTime = 0;
        deleteAudio.play();
    });
});
