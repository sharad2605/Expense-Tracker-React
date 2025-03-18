import { useSelector, useDispatch } from "react-redux";
import  {expensesActions } from "../../store/expenseSlice";
import './ExpenseList.css';

const ExpenseList = ({ onEditExpense ,onDeleteExpense }) => {
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expense.expenses);

    

    if (!expenses || expenses.length === 0) {
        return <p>No expenses found.</p>;
    }

    
    return (
        <div className="expense-list">
            {expenses.map((expense) => (
                <div key={expense.id} className="expense-item">
                    <div>
                        <span className="expense-category">{expense.category}</span>
                        <div className="expense-description">{expense.description}</div>
                    </div>
                    <span className="expense-amount">₹{expense.moneySpent}</span>
                    <div>
                        <button onClick={() => onEditExpense(expense)} className="edit-button">
                            Edit
                        </button>
                        <button
                            onClick={() => onDeleteExpense(expense.id)}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExpenseList;
