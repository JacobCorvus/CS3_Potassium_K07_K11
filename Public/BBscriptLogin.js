document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");

    const dialog = document.getElementById("agentDialog");
    const dialogText = document.getElementById("dialogText");

    const users = JSON.parse(localStorage.getItem("users")) || {};

    const showDialog = (text) => {
        dialogText.textContent = text;
        dialog.classList.remove("dialogHidden");
    };

    const hideDialog = () => {
        dialog.classList.add("dialogHidden");
    };

    form.addEventListener("submit", e => {
        e.preventDefault();

        const result = validateInputs();
        if (!result.valid) return;

        const { usernameValue, emailValue, passwordValue } = result;

        if (users[emailValue]) {
            if (users[emailValue].password === passwordValue) {
                sessionStorage.setItem("loggedInUser", emailValue);
                window.location.href = "AccDetails.html";
            } else {
                setError(password, "Incorrect access code");
            }
            return;
        }

        showDialog("Account not a verified agent account. Please try again.");

        setTimeout(() => {
            hideDialog();
            showDialog("Loading...");

            setTimeout(() => {
                users[emailValue] = {
                    username: usernameValue,
                    password: passwordValue
                };

                localStorage.setItem("users", JSON.stringify(users));
                sessionStorage.setItem("loggedInUser", emailValue);

                showDialog(`Access granted. Welcome, Agent ${usernameValue}.`);

                setTimeout(() => {
                    window.location.href = "AccDetails.html";
                }, 1800);

            }, 1200);
        }, 1500);
    });

    const setError = (element, message) => {
        const inputCon = element.parentElement;
        inputCon.querySelector(".error").innerText = message;
        inputCon.classList.add("error");
        inputCon.classList.remove("success");
    };

    const setSuccess = element => {
        const inputCon = element.parentElement;
        inputCon.querySelector(".error").innerText = "";
        inputCon.classList.add("success");
        inputCon.classList.remove("error");
    };

    const isValidEmail = email =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

    const validateInputs = () => {
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const password2Value = password2.value.trim();

        let valid = true;

        if (!usernameValue) {
            setError(username, "Username is required");
            valid = false;
        } else setSuccess(username);

        if (!emailValue) {
            setError(email, "Email is required");
            valid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, "Provide a valid email");
            valid = false;
        } else setSuccess(email);

        if (passwordValue.length < 8) {
            setError(password, "Password must be at least 8 characters");
            valid = false;
        } else setSuccess(password);

        if (password2Value !== passwordValue) {
            setError(password2, "Passwords do not match");
            valid = false;
        } else setSuccess(password2);

        return { valid, usernameValue, emailValue, passwordValue };
    };
});