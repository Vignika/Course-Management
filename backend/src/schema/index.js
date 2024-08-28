const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum Role {
    STUDENT
    FACULTY
  }

  type User {
    id: ID!
    email: String!
    password: String!
    role: Role!  # Ensure this field is non-nullable
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(email: String!, password: String!, role: Role!): User
    loginUser(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
