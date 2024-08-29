import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      title
      description
    }
  }
`;

const StudentDashboard = () => {
  const { loading, error, data } = useQuery(GET_COURSES);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error loading courses: {error.message}</p>;

  return (
    <div>
      <h2>Student Dashboard</h2>
      <h3>Available Courses</h3>
      <ul>
        {data.courses.map((course) => (
          <li key={course.id}>
            <h4>{course.title}</h4>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
