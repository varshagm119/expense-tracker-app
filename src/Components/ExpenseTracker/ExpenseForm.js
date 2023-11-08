import React, { useEffect, useRef, useState } from "react";
import classes from "./ExpenseForm.module.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { expenseActions } from "../../store/expense-slice";
import { useDispatch, useSelector } from "react-redux";

const ExpenseForm = () => {
  const amtInputRef = useRef();
  const desInputRef = useRef();
  const dateRef = useRef();
  const cateRef = useRef();
  const formRef = useRef();

  const [isInputValid, setIsInputValid] = useState(true);

  const auth = useSelector((state) => state.auth);
  const expense = useSelector((state) => state.expenseStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (expense.editItems !== null) {
      amtInputRef.current.value = expense.editItems.enteredAmt;
      desInputRef.current.value = expense.editItems.enteredDesc;
      dateRef.current.value = expense.editItems.date;
      cateRef.current.value = expense.editItems.category;
    }
  }, [expense.editItems]);

  const addExpenseHandler = async (e) => {
    e.preventDefault();
    if (
      amtInputRef.current.value === "" ||
      desInputRef.current.value === "" ||
      dateRef.current.value === ""
    ) {
      setIsInputValid(false);
      return;
    }

    setIsInputValid(true);

    if (expense.editItems !== null) {
      const email = auth.userEmail.replace(/[.@]/g, "");
      try {
        const res = await axios.get(
          `https://expensetracker-b5d53-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/expense.json`
        );
        const data = res.data;
        const Id = Object.keys(data).find(
          (eleId) => data[eleId].id === expense.editItems.id
        );
        try {
          const resDlt = await axios.delete(
            `https://expensetracker-b5d53-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/expense/${Id}.json`
          );
        } catch (e) {
          alert(e);
        }
      } catch (e) {
        alert(e);
      }

      dispatch(expenseActions.setEditItemsNull());
    }

    const expenseItem = {
      id: Math.random().toString(),
      enteredAmt: amtInputRef.current.value,
      enteredDesc: desInputRef.current.value,
      date: dateRef.current.value,
      category: cateRef.current.value,
    };

    //to get the email from auth to insert in posting the data in db
    const email = auth.userEmail.replace(/[.@]/g, "");
    try {
      const response = await axios.post(
        `https://expensetracker-b5d53-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/expense.json`,
        expenseItem
      );
    } catch (err) {
      alert(err);
    }
    //adding these added expense item in expense store
    dispatch(expenseActions.addItem(expenseItem));

    formRef.current.reset();
  };

  return (
    <section className={classes.expenseCon}>
      <form ref={formRef}>
        {!isInputValid && (
          <p style={{ color: "red" }}>Please fill all inputs.</p>
        )}
        <section>
          <div className={classes.amt}>
            <label htmlFor="Amount">Amount</label>
            <input type="number" ref={amtInputRef} />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input type="text" ref={desInputRef} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="text" ref={dateRef} />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select ref={cateRef}>
              <option value="food">Food</option>
              <option value="petrol">Petrol</option>
              <option value="salary">Salary</option>
              <option value="other">Other</option>
            </select>
          </div>
        </section>
        <Button type="submit" onClick={addExpenseHandler}>
          Add Expense
        </Button>
      </form>
    </section>
  );
};

export default ExpenseForm;
