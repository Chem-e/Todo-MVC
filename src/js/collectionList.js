import { html, render } from 'lit-html';

import style from "../css/style.css";

import { TodoModel } from '../js/model';

export class TodoController {

    constructor() {
        this.todoModel = new TodoModel();
        this.todoModel.firestoreTodolist().then((item) => {
            this.reDraw();
        });
        this.todoModel.displayTags();
        document.getElementById("myInput")
            .addEventListener("keyup", (event) => {
                event.preventDefault();
                if (event.keyCode === 13) {
                    this.todoModel.addTodo(event.target.value);
                    event.currentTarget.value = "";
                    this.reDraw();
                };
            });

        this.capture = true;
        this.eventHandler = {
            removeEvent: (event) => {
                this.todoModel.removeTodo(event);
                this.reDraw();
            },

            toggleEvent: (event) => {
                this.todoModel.toggleCheck(event);
                this.reDraw();
            },

            clearCompletedEvent: (event) => {
                this.todoModel.clearCompleted(event);
                this.reDraw();
            },

            filterEvent: (event) => {
                let filteredArray = this.todoModel.filter(event);
                this.reDrawList(filteredArray);
            },

            editItemEvent: (event) => {
                this.todoModel.editListItem(event);
                this.reDrawList();
            },

            blurEvent: (event) => {
                this.todoModel.editedListItem(event);
                this.reDrawList();
            },

            enterKeyEvent: (event) => {
                if (event.keyCode === 13) {
                    this.todoModel.editedListItem(event);
                    this.reDrawList();
                }
            },

            uncheckAllEvent: (event) => {
                this.todoModel.uncheckAll(event);
                this.reDrawHeader();
                this.reDrawList();
            },

            checkAllEvent: (event) => {
                this.todoModel.checkAll(event);
                this.reDrawHeader();
                this.reDrawList();
            },

            enableTag: (event) => {
                this.todoModel.enableTag(event);
                this.reDrawHeader();
                this.reDrawList();
                this.reDrawTagCard();
            },

            enterKeyEventOnTag: (event) => {
                if (event.keyCode === 13) {
                    this.todoModel.addTag(event);
                    this.reDrawList();
                    this.reDrawTagCard();
                }
            },

            blurEventOnTag: (event) => {
                this.todoModel.addTag(event);
                this.reDrawList();
                this.reDrawTagCard();
            },

            filterTag: (event) => {
                let filteredArray = this.todoModel.filterTags(event);
                this.reDrawList(filteredArray);
            },

            enableDueDate: (event) => {
                this.todoModel.enableDueDate(event);
                this.reDrawHeader();
                this.reDrawList();
                this.reDrawTagCard();
            },

            enterKeyEventOnDueDate: (event) => {
                if (event.keyCode === 13) {
                    this.todoModel.addDueDate(event);
                    this.reDrawList();
                    this.reDrawTagCard();
                }
            },

            blurEventOnDueDate: (event) => {
                this.todoModel.addDueDate(event);
                this.reDrawList();
                this.reDrawTagCard();
            }

        };
    }


