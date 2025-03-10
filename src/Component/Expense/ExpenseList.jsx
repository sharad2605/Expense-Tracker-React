import { ListGroup } from "react-bootstrap";
import "./ExpenseList.css";

const ExpenseList = ({ expenses }) => {
    return (
        <div className="expense-list">
    {expenses.map((expense, index) => (
        <div key={index} className="expense-item">
            <div>
                <span className="expense-category">{expense.category}</span>
                <div className="expense-description">{expense.description}</div>
            </div>
            <span className="expense-amount">₹{expense.moneySpent}</span>
        </div>
    ))}
</div>

    );
};

export default ExpenseList;
