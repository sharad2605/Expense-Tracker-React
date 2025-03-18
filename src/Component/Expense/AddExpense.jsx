import { useState, useEffect, useContext } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import ExpenseList from "../Expense/ExpenseList";
import AuthContext from "../../store/auth-context";
// import Home from "../Home/Home";
import { useDispatch, useSelector } from 'react-redux';
import { expensesActions } from "../../store/expenseSlice";

const AddExpense = () => {
    const dispatch=useDispatch();
    const expenseItem = useSelector((state) => state.expense.expenses);
    
    const isPremiumActive = useSelector((state) => state.premium.isPremiumActive);
    
    const [moneySpent, setMoneySpent] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Select");
    const [expenses, setExpenses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editExpenseId, setEditExpenseId] = useState(null);
    const [editingExpense, setEditingExpense] = useState(null);

    const handleAddExpenseClick = () => {
        setShowForm(!showForm);
    };

    // 🔥 Fetch expenses from Firebase on component mount
    useEffect(() => {

       

        const fetchExpenses = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_FIREBASE_EXPENSE_KEY}/expenses.json`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch expenses!");
                }

                const data = await response.json();
                const loadedExpenses = [];

                for (const key in data) {
                    loadedExpenses.push({ id: key, ...data[key] });
                }

                dispatch(expensesActions.setExpenses(loadedExpenses));
                console.log("Expenses fetched:", loadedExpenses); 
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchExpenses();
    }, [dispatch]);

    // 🔥 Add new expense
    const addExpenseHandler = async (e) => {
        e.preventDefault();
        
        const newExpense = { moneySpent, description, category };
    
        try {
            let response;
            if (editingExpense) {
                // 🔥 Agar `editingExpense` null nahi hai, iska matlab update karna hai
                response = await fetch(
                    `${import.meta.env.VITE_FIREBASE_EXPENSE_KEY}/expenses/${editingExpense.id}.json`,
                    {
                        method: "PUT",
                        body: JSON.stringify(newExpense),
                        headers: { "Content-Type": "application/json" },
                    }
                );
    
                if (!response.ok) {
                    throw new Error("Failed to update expense!");
                }
    
                // ✅ Existing expense ko update kar do
                dispatch(expensesActions.updateExpense({ id: editingExpense.id, ...newExpense }));
            } else {
                // 🔥 Agar `editingExpense` null hai, toh naya expense add karna hai
                response = await fetch(
                    `${import.meta.env.VITE_FIREBASE_EXPENSE_KEY}/expenses.json`,
                    {
                        method: "POST",
                        body: JSON.stringify(newExpense),
                        headers: { "Content-Type": "application/json" },
                    }
                );
    
                const data = await response.json();
                dispatch(expensesActions.addExpense({ id: data.name, ...newExpense }));
            }
    
            // ✅ Form reset kar do
            setMoneySpent("");
            setDescription("");
            setCategory("Select");
            setEditingExpense(null); // ✅ Edit mode hata do
            setShowForm(false); // ✅ Form close kar do
    
            alert(editingExpense ? "Expense updated!" : "Expense added!");
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    const editExpenseHandler = (expense) => {
        console.log(`Edit expense with ID: ${expense}`);
        
    
        // ✅ Input fields ko prefill karo
        setMoneySpent(expense.moneySpent);
        setDescription(expense.description);
        setCategory(expense.category);
    
        // ✅ Edit mode enable karo
        setEditingExpense(expense);
    
        // ✅ Form open karo
        setShowForm(true);
    };
    
    const deleteExpenseHandler = async (expenseId) => {
        console.log("🗑️ Deleting Expense ID:", expenseId); 
        const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
        if (!confirmDelete) return;
    
        try {
            const response = await fetch(
                `${import.meta.env.VITE_FIREBASE_EXPENSE_KEY}/expenses/${expenseId}.json`,
                {
                    method: "DELETE",
                }
            );
    
            if (!response.ok) {
                throw new Error("Failed to delete expense!");
            }

            console.log("✅ Expense deleted successfully from Firebase");
    
            // ✅ Delete hone ke baad state update karo
            dispatch(expensesActions.deleteExpense(expenseId));
    
            alert("Expense deleted successfully!");
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };
    

    // if (!isLoggedIn) {
    //     return <h3 className="text-center mt-5">Please log in to add expenses.</h3>;
    // }

    return (
        <>
            {/* <Home /> */}
            <div className="d-flex flex-column align-items-center vh-100 bg-light p-4">
                <div className="card p-4 shadow" style={{ width: "350px" }}>
                    {/* <h2 className="text-center">Add Expense</h2> */}
                    {showForm && (
                        
                 
                    <Form onSubmit={addExpenseHandler}>
                        <Form.Group className="mb-3">
                            <FloatingLabel controlId="floatingMoneySpent" label="Money Spent">
                                <Form.Control
                                    type="number"
                                    value={moneySpent}
                                    onChange={(e) => setMoneySpent(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <FloatingLabel controlId="floatingDescription" label="Description">
                                <Form.Control
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <FloatingLabel controlId="floatingCategory" label="Category">
                                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
                                    <option value="Select">Select</option>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Medical">Medical</option>
                                    <option value="Other">Other</option>
                                    <option value="Entertainment">Entertainment</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>

                        <Button type="submit" variant="warning" className="w-100 shadow-sm">
                        {editingExpense ? "Update Expense" : "Add Expense"}
                        </Button>
                    </Form>
                    )}
                    <Button
    variant="warning"
    onClick={handleAddExpenseClick}
    className="rounded shadow-sm mt-3"
>
    {showForm ? "Cancel" : "Add New Expense"}
</Button>
                </div>

                <ExpenseList expenses={expenseItem} onEditExpense={editExpenseHandler} onDeleteExpense={deleteExpenseHandler} />
            </div>
        </>
    );
};

export default AddExpense;


