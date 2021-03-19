import React from 'react';
import ExpenseItem from './Expense-Item';
import {MdDeleteSweep} from 'react-icons/md';
const ExpenseList = (props) => {
  const {expenses} = props;
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return <ExpenseItem key={expense.id} expense={expense} />;
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn">
          Clear everything <MdDeleteSweep className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
