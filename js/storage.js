import { TodoModel } from './model'

export const StorageService = {

    setItems: function(items) {
        return localStorage.setItem('items', JSON.stringify(TodoModel.todoList));
    },

    getItems: function(items) {
        const data = JSON.parse(localStorage.getItem('items'));
        return data;
    }

}