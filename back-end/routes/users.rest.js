let User = require('../db/schemas/User');
const uuid = require('uuid');

module.exports = (app) => {

app.get('/user/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json({status: 'Error: ' + err}));
});

app.post('/user/add', (req, res) => {
  const username = req.body.username;
  const _id = uuid.v4();

  const newUser = new User({_id, username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json({status: 'Error: ' + err}));
});
}