import React, { useEffect, useState } from "react";
import classes from "./ExpenseList.module.css";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
const ExpenseList = () => {
  const [expenseData, setExpenseData] = useState([]);
  const getExpenseFromDb = async () => {
    const res = await axios.get(
      "https://expensetracker-b5d53-default-rtdb.asia-southeast1.firebasedatabase.app/expense.json"
    );
    if (res.data) {
      const expenseArray = Object.values(res.data);
      setExpenseData(expenseArray);
    }
  };
  useEffect(() => {
    getExpenseFromDb();
  }, []);

  const editClickHandler = async (record) => {};

  const deleteClickHandler = async (record) => {
    const filteredExpenseData = expenseData.filter(data => data.id === record.id);
    setExpenseData(filteredExpenseData);
    try {
      const res = await axios.get(
        "https://expensetracker-b5d53-default-rtdb.asia-southeast1.firebasedatabase.app/expense.json"
      );
      const data = res.data;
      const Id = Object.keys(data).find(
        (eleID) => data[eleID].id === record.id
      );
      try {
        const res = await axios.delete(
          `https://expensetracker-b5d53-default-rtdb.asia-southeast1.firebasedatabase.app/expense/${Id}.json`
        );
      } catch (err) {
        alert(err);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <section className={classes.listCon}>
      <div className={classes.container}>
        <h1>Expenses</h1>
      </div>
      <ul>
        {expenseData.map((record, index) => (
          <li className={classes.listItem} key={index}>
            <div className={classes.date}>{record.date}</div>
            <h3 className={classes.category}>
              {record.category.toUpperCase()}
            </h3>
            <div className={classes.des}>{record.enteredDesc}</div>
            <div className={classes.Amt}>₹{record.enteredAmt}</div>
            <button
              className={classes.edit}
              onClick={() => editClickHandler(record)}
            >
              <AiFillEdit />
            </button>
            <button
              className={classes.dlt}
              onClick={() => deleteClickHandler(record)}
            >
              <AiFillDelete />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExpenseList;
