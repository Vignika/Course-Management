const resolvers = {
    Query: {
      users: async (_, __, { db }) => {
        return await db.collection('users').find().toArray();
      },
    },
    Mutation: {
      addUser: async (_, { email, password }, { db }) => {
        try {
          const existingUser = await db.collection('users').findOne({ email });
          if (existingUser) {
            throw new Error('User already exists');
          }
          const result = await db.collection('users').insertOne({ email, password });
          return { id: result.insertedId.toString(), email, password };
        } catch (error) {
          console.error('Error adding user:', error);
          throw new Error('Failed to add user');
        }
      },
      loginUser: async (_, { email, password }, { db }) => {
        try {
          console.log('Received login request with:', { email, password });
      
          const user = await db.collection('users').findOne({ email });
          console.log('User fetched from database:', user);
      
          if (!user) {
            console.error('No user found with the provided email');
            throw new Error('Invalid credentials');
          }
      
          if (user.password !== password) {
            console.error('Password mismatch');
            throw new Error('Invalid credentials');
          }
      
          console.log('Login successful');
          return { id: user._id.toString(), email: user.email }; // Ensure correct ID format
        } catch (error) {
          console.error('Login error:', error.message);
          throw new Error('An error occurred during login');
        }
      },
      
    },
  };
  
  module.exports = resolvers;
  