import React from 'react'
import classes from "./ExpenseItem.module.css";
import {doc,updateDoc,deleteDoc} from 'firebase/firestore'
import { db } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { requestExpense } from '../store/expenseActions';
const ExpenseItems = (props) => {
// console.log(props,'props')
const dispatch = useDispatch();
const email = JSON.parse(localStorage.getItem("idToken")).email;
  const emailUrl = email.replace(/[@.]/g, "");
 const editHandler = async(id) =>{

    try {
        const res = await fetch (
          `https://expense-tracker-e8647-default-rtdb.firebaseio.com/${props.emailUrl}expenses/${props.item.id}.json`,
          {
            method: "PATCH",
          }
        );
        const data = await res.json();
        if(res.ok){
          props.edit(props.item);
        }else{
          throw data.error;
        }

    }catch(error){
        console.log(error);
    }
    // const expenseDoc = doc(db, "expense-tracker",id)
    // await updateDoc(expenseDoc,{Category:updateTitle})
 };

  const deleteHandler = async (id) => {

    // try {
    //    const res = await fetch(
    //     `https://expense-tracker-e8647-default-rtdb.firebaseio.com/${props.emailUrl}expenses/${props.item.id}.json`,
    //     {
    //       method: "DELETE",
    //     }
    //    );
    //    const data = await res.json();
    //    if(res.ok){
    //     props.deleted(props.item);
    //    }else{
    //     throw data.error;
    //    }
    // }catch (err) {
    //   console.log(err.message)
    // }
    const expenseDoc = doc(db, "expense-tracker",id)
    await deleteDoc(expenseDoc);
    dispatch(requestExpense(emailUrl));
  }

  return (
    <div className={classes.item}>
      <span className={classes.type}>{props.item.Category}</span>
      <span className={classes.amount}>{props.item.Amount}</span>
      <span className={classes.description}>{props.item.Description}</span>
      <div className={classes.button}>
        {/* <button onClick={()=>editHandler(props.item.id)}>Edit</button> */}
        <button onClick={()=>deleteHandler(props.item.id)}>Delete</button>
      </div>
    </div>
  )
}

export default ExpenseItems
