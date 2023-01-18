const populateToDo = (todoArr, todoContainer) => {
  let todoMarkup = "";

  const sortedTodos = todoArr.sort((a, b) => a.index - b.index);

  sortedTodos.forEach((todo) => {
    todoMarkup += `<li class="item-wrapper todo-item">
         <input type="checkbox" placeholder="Add to do" id="${todo.index}" value="Bike">
         <label for="${todo.index}">${todo.description}</label>
         <span class="icon-box"><i class="item-icon fa-solid fa-ellipsis-vertical"></i></span>
     </li>`;
  });

  todoContainer.insertAdjacentHTML("afterbegin", todoMarkup);
};

export default populateToDo;
