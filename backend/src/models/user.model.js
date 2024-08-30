const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['STUDENT', 'FACULTY'], required: true },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }] // Reference to Course
});

const User = mongoose.model('User', userSchema);

module.exports = User;
