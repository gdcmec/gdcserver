const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: {
    type: String,
    // required: true
  },

  photoUrl: {
    type: String,
    // required: true
  },

  position: {
    type: String,
    // required: true
  },
});

module.exports = Member = mongoose.model('member', MemberSchema);
