const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Local "database" array
let expenses = [];

// Main Route - Read & Calculate
app.get('/', (req, res) => {
    // Calculate total expenses dynamically using reduce
    const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    
    res.render('index', { 
        expenses: expenses, 
        total: total.toFixed(2) 
    });
});

// Add Expense Route - Create
app.post('/add-expense', (req, res) => {
    const { title, amount, category, date } = req.body;
    
    const newExpense = {
        id: Date.now(), // Simple unique ID
        title,
        amount: parseFloat(amount),
        category,
        date
    };
    
    expenses.push(newExpense);
    res.redirect('/');
});

// Delete Expense Route - Delete
app.post('/delete-expense/:id', (req, res) => {
    const idToFind = parseInt(req.params.id);
    expenses = expenses.filter(item => item.id !== idToFind);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Expense Tracker running at http://localhost:${PORT}`);
});
