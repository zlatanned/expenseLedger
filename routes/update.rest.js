module.exports = (app) => {
  const notes = require("../db/models/NotesModel.js");

  app.put("/notes/:noteId", notes.update);
}
