import { StorageService } from './storage';

class Todo {

    constructor(value, id) {
        this.id = id;
        this.text = value;
        this.is_checked = false;
        this.is_editable = false;
    }

};

export class TodoModel {


    constructor() {
        this.storageService = new StorageService();
        this.todoList = [];
        if (this.storageService.getItems() !== null || this.storageService.getItems() !== undefined) {
            this.todoList;
            console.log('1');
            // this.storageService.setItems(this.todoList);
        } else {
            console.log('2');
            this.todoList = [];
            // this.storageService.setItems(this.todoList = []);
        }
        this.todoList = this.storageService.getItems();
    }

    guidGenerator(id) {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    addTodo(value) {
        let id = this.guidGenerator();
        this.todoList.push(new Todo(value, id));
        this.storageService.setItems(this.todoList);
    }

    removeTodo(event) {
        this.todoList.forEach((item, index) => {
            if (item.id == event.target.parentElement.id) {
                this.todoList.splice(index, 1);
                this.storageService.setItems(this.todoList);
            };
        });
    }

    toggleCheck(event) {
        this.todoList.forEach((item, index) => {
            if (item.id == event.target.parentNode.parentElement.id) {
                this.todoList[index].is_checked = !this.todoList[index].is_checked;
            }
        });
        this.storageService.setItems(this.todoList);
    }

    itemsCount() {
        let count = 0;
        this.todoList.map((item, index) => {
            if (item.is_checked == false) {
                count++;
            }
        });
        return count;
    }

    clearCompleted(event) {
        this.todoList = this.todoList.filter((item) => {
            return item.is_checked === false;
        });
        this.storageService.setItems(this.todoList);
    }

    filter(event) {
        let x = event.target.id;
        switch (x) {
            case 'all':
                return this.todoList;
                break;
            case 'active':
                return this.todoList.filter(item => item.is_checked == false);
                break;
            case 'completed':
                return this.todoList.filter(item => item.is_checked === true);
                break;
        }
        this.storageService.setItems(this.todoList);
    }

    headerIcon() {
        if (this.todoList.length === 0) {
            return false;
        } else {
            return this.todoList.every(item => item.is_checked == true);
        }
        this.storageService.setItems(this.todoList);
    }

    editListItem(event) {
        this.todoList.forEach((item, index) => {
            if (item.id == event.target.parentNode.id) {
                this.todoList[index].is_editable = !this.todoList[index].is_editable;
            }
        });
        this.storageService.setItems(this.todoList);
    }

    edit() {
        this.todoList.forEach((item, index) => {
            if (item.id == event.target.parentNode.parentElement.id) {
                item.text = event.target.value;
                item.is_editable = false;
            }
        });
        this.storageService.setItems(this.todoList);
    }

    checkAll() {
        this.todoList.forEach((item, index) => {
            item.is_checked = true;
        });
        this.storageService.setItems(this.todoList);
    }

    uncheckAll() {
        this.todoList.forEach((item, index) => {
            item.is_checked = false;
        });
        this.storageService.setItems(this.todoList);
    }

};