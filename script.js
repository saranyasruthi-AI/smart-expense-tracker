// ===============================
// SMART EXPENSE TRACKER
// ===============================

// Load saved transactions
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Elements
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const list = document.getElementById("list");

// ===============================
// ADD BUTTONS
// ===============================

function addIncome() {
    addTransaction("Income");
}

function addExpense() {
    addTransaction("Expense");
}

// ===============================
// ADD TRANSACTION
// ===============================

function addTransaction(type) {

    const amount = Number(document.getElementById("amount").value);

    const category = document.getElementById("category").value;

    const note = document.getElementById("desc").value.trim();

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (category === "") {
        alert("Please select a category.");
        return;
    }

    const now = new Date();

    const transaction = {

        id: Date.now(),

        type: type,

        category: category,

        note: note,

        amount: amount,

        date: now.toLocaleDateString(),

        time: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })

    };

    transactions.push(transaction);

    saveData();

    displayTransactions();

    updateSummary();

    clearInputs();

}  
// ===============================
// DISPLAY TRANSACTIONS
// ===============================

function displayTransactions() {

    list.innerHTML = "";

    transactions.slice().reverse().forEach(transaction => {

        const li = document.createElement("li");

        li.className = transaction.type === "Income"
            ? "income-item"
            : "expense-item";

        li.innerHTML = `
            <div>
                <strong>${transaction.category}</strong><br>
                <small>${transaction.note || "No Notes"}</small><br>
                <small>📅 ${transaction.date} | 🕒 ${transaction.time}</small>
            </div>

            <div style="text-align:right;">
                <strong style="color:${transaction.type === "Income" ? "#43AA5C" : "#E63946"}">
                    ${transaction.type === "Income" ? "+" : "-"} ₹${transaction.amount}
                </strong>
                <br><br>
                <button class="delete-btn"
                onclick="deleteTransaction(${transaction.id})">
                    🗑️
                </button>
            </div>
        `;

        list.appendChild(li);

    });

}

// ===============================
// DELETE TRANSACTION
// ===============================

function deleteTransaction(id) {

    transactions = transactions.filter(item => item.id !== id);

    saveData();

    displayTransactions();

    updateSummary();

}

// ===============================
// SAVE DATA
// ===============================

function saveData() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}
// ===============================
// UPDATE SUMMARY
// ===============================

function updateSummary() {

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "Income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

    });

    const balance = income - expense;

    incomeEl.textContent = "₹" + income.toLocaleString();

    expenseEl.textContent = "₹" + expense.toLocaleString();

    balanceEl.textContent = "₹" + balance.toLocaleString();

}

// ===============================
// CLEAR INPUTS
// ===============================

function clearInputs() {

    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("desc").value = "";

}

// ===============================
// SEARCH TRANSACTIONS
// ===============================

function searchTransaction() {

    const searchValue = document
        .getElementById("search")
        .value
        .toLowerCase();

    const items = document.querySelectorAll("#list li");

    items.forEach(item => {

        if (item.innerText.toLowerCase().includes(searchValue)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }

    });

}

// ===============================
// INITIAL LOAD
// =================
// ===============================
// WELCOME USER
// ===============================

const username = localStorage.getItem("username");

const welcome = document.getElementById("welcome");

if (welcome) {

    if (username) {

        welcome.innerHTML = 👋 Welcome, <b>${username}</b>;

    } else {

        welcome.innerHTML = 👋 Welcome;

    }

}

// ===============================
// DATE & TIME
// ===============================

const today = document.getElementById("today");

if (today) {

    const now = new Date();

    today.innerHTML =
        "📅 " +
        now.toLocaleDateString() +
        " | 🕒 " +
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

}

// ===============================
// ENTER KEY SUPPORT
// ===============================

document.getElementById("amount")?.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        addIncome();

    }

});

// ===============================
// LOAD SAVED DATA
// ===============================

window.onload = function () {

    displayTransactions();

    updateSummary();

};
