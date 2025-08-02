class Storagex {
    static keySelectedSeats = "keySelectedSeats";
    static keyFullSeats = "keyFullSeats";
    static keySelectedMovie = "keySelectedMovie";

    // Listeleme

    static getSelectedSeatFromStorage() {
        let selectedSeat;
        if (localStorage.getItem(this.keySelectedSeats) === null) {
            selectedSeat = [];
        } else {
            selectedSeat = JSON.parse(localStorage.getItem(this.keySelectedSeats));
        }
        return selectedSeat;
    }
    static getFullSeatsFromStorage() {
        let fullSeats;
        if (localStorage.getItem(this.keyFullSeats) === null) {
            fullSeats = [];
        } else {
            fullSeats = JSON.parse(localStorage.getItem(this.keyFullSeats));

        }
        return fullSeats;
    }
    static getSelectedMovieFromStorage() {
        return localStorage.getItem(this.keySelectedMovie);

    }

    // Ekleme

    static addSelectedSeatToStorage(indexs) {
        localStorage.setItem(this.keySelectedSeats, JSON.stringify(indexs));
    }

    static addFullSeatToStorage(indexs) {
        const fullSeatIndex = this.getFullSeatsFromStorage();
        indexs.forEach(index => {
            fullSeatIndex.push(index);
        });
        localStorage.setItem(this.keyFullSeats, JSON.stringify(fullSeatIndex));
    }

    static addSelectedMovieToStorage(index) {
        localStorage.setItem(this.keySelectedMovie, JSON.stringify(index));
    }
}