import { Button } from "react-bootstrap";
import "./ExpenseList.css";


const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense }) => {
    if (expenses.length === 0) {
        return <p>No expenses found.</p>;
    }
    
    const handleEditExpense = (expenseId) => {
        // Handle edit expense logic here
        console.log(`Edit expense with ID: ${expenseId}`);
    };

    const handleDeleteExpense = (expenseId) => {
        // Handle delete expense logic here
    };

    return (
        <div className="expense-list">
    {expenses.map((expense, index) => (
        <div key={index} className="expense-item">
            <div>
                <span className="expense-category">{expense.category}</span>
                <div className="expense-description">{expense.description}</div>
            </div>
            <span className="expense-amount">₹{expense.moneySpent}</span>
            <div>
            <button onClick={() => onEditExpense(expense.id)} className="edit-button">Edit</button>
            <button  onClick={() => onDeleteExpense(expense.id)} className="delete-button">Delete</button>
            </div>
        </div>
    ))}
</div>

    );
};

export default ExpenseList;
