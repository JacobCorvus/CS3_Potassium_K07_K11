document.getElementById("archiveLogin").addEventListener("submit", function(e) {
    e.preventDefault();

    const agentName = document.getElementById("agentName").value.trim();
    const passcode = document.getElementById("passcode").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    // Retrieve stored agents from localStorage
    const storedAgents = JSON.parse(localStorage.getItem("agents")) || [];

    // Find matching agent
    const validAgent = storedAgents.find(agent => 
        agent.username === agentName && agent.passcode === passcode
    );

    if (validAgent) {
        // Optional: Save session flag
        localStorage.setItem("archiveAccess", "granted");

        // Redirect to Archive
        window.location.href = "BluebloodsArchive.html";
    } else {
        errorMessage.textContent = "Invalid agent credentials.";
        errorMessage.style.color = "red";
    }

    const loggedInUser = sessionStorage.getItem("loggedInUser");

    // If not logged in → send to login page
    if (!loggedInUser) {
        window.location.href = "AgentLogin.html"; // your login page name
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    const currentUser = users[loggedInUser];

    const form = document.getElementById("passcodeForm");
    const passcodeInput = document.getElementById("passcodeInput");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const enteredPasscode = passcodeInput.value.trim();

        if (enteredPasscode === currentUser.passcode) {
            sessionStorage.setItem("archiveAccess", "granted");
            window.location.href = "BluebloodsArchive.html";
        } else {
            const inputCon = passcodeInput.parentElement;
            inputCon.querySelector(".error").innerText = "Invalid agent passcode.";
            inputCon.classList.add("error");
        }
    });
});
