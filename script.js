const $ = id => document.getElementById(id);
const type = $('type'), amount = $('amount'), addBtn = $('add');
const incomeEl = $('moneyincme'), expenseEl = $('moneyexpense'), balanceEl = $('moneybalance'), list = $('List');

let transactions = [];

addBtn.onclick = () => {
  const value = parseFloat(amount.value);
  if (!value || value <= 0) return alert('กรุณาป้อนจำนวนเงินที่ถูกต้อง!');

  transactions.push({
    id: Date.now(),
    type: type.value,
    amount: value,
    time: new Date().toLocaleString()
  });

  amount.value = '';
  render();
};

function render() {
  let income = 0, expense = 0;
  list.innerHTML = '';

  transactions.forEach(({ id, type, amount, time }) => {
    if (type === 'income') income += amount;
    else expense += amount;

    const li = document.createElement('li');
    li.className = type === 'income' ? 'income-item' : 'expense-item';

    const labelColor = type === 'income' ? 'green' : 'red';
    const labelText = type === 'income' ? 'รายรับ' : 'รายจ่าย';

    li.innerHTML = `
      <span><strong style="color:${labelColor}">${labelText}</strong>: ${amount.toFixed()} บาท <small>(${time})</small></span>
      <button class="delete-btn" onclick="remove(${id})">ลบ</button>
    `;
    list.appendChild(li);
  });

  const balance = income - expense;
  incomeEl.textContent = income.toFixed();
  expenseEl.textContent = expense.toFixed();
  balanceEl.textContent = balance.toFixed();
  balanceEl.style.color = balance >= 0 ? 'green' : 'red';
}

function remove(id) {
  transactions = transactions.filter(t => t.id !== id);
  render();
}

render();
