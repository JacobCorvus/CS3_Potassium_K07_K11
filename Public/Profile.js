document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const profileInput = document.getElementById("profile");
    const saveBtn = document.getElementById("saveBtn");
    const missionsList = document.getElementById("missionsList");

    const users = JSON.parse(localStorage.getItem("users")) || {};
    const loggedInUserEmail = sessionStorage.getItem("loggedInUser");

    const currentUser = users[loggedInUserEmail];

    usernameInput.value = currentUser.username || "";
    emailInput.value = loggedInUserEmail;
    passwordInput.value = currentUser.password || "";
    profileInput.value = currentUser.profile || "";

    if (!currentUser.missions) {
        currentUser.missions = [
            { name: "Mission 1", status: "pending" },
            { name: "Mission 2", status: "pending" },
            { name: "Mission 3", status: "pending" }
        ];
    }
    renderMissions();

    function renderMissions() {
        missionsList.innerHTML = "";
        currentUser.missions.forEach((mission, index) => {
            const div = document.createElement("div");
            div.className = "mission";
            div.innerHTML = `
                <span>${mission.name}</span>
                <span class="${mission.status === 'completed' ? 'completed' : 'pending'}">${mission.status}</span>
                <button onclick="toggleMission(${index})">Toggle</button>
            `;
            missionsList.appendChild(div);
        });
    }

    window.toggleMission = function(index) {
        const mission = currentUser.missions[index];
        mission.status = mission.status === "completed" ? "pending" : "completed";
        saveUserData();
        renderMissions();
    }

    function saveUserData() {
        currentUser.username = usernameInput.value.trim();
        currentUser.password = passwordInput.value.trim();
        currentUser.profile = profileInput.value.trim();
        users[loggedInUserEmail] = currentUser;
        localStorage.setItem("users", JSON.stringify(users));
    }

    saveBtn.addEventListener("click", () => {
        saveUserData();
        alert("Profile updated successfully!");
    });
});
