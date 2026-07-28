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
function displayTransactions() {

    list.innerHTML = "";

    transactions
        .slice()
        .reverse()
        .forEach(transaction => {

            const li = document.createElement("li");

            li.className = transaction.type.toLowerCase();

            li.innerHTML = `

                <div class="details">

                    <span>${transaction.category}</span>

                    <small>${transaction.note}</small>

                    <small>📅 ${transaction.date} | 🕒 ${transaction.time}</small>

                </div>

                <div>

                    <div class="amount">

                        ${transaction.type === "Income" ? "+" : "-"}₹${transaction.amount}

                    </div>

                    <button class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})">

                    🗑 Delete

                    </button>

                </div>

            `;

            list.appendChild(li);

        });

}

function deleteTransaction(id) {

    transactions = transactions.filter(

        transaction => transaction.id !== id

    );

    saveData();

    displayTransactions();

    updateSummary();

}

function saveData() {

    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );
    
    

}
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

function clearInputs() {

    document.getElementById("amount").value = "";

    document.getElementById("category").value = "";

    document.getElementById("desc").value = "";

}

function searchTransaction() {

    const search = document
        .getElementById("search")
        .value
        .toLowerCase();

    const items = document.querySelectorAll("#list li");

    items.forEach(item => {

        if (item.innerText.toLowerCase().includes(search)) {

            item.style.display = "flex";

        } else {

            item.style.display = "none";

        }

    });

}

// Load data when page opens
displayTransactions();
updateSummary();
