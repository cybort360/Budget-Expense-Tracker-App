'use strict';

const budgetApp = {
  budget: 0,
  expenses: [],

  setBudget() {
    const askBudget = Number(prompt('Enter total budget amount'));

    if (!askBudget || !Number.isFinite(askBudget)) {
      console.log('Enter a valid amount');
    } else {
      const currentBudget = (this.budget += askBudget);
      console.log(`Current budget : ₦${currentBudget}`);
    }
  },

  addExpense() {
    const askExpense = prompt('What are you spending money on?');

    if (!askExpense || askExpense.trim() === '') {
      console.log('Please input expense');
      return;
    }

    const expense = askExpense[0].toUpperCase() + askExpense.slice(1).toLowerCase();

    const askAmount = Number(prompt('Amount you are paying for your expense?'));
    if (!askAmount || !Number.isFinite(askAmount)) {
      console.log('Enter a valid amount');
      return;
    }

    const expenseObj = { description: expense, amount: askAmount };

    let totalExpenses = 0;
    for (let i = 0; i < this.expenses.length; i++) {
      totalExpenses += this.expenses[i].amount;
    }

    const remaining = this.budget - totalExpenses;

    if (askAmount > remaining) {
      console.log('Insufficient balance');
      return;
    }

    this.expenses.push(expenseObj);
    console.log(this.expenses);
    console.log(`New expense - ${expense}`);
    console.log(`Remaining balance - ₦${remaining - askAmount}`);
  },

  viewExpenses() {
    if (this.expenses.length === 0) {
      console.log('No expenses');
      return;
    }

    for (const [index, expense] of this.expenses.entries()) {
      console.log(`${index + 1} | Expense - ${expense.description} | Amount - ₦${expense.amount}`);
    }

    let sum = 0;
    for (const expense of this.expenses) {
      sum += expense.amount;
    }
    console.log(`Total expenses - ₦${sum}`);
    console.log(`Balance - ₦${this.budget}`);
  },

  deleteExpense() {
    if (this.expenses.length === 0) {
      console.log('No expenses');
      return;
    }

    const expenseToDelete = prompt('What expense are you deleting?');
    if (!expenseToDelete || expenseToDelete.trim() === '') {
      console.log('Input the expense you want to delete');
      return;
    }

    const toDelete = expenseToDelete[0].toUpperCase() + expenseToDelete.slice(1).toLowerCase();
    let index = -1;

    for (let i = 0; i < this.expenses.length; i++) {
      if (this.expenses[i].description.toLowerCase() === toDelete.toLowerCase()) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      const confirmDelete = confirm(`Are you sure you want to delete ${this.expenses[index].description}`);
      if (confirmDelete) {
        this.expenses.splice(index, 1);
        console.log(`${toDelete} deleted from expenses`);
      } else {
        console.log('Deletion cancelled');
      }
    } else {
      console.log('Expense not found');
    }
  },

  reset() {
    if (this.expenses.length === 0) {
      console.log('Expense is empty');
      return;
    }

    const confirmReset = confirm('Are you sure you want to reset the tracker?');
    if (confirmReset) {
      this.budget = 0;
      this.expenses = [];
      console.log('Tracker reset');
    } else {
      console.log('Action cancelled');
    }
  },
};

document.querySelector('.set-budget').addEventListener('click', budgetApp.setBudget.bind(budgetApp));
document.querySelector('.add-expense').addEventListener('click', budgetApp.addExpense.bind(budgetApp));
document.querySelector('.view-expenses').addEventListener('click', budgetApp.viewExpenses.bind(budgetApp));
document.querySelector('.delete-expense').addEventListener('click', budgetApp.deleteExpense.bind(budgetApp));
document.querySelector('.reset').addEventListener('click', budgetApp.reset.bind(budgetApp));
