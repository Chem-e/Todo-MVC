import js from 'model.js';

import js from 'storage.js';

import css from '../css/styles.css';

import { html, render } from 'lit-html';


const TodoController = {

        initialize: function() {
            // TodoModel.todoList = localStorage.getItem()

            document.getElementById("myInput")
                .addEventListener("keyup", function(event) {
                    event.preventDefault();
                    if (event.keyCode === 13) {
                        TodoModel.addTodo(event.target.value);
                        TodoController.reDrawList();
                        TodoController.reDrawFooter();
                    }
                });
        },

        eventHandler: {
            removeEvent(event) {
                TodoModel.removeTodo(event);
                TodoController.reDrawList();
                TodoController.reDrawFooter();
            },
            toggleEvent(event) {
                TodoModel.toggleCheck(event)
                TodoController.reDrawList();
                TodoController.reDrawFooter();
            },
            clearCompletedEvent(event) {
                TodoModel.clearCompleted(event);
                TodoController.reDrawList();
                TodoController.reDrawFooter();
            },
            filterCompletedEvent(event) {
                let filteredArray = TodoModel.filterCompleted(event);
                TodoController.reDrawList(filteredArray);
                TodoController.reDrawFooter();
            },
            filterActiveEvent(event) {
                let filteredArray = TodoModel.filterActive(event);
                TodoController.reDrawList(filteredArray);
                TodoController.reDrawFooter();
            },
            filterAllEvent(event) {
                let filteredArray = TodoModel.filterAll(event);
                TodoController.reDrawList(filteredArray);
                TodoController.reDrawFooter();
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

            capture: true
        },

        reDrawHeader: function() {

                let header = html `
                ${ TodoModel.headerIcon()
                    ? html`<i class="fas fa-angle-double-down green pr-2"></i>`
                    : html`<i class="fas fa-angle-double-down pr-2"></i>`
                }
                `;
            render(header, document.getElementById('header-icon'));
        },
        
        reDrawList: function(filteredArray = TodoModel.todoList) {
                TodoModel.itemsCount();
                TodoController.reDrawHeader();
    
                let list = html `
                <ul class="list-group list-group-flush">
                    ${filteredArray.map((item) => html`
                    <li id="${item.id}" class="list-group-item text-wrap d-flex">
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
                                 html` <input type="text" class="text form-control input background-light-grey" @keypress="${TodoController.eventHandler.enterKeyEvent}" @blur="${TodoController.eventHandler.blurEvent}"  aria-describedby="basic-addon2">`
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
                             
            render(list, document.getElementById('ul'));
    },
    
        reDrawFooter: function (){
            let   totalTodoLeft=  TodoModel.itemsCount();
           
            let footer=  html`
                <div class="items-left pt-2 " id="items-left">
                    ${totalTodoLeft} items left
                </div>   
                <div class="btn-group " role="group" aria-label="Basic example">
                    <button type="button" class="btn color-dark-grey tabs background-grey" @click="${TodoController.eventHandler.filterAllEvent}"> All</button>
                    <button type="button" class="btn color-dark-grey tabs background-grey" @click="${TodoController.eventHandler.filterActiveEvent}">Active</button>
                    <button type="button" class="btn color-dark-grey tabs background-grey" @click="${TodoController.eventHandler.filterCompletedEvent}">Completed</button>
                </div>
                <div class=" clear-completed">
                    <button type="button" class="btn btn-secondary" @click="${TodoController.eventHandler.clearCompletedEvent}"id='clear-button'>Clear completed(${TodoModel.todoList.length-totalTodoLeft})</button>
                </div>
                `;

            render(footer, document.getElementById('footer'));
        }
}



const TodoModel = {
    todoList:[],

    todoList :localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [],

    count: 1,

    addTodo: function(value) {
        var todoItem = {
            id: TodoModel.count,
            text: value,
            is_checked: false,
            is_editable: false
        }
        TodoModel.todoList.push(todoItem);
        console.log(this.todoList)
        localStorage.setItem('items', JSON.stringify(this.todoList));
        TodoModel.count++;  
    },

    removeTodo: function(event) {
        TodoModel.todoList.forEach((item, index) => {
            if (item.id == event.target.parentElement.id) {
                TodoModel.todoList.splice(index, 1);
                localStorage.setItem('items', JSON.stringify(this.todoList));
            };
        })
      
    },

    toggleCheck: function(event){
        TodoModel.todoList.forEach((item, index) => {   
            if (item.id == event.target.parentNode.parentElement.id) {
                TodoModel.todoList[index].is_checked = !TodoModel.todoList[index].is_checked;
            }
        })
    },
    
    itemsCount: function(){
        let count = 0;
        TodoModel.todoList.map((item, index) => {
            if(item.is_checked==false){
                count++;
            }          
        })
        return count;       
    },

    clearCompleted: function(event){
        TodoModel.todoList = TodoModel.todoList.filter((item) => {
            return   item.is_checked === false;
        })
            localStorage.setItem('items', JSON.stringify(this.todoList));
    },
    

    filterAll: function(all){
        return TodoModel.todoList;
    },
    
    filterActive: function(active){
       return  TodoModel.todoList.filter(item => item.is_checked == false);
    },
    
    filterCompleted: function(completed){
        return TodoModel.todoList.filter(item => item.is_checked === true);
    },
    
    // headerIcon: function(){
    //     if(this.todoList.length===0){
    //         return false;
    //     }
    //     else{
    //         return this.todoList.every(item => item.is_checked==true);
    //     }
    // },

    editListItem: function(event){
        TodoModel.todoList.forEach((item, index) => {   
            if (item.id == event.target.parentNode.id) {
                TodoModel.todoList[index].is_editable= !TodoModel.todoList[index].is_editable;
            }
        })     
    },
    
    edit: function(){
        TodoModel.todoList.forEach((item, index) => {   
            if (item.id == event.target.parentNode.parentElement.id) {
                item.text=event.target.value;
                item.is_editable=false;
            }
        })   
    }
}



const TodoLocalStorage={

    serviceSetItem: function(){
    
    },

    serviceGetItem: function(){

    }
    // localStorage.setItem('items', JSON.stringify(TodoModel.todoList));
    // const data = JSON.parse(localStorage.getItem('items')); 
    // data.forEach(item => {
    //     TodoController.reDrawList();
    // });

    

}

localStorage.clear();
TodoController.initialize();
TodoLocalStorage.storage();
TodoController.reDrawList();
TodoController.reDrawFooter();