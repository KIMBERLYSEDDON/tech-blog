const newFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#usernameInput").value.trim();
  const message = document.querySelector("#message").value.trim();

  if (title && content) {
    const response = await fetch(`/api/post/:id`, {
      method: "POST",
      body: JSON.stringify({ username, message }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert("Failed to create comment");
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newFormHandler);
