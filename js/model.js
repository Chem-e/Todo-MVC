import { StorageService } from './storage'

export const TodoModel = {

    todoList: [],

    guidGenerator: function(id) {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },

    addTodo: function(value) {
        let todoItem = {
            id: TodoModel.guidGenerator('id'),
            text: value,
            is_checked: false,
            is_editable: false
        }
        TodoModel.todoList.push(todoItem);
        StorageService.setItems('items');
        TodoModel.count++;
    },

    removeTodo: function(event) {
        TodoModel.todoList.forEach((item, index) => {
            if (item.id == event.target.parentElement.id) {
                TodoModel.todoList.splice(index, 1);
                StorageService.setItems('items');
            };
        })

    },

    toggleCheck: function(event) {
        TodoModel.todoList.forEach((item, index) => {
            if (item.id == event.target.parentNode.parentElement.id) {
                TodoModel.todoList[index].is_checked = !TodoModel.todoList[index].is_checked;
            }
        })
    },

    itemsCount: function() {
        let count = 0;
        TodoModel.todoList.map((item, index) => {
            if (item.is_checked == false) {
                count++;
            }
        })
        return count;
    },

    clearCompleted: function(event) {
        TodoModel.todoList = TodoModel.todoList.filter((item) => {
            return item.is_checked === false;
        })
        StorageService.setItems('items');
    },


    filter: function(event) {
        let x = event.target.id;
        switch (x) {
            case 'all':
                TodoModel.todoList;
                break;
            case 'active':
                TodoModel.todoList.filter(item => item.is_checked == false);
                break;
            case 'completed':
                console.log("it ran")
                return TodoModel.todoList.filter(item => item.is_checked === true);
                break;
        }
    },

    headerIcon: function() {
        if (this.todoList.length === 0) {
            return false;
        } else {
            return this.todoList.every(item => item.is_checked == true);
        }
    },

    editListItem: function(event) {
        TodoModel.todoList.forEach((item, index) => {
            if (item.id == event.target.parentNode.id) {
                TodoModel.todoList[index].is_editable = !TodoModel.todoList[index].is_editable;
            }
        })
    },

    edit: function() {
        TodoModel.todoList.forEach((item, index) => {
            if (item.id == event.target.parentNode.parentElement.id) {
                item.text = event.target.value;
                item.is_editable = false;
            }
        })
    },

    checkAll: function() {
        TodoModel.todoList.forEach((item, index) => {
            item.is_checked = true;
        })
    },

    uncheckAll: function() {
        TodoModel.todoList.forEach((item, index) => {
            item.is_checked = false;
        })
    }

}