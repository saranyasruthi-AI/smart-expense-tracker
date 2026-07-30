function login() {

    const username = document.getElementById("username").value.trim();

    if (username === "") {

        alert("Please enter your name.");

        return;

    }

    localStorage.setItem("username", username);

    window.location.href = "index.html";

}
function guestLogin() {

    localStorage.setItem("username", "Guest");

    window.location.href = "index.html";

}
