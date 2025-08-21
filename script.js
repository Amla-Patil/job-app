let currentUser = { id: 'user-123', name: 'John Doe' };  // Simulate a logged-in user

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];  // Retrieve tasks from local storage

// Initialize the task list
renderTasks();

const postTaskTab = document.getElementById("post-task-tab");
const acceptTaskTab = document.getElementById("accept-task-tab");
const postTaskSection = document.getElementById("post-task-section");
const acceptTaskSection = document.getElementById("accept-task-section");

const taskTitleEl = document.getElementById("task-title");
const taskDescEl = document.getElementById("task-desc");
const taskAmountEl = document.getElementById("task-amount");
const taskCategoryEl = document.getElementById("task-category");
const postTaskBtn = document.getElementById("post-task-btn");

const filterCategoryEl = document.getElementById("filter-category");

const postedTaskListEl = document.getElementById("posted-task-list");
const taskListEl = document.getElementById("task-list");

const switchTab = (tab) => {
  postTaskTab.classList.remove("active");
  acceptTaskTab.classList.remove("active");
  postTaskSection.classList.remove("active");
  acceptTaskSection.classList.remove("active");

  if (tab === "post") {
    postTaskTab.classList.add("active");
    postTaskSection.classList.add("active");
  } else {
    acceptTaskTab.classList.add("active");
    acceptTaskSection.classList.add("active");
  }
};

postTaskTab.addEventListener("click", () => switchTab("post"));
acceptTaskTab.addEventListener("click", () => switchTab("accept"));

// Handle Task Posting
postTaskBtn.addEventListener("click", () => {
  const title = taskTitleEl.value.trim();
  const description = taskDescEl.value.trim();
  const amount = Number(taskAmountEl.value);
  const category = taskCategoryEl.value.trim();

  if (!title || !description || isNaN(amount) || amount <= 0) {
    alert("Please fill in all task fields correctly.");
    return;
  }

  const task = {
    id: `task-${Date.now()}`,
    title,
    description,
    amount,
    category,
    status: "pending",
    postedBy: currentUser.id,
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
  taskTitleEl.value = '';
  taskDescEl.value = '';
  taskAmountEl.value = '';
  taskCategoryEl.value = 'General';
});

// Filter tasks by category
filterCategoryEl.addEventListener("change", () => {
  renderTasks();
});

// Render tasks based on filters and categories
function renderTasks() {
  // Post Task Section
  const userPostedTasks = tasks.filter(task => task.postedBy === currentUser.id);
  postedTaskListEl.innerHTML = userPostedTasks.map(task => {
    return `<li>
      <span class="task-title">${task.title}</span>
      <span class="task-amount">₹${task.amount}</span>
    </li>`;
  }).join("");

  // Accept Task Section
  const filterCategory = filterCategoryEl.value;
  const filteredTasks = tasks.filter(task => {
    return (filterCategory === "All" || task.category === filterCategory) && task.status === "pending";
  });

  taskListEl.innerHTML = filteredTasks.map(task => {
    return `<li>
      <span class="task-title">${task.title}</span>
      <span class="task-amount">₹${task.amount}</span>
      <button class="accept-btn" onclick="acceptTask('${task.id}')">Accept</button>
    </li>`;
  }).join("");
}

// Accept Task Function
function acceptTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.status = "assigned";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    alert(`You have accepted the task: ${task.title}`);
  }
}
