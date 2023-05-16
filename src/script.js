function createTodoItem(title, description, dueDate, priority) {
  return Object.assign({}, { title, description, dueDate, priority });
}

function createProject(name) {
  // factory function to create a project
  // project has a name, as well as a list of todos
  todos = [];
  return Object.assign({}, { todos, name });
}

let inbox = createProject("Inbox");

let addProjectBtn = document.querySelector("#addProject");

addProjectBtn.addEventListener("onclick");
