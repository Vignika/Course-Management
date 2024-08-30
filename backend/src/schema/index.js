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
    enrolledCourses: [Course]
  }

  type Course {
    _id: ID!
    title: String!
    description: String!
    students: [User]  
  }

  type Query {
    users: [User]
    user(id: ID!): User
    courses: [Course]
  }

  type Mutation {
    addUser(email: String!, password: String!, role: Role!): User
    loginUser(email: String!, password: String!): User
    addCourse(title: String!, description: String!): Course
    deleteCourse(_id: ID!): Boolean
    editCourse(_id: ID!, title: String!, description: String!): Course
    enrollInCourse(courseId: ID!, userId: ID!): Course 
}
`;

module.exports = typeDefs;
