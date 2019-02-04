import { TodoModel } from './model';

export const StorageService = {

    setItems: function(items) {
        var set = localStorage.setItem('items', JSON.stringify(TodoModel.todoList));
        return set;
    },

    getItems: function(items) {
        const data = JSON.parse(localStorage.getItem('items'));
        return data;
    }

};