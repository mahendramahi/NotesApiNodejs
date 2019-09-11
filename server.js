const express = require('express');
const bodyParser = require('body-parser');

/// config mongoDB with project
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//create Express App
const app = express();

//parse request of Content type  application 
app.use(bodyParser.urlencoded({ extended: true }));

//parse request of Content type application/json
app.use(bodyParser.json());

//// Connecting to the database

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
})
.then(() =>{
    console.log("Successfully connected to the database");
})
.catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})
;


/// Define a simple route
app.get('/', (req, res) => {
    res.json({"message": "wellcome to EasyNotes Application."});
});

// Require Notes routes
require('./app/routes/note.routes.js')(app);

app.listen(3000, () => {
    console.log("Server is listning on post 3000.");
});