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
  let month = document.getElementById("month").value.trim();

  if (!name || !month) {
    alert("Enter name & month");
    return;
  }

  if (!data[name]) data[name] = {};
  if (!data[name][month]) data[name][month] = [];

  localStorage.setItem("expenseData", JSON.stringify(data));
  location.reload();
}

// Load users
function loadUsers() {
  let userSelect = document.getElementById("userSelect");
  userSelect.innerHTML = "";

  Object.keys(data).forEach(user => {
    let option = new Option(user, user);
    userSelect.add(option);
  });

  loadMonths();
}

// Load months
function loadMonths() {
  let user = document.getElementById("userSelect").value;
  let monthSelect = document.getElementById("monthSelect");

  monthSelect.innerHTML = "";

  Object.keys(data[user]).forEach(month => {
    let option = new Option(month, month);
    monthSelect.add(option);
  });

  showExpenses();
}

// Add expense
function addExpense() {
  let user = document.getElementById("userSelect").value;
  let month = document.getElementById("monthSelect").value;
  let reason = document.getElementById("reason").value;
  let amount = document.getElementById("expense").value;

  if (!reason || !amount) {
    alert("Enter reason and amount");
    return;
  }

  data[user][month].push({
    reason: reason,
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

  let list = document.getElementById("list");
  let total = 0;

  list.innerHTML = "";

  data[user][month].forEach(item => {
    total += item.amount;

    let li = document.createElement("li");
    li.innerHTML = `
      <span>${item.reason}</span>
      <strong>${item.amount} BDT</strong>
    `;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total + " BDT";
}

// 🔐 Password Protected Reset
function resetAll() {
  let password = prompt("Enter password to reset all data:");

  if (password === null) return;

  if (password === "0707") {
    let confirmReset = confirm("⚠️ All data will be permanently deleted. Continue?");
    
    if (confirmReset) {
      localStorage.removeItem("expenseData");
      location.reload();
    }
  } else {
    alert("❌ Wrong password! Data not deleted.");
  }
}

// Events
document.getElementById("userSelect").onchange = loadMonths;
document.getElementById("monthSelect").onchange = showExpenses;
