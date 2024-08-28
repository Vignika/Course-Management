import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

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
  const [addCourse] = useMutation(ADD_COURSE);

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
    </div>
  );
};

export default FacultyDashboard;
