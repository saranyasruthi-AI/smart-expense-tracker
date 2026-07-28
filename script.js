// =========================
// Smart Expense Tracker
// =========================

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const list = document.getElementById("list");

displayTransactions();
updateSummary();

function addIncome() {
    addTransaction("Income");
}

function addExpense() {
    addTransaction("Expense");
}

function addTransaction(type) {

    const amount = Number(document.getElementById("amount").value);

    const category = document.getElementById("category").value;

    const note = document.getElementById("desc").value;

    if (amount <= 0 || category === "") {
        alert("Please enter valid details.");
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

        time: now.toLocaleTimeString()

    };

    transactions.push(transaction);

    saveData();

    displayTransactions();

    updateSummary();

    clearInputs();
    

}
