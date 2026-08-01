// Get Login Form
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();

    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(
        localStorage.getItem("expenseTrackerUsers")
    ) || [];

    const user = users.find(function(item){

        return item.email === email &&
               item.password === password;

    });

    if(user){

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        alert("Login Successful!");

        window.location.href = "home.html";

    }

    else{

        alert("Invalid Email or Password!");

    }

});
