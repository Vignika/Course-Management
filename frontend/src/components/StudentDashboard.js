import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import './StudentDashboard.css';

const GET_COURSES = gql`
  query GetCourses {
    courses {
      _id
      title
      description
    }
  }
`;

const ENROLL_IN_COURSE = gql`
  mutation EnrollInCourse($courseId: ID!, $userId: ID!) {
    enrollInCourse(courseId: $courseId, userId: $userId) {
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

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { loading, error, data } = useQuery(GET_COURSES);
  const [enrollInCourse] = useMutation(ENROLL_IN_COURSE);

  const handleEnroll = async (courseId) => {
    const userId = "66cec35a49de42e0f16f0a6c"; // Replace with actual logged-in user's ID
    try {
      const response = await enrollInCourse({ variables: { courseId, userId } });
      console.log('Enrollment response:', response);
      alert('Enrolled successfully!');
    } catch (err) {
      console.error('Error enrolling in course:', err);
      alert(`Failed to enroll in course: ${err.message || 'Unknown error'}`);
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error fetching courses: {error.message}</p>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Student</h1>
        <button className="logout-btn">Logout</button>
      </header>
      <div className="dashboard-body">
        <nav className="sidebar">
          <ul>
            <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
            <li onClick={() => setActiveTab('courses')}>My Courses</li>
            <li onClick={() => setActiveTab('structure')}>Course Structure</li>
            <li onClick={() => setActiveTab('assignments')}>Assignments</li>
          </ul>
        </nav>
        <main className="content">
          {activeTab === 'dashboard' && <p>Welcome to the Dashboard</p>}
          {activeTab === 'courses' && (
            <div className="courses">
              <h2>My Courses</h2>
              <div className="courses-grid">
                {data.courses.map(course => (
                  <div key={course._id} className="course-card">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <button className="enroll-btn" onClick={() => handleEnroll(course._id)}>
                      Enroll
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Add similar content for 'structure' and 'assignments' as needed */}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
