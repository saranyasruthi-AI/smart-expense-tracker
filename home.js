document.addEventListener("DOMContentLoaded", () => {

    const transactionForm = document.getElementById("transactionForm");

    const titleInput = document.getElementById("title");
    const amountInput = document.getElementById("amount");
    const typeInput = document.getElementById("type");
    const dateInput = document.getElementById("date");

    const transactionList = document.getElementById("transactionList");

    const totalIncome = document.getElementById("totalIncome");
    const totalExpense = document.getElementById("totalExpense");
    const balance = document.getElementById("balance");


    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


    // Add Transaction

    transactionForm.addEventListener("submit", function(e){

        e.preventDefault();


        const transaction = {

            id: Date.now(),

            title: titleInput.value,

            amount: Number(amountInput.value),

            type: typeInput.value,

            date: dateInput.value

        };


        transactions.push(transaction);


        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );


        displayTransactions();

        updateSummary();


        transactionForm.reset();

    });



    // Display Transactions

    function displayTransactions(){

        transactionList.innerHTML = "";


        transactions.forEach((item)=>{


            const row = document.createElement("tr");


            row.innerHTML = `

            <td>${item.title}</td>

            <td>₹${item.amount}</td>

            <td>${item.type}</td>

            <td>${item.date}</td>

            <td>
                <button onclick="deleteTransaction(${item.id})">
                    Delete
                </button>
            </td>

            `;


            transactionList.appendChild(row);


        });


    }



    displayTransactions();

    updateSummary();


});
// Delete Transaction

window.deleteTransaction = function(id){

    transactions = transactions.filter(
        (transaction) => transaction.id !== id
    );


    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );


    displayTransactions();

    updateSummary();

};




// Update Income, Expense, Balance

function updateSummary(){


    let income = 0;

    let expense = 0;



    transactions.forEach((item)=>{


        if(item.type === "income"){

            income += item.amount;

        }
        else{

            expense += item.amount;

        }


    });



    totalIncome.innerText = "₹" + income;

    totalExpense.innerText = "₹" + expense;

    balance.innerText = "₹" + (income - expense);



    updateChart(income, expense);


                }
// Expense Chart

let expenseChart;


function updateChart(income, expense){


    const ctx = document
    .getElementById("expenseChart")
    .getContext("2d");



    if(expenseChart){

        expenseChart.destroy();

    }



    expenseChart = new Chart(ctx, {


        type: "pie",


        data: {


            labels: [

                "Income",

                "Expense"

            ],


            datasets: [{

                data: [

                    income,

                    expense

                ]

            }]


        },


        options: {

            responsive:true

        }


    });


}





// Download PDF Report

const pdfButton = document.getElementById("downloadPDF");


if(pdfButton){


pdfButton.addEventListener("click",()=>{


    const { jsPDF } = window.jspdf;


    const doc = new jsPDF();



    doc.text(
        "Expense Tracker Report",
        20,
        20
    );


    let y = 40;



    transactions.forEach((item)=>{


        doc.text(

            `${item.title} - ₹${item.amount} - ${item.type} - ${item.date}`,

            20,

            y

        );


        y += 10;


    });



    doc.save("Expense_Report.pdf");


});


}




// Logout

const logoutBtn = document.getElementById("logoutBtn");


if(logoutBtn){


logoutBtn.addEventListener("click",()=>{


    localStorage.removeItem("transactions");


    alert("Logged out successfully");


    location.reload();


});


}
