// Listen for changes in the URL and handle routing accordingly
window.addEventListener('hashchange', () => {
    const route = window.location.hash.substring(1); // Get the route from the URL
    handleRoute(route);
  });
  
  // Initial route handling
  handleRoute(window.location.hash.substring(1)); // Handle the initial route
  