const resolvers = {
    Query: {
      users: async (_, __, { db }) => {
        return await db.collection('users').find().toArray();
      },
    },
    Mutation: {
      addUser: async (_, { email, password, role }, { db }) => {
        try {
          const existingUser = await db.collection('users').findOne({ email });
          if (existingUser) {
            throw new Error('User already exists');
          }
          const result = await db.collection('users').insertOne({ email, password, role });
          return { id: result.insertedId.toString(), email, role }; // Include role in return
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
            throw new Error('Invalid credentials');
          }
          
          if (user.password !== password) {
            throw new Error('Invalid credentials');
          }
          
          return { id: user._id.toString(), email: user.email, role: user.role }; // Include role in return
        } catch (error) {
          console.error('Login error:', error.message);
          throw new Error('An error occurred during login');
        }
      },
    },
  };
  
  module.exports = resolvers;
  