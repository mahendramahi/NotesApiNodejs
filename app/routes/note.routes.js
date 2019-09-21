module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const users = require('../controllers/user.controller.js');

    //Create  a new Note 
    app.post('/note', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);

    // ======================== User function ===================== //
      //Create  a new user 
      app.post('/api/v1/user', users.create);

      // Retrieve all Users
      app.get('/api/v1/users', users.findAllUser);
  
      // Retrieve a single Note with noteId
      app.get('/api/v1/users/:userId', users.findOneUser);
  
      // Update a Note with noteId
      app.put('/api/v1/users/:userId', users.updateUser);
  
      // Delete a Note with noteId
      app.delete('/api/v1/users/:userId', users.delete);
}