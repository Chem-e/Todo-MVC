import style from "./css/style.css";

import { html, render } from 'lit-html';

import { TodoModel } from './js/model';

// import { StorageService } from './js/storage';

class TodoController {

    constructor() {
        this.todoModel = new TodoModel();
        // this.storageService = new StorageService();

        // this.todoModel.init();
        // 
        this.reDraw();
        document.getElementById("myInput")
            .addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    this.todoModel.addTodo(event.target.value);
                    event.currentTarget.value = "";
                    this.reDraw();
                };
            });
        this.capture = true;
    }

    removeEvent(event) {
        this.todoModel.removeTodo(event);
        this.reDraw();
    }

    toggleEvent(event) {
        this.todoModel.toggleCheck(event);
        this.reDraw();
    }

    clearCompletedEvent(event) {
        this.todoModel.clearCompleted(event);
        this.reDraw();
    }

    filterEvent(event) {
        let filteredArray = this.todoModel.filter(event);
        this.reDrawList(filteredArray);
    }

    editItemEvent(event) {
        this.todoModel.editListItem(event);
        this.reDrawList();
    }

    blurEvent(event) {
        this.todoModel.edit(event);
        this.reDrawList();
    }

    enterKeyEvent(event) {
        if (event.keyCode === 13) {
            this.todoModel.edit(event);
            this.reDrawList();
        }
    }

    uncheckAllEvent(event) {
        this.todoModel.uncheckAll(event);
        this.reDrawHeader();
        this.reDrawList();
    }

    checkAllEvent(event) {
        this.todoModel.checkAll(event);
        this.reDrawHeader();
        this.reDrawList();
    }

    reDrawHeader() {
            let header = html `
                ${ this.todoModel.headerIcon()
                    ? html`<i type="checkbox" class="fas  fa-check green" @click="${this.uncheckAllEvent()}"></i>`
                    : html`<i class="fas fa-angle-double-down pr-2" @click="${this.checkAllEvent()}"></i>`
                }
                `;

            render(header, document.getElementById('header-icon'));
        }

        reDrawList(filteredArray = this.todoModel.todoList) {
            this.todoModel.itemsCount();
            this.reDrawHeader();

            let list = html `
                <ul class="list-group list-group-flush ul" >
                    ${filteredArray.map((item) => html`
                        <li id="${item.id}" class="list-group-item text-wrap d-flex li" id="li">
                            <div class="icon color-light-grey mr-1 pr-3">
                                ${item.is_checked
                                    ? html`<i type="checkbox" class="fas  fa-check green" @click="${this.toggleEvent()}"></i>`
                                    : html`<i type="checkbox" class="fas  fa-check  color-light-grey" @click="${this.toggleEvent()}"></i>`
                                }
                            </div>
                            ${item.is_checked
                                ? html`<div class="line-through text text-wrap  pl-4"  id="text" >        
                                    ${item.text} 
                                </div>`
                                : html`<div class="text text-wrap  pl-4" @dblclick="${this.editItemEvent()}" id="text" >        
                                    ${item.is_editable
                                        ?
                                        html` <input type="text" class="text input background-light-grey editableInput" id="editableInput" @keypress="${this.enterKeyEvent()}"  @blur="${this.blurEvent()}" aria-describedby="basic-addon2">`
                                        : 
                                        html`${item.text}`
                                    }
                                </div>`
                            }
                            <i class="fas fa-times px-3  pt-2 float-right color-light-grey" id="close" @click="${this.removeEvent()}" ></i>
                        </li>
                    `)}
                </ul>
            `; 
                         
            render(list, document.getElementById('ul'));
        }

        reDrawFooter (){
            let totalTodoLeft = this.todoModel.itemsCount();
       
            let footer = html`
                <div class="items-left pt-2 " id="items-left">
                    ${totalTodoLeft} items left
                </div>   
                <div class="btn-group " role="group" aria-label="Basic example">
                    <button type="button" class="btn color-dark-grey tabs background-grey" id="all" @click="${this.filterEvent()}"> All</button>
                    <button type="button" class="btn color-dark-grey tabs background-grey" id="active" @click="${this.filterEvent()}">Active</button>
                    <button type="button" class="btn color-dark-grey tabs background-grey" id="completed" @click="${this.filterEvent()}">Completed</button>
                </div>
                <div class=" clear-completed">
                    <button type="button" class="btn btn-secondary" @click="${this.clearCompletedEvent()}"id='clear-button'>Clear completed(${this.todoModel.todoList.length-totalTodoLeft})</button>
                </div>
                `;

            render(footer, document.getElementById('footer'));
        }
    
        reDraw(){
            this.reDrawList();
            this.reDrawFooter();
        }
    
};

new TodoController();