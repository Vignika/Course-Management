const User = require('../models/user.model');
const Course = require('../models/course.model');

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
    },
    courses: async () => {
      try {
        return await Course.find();
      } catch (error) {
        console.error('Error fetching courses:', error);
        throw new Error('Failed to fetch courses');
      }
    },
  },
  Mutation: {
    addUser: async (_, { email, password, role }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists');
        }
        const user = new User({ email, password, role });
        await user.save();
        return user;
      } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Failed to add user');
      }
    },
    loginUser: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
          throw new Error('Invalid credentials');
        }
        return user;
      } catch (error) {
        console.error('Login error:', error.message);
        throw new Error('An error occurred during login');
      }
    },
    addCourse: async (_, { title, description }) => {
      try {
        const course = new Course({ title, description });
        await course.save();
        return course;
      } catch (error) {
        console.error('Error adding course:', error);
        throw new Error('Failed to add course');
      }
    },
    deleteCourse: async (_, { _id }) => {
      try {
        const result = await Course.deleteOne({ _id });
        if (result.deletedCount === 0) {
          throw new Error('Course not found');
        }
        return true;
      } catch (error) {
        console.error('Error deleting course:', error);
        throw new Error('Failed to delete course');
      }
    },
    editCourse: async (_, { _id, title, description }) => {
      try {
        const course = await Course.findByIdAndUpdate(
          _id,
          { title, description },
          { new: true }
        );
        if (!course) {
          throw new Error('Course not found');
        }
        return course;
      } catch (error) {
        console.error('Error editing course:', error);
        throw new Error('Failed to edit course');
      }
    },
  },
};

module.exports = resolvers;
