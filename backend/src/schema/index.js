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

  type Course {
    id: ID!
    title: String!
    description: String!
  }

  type Query {
    users: [User]
    courses: [Course]  # Query to get all courses
  }

  type Mutation {
    addUser(email: String!, password: String!, role: Role!): User
    loginUser(email: String!, password: String!): User
    addCourse(title: String!, description: String!): Course  # Mutation to add a course
  }
`;

module.exports = typeDefs;
