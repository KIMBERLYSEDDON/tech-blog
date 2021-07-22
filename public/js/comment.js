const newFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#usernameInput").value.trim();
  const message = document.querySelector("#message").value.trim();
  const postId = document.querySelector("#message").getAttribute('data-post-id');
  console.log("POST", postId)

  if (username && message) {
    const response = await fetch(`/api/post/${postId}`, {
      method: "POST",
      body: JSON.stringify({ username, message }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("hello")
      document.location.replace(`/post/${postId}`);
    } else {
      alert("Failed to create comment");
    }
  }
};

const delBtnHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
    });
console.log(response)
    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert("Failed to delete comment");
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newFormHandler);

  document.querySelector(".comments").addEventListener("click", delBtnHandler);