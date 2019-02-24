import { StorageService } from './storage';
import { Db } from './firebaseService';

class TodoObject {

    constructor(value, id) {
        this.id = id;
        this.text = value;
        this.is_checked = false;
        this.is_editable = false;
    }

    todo() {
        return {
            id: this.id,
            text: this.text,
            is_checked: this.is_checked,
            is_editable: this.is_editable
        };
    }

};

export class TodoModel {

    constructor() {
        this.storageService = new StorageService();
        this.db = new Db();
        this.todoList = [];

        if (this.storageService.getItems()) {
            this.todoList = this.storageService.getItems();
        }

        // this.db.setItems();
    }

    dataBaseData() {
        return this.db.getItems().then((items) => {
            if (items) {
                this.todoList = items;
            }
            return this.todoList;
        });
    }

    guidGenerator(id) {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    addTodo(value) {
        let id = this.guidGenerator();
        let todoObject = new TodoObject(value, id);
        this.todoList.push(todoObject);
        this.storageService.setItems(this.todoList);
        this.db.addItems(todoObject.todo());
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
        let id = event.target.id;
        switch (id) {
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
            let none = false;
            this.storageService.setItems(this.todoList);
            return none;
        } else {
            let done = this.todoList.every(item => item.is_checked == true);
            this.storageService.setItems(this.todoList);
            return done;
        }
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