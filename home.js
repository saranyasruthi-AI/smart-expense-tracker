// =======================================
// EXPENSE TRACKER - HOME PAGE
// PART 1
// =======================================

// Logged In User
const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

// Redirect if not logged in
if (!currentUser) {

    window.location.href = "login.html";

}

// Username
const username =
document.getElementById("username");

username.textContent =
currentUser.name;

// Current Date
const currentDate =
document.getElementById("currentDate");

const today = new Date();

currentDate.textContent =
today.toLocaleDateString("en-IN", {

    weekday: "long",

    day: "numeric",

    month: "long",

    year: "numeric"

});

// Transactions
let transactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];

// Form
const transactionForm =
document.getElementById("transactionForm");

// Transaction Table
const transactionList =
document.getElementById("transactionList");

// Summary
const totalBalance =
document.getElementById("totalBalance");

const totalIncome =
document.getElementById("totalIncome");

const totalExpense =
document.getElementById("totalExpense");

const totalSaving =
document.getElementById("totalSaving");
// =======================================
// PART 2 - ADD TRANSACTION
// =======================================

transactionForm.addEventListener(
    "submit",
    addTransaction
);

function addTransaction(event) {

    event.preventDefault();

    const type =
    document.getElementById("transactionType").value;

    const amount =
    parseFloat(document.getElementById("amount").value);

    const category =
    document.getElementById("category").value;

    const date =
    document.getElementById("transactionDate").value;

    const description =
    document.getElementById("description").value.trim();

    if (
        type === "" ||
        isNaN(amount) ||
        amount <= 0 ||
        category === "" ||
        date === ""
    ) {

        alert("Please fill all required fields.");

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

    transactionForm.reset();

    displayTransactions();

    updateSummary();

    updateCharts();

}
<!-- Dashboard Section -->
<section id="dashboard" class="section">

    <div class="cards">

        <div class="card income-card">
            <h3>Total Income</h3>
            <h2 id="totalIncome">₹0</h2>
        </div>

        <div class="card expense-card">
            <h3>Total Expense</h3>
            <h2 id="totalExpense">₹0</h2>
        </div>

        <div class="card balance-card">
            <h3>Balance</h3>
            <h2 id="balance">₹0</h2>
        </div>

    </div>


    <div class="chart-container">

        <h2>Expense Analysis</h2>

        <canvas id="expenseChart"></canvas>

    </div>

</section>



<!-- Add Transaction Section -->

<section id="transaction" class="section">

    <div class="form-box">

        <h2>Add Transaction</h2>


        <form id="transactionForm">


            <input 
            type="text" 
            id="title"
            placeholder="Transaction Title"
            required>


            <input 
            type="number"
            id="amount"
            placeholder="Amount"
            required>


            <select id="type">

                <option value="income">
                    Income
                </option>

                <option value="expense">
                    Expense
                </option>

            </select>


            <input 
            type="date"
            id="date"
            required>


            <button type="submit">
                Add Transaction
            </button>


        </form>


    </div>


</section>
<!-- Transaction History Section -->

<section id="history" class="section">

    <div class="table-box">

        <h2>Transaction History</h2>


        <table>

            <thead>

                <tr>

                    <th>Title</th>

                    <th>Amount</th>

                    <th>Type</th>

                    <th>Date</th>

                    <th>Action</th>

                </tr>

            </thead>


            <tbody id="transactionList">

                <!-- Transactions will appear here -->

            </tbody>


        </table>


    </div>


</section>



<!-- Reports Section -->

<section id="reports" class="section">


    <div class="report-box">

        <h2>Reports</h2>


        <button id="downloadPDF">

            Download PDF

        </button>


    </div>


</section>



<!-- Profile Section -->

<section id="profile" class="section">


    <div class="profile-box">

        <h2>User Profile</h2>


        <p>
            Name:
            <span id="userName">
                User
            </span>
        </p>


        <button id="logoutBtn">

            Logout

        </button>


    </div>


</section>
<!-- External Libraries -->

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>



<!-- JavaScript File -->

<script src="home.js"></script>


</body>

</html>