    reDrawHeader() {
            let header = html `
            ${ this.todoModel.headerIcon()
                ? html`<i type="checkbox" class="fas  fa-check green" @click="${()=>this.eventHandler.uncheckAllEvent(event)}"></i>`
                : html`<i class="fas fa-angle-double-down pr-3 pb-2" @click="${()=>this.eventHandler.checkAllEvent(event)}"></i>`
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
            <li id="${item.id}" class="list-group-item text-wrap d-flex li py-1" id="li">
                        <div class="icon color-light-grey mr-1 pr-3">
                            ${item.is_checked
                                ? html`<i type="checkbox" class="fas font-size-20 fa-check green" @click="${()=>this.eventHandler.toggleEvent(event)}"></i>`
                                : html`<i type="checkbox" class="fas font-size-20 fa-check  color-light-grey" @click="${()=>this.eventHandler.toggleEvent(event)}"></i>`
                            }
                        </div>
                        ${item.is_checked
                            ? html`<div class="line-through font-size-20 text text-wrap py-0 pl-4"  id="text" >        
                            ${item.text} 
                            </div>`
                            : html`<div class="text text-wrap font-size-20 pl-4" @dblclick="${()=>this.eventHandler.editItemEvent(event)}" id="text" >        
                            ${item.is_editable
                                ?
                                html` <input type="text" class="text font-size-20 input background-light-grey editableInput editable-input" id="listEditableInput" @keypress="${()=>this.eventHandler.enterKeyEvent(event)}"  @blur="${()=>this.eventHandler.blurEvent(event)}" aria-describedby="basic-addon2">`
                                : 
                                html`${item.text}`
                            }
                            <br>
                           
                                ${item.tagEnabled
                                ?
                                html`<input type="text" class="text border-radius-100 p-2 input font-size-15 background-light-grey editableInput tag-input" id="tagInput" @keypress="${()=>this.eventHandler.enterKeyEventOnTag(event)}"  @blur="${()=>this.eventHandler.blurEventOnTag(event)}">`
                                :
                                html`<div class='font-size-15 pr-3 py-0 m-0 color-light-grey border-radius-100 font-italic float-left tag-name font-weight-normal text-monospace' id='tagName'>
                                    ${item.tagName}
                                </div>`
                                }
                                ${item.dueDateEnabled
                                    ?
                                    html`<input type="date" class="text border-radius-100 p-2 input font-size-15 background-light-grey editableInput" id="dueDateInput" @keypress="${()=>this.eventHandler.enterKeyEventOnDueDate(event)}"  @blur="${()=>this.eventHandler.blurEventOnDueDate(event)}">`
                                    :
                                    html`<div class='font-size-15 px-3 py-0 color-light-grey border-radius-100 font-italic float-right font-weight-normal text-monospace' id='dueDate'>
                                        ${item.dueDate} 
                                    </div>`
                                }
                            
                            </div>`
                        }
                        <i class="far fa-calendar-alt color-light-grey pt-2 px-2 font-size-20" data-toggle="tooltip" data-placement="right" title="Add DueDate" id='dueDateIcon' @click=" ${()=>this.eventHandler.enableDueDate(event)}"></i>
                        <i class="fas fa-chevron-circle-down color-light-grey pt-2 px-2 font-size-20" id='tag'  data-toggle="tooltip" data-placement="right" title="Add tags" @click="${()=>this.eventHandler.enableTag(event)}"></i>
                        <i class="fas fa-times pl-2 pr-3 close pt-2 float-right color-light-grey font-size-20" id="close"  data-toggle="tooltip" data-placement="right" title="Remove list item" @click="${()=>this.eventHandler.removeEvent(event)}" ></i>
                    </li>
                `)}
            </ul>
        `; 
                        
        render(list, document.getElementById('ul'));
    }

    reDrawFooter (){
        let totalTodoLeft = this.todoModel.itemsCount();
    
        let footer = html`
            <div class="items-left pt-1 " id="items-left">
                ${totalTodoLeft} items left
            </div>   
            <div class="btn-group " role="group" aria-label="Basic example">
                <button type="button" class="btn btn-sm color-dark-grey tabs background-grey" id="all" @click="${()=>this.eventHandler.filterEvent(event)}"> All</button>
                <button type="button" class="btn btn-sm color-dark-grey tabs background-grey" id="active" @click="${()=>this.eventHandler.filterEvent(event)}">Active</button>
                <button type="button" class="btn btn-sm color-dark-grey tabs background-grey" id="completed" @click="${()=>this.eventHandler.filterEvent(event)}">Completed</button>
            </div>
            <div class=" clear-completed">
                <button type="button" class="btn btn-secondary btn-sm" @click="${()=>this.eventHandler.clearCompletedEvent(event)}" id='clear-button'>Clear completed(${this.todoModel.todoList.length-totalTodoLeft})</button>
            </div>
            `;

        render(footer, document.getElementById('footer'));
    }

    reDrawTagCard (){
        let tags = this.todoModel.displayTags();
        let tagCard = html` 
        <div class="card-header color-6c757d-grey py-0 font-weight-bold text-center w-100">
            <h2 class='my-1'> Tags </h2>
        </div>
        <div class="card-body p-1 container">
                ${tags.map((item) =>html`
                    <a @click="${()=>this.eventHandler.filterTag(event)}" class="  px-2 py-0 color-dark-grey font-italic font-weight-normal text-monospace font-size-25">${item}</a><br>
                `)}
        </div>
        `;
        render(tagCard, document.getElementById('tagCard'));
    }

    reDraw(){
        this.reDrawList();
        this.reDrawFooter();
        this.reDrawTagCard();
    }
    
};