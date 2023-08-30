document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const message = document.getElementById("message");
  
    registerForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const username = document.getElementById("registerUsername").value;
      const password = document.getElementById("registerPassword").value;
  
      try {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          message.textContent = "Registration successful.";
        } else {
          message.textContent = "Registration failed.";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;
  
      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          message.textContent = "Login successful.";
          // Redirect the user to a protected page, e.g., /dashboard
          window.location.href = "/dashboard";
        } else {
          message.textContent = "Login failed.";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
  