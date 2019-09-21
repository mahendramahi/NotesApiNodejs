const User = require('../models/user.model.js');

//// Create and Save a new Note
exports.create = (req, res) => {
    // validate Request
    if(!req.body.firstName) {
        return res.status(400).send({
            message: "firstName Cannot be empty."
        });
    }
    if(!req.body.lastName) {
        return res.status(400).send({
            message: "lastName Cannot be empty."
        });
    }
    if(!req.body.city) {
        return res.status(400).send({
            message: "city Cannot be empty."
        });
    }

    //Create a new Note 
    const user = new User({
        profile: req.body.profile,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        city: req.body.city,
        centerName: req.body.centerName,
        centerSDate: req.body.centerSDate
    });

     // Save User in the database
     user.save()
     .then(data => {
         res.send(data);
     }).catch(err => { 
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
     });

};

// Retrieve and return all Users from the database.
exports.findAllUser = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users."
        });
    });
};

// Find a single User with a UserId
exports.findOneUser = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.userId
        });
    });
};

// Update a User identified by the userId in the request
exports.updateUser = (req, res) => {
   // Validate Request
   if(!req.body.firstName) {
    return res.status(400).send({
        message: "User firstName can not be empty"
    });
}
if(!req.body.lastName) {
    return res.status(400).send({
        message: "User lastName can not be empty"
    });
}

// Find note and update it with the request body
User.findByIdAndUpdate(req.params.userId, {
        profile: req.body.profile,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        city: req.body.city,
        centerName: req.body.centerName,
        centerSDate: req.body.centerSDate
}, {new: true})
.then(user => {
    if(!user) {
        return res.status(404).send({
            message: "User not found with id " + req.params.userId
        });
    }
    res.send(user);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "User not found with id " + req.params.userId
        });                
    }
    return res.status(500).send({
        message: "Error updating nouserte with id " + req.params.userId
    });
});
};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};