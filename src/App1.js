import { useEffect } from "react";
import { useState } from "react";
import { Auth } from "./components/auth";
import { db,auth, storage } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc,updateDoc, doc } from "firebase/firestore";

function App() {
  const [expenseList, setExpenseList] = useState([]);

  // Add New Expense Data
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  // Update Title State
  const [updateTitle, setUpdateTitle] = useState('');

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);

  const expensesCollectionRef = collection(db, "expense-tracker");
  const getExpenseList = async () => {
    // READ THE DATA
    // SET THE EXPENSE LIST
    try {
      const data = await getDocs(expensesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setExpenseList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
   getExpenseList();
  }, []);

  const handelSubmit = async () => {
    
    try{
        console.log( category,
       amount,
       description,)
     await addDoc(expensesCollectionRef, {
    Category: category,
    Amount: amount,
    Description: description,
    userId:auth?.currentUser?.uid,
    });
    getExpenseList();
    }catch(err){
        console.error(err);
    }
  };

  const deteteExpense = async (id) =>{
    const expenseDoc = doc(db, "expense-tracker",id)
    await deleteDoc(expenseDoc);
    getExpenseList();
  };

  const updateExpense = async (id) =>{
    const expenseDoc = doc(db, "expense-tracker",id)
    await updateDoc(expenseDoc,{Category:updateTitle})
    getExpenseList();
  }
  return (
    <div className="App">
      <Auth />

      <div>
        <input
          type="text"
          placeholder="Category..."
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount..."
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Description..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handelSubmit}>Add Expense</button>
      </div>
      <div>
        {expenseList?.map((expense) => (
          <div>
            <h1>{expense.Category}</h1>
            <p>{expense.Amount}</p>
            <p>{expense.Description}</p>
            <button onClick={()=> deteteExpense(expense.id)}>Delete</button>

            <input placeholder="new title..." onChange={(e)=>setUpdateTitle(e.target.value)}/>
            <button onClick={()=>updateExpense(expense.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input type='file' />
        <button>Upload File</button>
      </div>
    </div>
  );
}
export default App;
