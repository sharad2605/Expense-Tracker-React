import { useSelector, useDispatch } from "react-redux";
import { expensesActions } from "../../store/expenseSlice";
import './ExpenseList.css';
import { darkModeActions } from '../../store/darkmodeSlice';
import { csvActions } from "../../store/csvSlice"; 

const ExpenseList = ({ onEditExpense, onDeleteExpense }) => {
    const dispatch = useDispatch();
    const isPremiumActive = useSelector((state) => state.expense.isPremiumActive);
    // ✅ Correct Redux state selection
    const expenses = useSelector((state) => state.expense.expenses);
    const totalAmount = useSelector((state) => state.expense.totalAmount);
    const isPremium = useSelector((state) => state.expense.isPremiumActive);
    const isPremiumActivated = useSelector((state) => state.darkMode.isPremiumActivated);

    console.log("Redux State:", { expenses, totalAmount, isPremium });

    if (!expenses || expenses.length === 0) {
        return <p>No expenses found.</p>;
    }

    const handleActivatePremium = () => {
        dispatch(darkModeActions.activatePremium());
        console.log("Premium Activated!");
      };

      const handleDownloadCSV = () => {
        console.log("Dispatching CSV Export...");
        // Dispatch the CSV export action with expenses data
        dispatch(csvActions.fileToCsv(expenses));
    };
      
    console.log("isPremiumActivated:", isPremiumActivated);
    return (
        <div className="expense-list" style={{color:"grey"}} >
            <h2>Total Expenses: ₹{totalAmount}</h2>

            {!isPremiumActivated && totalAmount >= 10000 && (
                <button className="premium-btn" onClick={handleActivatePremium}>
                    Activate Premium
                </button>
                
            )}

            {/* Add the "Download as CSV" button */}
            <button className="download-csv-btn" onClick={handleDownloadCSV}>
                Download Expenses as CSV
            </button>
           

            {expenses.map((expense) => (
                <div key={expense.id} className="expense-item">
                    <div>
                        <span className="expense-category">{expense.category}</span>
                        <div className="expense-description">{expense.description}</div>
                    </div>
                    {/* ✅ Fixed moneySpent issue */}
                    <span className="expense-amount">₹{expense.moneySpent}</span>
                    <div>
                        <button onClick={() => onEditExpense(expense)} className="edit-button">
                            Edit
                        </button>
                        <button onClick={() => onDeleteExpense(expense.id)} className="delete-button">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExpenseList;
