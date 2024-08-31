import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './FacultyDashboard.css';

// GraphQL queries and mutations
const GET_COURSES = gql`
  query GetCourses {
    courses {
      _id
      title
      description
      students {
        _id
        email
      }
    }
  }
`;

const ADD_COURSE = gql`
  mutation AddCourse($title: String!, $description: String!) {
    addCourse(title: $title, description: $description) {
      _id
      title
      description
    }
  }
`;

const EDIT_COURSE = gql`
  mutation EditCourse($_id: ID!, $title: String!, $description: String!) {
    editCourse(_id: $_id, title: $title, description: $description) {
      _id
      title
      description
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($_id: ID!) {
    deleteCourse(_id: $_id)
  }
`;

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingCourseId, setEditingCourseId] = useState(null);

  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_COURSES);

  const [addCourse] = useMutation(ADD_COURSE, { onCompleted: () => refetch() });
  const [editCourse] = useMutation(EDIT_COURSE, { onCompleted: () => refetch() });
  const [deleteCourse] = useMutation(DELETE_COURSE, { onCompleted: () => refetch() });

  const handleLogout = () => {
    // Clear authentication tokens or session data here
    navigate('/login');
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await addCourse({ variables: { title, description } });
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error adding course:', err.message);
    }
  };

  const handleEditCourse = async (e) => {
    e.preventDefault();
    try {
      await editCourse({ variables: { _id: editingCourseId, title, description } });
      setTitle('');
      setDescription('');
      setEditingCourseId(null);
    } catch (err) {
      console.error('Error editing course:', err.message);
    }
  };

  const handleEditClick = (course) => {
    setEditingCourseId(course._id);
    setTitle(course.title);
    setDescription(course.description);
  };

  const handleDeleteClick = async (courseId) => {
    try {
      await deleteCourse({ variables: { _id: courseId } });
    } catch (err) {
      console.error('Error deleting course:', err.message);
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error fetching courses: {error.message}</p>;

  const courses = data?.courses || [];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Faculty</h1>
        <button className="logout-btn" onClick={handleLogout} title="Logout">🔓</button>
      </header>
      <div className="dashboard-body">
        <nav className="sidebar">
          <ul>
            <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
            <li onClick={() => setActiveTab('manageCourses')}>Manage Courses</li>
            <li onClick={() => setActiveTab('enrolledStudents')}>View All Course Enrolled Students</li>
          </ul>
        </nav>
        <main className="content">
          {activeTab === 'dashboard' && (
            <div className="dashboard">
              <h2>Welcome to Faculty Dashboard</h2>
              <div className="image-scrollbar">
                <div className="image-container">
                  <img src="https://images.creativemarket.com/0.1.0/ps/4196557/1820/1214/m1/fpnw/wm0/preview_main-.jpg?1522151788&s=6b2116c4476433151ff44f8eca0d4c58" alt="Image 1" />
                  <img src="https://th.bing.com/th/id/OIP.NCdWR6yOWsW7-IkPdAfmBAHaE8?w=666&h=444&rs=1&pid=ImgDetMain" alt="Image 2" />
                  <img src="https://techbooky.com/wp-content/uploads/2021/06/big-data1.jpg" alt="Image 3" />
                  <img src="https://th.bing.com/th/id/OIP.P9mQ9ZyIiMr-XhKb9Xo74QHaFO?w=640&h=451&rs=1&pid=ImgDetMain" alt="Image 4" />
                </div>
              </div>
            </div>
          )}
          {activeTab === 'manageCourses' && (
            <div className="course-management">
              <h2>Manage Courses</h2>
              <form onSubmit={editingCourseId ? handleEditCourse : handleAddCourse}>
                <input
                  type="text"
                  placeholder="Course Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
                <button type="submit">
                  {editingCourseId ? 'Update' : 'Add'} Course
                </button>
              </form>
              <div className="course-list">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <div className="course-item" key={course._id}>
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <div className="course-actions">
                        <button onClick={() => handleEditClick(course)}>Update</button>
                        <button onClick={() => handleDeleteClick(course._id)}>Delete</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No courses available</p>
                )}
              </div>
            </div>
          )}
          {activeTab === 'enrolledStudents' && (
            <div className="enrolled-students">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div key={course._id} className="course-item">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    {course.students?.length > 0 ? (
                      <ul>
                        {course.students.map((student) => (
                          <li key={student._id}>{student.email}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No students enrolled in this course.</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No courses available.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FacultyDashboard;
