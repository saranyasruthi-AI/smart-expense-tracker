// =====================================
// SMART EXPENSE TRACKER - PART 1
// =====================================

// Load Transactions
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Elements
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const list = document.getElementById("list");

// Chart Variables
let expenseChart = null;

// =========================
// ADD BUTTONS
// =========================

function addIncome() {
    addTransaction("Income");
}

function addExpense() {
    addTransaction("Expense");
}

// =========================
// ADD TRANSACTION
// =========================

function addTransaction(type) {

    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const note = document.getElementById("desc").value.trim();

    if (amount <= 0) {
        alert("Please enter valid amount");
        return;
    }

    if (category === "") {
        alert("Please select category");
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

    updateChart();

    clearInputs();

}

// =========================
// SAVE DATA
// =========================

function saveData() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

// =========================
// UPDATE SUMMARY
// =========================

function updateSummary() {

    let income = 0;
    let expense = 0;

    transactions.forEach(item => {

        if (item.type === "Income") {

            income += item.amount;

        } else {

            expense += item.amount;

        }

    });

    const balance = income - expense;

    incomeEl.textContent = "₹" + income.toLocaleString();

    expenseEl.textContent = "₹" + expense.toLocaleString();

    balanceEl.textContent = "₹" + balance.toLocaleString();

}

// =========================
// CLEAR INPUTS
// =========================

function clearInputs() {

    document.getElementById("amount").value = "";

    document.getElementById("category").value = "";

    document.getElementById("desc").value = "";

}
// =====================================
// SMART EXPENSE TRACKER - PART 2
// Display, Delete, Search, Username
// =====================================

// =========================
// DISPLAY TRANSACTIONS
// =========================

function displayTransactions() {

    list.innerHTML = "";

    transactions
        .slice()
        .reverse()
        .forEach(transaction => {

            const li = document.createElement("li");

            li.className =
                transaction.type === "Income"
                    ? "income-item"
                    : "expense-item";

            li.innerHTML = `
                <div>
                    <strong>${transaction.category}</strong><br>
                    <small>${transaction.note || "No Notes"}</small><br>
                    <small>📅 ${transaction.date} | 🕒 ${transaction.time}</small>
                </div>

                <div style="text-align:right">

                    <strong style="color:${
                        transaction.type === "Income"
                        ? "#2ecc71"
                        : "#e74c3c"
                    }">

                    ${
                        transaction.type === "Income"
                        ? "+"
                        : "-"
                    } ₹${transaction.amount}

                    </strong>

                    <br><br>

                    <button
                        class="delete-btn"
                        onclick="deleteTransaction(${transaction.id})">

                        🗑 Delete

                    </button>

                </div>
            `;

            list.appendChild(li);

        });

}

// =========================
// DELETE
// =========================

function deleteTransaction(id) {

    transactions = transactions.filter(
        item => item.id !== id
    );

    saveData();

    displayTransactions();

    updateSummary();

    updateChart();

}

// =========================
// SEARCH
// =========================

function searchTransaction() {

    const value = document
        .getElementById("search")
        .value
        .toLowerCase();

    const items = document.querySelectorAll("#list li");

    items.forEach(item => {

        if (
            item.innerText.toLowerCase().includes(value)
        ) {

            item.style.display = "flex";

        } else {

            item.style.display = "none";

        }

    });

}

// =========================
// USERNAME
// =========================

const usernameInput = document.getElementById("username");

if (usernameInput) {

    usernameInput.value =
        localStorage.getItem("username") || "";

    usernameInput.addEventListener("input", function () {

        localStorage.setItem(
            "username",
            this.value
        );

    });

}

// =========================
// ENTER KEY
// =========================

document
.getElementById("amount")
?.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        const type =
            document.getElementById("type").value;

        if(type==="Income"){

            addIncome();

        }else if(type==="Expense"){

            addExpense();

        }

    }

});
// =====================================
// SMART EXPENSE TRACKER - PART 3
// Chart, CSV, PDF, Initial Load
// =====================================

// =========================
// CHART
// =========================

function updateChart() {

    const canvas = document.getElementById("expenseChart");

    if (!canvas) return;

    let income = 0;
    let expense = 0;

    transactions.forEach(item => {

        if (item.type === "Income") {

            income += item.amount;

        } else {

            expense += item.amount;

        }

    });

    if (expenseChart) {

        expenseChart.destroy();

    }

    expenseChart = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: ["Income", "Expense"],

            datasets: [{

                data: [income, expense],

                backgroundColor: [
                    "#2ecc71",
                    "#e74c3c"
                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}

// =========================
// CSV EXPORT
// =========================

const csvBtn = document.getElementById("csvBtn");

if (csvBtn) {

    csvBtn.addEventListener("click", function () {

        let csv =
            "Type,Category,Amount,Note,Date,Time\n";

        transactions.forEach(item => {

            csv += `${item.type},${item.category},${item.amount},"${item.note}",${item.date},${item.time}\n`;

        });

        const blob = new Blob([csv], {

            type: "text/csv"

        });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);

        link.download = "transactions.csv";

        link.click();

    });

}

// =========================
// PDF EXPORT
// =========================

const pdfBtn = document.getElementById("pdfBtn");

if (pdfBtn) {

    pdfBtn.addEventListener("click", function () {

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF();

        doc.setFontSize(18);

        doc.text("Smart Expense Tracker", 20, 20);

        doc.setFontSize(12);

        let y = 35;

        transactions.forEach(item => {

            doc.text(

                `${item.date} | ${item.type} | ${item.category} | ₹${item.amount}`,

                10,

                y

            );

            y += 10;

            if (y > 280) {

                doc.addPage();

                y = 20;

            }

        });

        doc.save("Expense_Report.pdf");

    });

}

// =========================
// INITIAL LOAD
// =========================

window.onload = function () {

    displayTransactions();

    updateSummary();

    updateChart();

};
