// import js from 'model.js';

// import js from 'storage.js';

import css from '../css/styles.css';

import { html, render } from 'lit-html';

// import test from './storage.js'

// console.log(test)/
const StorageService = {

    setItems: function(items) {
        return localStorage.setItem('items', JSON.stringify(TodoModel.todoList));
    },

    getItems: function(items) {
        const data = JSON.parse(localStorage.getItem('items'));
        return data;
    }

}

const TodoModel = {

    todoList: [],

    guidGenerator: function(id) {
        var S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },

    addTodo: function(value) {
        var todoItem = {
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


    filterAll: function(all) {
        return TodoModel.todoList;
    },

    filterActive: function(active) {
        return TodoModel.todoList.filter(item => item.is_checked == false);
    },

    filterCompleted: function(completed) {
        return TodoModel.todoList.filter(item => item.is_checked === true);
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

    UncheckAll: function() {
        TodoModel.todoList.forEach((item, index) => {
            item.is_checked = false;
        })
    }

}

class TodoController {

    constructor() {
        TodoModel.todoList = StorageService.getItems('items')
        this.reDraw();
        document.getElementById("myInput")
            .addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    TodoModel.addTodo(event.target.value);
                    event.currentTarget.value = "";
                    this.reDraw();
                }
            });
    }


    reDrawHeader() {
            let header = html `
                ${ TodoModel.headerIcon()
                    ? html`<i type="checkbox" class="fas  fa-check green" @click="${eventHandlerObject.UncheckAllEvent}"></i>`
                    : html`<i class="fas fa-angle-double-down pr-2" @click="${eventHandlerObject.checkAllEvent}"></i>`
                }
                `;

            render(header, document.getElementById('header-icon'));
        }

     reDrawList(filteredArray = TodoModel.todoList) {
                TodoModel.itemsCount();
                this.reDrawHeader();

                let list = html `
                <ul class="list-group list-group-flush">
                    ${filteredArray.map((item) => html`
                    <li id="${item.id}" class="list-group-item text-wrap d-flex">
                        <div class="icon color-light-grey mr-1 pr-3">
                        ${item.is_checked
                            ? html`<i type="checkbox" class="fas  fa-check green" @click="${eventHandlerObject.toggleEvent}"></i>`
                            : html`<i type="checkbox" class="fas  fa-check  color-light-grey" @click="${eventHandlerObject.toggleEvent}"></i>`
                        }
                        </div>
                        ${item.is_checked
                            ? html`<div class="line-through text text-wrap  pl-4"  id="text" >        
                            ${item.text} 
                            </div>`
                            : html`<div class="text text-wrap  pl-4" @dblclick="${eventHandlerObject.editItemEvent}" id="text" >        
                            ${item.is_editable
                                ?
                                 html` <input type="text" class="text form-control input background-light-grey" @keypress="${eventHandlerObject.enterKeyEvent}" @blur="${this.eventHandlerObject.blurEvent}"  aria-describedby="basic-addon2">`
                                : 
                                 html`${item.text}`
                            }
                            </div>`
                        }
                        <i class="fas fa-times px-3  pt-2 float-right color-light-grey" id="close" @click="${eventHandlerObject.removeEvent}" ></i>
                    </li>
                    `)}
                </ul>
                `;
                             
            render(list, document.getElementById('ul'));
    }
    
     reDrawFooter (){
            let   totalTodoLeft=  TodoModel.itemsCount();
           
            let footer=  html`
                <div class="items-left pt-2 " id="items-left">
                    ${totalTodoLeft} items left
                </div>   
                <div class="btn-group " role="group" aria-label="Basic example">
                    <button type="button" class="btn color-dark-grey tabs background-grey" @click="${eventHandlerObject.filterAllEvent}"> All</button>
                    <button type="button" class="btn color-dark-grey tabs background-grey" @click="${eventHandlerObject.filterActiveEvent}">Active</button>
                    <button type="button" class="btn color-dark-grey tabs background-grey" @click="${eventHandlerObject.filterCompletedEvent}">Completed</button>
                </div>
                <div class=" clear-completed">
                    <button type="button" class="btn btn-secondary" @click="${eventHandlerObject.clearCompletedEvent}"id='clear-button'>Clear completed(${TodoModel.todoList.length-totalTodoLeft})</button>
                </div>
                `;

            render(footer, document.getElementById('footer'));
        }
        
     reDraw(){
            this.reDrawList();
            this.reDrawFooter();
        }
}

let todoObject=new TodoController();
let eventHandlerObject = new EventHandler();

class EventHandler {
    
    constructor() {
        this.capture = true;
    }

    removeEvent(event) {
        TodoModel.removeTodo(event);
        todoObject.reDraw();
    }
    toggleEvent(event) {
        TodoModel.toggleCheck(event)
        todoObject.reDraw();
    }
    clearCompletedEvent(event) {
        TodoModel.clearCompleted(event);

        todoObject.reDraw();
    }
    filterCompletedEvent(event) {
        let filteredArray = TodoModel.filterCompleted(event);
        todoObject.reDraw();
    }
    filterActiveEvent(event) {
        let filteredArray = TodoModel.filterActive(event);
        todoObject.reDraw();
    }
    filterAllEvent(event) {
        let filteredArray = TodoModel.filterAll(event);
        todoObject.reDraw();
    }
    editItemEvent(event) {
        TodoModel.editListItem(event);
        todoObject.reDrawList();
    }
    blurEvent(event) {
        TodoModel.edit(event);
        todoObject.reDrawList();

    }
    enterKeyEvent(event) {
        if (event.keyCode === 13) {
            TodoModel.edit(event);
            todoObject.reDrawList();
        }
    }
    UncheckAllEvent(event) {
        TodoModel.UncheckAll(event)
        todoObject.reDrawHeader();
        todoObject.reDrawList();
    }
    checkAllEvent(event) {
        TodoModel.checkAll(event)
        todoObject.reDrawHeader();
        todoObject.reDrawList();
    }

}