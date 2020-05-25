module.exports = (app) => {
    const notes = require("../db/models/NotesModel.js");
  
    app.delete('/notes/:noteId', notes.delete);
  };
  