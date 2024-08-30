const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Reference to User
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
