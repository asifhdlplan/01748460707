let data = JSON.parse(localStorage.getItem("expenseData")) || {};

window.onload = function () {
  if (Object.keys(data).length === 0) {
    document.getElementById("setup").style.display = "block";
  } else {
    document.getElementById("main").style.display = "block";
    loadUsers();
  }
};

function saveUser() {
  let name = document.getElementById("name").value;
  let month = document.getElementById("month").value;

  if (!data[name]) data[name] = {};
  if (!data[name][month]) data[name][month] = [];

  localStorage.setItem("expenseData", JSON.stringify(data));
  location.reload();
}

function loadUsers() {
  let userSelect = document.getElementById("userSelect");
  userSelect.innerHTML = "";

  Object.keys(data).forEach(user => {
    let opt = `<option value="${user}">${user}</option>`;
    userSelect.innerHTML += opt;
  });

  loadMonths();
}

function loadMonths() {
  let user = document.getElementById("userSelect").value;
  let monthSelect = document.getElementById("monthSelect");

  monthSelect.innerHTML = "";

  Object.keys(data[user]).forEach(month => {
    let opt = `<option value="${month}">${month}</option>`;
    monthSelect.innerHTML += opt;
  });

  showExpenses();
}

function addExpense() {
  let user = document.getElementById("userSelect").value;
  let month = document.getElementById("monthSelect").value;
  let expense = document.getElementById("expense").value;

  data[user][month].push(Number(expense));

  localStorage.setItem("expenseData", JSON.stringify(data));
  showExpenses();
}

function showExpenses() {
  let user = document.getElementById("userSelect").value;
  let month = document.getElementById("monthSelect").value;

  let list = document.getElementById("list");
  let total = 0;

  list.innerHTML = "";

  data[user][month].forEach(e => {
    total += e;
    list.innerHTML += `<li>${e} BDT</li>`;
  });

  document.getElementById("total").innerText = total;
}

document.getElementById("userSelect").onchange = loadMonths;
document.getElementById("monthSelect").onchange = showExpenses;
