document.addEventListener("DOMContentLoaded", function(){

    const loginForm = document.getElementById("loginForm");


    loginForm.addEventListener("submit", function(e){

        e.preventDefault();


        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;



        // Simple validation

        if(email === "" || password === ""){

            alert("Please enter email and password");

            return;

        }



        // Save login status

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        localStorage.setItem(
            "userEmail",
            email
        );



        // Go to dashboard

        window.location.href = "home.html";


    });


});
