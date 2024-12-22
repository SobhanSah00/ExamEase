const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const resetBtn = document.querySelector(".reset");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

// Handle "Next" button for each step
nextBtnFirst.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  updateProgress(current);
  current += 1;
});

nextBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  updateProgress(current);
  current += 1;
});

nextBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-75%";
  updateProgress(current);
  current += 1;
});

// Handle "Submit" button
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  updateProgress(current);
  current += 1;
  setTimeout(function () {
    alert("Your Form Successfully Submitted");
    location.reload(); // Reload to reset form
  }, 800);
});

// Handle "Previous" button for each step
prevBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  removeProgress(current - 1);
  current -= 1;
});

prevBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  removeProgress(current - 1);
  current -= 1;
});

prevBtnFourth.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  removeProgress(current - 1);
  current -= 1;
});

// Reset button functionality
resetBtn.addEventListener("click", function () {
  location.reload(); // Reload to reset the form completely
});

// Helper function to update progress bar
function updateProgress(step) {
  bullet[step - 1].classList.add("active");
  progressCheck[step - 1].classList.add("active");
  progressText[step - 1].classList.add("active");
}

// Helper function to remove progress bar step
function removeProgress(step) {
  bullet[step - 1].classList.remove("active");
  progressCheck[step - 1].classList.remove("active");
  progressText[step - 1].classList.remove("active");
}
