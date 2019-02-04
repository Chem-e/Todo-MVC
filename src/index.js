import style from "./css/style.css";

import { html, render } from 'lit-html';

import { TodoModel } from './js/model';

import { StorageService } from './js/storage';

const TodoController = {

        constructor: function() {
            TodoModel.init();
            TodoModel.todoList = StorageService.getItems('items');
            TodoController.reDraw();
            document.getElementById("myInput")
                .addEventListener("keyup", function(event) {
                    event.preventDefault();
                    if (event.keyCode === 13) {
                        TodoModel.addTodo(event.target.value);
                        event.currentTarget.value = "";
                        TodoController.reDraw();
                    }
                });
        },

        eventHandler: {
            removeEvent(event) {
                TodoModel.removeTodo(event);
                TodoController.reDraw();
            },
            toggleEvent(event) {
                TodoModel.toggleCheck(event);
                TodoController.reDraw();
            },
            clearCompletedEvent(event) {
                TodoModel.clearCompleted(event);
                TodoController.reDraw();
            },
            filterEvent(event) {
                let filteredArray = TodoModel.filter(event);
                TodoController.reDrawList(filteredArray);
            },
            editItemEvent(event) {
                TodoModel.editListItem(event);
                TodoController.reDrawList();
            },
            blurEvent(event) {
                TodoModel.edit(event);
                TodoController.reDrawList();

            },
            enterKeyEvent(event) {
                if (event.keyCode === 13) {
                    TodoModel.edit(event);
                    TodoController.reDrawList();
                }
            },
            uncheckAllEvent(event) {
                TodoModel.uncheckAll(event);
                TodoController.reDrawHeader();
                TodoController.reDrawList();
            },
            checkAllEvent(event) {
                TodoModel.checkAll(event);
                TodoController.reDrawHeader();
                TodoController.reDrawList();
            },
            capture: true
        },

        reDrawHeader() {
            let header = html `
                ${ TodoModel.headerIcon()
                    ? html`<i type="checkbox" class="fas  fa-check green" @click="${TodoController.eventHandler.uncheckAllEvent}"></i>`
                    : html`<i class="fas fa-angle-double-down pr-2" @click="${TodoController.eventHandler.checkAllEvent}"></i>`
                }
                `;

            render(header, document.getElementById('header-icon'));
        },

        reDrawList(filteredArray = TodoModel.todoList) {
            TodoModel.itemsCount();
            TodoController.reDrawHeader();

            let list = html `
                <ul class="list-group list-group-flush ul" >
                    ${filteredArray.map((item) => html`
                        <li id="${item.id}" class="list-group-item text-wrap d-flex li" id="li">
                            <div class="icon color-light-grey mr-1 pr-3">
                                ${item.is_checked
                                    ? html`<i type="checkbox" class="fas  fa-check green" @click="${TodoController.eventHandler.toggleEvent}"></i>`
                                    : html`<i type="checkbox" class="fas  fa-check  color-light-grey" @click="${TodoController.eventHandler.toggleEvent}"></i>`
                                }
                            </div>
                            ${item.is_checked
                                ? html`<div class="line-through text text-wrap  pl-4"  id="text" >        
                                    ${item.text} 
                                </div>`
                                : html`<div class="text text-wrap  pl-4" @dblclick="${TodoController.eventHandler.editItemEvent}" id="text" >        
                                    ${item.is_editable
                                        ?
                                        html` <input type="text" class="text form-control input background-light-grey editableInput" id="editableInput" @keypress="${TodoController.eventHandler.enterKeyEvent}"  @blur="${TodoController.eventHandler.blurEvent}" aria-describedby="basic-addon2">`
                                        : 
                                        html`${item.text}`
                                    }
                                </div>`
                            }
                            <i class="fas fa-times px-3  pt-2 float-right color-light-grey" id="close" @click="${TodoController.eventHandler.removeEvent}" ></i>
                        </li>
                    `)}
                </ul>
            `;
            // 
                         
            render(list, document.getElementById('ul'));
        },

        reDrawFooter (){
            let   totalTodoLeft=  TodoModel.itemsCount();
       
            let footer=  html`
                <div class="items-left pt-2 " id="items-left">
                    ${totalTodoLeft} items left
                </div>   
                <div class="btn-group " role="group" aria-label="Basic example">
                    <button type="button" class="btn color-dark-grey tabs background-grey" id="all" @click="${TodoController.eventHandler.filterEvent}"> All</button>
                    <button type="button" class="btn color-dark-grey tabs background-grey" id="active" @click="${TodoController.eventHandler.filterEvent}">Active</button>
                    <button type="button" class="btn color-dark-grey tabs background-grey" id="completed" @click="${TodoController.eventHandler.filterEvent}">Completed</button>
                </div>
                <div class=" clear-completed">
                    <button type="button" class="btn btn-secondary" @click="${TodoController.eventHandler.clearCompletedEvent}"id='clear-button'>Clear completed(${TodoModel.todoList.length-totalTodoLeft})</button>
                </div>
                `;

            render(footer, document.getElementById('footer'));
        },
    
 reDraw(){
        TodoController.reDrawList();
        TodoController.reDrawFooter();
    }
    
};

TodoController.constructor();