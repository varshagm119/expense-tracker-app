import React, { useRef } from "react";
import classes from "./ExpenseForm.module.css";
import { Button } from "react-bootstrap";

const ExpenseForm = () => {
  const amtInputRef = useRef();
  const desInputRef = useRef();
  const dateRef = useRef();
  const cateRef = useRef();
  const formRef = useRef();

  return (
    <section className={classes.expenseCon}>
      <form ref={formRef}>
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
        <Button type="submit" >Add Expense</Button>
      </form>
    </section>
  );
};

export default ExpenseForm;
