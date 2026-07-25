let balance = 0;
let income = 0;
let expense = 0;

function updateValues() {
    document.getElementById("balance").textContent = balance;
    if (document.getElementById("income"))
        document.getElementById("income").textContent = income;
    if (document.getElementById("expense"))
        document.getElementById("expense").textContent = expense;
}

function clearInputs() {
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
}

function createTransaction(type, date, desc, amount) {
    const li = document.createElement("li");

    li.innerHTML = `
        ${type === "income" ? "🟢" : "🔴"}
        <b>${desc}</b><br>
        📅 ${date}<br>
        ₹${amount}
        <button style="float:right;background:red;color:white;border:none;border-radius:5px;padding:5px;cursor:pointer;">❌</button>
    `;

    li.querySelector("button").onclick = function () {
        if (type === "income") {
            income -= amount;
            balance -= amount;
        } else {
            expense -= amount;
            balance += amount;
        }

        updateValues();
        li.remove();
    };

    document.getElementById("list").appendChild(li);
}

function addIncome() {
    const desc = document.getElementById("desc").value;
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    if (desc === "" || amount <= 0 || date === "") {
        alert("Please fill all fields.");
        return;
    }

    income += amount;
    balance += amount;

    updateValues();
    createTransaction("income", date, desc, amount);
    clearInputs();
}

function addExpense() {
    const desc = document.getElementById("desc").value;
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    if (desc === "" || amount <= 0 || date === "") {
        alert("Please fill all fields.");
        return;
    }

    expense += amount;
    balance -= amount;

    updateValues();
    createTransaction("expense", date, desc, amount);
    clearInputs();
}
