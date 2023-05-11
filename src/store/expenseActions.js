import { expenseAction } from "./expenseSlice";

// Add Expenses Data

export const addExpense = (inputData, emailUrl, removeInputData) =>{
    return async (dispatch) =>{
        try{
            const res = await fetch (
                `https://expense-tracker-e8647-default-rtdb.firebaseio.com/${emailUrl}expenses.json`,
                {
                    method:'POST',
                    body:JSON.stringify(inputData),
                    headers:{'Content-Type':'application/json'}
                }
            );
            const data = await res.json();
            if(res.ok){
                removeInputData();
                const newData = {
                    id:data.name,
                    ...inputData
                };
                dispatch(
                    expenseAction.addExpense({expenses:newData,totalAmount:newData.amount})
                )
            }else{
                throw data.error;
            }
            

        }catch(err){
            console.log(err.message)
        }
    }

};

// Fetch data when ever page Refresh

export const requestExpense = (emailUrl) =>{

    return async(dispatch) => {
        try{

            const res = await fetch(`https://expense-tracker-e8647-default-rtdb.firebaseio.com/${emailUrl}expenses.json`
            );
            const data = await res.json();
            if(res.ok){
                let retrivedData = [];
                let totalAmount = 0;
                for(let key in data){
                    retrivedData.push({id:key, ...data[key]});
                    totalAmount = Number(totalAmount) + Number(data[key].amount)
                }
                dispatch(expenseAction.replaceExpense({expenses:retrivedData,
                    totalAmount: totalAmount}))
            }else {
                throw data.error;
              }
        }catch(err){
            console.log(err.message)
        }
    }
}
