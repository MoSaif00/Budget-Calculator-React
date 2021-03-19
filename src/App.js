import React, {useState} from 'react';
import './App.css';
import ExpenseList from './components/Expense-List';
import Alert from './components/Alert';
import ExpenseForm from './components/Expense-Form';
import {v4 as uuid} from 'uuid';

const initialExpenses = [
  {
    id: uuid(),
    charge: 'rent1',
    amount: 1600,
  },
  {
    id: uuid(),
    charge: 'rent2',
    amount: 1500,
  },
  {
    id: uuid(),
    charge: 'rent3',
    amount: 1700,
  },
];

function App() {
  const [expenses] = useState(initialExpenses);

  return (
    <>
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        Total spending :{' '}
        <span className="total">
          $
          {expenses.reduce((acc, currentValue) => {
            return (acc += currentValue.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
