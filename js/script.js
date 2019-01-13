import css from '../css/styles.css';
console.log("testing!!!")

// Import lit-html
import { html, render } from 'lit-html';


const TodoController = {
        initialize: function() {
            document.getElementById("myInput")
                .addEventListener("keyup", function(event) {
                    event.preventDefault();
                    if (event.keyCode === 13) {
                        TodoModel.addTodo(event.target.value);
                        TodoController.reDraw();
                    }
                });
        },

        clickHandler: {
            removeEvent(e) {
                TodoModel.removeTodo(e);
            },
            checkboxCheckedEvent(e) {
                TodoModel.checkboxChecked(e)
            },
            capture: true
        },

        reDraw: function() {
                let list = html `
                <ul class="list-group list-group-flush">
                    ${TodoModel.todoList.map((item) => html`
                    <li id="${item.id}" class="list-group-item text-wrap d-flex">
                        <div class="icon color-light-grey mr-1 pr-3">
                            <i class="fas  fa-check" id="check" @click="${TodoController.clickHandler.checkboxCheckedEvent}"></i>
                        </div>
                        <div class="text text-wrap pl-4" id="text" >        
                            ${item.text} 
                        </div>
                        <i class="fas fa-times px-3  pt-2 float-right color-light-grey" id="close" @click="${TodoController.clickHandler.removeEvent}"></i>
                    </li>
                    `)}
                </ul>
                `;
            render(list, document.getElementById('ul'));
    },
    checkedListItems: function(){

        console.log("event from model",event);

        let check=html`
        <div>
          ${TodoModel.todoList.map((item) => {
            if (item.id==event.target.parentNode.parentElement.id){
                console.log("everything is good");
                console.log("item.id",item.id);
                console.log("item.id",item);
                console.log  ("event.target.parentNode.parentElement.id",event.target.parentNode.parentElement.id)
               
                document.getElementById('check').classList.add('green');
                document.getElementById('text').classList.add('line-through');
            }
            
          }
        )}
    
        </div>
      `;
        render(check, document.getElementById('check'));

    //     TodoModel.todoList.map((item) => {
       
    // })
        
        // let check = html `
        // ${TodoModel.todoList.map((item) => html`

        
        
        // `;
        // render(check, document.getElementById());



        // console.log(item.id);
        // let check=document.querySelector('#item.id').style.color = "green";
        // console.log(check)
    //   let cutText =document.querySelector('.text');
    //  cutText=cutText.strike();
},
    itemsLeft:{},
    clearCompleted:{}


}



const TodoModel = {
    todoList: [],

    count: 1,

    todosDone:0,
    todosLeft:0,

    addTodo: function(value) {
        var todoItem = {
            id: TodoModel.count,
            text: value,
            is_checked: false
        }
        TodoModel.todoList.push(todoItem);
        TodoModel.count++;
    },

    removeTodo: function(event) {
            TodoModel.todoList.forEach((item, index) => {
                if (item.id == event.target.parentElement.id) {
                TodoModel.todoList.splice(index, 1);
                TodoController.reDraw();
            };
        })
    },

    checkboxChecked: function(event){
        TodoModel.todoList.forEach((item, index) => {
            if (item.id == event.target.parentNode.parentElement.id) {
                TodoModel.todoList[index].is_checked=true;
                TodoController.checkedListItems();
            }
            })
    }
    
}
TodoController.initialize();