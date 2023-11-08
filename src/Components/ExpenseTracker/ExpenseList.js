import React, { useEffect, useState } from "react";
import classes from "./ExpenseList.module.css";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { expenseActions } from "../../store/expense-slice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { FaCrown } from "react-icons/fa";
import { authActions } from "../../store/auth-slice";

const ExpenseList = () => {
  const [expenseData, setExpenseData] = useState([]);

  const auth = useSelector((state) => state.auth);
  const expense = useSelector((state) => state.expenseStore);
  const dispatch = useDispatch();

  const editClickHandler = async (record) => {
    const filter = expense.items.filter((ele) => ele !== record);
    dispatch(expenseActions.editItem({ item: record, filtered: filter }));
  };

  const deleteClickHandler = async (record) => {
    dispatch(expenseActions.removeItem(record));
    const email = auth.userEmail.replace(/[.@]/g, "");
    try {
      const res = await axios.get(
        `https://expensetracker-b5d53-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/expense.json`
      );
      const data = res.data;
      const Id = Object.keys(data).find(
        (eleID) => data[eleID].id === record.id
      );
      try {
        const res = await axios.delete(
          `https://expensetracker-b5d53-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/expense/${Id}.json`
        );
      } catch (err) {
        alert(err);
      }
    } catch (err) {
      alert(err);
    }
  };

  const restoreItems = async () => {
    const email = auth.userEmail.replace(/[.@]/g, "");
    try {
      const res = await axios.get(
        `https://expensetracker-b5d53-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/expense.json`
      );
      const data = res.data;
      if (data) {
        const realData = Object.values(data).reverse();
        dispatch(expenseActions.setItems(realData));
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    if (auth.userEmail !== null) {
      restoreItems();
    }
  }, [auth.userEmail]);

  let total = 0;
  expense.items.forEach((element) => {
    total += Number(element.enteredAmt);
  });

  const clickActPremiumHandler = async () => {
    const email = auth.userEmail.replace(/[.@]/g, "");
    try {
      const res = await axios.post(
        `https://expensetracker-b5d53-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/userDetail.json`,
        { isPremium: true }
      );
    } catch (err) {
      alert(err);
    }
    dispatch(authActions.setIsPremium());
    localStorage.setItem('isPremium', true);
  };

  const clickDownloadHandler = () => {
    const generateCSV = (itemsArr) => {
      const csvRows = [];
      const headers = ['Date', 'Description', 'Category', 'Amount'];
      csvRows.push(headers.join(','));

      itemsArr.forEach((i) => {
        const row = [
          i.date,
          i.enteredDesc,
          i.category,
          i.enteredAmt
        ];
        csvRows.push(row.join(','));
      });
      return csvRows.join('\n');
    };

    const csvContent = generateCSV(expense.items);
    const blob = new Blob([csvContent], {type: 'text/csv'});
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "expenses.csv";
    downloadLink.click();
  }

  return (
    <section className={classes.listCon}>
      <div className={classes.container}>
        <h1>Expenses</h1>
        <div className={classes.totalAmt}>
          <h3>
            Total Expense <span> Rs{total}</span>
          </h3>
          {total >= 1000 &&
            (!auth.isPremium ? (
              <Button variant="danger" onClick={clickActPremiumHandler}>
                Activate Premium
              </Button>
            ) : (
              <Button variant="warning" onClick={clickDownloadHandler}>
                <FaCrown />
                Download List
              </Button>
            ))
            }
        </div>
        {total >= 1000 && !auth.isPremium && (
          <p style={{ color: "red" }}>
            *Please Activate Premium total expenes more than 10000
          </p>
        )}
      </div>
      <ul>
        {expense.items.map((record, index) => (
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
