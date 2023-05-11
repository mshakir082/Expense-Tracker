import { configureStore } from "@reduxjs/toolkit";
import expenseReducer  from './expenseSlice'
import loginSlice from "./loginSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
    reducer:{
        expense:expenseReducer,
        login: loginSlice,
        theme: themeSlice
    }
});
export default store;