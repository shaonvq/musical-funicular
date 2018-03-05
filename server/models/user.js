let mongoose = require('mongoose');

let user = mongoose.model('user',{
    email:{
        type: String,
        require: true,
        minlength: 1,
        trim: true
    }
});

module.exports = {user};
