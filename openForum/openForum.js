function createPost() {
  const postContent = document.querySelector(".post-form textarea").value;
  if (!postContent.trim()) return;

  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `
                <div class="post-header">
                    <span class="post-author">You</span>
                    <div class="post-actions">
                        <button onclick="editPost(this)">Edit</button>
                        <button onclick="deletePost(this)">Delete</button>
                    </div>
                </div>
                <div class="post-content">${postContent}</div>
                <div class="post-reactions">
                    <button class="reaction-btn" onclick="react(this, 'like')">
                        👍 <span class="reaction-count">0</span>
                    </button>
                    <button class="reaction-btn" onclick="react(this, 'dislike')">
                        👎 <span class="reaction-count">0</span>
                    </button>
                </div>
            `;

  document.getElementById("posts-container").prepend(post);
  document.querySelector(".post-form textarea").value = "";
}

function editPost(button) {
  const post = button.closest(".post");
  const contentDiv = post.querySelector(".post-content");
  const currentContent = contentDiv.textContent;

  const editMode = document.createElement("div");
  editMode.className = "edit-mode";
  editMode.innerHTML = `
                <textarea>${currentContent}</textarea>
                <div class="edit-buttons">
                    <button class="save-btn" onclick="saveEdit(this)">Save</button>
                    <button class="cancel-btn" onclick="cancelEdit(this)">Cancel</button>
                </div>
            `;

  contentDiv.replaceWith(editMode);
}

function saveEdit(button) {
  const editMode = button.closest(".edit-mode");
  const post = editMode.closest(".post");
  const newContent = editMode.querySelector("textarea").value;

  const contentDiv = document.createElement("div");
  contentDiv.className = "post-content";
  contentDiv.textContent = newContent;

  editMode.replaceWith(contentDiv);
}

function cancelEdit(button) {
  const editMode = button.closest(".edit-mode");
  const post = editMode.closest(".post");
  const currentContent = editMode.querySelector("textarea").value;

  const contentDiv = document.createElement("div");
  contentDiv.className = "post-content";
  contentDiv.textContent = currentContent;

  editMode.replaceWith(contentDiv);
}

function deletePost(button) {
  if (confirm("Are you sure you want to delete this post?")) {
    button.closest(".post").remove();
  }
}

function react(button, type) {
  const countSpan = button.querySelector(".reaction-count");
  let count = parseInt(countSpan.textContent);

  if (button.classList.contains("active")) {
    count--;
    button.classList.remove("active");
  } else {
    count++;
    button.classList.add("active");
  }

  countSpan.textContent = count;
}
