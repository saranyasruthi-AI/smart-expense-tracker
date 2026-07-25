let balance = 0;

function updateBalance() {
    document.getElementById("balance").textContent = balance;
}

function addIncome() {
    const desc = document.getElementById("desc").value;
    const amount = Number(document.getElementById("amount").value);

    if (desc === "" || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    balance += amount;
    updateBalance();

    const li = document.createElement("li");
    li.textContent = `🟢 ${desc} : ₹${amount}`;
    document.getElementById("list").appendChild(li);

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}

function addExpense() {
    const desc = document.getElementById("desc").value;
    const amount = Number(document.getElementById("amount").value);

    if (desc === "" || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    balance -= amount;
    updateBalance();

    const li = document.createElement("li");
    li.textContent = `🔴 ${desc} : ₹${amount}`;
    document.getElementById("list").appendChild(li);

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
          }
