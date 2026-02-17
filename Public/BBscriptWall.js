document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("archiveLoginForm");
    const usernameInput = document.getElementById("archiveUsername");
    const passwordInput = document.getElementById("archivePassword");
    const accPassword = "05011006";

    form.addEventListener("submit", e => {
        e.preventDefault();

        const enteredUsername = usernameInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        const users = JSON.parse(localStorage.getItem("users")) || {};

        let validUser = null;

        for (let email in users) {
            if (
                users[email].username === enteredUsername 
            ) {
                validUser = users[email];
                break;
            }
        }

        if (validUser) {
            if (enteredPassword === accPassword) {
                sessionStorage.setItem("archiveAccess", "granted");
                window.location.href = "Archive.html";
            } else {
                passwordInput.parentElement.querySelector(".error").innerText =
                    "Password must match the required password.";
            }
        } else {
            passwordInput.parentElement.querySelector(".error").innerText =
                "Invalid username or password.";
        }
    });

});
