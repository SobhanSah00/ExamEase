   // Show the next page
   function showPage(currentPageId, nextPageId) {
    document.getElementById(currentPageId).classList.remove("active");
    document.getElementById(nextPageId).classList.add("active");
  }

  // Show the previous page
  function showPrevPage(currentPageId, prevPageId) {
    document.getElementById(currentPageId).classList.remove("active");
    document.getElementById(prevPageId).classList.add("active");
  }

  // Step 1: Next button
  document.getElementById("next1").addEventListener("click", () => {
    showPage("page1", "page2");
  });

  // Step 2: Next button
  document.getElementById("next2").addEventListener("click", () => {
    showPage("page2", "page3");
  });

  // Step 2: Previous button
  document.getElementById("prev1").addEventListener("click", () => {
    showPrevPage("page2", "page1");
  });

  // Step 3: Previous button
  document.getElementById("prev2").addEventListener("click", () => {
    showPrevPage("page3", "page2");
  });

  // Handle form submission
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(); // Prepare FormData object
    formData.append("fullName", document.getElementById("fullName").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("username", document.getElementById("username").value);
    formData.append("password", document.getElementById("password").value);
    formData.append("age", document.getElementById("age").value);
    formData.append("gender", document.getElementById("gender").value);
    formData.append("address", document.getElementById("address").value);
    formData.append("skills", document.getElementById("skills").value.split(",").map((s) => s.trim()));
    formData.append("avatar", document.getElementById("avatar").files[0]);
    formData.append("resume", document.getElementById("resume").files[0]);

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/register", {
        method: "POST",
        body: formData, // Send FormData object
      });

      // Check response status
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        document.getElementById("error").innerText = errorData.message || "An error occurred.";
        return;
      }

      // Handle successful response
      const result = await response.json();
      console.log("Success response:", result);
      alert(result.message || "User registered successfully!");
    } catch (error) {
      // Handle network or other unexpected errors
      console.error("Error:", error);
      document.getElementById("error").innerText = "An error occurred. Please try again.";
    }
  });