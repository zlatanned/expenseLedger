module.exports = (app) => {
  const notes = require("../db/models/NotesModel.js");

  app.get('/notes', notes.findAll);

  app.get("/notes/:noteId", notes.findOne);
};
