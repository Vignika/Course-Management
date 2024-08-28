const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(email: String!, password: String!): User
     loginUser(email: String!, password: String!): User
    
  }
`;

module.exports = typeDefs;
