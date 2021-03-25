import React, {useState, useEffect} from 'react';
import './App.css';
import ExpenseList from './components/Expense-List';
import Alert from './components/Alert';
import ExpenseForm from './components/Expense-Form';
import {v4 as uuid} from 'uuid';

const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({show: false});
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = ({type, text}) => {
    setAlert({show: true, type: type, text: text});
    setTimeout(() => {
      setAlert({show: false});
    }, 4000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id
            ? {...item, charge: charge, amount: amount}
            : item;
        });
        setExpenses(tempExpenses);
        handleAlert({type: 'success', text: 'data have been updated'});

        setEdit(false);
      } else {
        const singleExpense = {
          id: uuid(),
          charge: charge,
          amount: amount,
        };
        setExpenses([...expenses, singleExpense]);
        handleAlert({type: 'success', text: 'The data just have been added'});
      }

      setCharge('');
      setAmount('');
    } else {
      handleAlert({
        type: 'danger',
        text:
          'Opps..., I think you need to fill either charge with text or Amount with a value bigger than 0 ',
      });
    }
  };

  const handleClearItems = () => {
    setExpenses([]);
    handleAlert({type: 'danger', text: 'All Data have been deleted'});
  };

  const handleDeleteSingleItem = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({type: 'danger', text: 'item deleted'});
  };

  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDeleteSingleItem={handleDeleteSingleItem}
          handleEdit={handleEdit}
          handleClearItems={handleClearItems}
        />
      </main>
      <h1>
        Total spending :{' '}
        <span className="total">
          $
          {expenses.reduce((acc, currentValue) => {
            return (acc += parseInt(currentValue.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
