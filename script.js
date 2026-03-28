let data = JSON.parse(localStorage.getItem("expenseData")) || {};

// Load
window.onload = function () {
  if (Object.keys(data).length === 0) {
    document.getElementById("setup").style.display = "block";
  } else {
    document.getElementById("main").style.display = "block";
    loadUsers();
  }
};

// Save user
function saveUser() {
  let name = document.getElementById("name").value.trim();

  if (!name) {
    alert("Enter name");
    return;
  }

  if (!data[name]) data[name] = {};

  localStorage.setItem("expenseData", JSON.stringify(data));
  location.reload();
}

// Load users
function loadUsers() {
  let userSelect = document.getElementById("userSelect");
  userSelect.innerHTML = "";

  Object.keys(data).forEach(user => {
    userSelect.add(new Option(user, user));
  });

  showExpenses();
}

// Add expense
function addExpense() {
  let user = document.getElementById("userSelect").value;
  let month = document.getElementById("monthSelect").value;
  let date = document.getElementById("dateSelect").value;
  let reason = document.getElementById("reason").value;
  let amount = document.getElementById("expense").value;

  if (!date || !reason || !amount) {
    alert("Fill all fields");
    return;
  }

  if (!data[user][month]) data[user][month] = {};
  if (!data[user][month][date]) data[user][month][date] = [];

  data[user][month][date].push({
    reason,
    amount: Number(amount)
  });

  localStorage.setItem("expenseData", JSON.stringify(data));

  document.getElementById("reason").value = "";
  document.getElementById("expense").value = "";

  showExpenses();
}

// Show expenses
function showExpenses() {
  let user = document.getElementById("userSelect").value;
  let month = document.getElementById("monthSelect").value;
  let date = document.getElementById("dateSelect").value;

  let list = document.getElementById("list");
  let total = 0;

  list.innerHTML = "";

  if (data[user] && data[user][month] && data[user][month][date]) {
    data[user][month][date].forEach(item => {
      total += item.amount;

      let li = document.createElement("li");
      li.innerHTML = `
        <span>${item.reason}</span>
        <strong>${item.amount} BDT</strong>
      `;
      list.appendChild(li);
    });
  }

  document.getElementById("total").innerText = total + " BDT";
}

// Reset
function resetAll() {
  let pass = prompt("Enter password:");

  if (pass === "0707") {
    if (confirm("Delete all data?")) {
      localStorage.removeItem("expenseData");
      location.reload();
    }
  } else {
    alert("Wrong password");
  }
}

// Events
document.getElementById("userSelect").onchange = showExpenses;
document.getElementById("monthSelect").onchange = showExpenses;
document.getElementById("dateSelect").onchange = showExpenses;
