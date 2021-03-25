import React from 'react';
import ExpenseItem from './Expense-Item';
import {MdDeleteSweep} from 'react-icons/md';
const ExpenseList = (props) => {
  const {
    expenses,
    handleEdit,
    handleClearItems,
    handleDeleteSingleItem,
  } = props;
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleDeleteSingleItem={handleDeleteSingleItem}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={handleClearItems}>
          Clear Expenses <MdDeleteSweep className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
