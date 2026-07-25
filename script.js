let balance = 0;
let income = 0;
let expense = 0;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateValues() {
    document.getElementById("balance").textContent = balance;
    document.getElementById("income").textContent = income;
    document.getElementById("expense").textContent = expense;
}

function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function createTransaction(transaction) {

    const li = document.createElement("li");

    li.innerHTML = `
        <b>${transaction.type==="Income"?"🟢":"🔴"} ${transaction.description}</b><br>
        📅 ${transaction.date}<br>
        ₹${transaction.amount}
        <button style="float:right;background:red;color:white;border:none;padding:5px;border-radius:5px;">❌</button>
    `;

    li.querySelector("button").onclick = function () {

        if(transaction.type==="Income"){
            income -= transaction.amount;
            balance -= transaction.amount;
        }else{
            expense -= transaction.amount;
            balance += transaction.amount;
        }

        transactions = transactions.filter(t => t.id !== transaction.id);

        updateValues();
        saveData();

        li.remove();

    };

    document.getElementById("list").appendChild(li);

}

function addIncome(){

    const desc=document.getElementById("desc").value;
    const amount=Number(document.getElementById("amount").value);
    const date=document.getElementById("date").value;

    if(desc==="" || amount<=0 || date===""){
        alert("Please fill all fields");
        return;
    }

    income+=amount;
    balance+=amount;

    const transaction={
        id:Date.now(),
        type:"Income",
        description:desc,
        amount:amount,
        date:date
    };

    transactions.push(transaction);

    createTransaction(transaction);

    updateValues();
    saveData();

    document.getElementById("desc").value="";
    document.getElementById("amount").value="";
    document.getElementById("date").value="";
}

function addExpense(){

    const desc=document.getElementById("desc").value;
    const amount=Number(document.getElementById("amount").value);
    const date=document.getElementById("date").value;

    if(desc==="" || amount<=0 || date===""){
        alert("Please fill all fields");
        return;
    }

    expense+=amount;
    balance-=amount;

    const transaction={
        id:Date.now(),
        type:"Expense",
        description:desc,
        amount:amount,
        date:date
    };

    transactions.push(transaction);

    createTransaction(transaction);

    updateValues();
    saveData();

    document.getElementById("desc").value="";
    document.getElementById("amount").value="";
    document.getElementById("date").value="";
}

function searchTransaction(){

    const value=document.getElementById("search").value.toLowerCase();

    const items=document.querySelectorAll("#list li");

    items.forEach(item=>{

        item.style.display=item.textContent.toLowerCase().includes(value)
        ? "block"
        : "none";

    });

}

function toggleDarkMode(){

    document.body.classList.toggle("dark");

}

window.onload=function(){

    transactions.forEach(transaction=>{

        if(transaction.type==="Income"){
            income+=transaction.amount;
            balance+=transaction.amount;
        }else{
            expense+=transaction.amount;
            balance-=transaction.amount;
        }

        createTransaction(transaction);

    });

    updateValues();

};
