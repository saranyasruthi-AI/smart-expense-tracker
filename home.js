// ======================================
// EXPENSE TRACKER DASHBOARD JS
// PART 1
// ======================================


// Get Elements

const username = document.getElementById("username");

const currentDate = document.getElementById("currentDate");

const transactionForm = document.getElementById("transactionForm");

const transactionList = document.getElementById("transactionList");

const totalBalance = document.getElementById("totalBalance");

const totalIncome = document.getElementById("totalIncome");

const totalExpense = document.getElementById("totalExpense");

const totalSaving = document.getElementById("totalSaving");



// =============================
// SHOW USER NAME
// =============================


let users = JSON.parse(
    localStorage.getItem("expenseTrackerUsers")
) || [];


if(users.length > 0){

    username.innerText = users[users.length - 1].name;

}



// =============================
// CURRENT DATE
// =============================


const today = new Date();


currentDate.innerText =
today.toLocaleDateString("en-IN");



// =============================
// TRANSACTIONS STORAGE
// =============================


let transactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];
// =============================
// ADD TRANSACTION
// =============================


transactionForm.addEventListener("submit", function(e){

    e.preventDefault();


    const type =
    document.getElementById("transactionType").value;


    const amount =
    Number(document.getElementById("amount").value);


    const category =
    document.getElementById("category").value;


    const date =
    document.getElementById("transactionDate").value;


    const description =
    document.getElementById("description").value;



    if(
        type === "" ||
        amount === 0 ||
        category === "" ||
        date === ""
    ){

        alert("Please fill all transaction details.");

        return;

    }



    const transaction = {

        id: Date.now(),

        type: type,

        amount: amount,

        category: category,

        date: date,

        description: description

    };



    transactions.push(transaction);



    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );



    alert("Transaction Added Successfully!");



    transactionForm.reset();



    updateDashboard();



});




// =============================
// UPDATE DASHBOARD CARDS
// =============================


function updateDashboard(){


    let income = 0;

    let expense = 0;



    transactions.forEach(function(item){


        if(item.type === "income"){

            income += item.amount;

        }

        else if(item.type === "expense"){

            expense += item.amount;

        }


    });



    let balance = income - expense;



    totalIncome.innerText = income;


    totalExpense.innerText = expense;


    totalBalance.innerText = balance;


    totalSaving.innerText = balance;



}



// Load Data

updateDashboard();
// =============================
// DISPLAY TRANSACTIONS
// =============================


function displayTransactions(){


    transactionList.innerHTML = "";



    if(transactions.length === 0){


        transactionList.innerHTML = `

        <tr>

            <td colspan="5">

                No transactions available

            </td>

        </tr>

        `;


        return;

    }





    transactions.forEach(function(item){



        const row = document.createElement("tr");



        row.innerHTML = `


        <td>

            ${item.type}

        </td>


        <td>

            ${item.category}

        </td>


        <td>

            ₹ ${item.amount}

        </td>


        <td>

            ${item.date}

        </td>


        <td>


            <button 
            class="delete-btn"
            onclick="deleteTransaction(${item.id})">

            <i class="fa-solid fa-trash"></i>

            </button>


        </td>


        `;



        transactionList.appendChild(row);



    });



}





// =============================
// DELETE TRANSACTION
// =============================


function deleteTransaction(id){



    transactions =
    transactions.filter(function(item){


        return item.id !== id;


    });



    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );



    displayTransactions();


    updateDashboard();



}





// =============================
// SEARCH TRANSACTION
// =============================


const searchTransaction =
document.getElementById("searchTransaction");



searchTransaction.addEventListener(
"keyup",
function(){


    const searchValue =
    searchTransaction.value.toLowerCase();



    const rows =
    document.querySelectorAll("#transactionList tr");



    rows.forEach(function(row){


        row.style.display =
        row.innerText.toLowerCase()
        .includes(searchValue)
        ? ""
        : "none";


    });



});





// Initial Display

displayTransactions();
// =============================
// CHARTS
// =============================


// Expense Chart

let expenseChart;



// Income Expense Chart

let incomeExpenseChart;




function createCharts(){



    let food = 0;

    let shopping = 0;

    let travel = 0;

    let education = 0;

    let other = 0;



    let income = 0;

    let expense = 0;





    transactions.forEach(function(item){



        if(item.type === "expense"){


            expense += item.amount;



            if(item.category === "Food"){

                food += item.amount;

            }

            else if(item.category === "Shopping"){

                shopping += item.amount;

            }

            else if(item.category === "Travel"){

                travel += item.amount;

            }

            else if(item.category === "Education"){

                education += item.amount;

            }

            else{

                other += item.amount;

            }


        }



        if(item.type === "income"){


            income += item.amount;


        }


    });






    // Remove old charts

    if(expenseChart){

        expenseChart.destroy();

    }



    if(incomeExpenseChart){

        incomeExpenseChart.destroy();

    }





    // Expense Pie Chart


    expenseChart =
    new Chart(

        document.getElementById(
            "expenseChart"
        ),

        {


        type:"pie",


        data:{


            labels:[

                "Food",
                "Shopping",
                "Travel",
                "Education",
                "Other"

            ],



            datasets:[{

                data:[

                    food,
                    shopping,
                    travel,
                    education,
                    other

                ]

            }]


        }



    });







    // Income Vs Expense Chart


    incomeExpenseChart =
    new Chart(

        document.getElementById(
            "incomeExpenseChart"
        ),

        {


        type:"bar",


        data:{


            labels:[

                "Income",
                "Expense"

            ],



            datasets:[{

                data:[

                    income,
                    expense

                ]

            }]


        }



    });




}



// Update Charts

createCharts();
// =============================
// LOGOUT FUNCTION
// =============================


const logoutBtn =
document.getElementById("logoutBtn");



if(logoutBtn){


    logoutBtn.addEventListener(
    "click",
    function(){


        localStorage.removeItem(
            "currentUser"
        );


        alert(
            "Logged out successfully!"
        );


        window.location.href =
        "login.html";


    });


}





// =============================
// PAGE LOAD FUNCTIONS
// =============================


window.addEventListener(
"load",
function(){


    updateDashboard();


    displayTransactions();


    createCharts();


});
