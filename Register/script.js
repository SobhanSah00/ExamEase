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


// document.getElementById("registerForm").addEventListener("submit", async (e) => {
//   e.preventDefault(); // Prevent default form submission

//   const formData = new FormData();
//   formData.append("fullName", document.getElementById("fullName").value);
//   formData.append("username", document.getElementById("username").value);
//   formData.append("password", document.getElementById("password").value);
//   formData.append("email", document.getElementById("email").value);
//   formData.append("age", document.getElementById("age").value);
//   formData.append("gender", document.querySelector('input[name="gender"]:checked').value);
//   formData.append("address", document.getElementById("address").value);
//   formData.append("skills", document.getElementById("skills").value.split(",").map(s => s.trim()));
//   formData.append("avatar", document.getElementById("avatar").files[0]);
//   formData.append("resume", document.getElementById("resume").files[0]);

//   try {
//      const response = await fetch("http://localhost:8000/api/v1/users/register", {
//         method: "POST",
//         body: formData
//      });

//      if (!response.ok) {
//         const errorData = await response.json();
//         document.getElementById("error").innerText = errorData.message || "An error occurred.";
//         return;
//      }

//      const result = await response.json();
//      alert(result.message || "User registered successfully!");
//   } catch (error) {
//      document.getElementById("error").innerText = "Unable to connect to the server.";
//      console.error("Error:", error);
//   }
// });
