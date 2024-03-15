const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// create model passing in the collection name in the database on the atlas, and the schema as args
const User = mongoose.model('Course-User', userSchema);

module.exports = User;
