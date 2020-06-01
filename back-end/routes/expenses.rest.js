const uuid = require('uuid');
let Expense = require('../db/schemas/Expense');
let User = require('../db/schemas/User');

module.exports = (app) => {

app.get('/expense/', (req, res) => {
  Expense.find()
    .then(expenses => res.json(expenses))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/expense/user', (req, res) => {
  let username = req.query.username;
  Expense.find({username})
    .then(expenses => res.json(expenses))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/expense/tx', (req, res) => {
  let txType = req.query.txType;
  Expense.find({txType})
    .then(expenses => res.json(expenses))
    .catch(err => res.status(400).json('Error: ' + err));
});


app.post('/expense/add', async (req, res) => {
  const _id = uuid.v4()
  const username = req.body.username;
  const description = req.body.description;
  const quantity = Number(req.body.quantity);
  const totalPrice = Number(req.body.totalPrice);
  const paymentMethod = req.body.paymentMethod;
  const txType = req.body.txType;
  const date = Date.parse(req.body.date);


  if ( !(await User.exists({username: username})) ){
    try{
      return res.status(400).json({status: 'Error: Invalid username. Enter a valid username or create a user'})
    }
    catch(err) {
      console.error(err);
    }
  }

  const newExpense = new Expense({
    _id,
    username,
    description,
    quantity,
    totalPrice,
    paymentMethod,
    txType,
    date,
  });

  if(!["CASH", "GOOGLEPAY", "PAYTM", "CARD"].includes(paymentMethod)){
    return Promise.reject(res.status(400).json({status: 'Error: Invalid Payment Method. Retry with a valid Payment Option'}));
  }

  if(!["credit", "debit"].includes(txType)){
      return Promise.reject(res.status(400).json({status: 'Error: Invalid transaction type. Can be either credit or debit'}));
  }
  newExpense.save()
  .then(() => res.json({status: 'expense added!'}))
  .catch(err => res.status(400).json({status: 'Error: ' + err}));
});

app.get('/expense/:id', (req, res) => {
  Expense.findById(req.params.id)
    .then(expense => res.json(expense))
    .catch(err => res.status(400).json({status: 'Error: ' + err}));
});

app.delete('/expense/:id', (req, res) => {
  Expense.findByIdAndDelete(req.params.id)
    .then(() => res.json('expense deleted.'))
    .catch(err => res.status(400).json({status: 'Error: ' + err}));
});

app.post('/expense/update/:id', (req, res) => {
  Expense.findById(req.params.id)
    .then(expense => {
      expense.username = req.body.username;
      expense.description = req.body.description;
      expense.quantity = Number(req.body.quantity);
      expense.totalPrice = Number(req.body.totalPrice);
      expense.paymentMethod = req.body.paymentMethod;
      expense.txType = req.body.txType;
      expense.date = Date.parse(req.body.date);

      expense.save()
        .then(() => res.json({status: 'expense updated!'}))
        .catch(err => res.status(400).json({status: 'Error: ' + err}));
    })
    .catch(err => res.status(400).json({status: 'Error: ' + err}));
});
}