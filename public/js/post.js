const newFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#usernameInput').value.trim();
    const comment = document.querySelector('#commentInput').value.trim();
  
    if (title && content) {
      const response = await fetch(`/dashboard`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
  
//       const response = await fetch(`/api/projects/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to delete project');
//       }
//     }
//   };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
  
//   document
//     .querySelector('.project-list')
//     .addEventListener('click', delButtonHandler);