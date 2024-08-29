const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum Role {
    STUDENT
    FACULTY
  }

  type User {
    _id: ID!
    email: String!
    role: Role!
  }

  type Course {
    _id: ID!
    title: String!
    description: String!
  }

  type Query {
    users: [User]
    courses: [Course]
  }

  type Mutation {
    addUser(email: String!, password: String!, role: Role!): User
    loginUser(email: String!, password: String!): User
    addCourse(title: String!, description: String!): Course
    deleteCourse(_id: ID!): Boolean
    editCourse(_id: ID!, title: String!, description: String!): Course
  }
`;

module.exports = typeDefs;
