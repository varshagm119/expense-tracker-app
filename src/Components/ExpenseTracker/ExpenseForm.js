import React, { useEffect, useRef, useState } from "react";
import classes from "./ExpenseForm.module.css";
import { Button } from "react-bootstrap";
import axios from "axios";

const ExpenseForm = () => {
  const amtInputRef = useRef();
  const desInputRef = useRef();
  const dateRef = useRef();
  const cateRef = useRef();
  const formRef = useRef();

  const [isInputValid, setIsInputValid] = useState(true);

  const addExpenseHandler = async(e) => {
    e.preventDefault();
    if(
        amtInputRef.current.value === "" ||
        desInputRef.current.value === "" ||
        dateRef.current.value === ""
    ){
        setIsInputValid(false);
        return;
    }

    setIsInputValid(true);
    const expenseItem = {
        id: Math.random().toString(),
        enteredAmt: amtInputRef.current.value,
        enteredDesc: desInputRef.current.value,
        date: dateRef.current.value,
        category: cateRef.current.value
    }
    formRef.current.reset();
    try{
        const response = await axios.post('https://expensetracker-b5d53-default-rtdb.asia-southeast1.firebasedatabase.app/expense.json',expenseItem);
       
    }catch(err){alert(err);}
  }

  return (
    <section className={classes.expenseCon}>
      <form ref={formRef}>
        {!isInputValid && <p style={{color: 'red'}}>Please fill all inputs.</p>}
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
        <Button type="submit" onClick={addExpenseHandler}>Add Expense</Button>
      </form>
    </section>
  );
};

export default ExpenseForm;
