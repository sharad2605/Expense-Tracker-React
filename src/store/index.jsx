import { configureStore } from '@reduxjs/toolkit';
import authReducer  from './authSlice';
import  expenseReducer  from './expenseSlice';
import premiumReducer from './premiumSlice';
import darkModeReducer from './darkmodeSlice';
import csvExportReducer from './csvSlice';

const store=configureStore({
    reducer:{ auth:authReducer,expense:expenseReducer,premium:premiumReducer ,darkMode:darkModeReducer,csvFile: csvExportReducer } //expense:expenseReducer
})
export default store;