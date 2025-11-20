import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import categoriesReducer from "./slice/categorySlice";
import budgetsReducer from "./slice/budgetSlice";
import expensesReducer from "./slice/expenseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    budgets: budgetsReducer,
    expenses: expensesReducer,
  }
});
export default store