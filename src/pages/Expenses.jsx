import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpenseItems from "../components/ExpenseItems";
import { expenseAction } from "../store/expenseSlice";
import { addExpense } from "../store/expenseActions";
import { requestExpense } from "../store/expenseActions";
import classes from "./Expenses.module.css";
import Premium from "../components/Premium";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
const Expenses = () => {
  const amountRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();
  const dispatch = useDispatch();
  const expensesCollectionRef = collection(db, "expense-tracker");
  const firstTime = useSelector((state) => state.expense.firstTime);

  const expenseList = useSelector((state) => state.expense.expenses);
  const totalAmount = useSelector((state) => state.expense.totalAmount);

  const email = JSON.parse(localStorage.getItem("idToken")).email;
  const emailUrl = email.replace(/[@.]/g, "");

  const removeInputData = () => {
    amountRef.current.value = "";
    typeRef.current.value = "";
    descriptionRef.current.value = "";
  };
  const addExpenseHandler = async (event) => {
    event.preventDefault();

    // const inputData = {
    //     amount : amountRef.current.value,
    //     type: typeRef.current.value,
    //     description: descriptionRef.current.value,
    // };
    try {
      // console.log(category, amount, description);
      await addDoc(expensesCollectionRef, {
        Category: typeRef.current.value,
        Amount: amountRef.current.value,
        Description: descriptionRef.current.value,
        userId: auth?.currentUser?.uid,
      });
      dispatch(requestExpense(emailUrl));
      // getExpenseList();
    } catch (err) {
      console.error(err);
    }
    // dispatch(addExpense(inputData, emailUrl, removeInputData));
  };

  // showing expenses when page is refreshed

  useEffect(() => {
    if (firstTime) {
      dispatch(requestExpense(emailUrl));
    }
  }, [emailUrl, dispatch, firstTime]);

  // editing the expence

  const edit = (item) => {
    const updatedAmount = totalAmount - Number(item.amount);
    const updatedExpense = expenseList.filter(
      (expense) => expense.id !== item.id
    );
    amountRef.current.value = item.amount;
    typeRef.current.value = item.type;
    descriptionRef.current.value = item.description;
    dispatch(
      expenseAction.removeExpense({
        expenses: updatedExpense,
        totalAmount: updatedAmount,
      })
    );
  };

  // deleting the expense
  const deleted = (item) => {
    const updatedAmount = totalAmount - Number(item.amount);
    const updatedExpense = expenseList.filter((el) => el.id !== item.id);
    dispatch(
      expenseAction.removeExpense({
        expenses: updatedExpense,
        totalAmount: updatedAmount,
      })
    );
  };
  // mapping the expenses

  const newExpenseList = expenseList.map((item) => (
    <ExpenseItems
      item={item}
      key={item.id}
      edit={edit}
      deleted={deleted}
      emailUrl={emailUrl}
    />
  ));
  console.log(newExpenseList);
  // Expenses Commponent

  return (
    <>
      {/* <Premium /> */}
      <form className={classes.form} onSubmit={addExpenseHandler}>
        <div className={classes.type}>
          <label>Expense Category: </label>
          <select ref={typeRef} required>
            <option>Food</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Transport</option>
            <option>Adventure</option>
          </select>
        </div>
        <div className={classes.amount}>
          <label>Expense Amount: </label>
          <input type="number" min="0" ref={amountRef} required />
        </div>
        <div className={classes.description}>
          <label>Expense Description: </label>
          <textarea type="text" ref={descriptionRef} required />
        </div>
        <div className={classes.button}>
          <button type="submit">Add Expense</button>
        </div>
      </form>
      {expenseList.length > 0 && (
        <div className={classes.items}>
          <div className={classes.title}>
            <span className={classes.titletype}>Type</span>
            <span className={classes.titleamount}>Amount</span>
            <span className={classes.titledescription}>Description</span>
            <span className={classes.total}>Total = Rs.{totalAmount}</span>
          </div>
          {newExpenseList}
        </div>
      )}
    </>
  );
};

export default Expenses;
