"use strict";
// selecting the element
const textContainer = document.getElementById("text-container");
const addBtn = document.getElementById("add-btn");

// console.log(textContainer, addBtn);
const todos = [];
let text = "";
textContainer.addEventListener("change", function (e) {
  text = e.target.value;
  // console.log(text);
});

addBtn.addEventListener("click", function () {
  const todo = {
    id: new Date().getMilliseconds(),
    content: text,
    isCompleted: false,
  };

  if (textContainer.value != "") {
    todos.push(todo);
    textContainer.value = "";
  }
  // invoking the getTodos function
  getTodos();

});

function getTodos() {
  let output = "";
  todos.forEach(function (value) {
    output += `<li>
        <label for="">
        <input type="checkbox" id="" onclick ="completeHandler(${value.id})" ${value.isCompleted && "checked"}/>
        <span id="content__container">${value.isCompleted ? `<s>${value.content}</s>` : value.content}</span>
        </label>
        <span id="">
        <button id="btn-span" onclick="editButton(event,${value.id})">Edit</button>
        <button id="" onclick = "deleteHandler(${value.id})">X</button>
        </span>
    </li> `;
  });
  document.getElementById("counter").innerHTML = todos.length;
  document.getElementById("todo-container").innerHTML = output;
}

function completeHandler (id){
  todos.find(function(todo){
    if(todo.id == id){
      todo.isCompleted = todo.isCompleted == true ? false : true;
    }
  });
  getTodos();
}

function deleteHandler(id){
  todos.find(function(todo){
    if (todo.id == id){
      todos.splice(todos.indexOf(todo), 1)
      getTodos();
    }
  })
}

function editButton(event, id) {
  todos.find(function (todo) {
    if (todo.id === id) {
      const myEditField = document.createElement("input");
      myEditField.type = "text";
      myEditField.value = todo.content;

      const myTodoSpan = document.querySelectorAll("#content__container")[
        todos.indexOf(todo)
      ];

      myTodoSpan.replaceChildren(myEditField);
      event.target.innerText = "Save";
      myEditField.addEventListener("change", function (event) {
        todo.content = event.target.value;
        myTodoSpan.replaceChildren(todo.completed ? `<s>${todo.content}</s>` : todo.content);
        getTodos();
      });
    }
  });
}

