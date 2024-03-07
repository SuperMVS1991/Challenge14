async function commentFormHandler(event) {
    event.preventDefault();
  
    const content = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    const postID = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment_text) {
        const response = await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({
            postID,
            content
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);