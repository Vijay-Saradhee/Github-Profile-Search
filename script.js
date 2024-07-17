document.getElementById('searchBtn').addEventListener('click', function() {
    const username = document.getElementById('searchInput').value;
    const profileContainer = document.getElementById('profileContainer');
    const loading = document.getElementById('Loading');
  
    // Clear previous profile information
    profileContainer.innerHTML = '';
    loading.innerHTML = 'Loading...';
  
    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then(data => {
        loading.innerHTML = '';
        const profileHTML = `
          <div>
            <img src="${data.avatar_url}" alt="${data.login}'s avatar" width="150" height="150">
            <h2>${data.login}</h2>
            <p>${data.bio || 'No bio available'}</p>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
            <p>Repositories: ${data.public_repos}</p>
          </div>
        `;
        profileContainer.innerHTML = profileHTML;
      })
      .catch(error => {
        loading.innerHTML = '';
        profileContainer.innerHTML = `<p>${error.message}</p>`;
      });
  });
  