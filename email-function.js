// JavaScript for the email management system

document.addEventListener("DOMContentLoaded", function () {
    const emailForm = document.getElementById("emailForm");
    const emailList = document.getElementById("emailList");
    const viewListBtn = document.getElementById("viewListBtn");
    let isListVisible = true;

    emailForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const nameInput = document.getElementById("name"); // Get the name input
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const email = emailInput.value;
        const emailError = document.getElementById("emailError");

        // Basic email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email.match(emailPattern)) {
            emailError.textContent = "Invalid email address";
            return;
        }

        emailError.textContent = ""; // Clear any previous error messages
        emailInput.value = "";

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>Name: ${nameInput.value}</span><br>
            <span>Email: ${email}</span><br>
            <span>Phone: ${phoneInput.value}</span><br>
            <button class="delete-btn">Delete</button>
        `;

        emailList.appendChild(listItem);

        // Add functionality to delete button
        const deleteButton = listItem.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function () {
            listItem.remove();
        });

        // Clear name and phone inputs
        nameInput.value = "";
        phoneInput.value = "";
    });

    viewListBtn.addEventListener("click", function () {
        if (isListVisible) {
            emailList.style.display = "none";
            viewListBtn.textContent = "View List";
        } else {
            emailList.style.display = "block";
            viewListBtn.textContent = "Hide List";
        }
        isListVisible = !isListVisible;
    });
});
