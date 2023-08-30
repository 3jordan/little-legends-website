// JavaScript for your daycare website homepage

// Example: Display a welcome message when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessage = document.createElement("p");
    welcomeMessage.textContent = "Welcome to Little Legends Daycare!";
    const container = document.querySelector(".container");
    container.appendChild(welcomeMessage);
});
