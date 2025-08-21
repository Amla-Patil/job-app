let currentUser = null;
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve tasks from local storage if they exist
let generatedOTP = null; // Variable to store generated OTP

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

const phoneOtpInput = document.createElement("input");
phoneOtpInput.setAttribute("type", "text");
phoneOtpInput.setAttribute("id", "otp");
phoneOtpInput.setAttribute("placeholder", "Enter OTP");

const otpButton = document.createElement("button");
otpButton.innerText = "Verify OTP";
otpButton.setAttribute("id", "verify-otp-btn");

document.getElementById("register-btn").addEventListener("click", () => {
  if (!nameEl.value || !emailEl.value || !phoneEl.value || !aadharEl.value) {
    errorEl.innerText = "All fields are required!";
    return;
  }
  
  // Proceed with OTP generation
  generatedOTP = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP
  console.log("Generated OTP:", generatedOTP); // For testing purposes
  
  // Show OTP input and button
  registerForm.appendChild(phoneOtpInput);
  registerForm.appendChild(otpButton);
  
  errorEl.innerText = ""; // Clear previous error

  // Add OTP verification event listener
  otpButton.addEventListener("click", () => {
    const enteredOTP = document.getElementById("otp").value;
    
    if (enteredOTP === String(generatedOTP)) {
      // OTP is valid,
