let currentUser = null;  // Stores the current user after registration
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];  // Retrieve tasks from local storage

// Initialize the task list
renderTasks();

const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");
const aadharEl = document.getElementById("aadhar");
const errorEl = document.getElementById("error");

const registerTab = document.getElementById("register-tab");
const tasksTab = document.getElementById("tasks-tab");
const taskSelectionEl = document.getElementById("task-selection");

const postTaskBtn = document.getElementById("post-task-btn");
const acceptTaskBtn = document.getElementById("accept-task-btn");

const registerForm = document.getElementById("register-form");
const postTaskSection = document.getElementById("post-task-section");
const acceptTaskSection = document.getElementById("accept-task-section");

const taskTitleEl = document.getElementById("task-title");
const taskDescEl = document.getElementById("task-desc");
const taskAmountEl = document.getElementById("task-amount");
const taskCategoryEl = document.getElementById("task-category");
const submitTaskBtn = document.getElementById("submit-task-btn");

const filterCategoryEl = document.getElementById("filter-category");

const postedTaskListEl = document.getElementById("posted-task-list");
const taskListEl = document.getElementById("task-list");

// Registration Process
document.getElementById("register-btn").addEventListener("click", function() {
  const name = nameEl.value;
  const email = emailEl.value;
  const phone = phoneEl.value;
  const aadhar = aadharEl.value;

  if (name && email && phone && aadhar) {
    currentUser = { name, email, phone, aadhar };
    localStorage.setItem("user", JSON.stringify(currentUser));

    // Show Task Options after registration
    registerForm.classList.remove("active");
    taskSelectionEl.classList.add("active");

    tasksTab.disabled = false;
    tasksTab.classList.add("active");
    registerTab.classList.remove("active");
  } else {
    errorEl.textContent = "Please fill all fields.";
  }
});

// Switch to post task section
postTaskBtn.addEventListener("click", function() {
  taskSelectionEl.classList.remove("active");
  postTaskSection.classList.add("active");
});

// Switch to accept task section
acceptTaskBtn.addEventListener("click", function() {
  taskSelectionEl.classList.remove("active");
  acceptTaskSection.classList.add("active");
});

// Post Task Functionality
submitTaskBtn.addEventListener("click", function() {
  const taskTitle = taskTitleEl.value;
  const taskDesc = taskDescEl.value;
  const taskAmount = taskAmountEl.value;
  const taskCategory = taskCategoryEl.value;

  if (taskTitle && taskDesc && taskAmount && taskCategory) {
    const newTask = {
      title: taskTitle,
      description: taskDesc,
      amount: taskAmount,
      category: taskCategory,
      postedBy: currentUser.name,
      accepted: false
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();

    // Reset Form
    taskTitleEl.value = '';
    taskDescEl.value = '';
    taskAmountEl.value = '';
    taskCategoryEl.value = 'General';
  }
});

// Accept Task Functionality
filterCategoryEl.addEventListener("change", renderTasks);

// Render Tasks
function renderTasks() {
  const filteredCategory = filterCategoryEl.value;
  taskListEl.innerHTML = '';
  postedTaskListEl.innerHTML = '';

  tasks.forEach((task, index) => {
    if (filteredCategory === 'All' || task.category === filteredCategory) {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
        <span class="task-title">${task.title}</span>
        <span class="task-amount">₹${task.amount}</span>
        <button class="accept-btn" ${task.accepted ? "disabled" : ""} onclick="acceptTask(${index})">
          ${task.accepted ? "Accepted" : "Accept Task"}
        </button>
      `;
      taskListEl.appendChild(taskItem);
    }

    if (task.postedBy === currentUser.name) {
      const postedTaskItem = document.createElement("li");
      postedTaskItem.innerHTML = `
        <span class="task-title">${task.title}</span>
        <span class="task-amount">₹${task.amount}</span>
      `;
      postedTaskListEl.appendChild(postedTaskItem);
    }
  });
}

// Accept Task Logic
function acceptTask(index) {
  tasks[index].accepted = true;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
