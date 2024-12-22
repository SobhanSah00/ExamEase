const API_URL = "http://localhost:8000/api/v1/posts"; // Update with your actual backend URL

// Fetch and display posts
const fetchPosts = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
      },
    });

    const data = await response.json();
    if (data.success) {
      displayPosts(data.ownPosts, "my-posts-list", true);
      displayPosts(data.othersPosts, "others-posts-list", false);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// Display posts in the respective sections
const displayPosts = (posts, containerId, isOwnPosts) => {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      ${isOwnPosts ? `
        <div class="actions">
          <button onclick="editPost('${post._id}')">Edit</button>
          <button class="delete" onclick="deletePost('${post._id}')">Delete</button>
        </div>
      ` : ""}
    `;

    container.appendChild(postDiv);
  });
};

// Create a new post
document.getElementById("post-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await response.json();
    if (data.success) {
      fetchPosts();
      e.target.reset();
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
});

// Edit a post
const editPost = async (id) => {
  const newTitle = prompt("Enter new title:");
  const newContent = prompt("Enter new content:");

  if (newTitle && newContent) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });

      const data = await response.json();
      if (data.success) {
        fetchPosts();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error editing post:", error);
    }
  }
};

// Delete a post
const deletePost = async (id) => {
  if (confirm("Are you sure you want to delete this post?")) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        fetchPosts();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }
};

// Fetch posts on page load
fetchPosts();
