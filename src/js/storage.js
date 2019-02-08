export class StorageService {

    constructor() {}

    setItems(items) {
        localStorage.setItem('items', JSON.stringify(items));
    };

    getItems() {
        const data = JSON.parse(localStorage.getItem('items'));
        return data;
    };

};