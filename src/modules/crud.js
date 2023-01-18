class Crud {
  constructor() {
    this.todoListContainer = document.querySelector(".todo-list");
  }

  getToDos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
  }

  getTodoItemMarkup(todo) {
    return `<li class="item-wrapper todo-item"  data-complete="${
      todo.complete
    }" data-id="${todo.index}">
    <input type="checkbox" data-id="${todo.index}" ${
      todo.complete ? "checked" : null
    } class="todo-checkbox">
    <input type="text" value="${todo.description}" data-id="${
      todo.index
    }" class="todo-description"/>
   
    <span class="icon-box todo-action-icons">
     <i class="item-icon fa-solid fa-trash-can" data-id="${todo.index}"></i>
     <i class="item-icon fa-solid fa-xmark"></i>
     <i class="item-icon fa-solid fa-ellipsis-vertical"></i>
   
    </span>
   </li>`;
  }

  updateUI(todoArr = this.getToDos()) {
    let todoMarkup = "";
    const todos = todoArr;
    const sortedTodos = todos.sort((a, b) => a.index - b.index);

    sortedTodos.forEach((todo) => {
      todoMarkup += this.getTodoItemMarkup(todo);
    });

    this.todoListContainer.insertAdjacentHTML("afterbegin", todoMarkup);
  }

  //   Add todo
  addTodo(description, complete = false) {
    const todoArr = this.getToDos();

    const todoObj = {
      description,
      index: todoArr.length,
      complete,
    };

    todoArr.push({ ...todoObj });

    // Save to local storage
    localStorage.setItem("todos", JSON.stringify(todoArr));

    const todoMarkup = this.getTodoItemMarkup({ ...todoObj });
    this.todoListContainer.insertAdjacentHTML("beforeend", todoMarkup);
  }

  removeItem(index) {
    const todos = this.getToDos();
    const updatedTodos = todos.filter((todo) => todo.index !== index);

    if (updatedTodos.length > 0) {
      updatedTodos.forEach((todo, i) => {
        todo.index = i;
      });
    }

    // Save updated list to local
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  updateTodo(index, text) {
    const todos = this.getToDos();
    const itemToUpdate = todos.find((todoObj) => todoObj.index === index);

    const initialText = itemToUpdate?.description;
    if (text === initialText) return;

    itemToUpdate.description = text;

    todos.splice(index, 1, itemToUpdate);

    // Save changes to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  updateTodoStatus(index, status) {
    const todos = this.getToDos();
    const itemToUpdate = todos.find((todoObj) => todoObj.index === index);
    itemToUpdate.complete = status;

    todos.splice(index, 1, itemToUpdate);

    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

export default Crud;
