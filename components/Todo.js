class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._selector = selector;
    this._completed = data.completed;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._removeTodo();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });
  }

  _removeTodo = () => {
    this.remove();
  };

  remove() {
    this._todoElement.remove();
    this._todoElement = null;
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _toggleCompletion = () => {
    this._completed = !this._completed;
  };

  _setDueDate() {
    this._todoDate = this._todoElement.querySelector(".todo__date");
    const completionDate = new Date(this._data.date);
    if (!isNaN(completionDate)) {
      this._todoDate.textContent = `Due: ${completionDate.toLocaleString(
        "en-Us",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._setEventListeners();
    this._setDueDate();

    return this._todoElement;
  }
}

export default Todo;
