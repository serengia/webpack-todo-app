import "./style.css";
import todoArr from "./modules/todos.js";
import populateToDo from "./modules/utils.js";

const todoListContainer = document.querySelector(".todo-list");

populateToDo(todoArr, todoListContainer);
