let tasks = [
  {
    id: 1,
    name: "Finish Task Tracker Code",
    status: "in-progress",
  },
  {
    id: 2,
    name: "Submit Assessment",
    status: "to-do",
  },
  {
    id: 3,
    name: "Start Assessment",
    status: "done",
  },
];

// Declare variables to reference elements on page
const submitButton = document.getElementById("submit");
const taskInput = document.getElementById("tname");
const cardContainer = document.getElementById("list");

// Assign class for task card status buttons
function buttonClass(taskStatus, buttonType) {
  if (taskStatus === buttonType) {
    return 'class="active status-btn"';
  } else {
    return 'class="status-btn"';
  }
}

// TO DO: Render existing task cards
function render() {
  for (let i = 0; i < tasks.length; i++) {
    cardContainer.innerHTML += `
      <article class="task-card s-to-do">
        <button class="delete-btn" data-index=${tasks[i].id}>X</button>
        <h2>${tasks[i].name}</h2>
        <div>
          <ul class="button-list">
            <li><button class="status-btn">To Do</button></li>
            <li><button class="status-btn">In Progress</button></li>
            <li><button class="status-btn">Done</button></li>
          </ul>
        </div>
      </article>
    `
  };

  let deleteButton = document.querySelectorAll('.delete-btn');
  console.log(deleteButton);
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', deleteTask);
  }
};

// TO DO: Create new task card
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  let taskNameInput = document.getElementById('tname');
  let taskName = taskNameInput.value;
  tasks.push({id: tasks.length + 1, name: `${taskName}`, status: 'To Do'});
  cardContainer.innerHTML = "";
  render();
  taskNameInput.value = "";
});

// TO DO: Add event listeners to update status and card color and to delete cards
cardContainer.addEventListener("click", function (event) {
  event.stopPropagation();
  console.log(event);
  console.log(event.target.tagName);
  console.log(event.target.closest('article'));

  if (event.target.textContent === "In Progress") {
    event.target.closest('article').className = 's-in-progress task-card';
    event.target.closest('article').remove.className = 's-to-do';
    event.target.closest('article').remove.className = 's-done';
    event.target.closest('article').querySelectorAll('button').forEach(button => {
      event.stopPropagation();
      if (button.className !== "delete-btn") {
        button.className = "status-btn";
      }  
    });
    if (event.target.tagName === "BUTTON") {
      event.target.className = 'active status-btn';
    } 
  } else if (event.target.textContent === "To Do") {
    event.target.closest('article').className = 's-to-do task-card';
    event.target.closest('article').remove.className = 's-in-progress';
    event.target.closest('article').remove.className = 's-done';
    event.target.closest('article').querySelectorAll('button').forEach(button => {
      if (button.className !== "delete-btn") {
        button.className = "status-btn";
      }  
    });
    if (event.target.tagName === "BUTTON") {
      event.target.className = 'active status-btn';
    } 
  } else if (event.target.textContent === "Done"){
    event.target.closest('article').className = 's-done task-card';
    event.target.closest('article').remove.className = 's-in-progress';
    event.target.closest('article').remove.className = 's-to-do';
    event.target.closest('article').querySelectorAll('button').forEach(button => {
      if (button.className !== "delete-btn") {
        button.className = "status-btn";
      }  
    });
      if (event.target.tagName === "BUTTON") {
        event.target.className = 'active status-btn';
      } 
  }
});

// deleteButton.addEventListener('click', deleteTask);
function deleteTask(event) {
  event.stopPropagation();

  let updatedTasks = [];
  updatedTasks = tasks.filter(task => {
    console.log(task.id + " " + (parseInt(event.target.dataset.index)));
    return task.id !== (parseInt(event.target.dataset.index))
  });
  tasks = updatedTasks;
  cardContainer.innerHTML = "";
  render();
};

// Render cards
render();
