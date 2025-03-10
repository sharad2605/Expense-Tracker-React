import { useState, useEffect, useContext } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import ExpenseList from "../Expense/ExpenseList";
import AuthContext from "../../store/auth-context";
import Home from "../Home/Home";

const AddExpense = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [moneySpent, setMoneySpent] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Select");
    const [expenses, setExpenses] = useState([]);

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

                setExpenses(loadedExpenses);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchExpenses();
    }, []);

    // 🔥 Add new expense
    const addExpenseHandler = async (e) => {
        e.preventDefault();
        console.log("Expense Added")
        const newExpense = { moneySpent, description, category };

        try {
            const response = await fetch(
                `${import.meta.env.VITE_FIREBASE_EXPENSE_KEY}/expenses.json`,
                {
                    method: "POST",
                    body: JSON.stringify(newExpense),
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Firebase Response:", data);

            // ✅ Update the state after successful API response
            setExpenses((prevExpenses) => [...prevExpenses, { id: data.name, ...newExpense }]);

            // ✅ Reset input fields (remove incorrect .current.value = '')
            setMoneySpent("");
            setDescription("");
            setCategory("Select");

            alert("Expense added successfully!");
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    if (!isLoggedIn) {
        return <h3 className="text-center mt-5">Please log in to add expenses.</h3>;
    }

    return (
        <>
            {/* <Home /> */}
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


