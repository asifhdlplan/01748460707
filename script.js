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
  let name = document.getElementById("name").value.trim();
  if (!name) return alert("Enter name");

  if (!data[name]) data[name] = {};
  localStorage.setItem("expenseData", JSON.stringify(data));
  location.reload();
}

function loadUsers() {
  let u = document.getElementById("userSelect");
  u.innerHTML = "";

  Object.keys(data).forEach(user => {
    u.add(new Option(user, user));
  });

  showData();
}

function addExpense() {
  let user = userSelect.value;
  let month = monthSelect.value;
  let date = document.getElementById("date").value;
  let reason = document.getElementById("reason").value;
  let amount = document.getElementById("amount").value;

  if (!date || !reason || !amount) return alert("Fill all");

  if (!data[user][month]) data[user][month] = [];

  data[user][month].push({
    date, reason, amount: Number(amount)
  });

  localStorage.setItem("expenseData", JSON.stringify(data));

  document.getElementById("reason").value = "";
  document.getElementById("amount").value = "";

  showData();
}

function showData() {
  let user = userSelect.value;
  let month = monthSelect.value;

  let list = document.getElementById("list");
  let total = 0;

  list.innerHTML = "";

  if (data[user][month]) {
    data[user][month].forEach(e => {
      total += e.amount;

      let li = document.createElement("li");
      li.innerHTML = `
        📅 ${e.date} <br>
        ${e.reason} - ${e.amount} BDT
      `;
      list.appendChild(li);
    });
  }

  document.getElementById("total").innerText = total + " BDT";
}

function resetAll() {
  let pass = prompt("Password?");
  if (pass === "0707") {
    localStorage.removeItem("expenseData");
    location.reload();
  } else {
    alert("Wrong password");
  }
}

userSelect.onchange = showData;
monthSelect.onchange = showData;
