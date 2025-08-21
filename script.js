let currentUser = null;
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve tasks from local storage if they exist

// Initialize the task list from local storage
renderTasks();

const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");
const countryCodeEl = document.getElementById("country-code");
const aadharEl = document.getElementById("aadhar");
const errorEl = document.getElementById("error");
const userNameEl = document.getElementById("user-name");

const registerTab = document.getElementById("register-tab");
const tasksTab = document.getElementById("tasks-tab");
const registerForm = document.getElementById("register-form");
const taskOptions = document.getElementById("task-options");
const taskPostForm = document.getElementById("task-post-form");
const taskListSection = document.getElementById("task-list-section");

const postTaskOption = document.getElementById("post-task-option");
const takeTaskOption = document.getElementById("take-task-option");

// Register button click listener
document.getElementById("register-btn").addEventListener("click", () => {
  if (!nameEl.value || !emailEl.value || !phoneEl.value || !aadharEl.value) {
    errorEl.innerText = "All fields are required!";
    return;
  }

  // Simulate sending OTP
  const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
  const enteredOtp = prompt(`An OTP has been sent to ${phoneEl.value}. Enter the OTP:`);

  if (enteredOtp == otp) {
    // Proceed with registration logic (mock)
    currentUser = {
      name: nameEl.value,
      email: emailEl.value,
      phone: `${countryCodeEl.value}${phoneEl.value}`,
      aadhar: aadharEl.value,
    };

    // Hide the register form and show the task options
    registerForm.classList.remove("active");
    taskOptions.classList.add("active");
    userNameEl.innerText = currentUser.name;

    // Enable tasks tab
    tasksTab.disabled = false;
    tasksTab.classList.remove("disabled");
  } else {
    errorEl.innerText = "Invalid OTP, please try again.";
  }
});

// Task options - Post or Take Task
postTaskOption.addEventListener("click", () => {
  taskPostForm.classList.add("active");
  taskListSection.classList.remove("active");
});

takeTaskOption.addEventListener("click", () => {
  taskPostForm.classList.remove("active");
  taskListSection.classList.add("active");
});

// Handle Task Post Form
document.getElementById("post-task-btn").addEventListener("click", () => {
  const taskCategory = document.getElementById("task-category").value;
  const taskTitle = document.getElementById("task-title").value;
  const taskDesc = document.getElementById("task-desc").value;
  const taskAmount = document.getElementById("task-amount").value;

  if (!taskTitle || !taskDesc || !taskAmount) {
    errorEl.innerText = "All task fields are required!";
    return;
  }

  // New task with status field
  const task = {
    id: Date.now(),
    category: taskCategory,
    title: taskTitle,
    description: taskDesc,
    amount: taskAmount,
    postedBy: currentUser.name,
    status: 'available' // Task is initially available
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to localStorage
  
  renderTasks(); // Refresh task list
  taskPostForm.classList.remove("active");
  taskListSection.classList.add("active");
});

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <strong>${task.title}</strong><br />
      Category: ${task.category}<br />
      Description: ${task.description}<br />
      Amount: ₹${task.amount}<br />
      Posted by: ${task.postedBy}<br />
      Status: ${task.status === 'available' ? 'Available' : 'Accepted'}<br />
      <button onclick="acceptTask(${task.id})" ${task.status === 'accepted' ? 'disabled' : ''}>Accept Task</button>
    `;
    taskList.appendChild(taskItem);
  });
}

// Handle task acceptance (update status)
function acceptTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  task.status = 'accepted'; // Mark task as accepted
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated task status to localStorage
  renderTasks(); // Refresh task list to reflect the status change
  alert(`You have accepted the task: ${task.title}`);
}

// Clear error message when user starts typing
nameEl.addEventListener("input", () => { errorEl.innerText = ""; });
emailEl.addEventListener("input", () => { errorEl.innerText = ""; });
phoneEl.addEventListener("input", () => { errorEl.innerText = ""; });
aadharEl.addEventListener("input", () => { errorEl.innerText = ""; });
