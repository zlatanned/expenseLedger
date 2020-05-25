module.exports = (app) =>{
    const notes = require('../db/models/NotesModel.js');

app.get('/', (req, res) => {
    res.send("Welcome to Eazy-Peazy.")
});

app.post('/notes', notes.create);

}