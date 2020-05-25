const Note = require('../schemas/Note');

//Create a New Note
exports.create = (req, res) => {
    if (!req.body.content) {
        res.status(400).send("400 - Bad Request. Note's Content Field Cannot be empty")
    } else {
        let note = new Note({
            title: req.body.title || "Gum-Naam",
            content: req.body.content
        })

        //Save a note
        note.save()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(500).send({
                message: err.message || "Internal Server Error"
            }));
    }
};

//Retrieve All Notes
exports.findAll = (req, res) => {
    Note.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || "Notes Not Found"
            })
        })
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Oops.. Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
};

// Find By Id and Update
exports.update = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note's content field cannot be empty"
        });
    } else {
        // Find note and update it with the request body
        Note.findByIdAndUpdate(req.params.noteId, {
                title: req.body.title || "Untitled Note",
                content: req.body.content
            }, {
                new: true
            })
            .then(note => {
                if (!note) {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });
                }
                res.send(note);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });
                }
                return res.status(500).send({
                    message: "Error updating note with id " + req.params.noteId
                });
            });
    }
}

// Find note By Id And Delete particular note
exports.delete = (req, res) => {
    Note.findByIdAndDelete(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({
                message: "Note deleted successfully with Id : " + req.params.noteId
            });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
}