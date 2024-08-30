import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
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
  const [selectedMenu, setSelectedMenu] = useState('Manage Courses');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingCourseId, setEditingCourseId] = useState(null);

  const { data, loading, error, refetch } = useQuery(GET_COURSES);
  const [addCourse] = useMutation(ADD_COURSE, { onCompleted: () => refetch() });
  const [editCourse] = useMutation(EDIT_COURSE, { onCompleted: () => refetch() });
  const [deleteCourse] = useMutation(DELETE_COURSE, { onCompleted: () => refetch() });

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
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

  const courses = data && data.courses ? data.courses : [];

  return (
    <div className="faculty-dashboard">
      <div className="header">
        <h1>Faculty</h1>
      </div>

      <div className="main-content">
        <div className="sidebar">
          <div
            className={`sidebar-item ${selectedMenu === 'Dashboard' ? 'active' : ''}`}
            onClick={() => handleMenuClick('Dashboard')}
          >
            Dashboard
          </div>
          <div
            className={`sidebar-item ${selectedMenu === 'Manage Courses' ? 'active' : ''}`}
            onClick={() => handleMenuClick('Manage Courses')}
          >
            Manage Courses
          </div>
          <div
            className={`sidebar-item ${selectedMenu === 'View All Course Enrolled Students' ? 'active' : ''}`}
            onClick={() => handleMenuClick('View All Course Enrolled Students')}
          >
            View All Course Enrolled Students
          </div>
          <div
            className={`sidebar-item ${selectedMenu === 'Assignments' ? 'active' : ''}`}
            onClick={() => handleMenuClick('Assignments')}
          >
            Assignments
          </div>
        </div>

        <div className="content">
          {selectedMenu === 'Manage Courses' && (
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

          {selectedMenu === 'View All Course Enrolled Students' && (
            <div className="enrolled-students">
              <h2>Enrolled Students</h2>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div key={course._id} className="course-item">
                    <h3>{course.title}</h3>
                    <ul>
                      {course.students && course.students.length > 0 ? (
                        course.students.map((student) => (
                          <li key={student._id}>{student.email}</li>
                        ))
                      ) : (
                        <li>No students enrolled</li>
                      )}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No courses available</p>
              )}
            </div>
          )}

          {selectedMenu === 'Assignments' && (
            <div className="assignments">
              <h2>Scheduled Assignments</h2>
              {/* Placeholder for scheduled assignments */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
