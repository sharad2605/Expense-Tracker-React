import { createSlice } from "@reduxjs/toolkit";


const initialExpensesState = {
  expenses: [],
//   totalAmount: 0,
//   isPremiumActive: false,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    addExpense(state, action) {
      state.expenses.push(action.payload);
   
    },
    updateExpense(state, action) {
        const index = state.expenses.findIndex(exp => exp.id === action.payload.id);
        if (index !== -1) {
            state.expenses[index] = action.payload;
        }
    },
    deleteExpense(state, action) {
        // Filter out the expense with the specified key
        state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
      },
  },
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
