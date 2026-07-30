// ===============================
// Smart Expense Tracker
// Premium Version
// ===============================

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const list = document.getElementById("list");

// Welcome User

const username =
localStorage.getItem("username") || "Guest";

const welcome =
document.getElementById("welcome");

if(welcome){

const hour = new Date().getHours();

let greet = "Hello";

if(hour < 12){

greet = "🌅 Good Morning";

}

else if(hour < 17){

greet = "☀️ Good Afternoon";

}

else{

greet = "🌙 Good Evening";

}

welcome.innerHTML =
`${greet}, <b>${username}</b> 👋`;

}

// ===============================
// Add Income
// ===============================

function addIncome(){

addTransaction("Income");

}

// ===============================
// Add Expense
// ===============================

function addExpense(){

addTransaction("Expense");

}

// ===============================
// Add Transaction
// ===============================

function addTransaction(type){

const amount =
Number(document.getElementById("amount").value);

const category =
document.getElementById("category").value;

const note =
document.getElementById("desc").value.trim();

if(amount <= 0){

alert("Enter valid amount.");

return;

}

if(category === ""){

alert("Select a category.");

return;

}

const now = new Date();

const transaction={

id:Date.now(),

type:type,

category:category,

note:note,

amount:amount,

date:now.toLocaleDateString(),

time:now.toLocaleTimeString()

};

transactions.push(transaction);

saveData();

displayTransactions();

updateSummary();

clearInputs();

}
// ===============================
// Display Transactions
// ===============================

function displayTransactions(){

list.innerHTML="";

const reversed=[...transactions].reverse();

reversed.forEach(transaction=>{

const li=document.createElement("li");

li.className=
transaction.type==="Income"
?"income-item"
:"expense-item";

li.innerHTML=`

<div class="details">

<h3>${transaction.category}</h3>

<p>${transaction.note || "No Notes"}</p>

<small>📅 ${transaction.date} | 🕒 ${transaction.time}</small>

</div>

<div style="text-align:right;">

<h3 style="color:${
transaction.type==="Income"
?"#43AA5C"
:"#E63946"
};">

${transaction.type==="Income"?"+":"-"} ₹${transaction.amount}

</h3>

<button
class="delete-btn"
onclick="deleteTransaction(${transaction.id})">

🗑

</button>

</div>

`;

list.appendChild(li);

});

}

// ===============================
// Delete Transaction
// ===============================

function deleteTransaction(id){

transactions=
transactions.filter(
item=>item.id!==id
);

saveData();

displayTransactions();

updateSummary();

}

// ===============================
// Save Data
// ===============================

function saveData(){

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

                 }
// ===============================
// Update Summary
// ===============================

function updateSummary(){

let income = 0;
let expense = 0;

transactions.forEach(item=>{

if(item.type==="Income"){

income += item.amount;

}else{

expense += item.amount;

}

});

const balance = income - expense;

incomeEl.textContent = "₹" + income.toLocaleString();

expenseEl.textContent = "₹" + expense.toLocaleString();

balanceEl.textContent = "₹" + balance.toLocaleString();

}

// ===============================
// Clear Inputs
// ===============================

function clearInputs(){

document.getElementById("amount").value = "";

document.getElementById("category").value = "";

document.getElementById("desc").value = "";

}

// ===============================
// Search Transactions
// ===============================

function searchTransaction(){

const value =
document.getElementById("search")
.value
.toLowerCase();

const items =
document.querySelectorAll("#list li");

items.forEach(item=>{

item.style.display =
item.innerText.toLowerCase().includes(value)
? "flex"
: "none";

});

}

// ===============================
// Load Dashboard
// ===============================

displayTransactions();

updateSummary();
// ===============================
// Success Message
// ===============================

function showSuccess(message){

const old=document.querySelector(".success-popup");

if(old){
old.remove();
}

const popup=document.createElement("div");

popup.className="success-popup";

popup.innerHTML=message;

document.body.appendChild(popup);

setTimeout(()=>{

popup.style.opacity="0";
popup.style.transform="translateY(-20px)";

setTimeout(()=>popup.remove(),300);

},2000);

}

// ===============================
// Replace alert with popup
// ===============================

const originalAddTransaction = addTransaction;

addTransaction = function(type){

const amount =
Number(document.getElementById("amount").value);

const category =
document.getElementById("category").value;

const note =
document.getElementById("desc").value.trim();

if(amount<=0){

showSuccess("⚠️ Please enter a valid amount.");

return;

}

if(category===""){

showSuccess("📂 Please select a category.");

return;

}

const now=new Date();

transactions.push({

id:Date.now(),

type,

category,

note,

amount,

date:now.toLocaleDateString(),

time:
