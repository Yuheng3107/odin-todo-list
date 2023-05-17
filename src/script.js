function createTodoItem(
  title,
  description = "",
  dueDate = "No Date",
  priority = "urgent"
) {
  return Object.assign({}, { title, description, dueDate, priority });
}

function createProject(name) {
  // factory function to create a project
  // project has a name, as well as a list of todos
  todos = [];
  return Object.assign({}, { todos, name });
}

function saveData() {
  // save projects and inboxes inside localStorage
}

function toggleTwoItems(item1, item2) {
  item1.classList.toggle("flex");
  item1.classList.toggle("hidden");
  item2.classList.toggle("flex");
  item2.classList.toggle("hidden");
}

function renderProjects(container, projects) {
  container.innerHTML = "";
  projects.forEach((project) => {
    item = document.createElement("p");
    item.classList.add("ms-4", "px-4", "text-xl", "py-1");
    item.innerText = project.name;
    // add event listener here to render todo list
    container.appendChild(item);
  });
}

const removeTodo = (project, todo) => {
  // remove from project.todos
  project.todos.splice(project.todos.indexOf(todo), 1);
  // render again
  renderToDoList(project);
  console.log("Removing");
};
const renderToDoList = (project) => {
  // clear nonsense
  todoList.innerHTML = "";
  // takes a project and renders all todo lists in the project

  project.todos.forEach((todo) => {
    // render
    let item = document.createElement("div");
    item.classList.add("item", "flex", "flex-row", "justify-between");

    let innerHTML = `<div class="flex flex-row items-center">
                <i class="fa fa-circle-o"></i>
                <p class="px-3">${todo.title}</p>
              </div>`;
    if (todo.dueDate === "No Date") {
      innerHTML += `<div class="text-xl me-4">No Date</div>`;
    } else {
      innerHTML += `<input type="date" class="me-4" />`;
    }
    item.innerHTML = innerHTML;
    console.log(item.querySelector("i"));
    item.querySelector("i").addEventListener("click", (e) => {
      removeTodo(project, todo);
    });
    todoList.appendChild(item);
  });
};
let projects = [createProject("Inbox")];

let addProjectBtn = document.querySelector("#addProjectBtn");
let addProjectForm = document.querySelector("#addProjectForm");
let submitProjectBtn = document.querySelector("#submitAddProject");
let cancelProjectBtn = document.querySelector("#cancelAddProject");
let projectsContainer = document.querySelector("#projects-container");
let addTaskBtn = document.querySelector("#addTaskBtn");
let addTaskForm = document.querySelector("#addTaskForm");
let taskSubmitBtn = document.querySelector("#taskSubmitBtn");
let taskCancelBtn = document.querySelector("#taskCancelBtn");
let listArea = document.querySelector("#listArea");
let projectNameDisplay = document.querySelector("#projectNameDisplay");
let todoList = document.querySelector("#todo-list");

addProjectBtn.addEventListener("click", () => {
  toggleTwoItems(addProjectBtn, addProjectForm);
});

submitProjectBtn.addEventListener("click", (e) => {
  // create new project
  if (!addProjectForm.checkValidity()) return;
  let projectName = document.querySelector("#projectName").value;
  e.preventDefault();
  document.querySelector("#projectName").value = "";
  let project = createProject(projectName);
  projects.push(project);
  toggleTwoItems(addProjectBtn, addProjectForm);
  renderProjects(projectsContainer, projects);
});

cancelProjectBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleTwoItems(addProjectBtn, addProjectForm);
});

addTaskBtn.addEventListener("click", (e) => {
  toggleTwoItems(addTaskBtn, addTaskForm);
});

taskSubmitBtn.addEventListener("click", (e) => {
  if (!addTaskForm.checkValidity()) return;
  e.preventDefault();
  // logic to create a new todo list item and add it to the project
  let projectName = projectNameDisplay.textContent;
  let project =
    projects[projects.findIndex((project) => project.name === projectName)];
  let todoTitle = addTaskForm["todoTitle"].value;
  // create to do
  project.todos.push(createTodoItem(todoTitle));
  // render to dos on project
  renderToDoList(project);
  // toggle
  toggleTwoItems(addTaskBtn, addTaskForm);
  // clear input
  addTaskForm["todoTitle"].value = "";
});

taskCancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleTwoItems(addTaskBtn, addTaskForm);
});

renderProjects(projectsContainer, projects);
