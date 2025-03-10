import { useState, useContext } from "react";
import { Button, Form , FloatingLabel} from "react-bootstrap";
import ExpenseList from "../Expense/ExpenseList";


import  AuthContext  from "../../store/auth-context"; // Assuming AuthContext manages authentication
import Home from "../Home/Home";

const AddExpense = () => {
    const { isLoggedIn } = useContext(AuthContext); // Check if the user is logged in
    const [moneySpent, setMoneySpent] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Food"); // Default category
    const [expenses, setExpenses] = useState([]);

    const addExpenseHandler = (e) => {
        e.preventDefault();
        const newExpense = { moneySpent, description, category };
        setExpenses([...expenses, newExpense]); // Add to local state
        setMoneySpent("");
        setDescription("");
        setCategory("Food");
    };

    if (!isLoggedIn) {
        return <h3 className="text-center mt-5">Please log in to add expenses.</h3>;
    }

    return (
        <>
        <Home/>
        <div className="d-flex flex-column align-items-center vh-100 bg-light p-4">
            <div className="card p-4 shadow" style={{ width: "350px" }}>
                <h2 className="text-center">Add Expense</h2>
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
                            <Form.Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >   <option value="Select">Select   </option>
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

                    <Button type="submit" variant="warning" className="w-100 shadow-sm" >
                        Add Expense
                    </Button>
                </Form>
            </div>
            {expenses.length > 0 && <ExpenseList expenses={expenses} />}
        </div>
        </>
    );
};

export default AddExpense;
