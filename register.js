// ==========================================
// EXPENSE TRACKER - REGISTER PAGE
// ==========================================

// Get Form
const registerForm = document.getElementById("registerForm");

// Submit Event
registerForm.addEventListener("submit", registerUser);

// Register Function
function registerUser(event) {

    event.preventDefault();

    // Get Input Values
    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;
    // ===============================
    // EMPTY FIELD VALIDATION
    // ===============================

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        alert("Please fill all the fields.");
        return;
    }

    // ===============================
    // EMAIL VALIDATION
    // ===============================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // ===============================
    // PASSWORD VALIDATION
    // ===============================

    if (password.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
    }

    // ===============================
    // CONFIRM PASSWORD
    // ===============================

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
      // ===============================
    // GET EXISTING USERS
    // ===============================

    let users = JSON.parse(
        localStorage.getItem("expenseTrackerUsers")
    ) || [];

    // ===============================
    // CHECK DUPLICATE EMAIL
    // ===============================

    const existingUser = users.find(
        user => user.email === email
    );

    if (existingUser) {
        alert("This email is already registered.");
        return;
    }

    // ===============================
    // SAVE NEW USER
    // ===============================

    const newUser = {
        name: name,
        email: email,
        password: password
    };

    users.push(newUser);

    localStorage.setItem(
        "expenseTrackerUsers",
        JSON.stringify(users)
    );

    // ===============================
    // SUCCESS MESSAGE
    // ===============================

    alert("Registration Successful!");

    // ===============================
    // REDIRECT TO LOGIN PAGE
    // ===============================

    window.location.href = "../login.html";

}
