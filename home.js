// ==========================================
// EXPENSE TRACKER - HOME PAGE
// PART 1
// ==========================================

// Logged In User
const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

// Show Username
const username = document.getElementById("username");

if (currentUser) {

    username.textContent = currentUser.name;

}

// Current Date
const currentDate = document.getElementById("currentDate");

const today = new Date();

currentDate.textContent =
today.toLocaleDateString("en-IN", {

    weekday: "long",

    day: "numeric",

    month: "long",

    year: "numeric"

});

// Transactions Array
let transactions =
JSON.parse(
localStorage.getItem("transactions")
) || [];

// Form
const transactionForm =
document.getElementById("transactionForm");

// Transaction List
const transactionList =
document.getElementById("transactionList");

// Summary
const totalBalance =
document.getElementById("totalBalance");

const totalIncome =
document.getElementById("totalIncome");

const totalExpense =
document.getElementById("totalExpense");

const totalSaving =
document.getElementById("totalsaving");
// ==========================================
// PART 2 - ADD TRANSACTION
// ==========================================

// Form Submit
transactionForm.addEventListener(
    "submit",
    addTransaction
);

// Add Transaction Function
function addTransaction(event) {

    event.preventDefault();

    const type =
    document.getElementById("transactionType").value;

    const amount =
    Number(document.getElementById("amount").value);

    const category =
    document.getElementById("category").value;

    const date =
    document.getElementById("transactionDate").value;

    const description =
    document.getElementById("description").value.trim();

    // Validation
    if (
        type === "" ||
        amount <= 0 ||
        category === "" ||
        date === ""
    ) {

        alert("Please fill all required fields.");

        return;

    }

    // Create Transaction
    const transaction = {

        id: Date.now(),

        type: type,

        amount: amount,

        category: category,

        date: date,

        description: description

    };

    // Save
    transactions.push(transaction);

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    // Reset Form
    transactionForm.reset();

    // Refresh UI
    displayTransactions();

    updateSummary();

}
// ==========================================
// PART 3 - DISPLAY TRANSACTIONS
// ==========================================

function displayTransactions() {

    transactionList.innerHTML = "";

    if (transactions.length === 0) {

        transactionList.innerHTML = `

        <tr>

            <td colspan="6" style="text-align:center;">

                No Transactions Found

            </td>

        </tr>

        `;

        return;

    }

    transactions.forEach(function(transaction) {

        const row = document.createElement("tr");

        row.innerHTML = `

        <td>${transaction.type}</td>

        <td>${transaction.category}</td>

        <td>₹ ${transaction.amount}</td>

        <td>${transaction.date}</td>

        <td>${transaction.description}</td>

        <td>

            <button
                onclick="deleteTransaction(${transaction.id})">

                Delete

            </button>

        </td>

        `;

        transactionList.appendChild(row);

    });

}



// Delete Transaction

function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {

        return transaction.id !== id;

    });

    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );

    display transactions();
    update summary();
}
    // ==========================================
// PART 4 - SUMMARY + SEARCH
// ==========================================

// Update Summary
function updateSummary() {

    let income = 0;

    let expense = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;

        }

    });

    const balance = income - expense;

    const saving = balance;

    totalIncome.textContent = income;

    totalExpense.textContent = expense;

    totalBalance.textContent = balance;

    totalSaving.textContent = saving;

}



// Search Transactions
const searchInput =
document.getElementById("searchTransaction");

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const rows =
    transactionList.querySelectorAll("tr");

    rows.forEach(function(row) {

        if (
            row.innerText
            .toLowerCase()
            .includes(value)
        ) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});
// ==========================================
// PART 5 - LOGOUT + CHARTS + INITIAL LOAD
// ==========================================

// Logout
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {

    localStorage.removeItem("currentUser");

    alert("Logged out successfully!");

    window.location.href = "login.html";

});


// Expense Chart
const expenseCanvas = document.getElementById("expenseChart");

if (expenseCanvas) {

    new Chart(expenseCanvas, {

        type: "pie",

        data: {

            labels: ["Income", "Expense"],

            datasets: [{

                data: [

                    Number(totalIncome.textContent),

                    Number(totalExpense.textContent)

                ],

                backgroundColor: [

                    "#10b981",

                    "#ef4444"

                ]

            }]

        }

    });

}


// Income vs Expense Chart
const incomeExpenseCanvas =
document.getElementById("incomeExpenseChart");

if (incomeExpenseCanvas) {

    new Chart(incomeExpenseCanvas, {

        type: "bar",

        data: {

            labels: ["Income", "Expense"],

            datasets: [{

                label: "Amount",

                data: [

                    Number(totalIncome.textContent),

                    Number(totalExpense.textContent)

                ]

            }]

        }

    });

}


// Initial Load
displayTransactions();

updateSummary();

                        
