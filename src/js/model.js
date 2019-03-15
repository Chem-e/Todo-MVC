import { StorageService } from './storage';
import { Firestore } from './firebaseService';

class TodoObject {

    constructor(value, id, tagName, dueDate) {
        this.id = id;
        this.text = value;
        this.is_checked = false;
        this.is_editable = false;
        this.tagEnabled = false;
        this.tagName = tagName;
        this.dueDateEnabled = false;
        this.dueDate = dueDate;
    }

    todo() {
        return {
            id: this.id,
            text: this.text,
            is_checked: this.is_checked,
            is_editable: this.is_editable,
            tagName: this.tagName,
            tagEnabled: this.tagEnabled,
            dueDateEnabled: this.dueDateEnabled,
            dueDate: this.dueDate
        };
    }

};

export class TodoModel {

    constructor() {
        this.storageService = new StorageService();
        this.firestore = new Firestore();
        this.todoList = [];
        this.todoObject = new TodoObject();

        if (this.storageService.getItems()) {
            this.todoList = this.storageService.getItems();
        }
    }

    firestoreTodolist() {
        return this.firestore.getItems().then((items) => {
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
        let tagName = '';
        let dueDate = '';
        let todoObject = new TodoObject(value, id, tagName, dueDate);
        this.todoList.push(todoObject);
        this.storageService.setItems(this.todoList);
        this.firestore.addItems(todoObject.todo());
    }

    removeTodo(event) {
        this.todoList.forEach((item, index) => {
            if (item.id == event.target.parentElement.id) {
                this.todoList.splice(index, 1);
                this.storageService.setItems(this.todoList);
                this.firestore.deleteItem(event);
            };
        });
    }

    toggleCheck(event) {
        this.todoList.forEach((item, index) => {
            if (item.id == event.target.parentNode.parentElement.id) {
                this.todoList[index].is_checked = !this.todoList[index].is_checked;
                this.firestore.updateItem(event.target.parentNode.parentElement.id, item.is_checked, item.is_editable, item.tagEnabled, item.dueDateEnabled);
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
            this.firestore.clearCompletedItems(event, item.is_checked === true);
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
                this.firestore.updateItem(event.target.parentNode.parentElement.id, item.is_checked, item.is_editable, item.tagEnabled);
            }
        });
        this.storageService.setItems(this.todoList);
    }

    editedListItem() {
        this.todoList.forEach((item, index) => {
            if (item.id == event.target.parentNode.parentElement.id) {
                item.text = event.target.value;
                item.is_editable = false;
                this.firestore.editedListItem(event.target.parentNode.parentElement.id, item.text);
            }
        });
        this.storageService.setItems(this.todoList);
    }

    checkAll() {
        this.todoList.forEach((item, index) => {
            item.is_checked = true;
            this.firestore.checkAllItems(item.is_checked);
        });
        this.storageService.setItems(this.todoList);
    }

    uncheckAll() {
        this.todoList.forEach((item, index) => {
            item.is_checked = false;
            this.firestore.uncheckAllItems(item.is_checked);
        });
        this.storageService.setItems(this.todoList);
    }

    enableTag(event) {
        this.todoList.forEach((item, index) => {
            if (item.id == event.target.parentElement.id) {
                item.tagEnabled = true;
                this.firestore.updateItem(event.target.parentElement.id, item.is_checked, item.is_editable, item.tagEnabled, item.dueDateEnabled);
            };
        });
        this.storageService.setItems(this.todoList);
    }

    addTag() {
        this.todoList.forEach((item, index) => {
            if (item.id == event.target.parentNode.parentElement.id) {
                item.tagName = event.target.value;
                item.tagEnabled = false;
                this.firestore.addTag(event.target.parentNode.parentElement.id, item.tagName);
            }
        });
        this.storageService.setItems(this.todoList);
    }

    displayTags() {
        return [...new Set(this.todoList.map(item => item.tagName))];
        this.storageService.setItems(this.todoList);
    }

    filterTags(event) {
        return this.todoList.filter((item) => {
            return event.target.text === item.tagName;
        });
        this.storageService.setItems(this.todoList);
    }

    enableDueDate(event) {
        this.todoList.forEach((item, index) => {
            if (item.id == event.target.parentElement.id) {
                item.dueDateEnabled = true;
                this.firestore.updateItem(event.target.parentElement.id, item.is_checked, item.is_editable, item.tagEnabled, item.dueDateEnabled);
            };
        });
        this.storageService.setItems(this.todoList);
    }

    addDueDate() {
        this.todoList.forEach((item, index) => {
            if (item.id == event.target.parentNode.parentElement.id) {
                item.dueDate = event.target.value;
                item.dueDateEnabled = false;
                this.firestore.addDueDate(event.target.parentNode.parentElement.id, item.dueDate);
            }
        });
        this.storageService.setItems(this.todoList);
    }

};