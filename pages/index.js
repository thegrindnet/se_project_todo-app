import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const counterEl = document.querySelector(".counter__text");
const listItemCount = document.querySelectorAll("ul li.todo").length;

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  modal.addEventListener("click", closePopupOnOverlay);
  document.addEventListener("keydown", handleEscape);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  modal.removeEventListener("click", closePopupOnOverlay);
  document.removeEventListener("keydown", handleEscape);
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

export const countListItems = () => {
  const listItem = document.querySelectorAll("ul li.todo");
  const listItemCount = listItem.length;
  let completedCounter = 0;
  listItem.forEach((item) => {
    if (item.querySelector(".todo__completed").checked) {
      completedCounter += 1;
    }
  });

  console.log(completedCounter);
  counterEl.textContent = `Showing ${completedCounter} of ${listItemCount} completed`;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  renderTodo(values);
  countListItems();
  closeModal(addTodoPopup);
  newTodoValidator.resetValidation();
});

initialTodos.forEach((item) => {
  renderTodo(item);
});

function closePopupOnOverlay(evt) {
  if (!evt.target.classList.contains("popup_fieldset")) {
    closeModal(evt.target);
  }
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_visible");
    closeModal(openedPopup);
  }
}

countListItems();
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
