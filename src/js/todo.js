const form = document.querySelector(".todo-form"),
  input = document.querySelector(".todo-input"),
  todoList = document.getElementById("todo"),
  doingList = document.getElementById("doing"),
  doneList = document.getElementById("done");

let toDos = [];

function persistToDos() {
  const stringToDo = JSON.stringify(toDos);
  localStorage.setItem("toDos", stringToDo);
}

function saveToDo(text, status) {
  const toDoObject = {
    id: toDos.length + 1,
    value: text,
    status: status
  };
  toDos.push(toDoObject);
  persistToDos();
}

function handleDelete(event) {
  const target = event.target;
  const li = target.parentElement;
  const ul = li.parentElement;
  const toDoId = li.id;
  ul.removeChild(li);
  toDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(toDoId);
  });
  persistToDos();
}

function addToDo(text, status) {
  const toDo = document.createElement("li");
  toDo.className = "toDo";
  toDo.id = toDos.length + 1;
  toDo.setAttribute("draggable", "true");
  toDo.setAttribute("aria-grabbed", "false");
  toDo.setAttribute("tabindex", "0");
  const deleteBtn = document.createElement("span");
  deleteBtn.innerHTML = " ❎ ";
  deleteBtn.className = "toDo__button";
  deleteBtn.addEventListener("click", handleDelete);
  const label = document.createElement("label");
  label.innerHTML = text;
  toDo.appendChild(label);
  toDo.appendChild(deleteBtn);
  if ((status = "todo")) todoList.appendChild(toDo);
  if ((status = "doing")) todoList.appendChild(doing);
  if ((status = "done")) todoList.appendChild(done);
  saveToDo(text, status);
}

function onSubmit(event) {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addToDo(value, "todo");
}

function loadToDos() {
  const loadedToDos = localStorage.getItem("toDos");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      addToDo(toDo.value, toDo.status);
    });
  }
  return;
}

function init() {
  loadToDos();
}

form.addEventListener("submit", onSubmit);

var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {}, false);

document.addEventListener(
  "dragstart",
  function(event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = 0.5;
  },
  false
);

document.addEventListener(
  "dragend",
  function(event) {
    // reset the transparency
    event.target.style.opacity = 1;
  },
  false
);

/* events fired on the drop targets */
document.addEventListener(
  "dragover",
  function(event) {
    // prevent default to allow drop
    event.preventDefault();
  },
  false
);

document.addEventListener(
  "dragenter",
  function(event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == "todo-section") {
      event.target.style.opacity = 0.5;
    }
  },
  false
);

document.addEventListener(
  "dragleave",
  function(event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == "todo-section") {
      event.target.style.opacity = 1;
    }
  },
  false
);

document.addEventListener(
  "drop",
  function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    targetBoard = event.target.querySelector(".js-list");
    // move dragged elem to the selected drop target
    if (event.target.className == "todo-section") {
      event.target.style.opacity = 1;
      dragged.parentNode.removeChild(dragged);
      targetBoard.appendChild(dragged);
    }
    console.log(event.target.id);
    console.log(event.dataTransfer);
  },
  false
);

init();
