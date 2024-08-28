import { gql } from '@apollo/client';

// Query to fetch all courses
export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      title
      description
    }
  }
`;

// Mutation to add a new course
export const ADD_COURSE = gql`
  mutation AddCourse($title: String!, $description: String!) {
    addCourse(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;
