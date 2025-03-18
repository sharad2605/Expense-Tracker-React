import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
  expenses: [],
  totalAmount: 0,
  isPremiumActive: false,
};

const expensesSlice = createSlice({
  name: "expense",
  initialState: initialExpensesState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
      state.totalAmount = state.expenses.reduce((sum, expense) => sum + Number(expense.moneySpent), 0);
      state.isPremiumActive = state.totalAmount > 10000;
    },

    addExpense(state, action) {
      const newExpense = { 
        ...action.payload, 
        moneySpent: Number(action.payload.moneySpent)  
      };

      state.expenses.push(newExpense);

      // ✅ Yaha pe reduce ke alag use ki zaroorat nahi hai
      state.totalAmount += newExpense.moneySpent;  

      state.isPremiumActive = state.totalAmount > 10000;
    },

    updateExpense(state, action) {
      const index = state.expenses.findIndex(exp => exp.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = { ...action.payload, moneySpent: Number(action.payload.moneySpent) };
      }
      state.totalAmount = state.expenses.reduce((sum, exp) => sum + Number(exp.moneySpent), 0);
      state.totalAmount = Number(state.totalAmount);
      
        state.isPremiumActive = state.totalAmount > 10000;
    },

    deleteExpense(state, action) {
        state.expenses = state.expenses.filter(exp => exp.id !== action.payload);
      
        // ✅ Reduce se sahi calculation
        state.totalAmount = state.expenses.reduce((sum, exp) => sum + Number(exp.moneySpent), 0);
      
        // ✅ Ensure totalAmount is always a Number
        state.totalAmount = Number(state.totalAmount);
      
        state.isPremiumActive = state.totalAmount > 10000;
      
        console.log("Total Amount after delete:", state.totalAmount); // ✅ Debugging
      },

    activatePremium(state) {
      state.isPremiumActive = true;
    }
  }
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
