const mongoose = require('mongoose');

const User = mongoose.model('User', {
    id: Number,
    name: String,
    email: String,
    password: String
});

const Expense = mongoose.model('Expense', {
    id: Number,
    user: User,
    description: String,
    amount: Number,
    date: Date
});

module.exports = User;

module.exports = Expense;