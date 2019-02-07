export class StorageService {

    constructor() {}

    setItems(items) {
        var set = localStorage.setItem('items', JSON.stringify(items));
        return set;
    };

    getItems() {
        const data = JSON.parse(localStorage.getItem('items'));
        return data;
    };

};