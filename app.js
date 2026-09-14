const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let expenses = [];

app.get('/', (req, res) => {

    const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    
    res.render('index', { 
        expenses: expenses, 
        total: total.toFixed(2) 
    });
});


app.post('/add-expense', (req, res) => {
    const { title, amount, category, date } = req.body;
    
    const newExpense = {
        id: Date.now(), 
        title,
        amount: parseFloat(amount),
        category,
        date
    };
    
    expenses.push(newExpense);
    res.redirect('/');
});

app.post('/delete-expense/:id', (req, res) => {
    const idToFind = parseInt(req.params.id);
    expenses = expenses.filter(item => item.id !== idToFind);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Expense Tracker running at http://localhost:${PORT}`);
});
