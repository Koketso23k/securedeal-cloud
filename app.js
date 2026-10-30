// SecureDeal – the same rules as the Java version, running in the browser.

const STATUSES = ["PENDING", "SHIPPED", "RECEIVED"];
const STORAGE_KEY = "securedeal-transactions";

let transactions = loadTransactions();

const form = document.getElementById("deal-form");
const errorBox = document.getElementById("error");
const list = document.getElementById("deal-list");
const emptyMessage = document.getElementById("empty");

// ---------- Rules (validation) ----------

function validate(buyer, item, price) {
  if (buyer.trim() === "") return "Buyer name cannot be empty";
  if (item.trim() === "") return "Item name cannot be empty";
  if (price === "" || Number.isNaN(Number(price))) return "Price must be a number";
  if (Number(price) <= 0) return "Price must be more than zero";
  return null; // no problem found
}

// ---------- Saving in the browser ----------

function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

function saveTransactions() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (e) {
    // If the browser blocks saving, the app still works until the page is closed.
  }
}

// ---------- Showing the list ----------

function render() {
  list.textContent = "";
  emptyMessage.hidden = transactions.length > 0;

  transactions.forEach((deal, index) => {
    const li = document.createElement("li");

    const title = document.createElement("div");
    title.className = "deal-title";
    title.textContent = deal.item;

    const meta = document.createElement("div");
    meta.className = "deal-meta";
    meta.textContent = deal.buyer + " · R" + Number(deal.price).toFixed(2);

    const badge = document.createElement("span");
    badge.className = "badge " + deal.status;
    badge.textContent = deal.status;

    const label = document.createElement("label");
    label.textContent = "Change status";
    label.htmlFor = "status-" + index;

    const select = document.createElement("select");
    select.id = "status-" + index;
    STATUSES.forEach((status) => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      option.selected = status === deal.status;
      select.appendChild(option);
    });
    select.addEventListener("change", () => {
      transactions[index].status = select.value;
      saveTransactions();
      render();
    });

    li.append(title, meta, badge, label, select);
    list.appendChild(li);
  });
}

// ---------- Creating a transaction ----------

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const buyer = document.getElementById("buyer").value;
  const item = document.getElementById("item").value;
  const price = document.getElementById("price").value;

  const problem = validate(buyer, item, price);
  if (problem) {
    errorBox.textContent = problem;
    return;
  }

  errorBox.textContent = "";
  transactions.push({
    buyer: buyer.trim(),
    item: item.trim(),
    price: Number(price),
    status: "PENDING" // every deal starts as PENDING
  });
  saveTransactions();
  render();
  form.reset();
});

render();
