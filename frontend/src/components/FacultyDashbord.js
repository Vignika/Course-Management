import React, { useState } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';



const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      title
      description
    }
  }
`;


const ADD_COURSE = gql`
  mutation AddCourse($title: String!, $description: String!) {
    addCourse(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

const FacultyDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { loading, error, data } = useQuery(GET_COURSES);
  const [addCourse] = useMutation(ADD_COURSE,{

  refetchQueries: [{ query: GET_COURSES }],
});

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await addCourse({ variables: { title, description } });
      alert('Course added successfully');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add course', error);
      alert('Error adding course');
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error loading courses: {error.message}</p>;

  return (
    <div>
      <h2>Faculty Dashboard</h2>
      <form onSubmit={handleAddCourse}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <button type="submit">Add Course</button>
      </form>

      <h3>Courses</h3>
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

export default FacultyDashboard;