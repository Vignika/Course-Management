import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
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

const GET_ENROLLED_COURSES = gql`
  query GetEnrolledCourses($userId: ID!) {
    user(id: $userId) {
      enrolledCourses {
        _id
        title
        description
      }
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
  const [searchQuery, setSearchQuery] = useState('');  // Search input state
  const userId = "66d19d1127a52132dfc64e77"; // Replace with actual logged-in user's ID
  const { loading, error, data } = useQuery(GET_COURSES);
  const { data: enrolledData, refetch: refetchEnrolled } = useQuery(GET_ENROLLED_COURSES, {
    variables: { userId },
  });
  const [enrollInCourse] = useMutation(ENROLL_IN_COURSE);
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleLogout = () => {
    // Clear any stored authentication tokens or user info here (if applicable)
    navigate('/login');  // Redirect to the login page
  };

  const handleEnroll = async (courseId) => {
    try {
      await enrollInCourse({ variables: { courseId, userId } });
      alert('Enrolled successfully!');
      refetchEnrolled(); // Refetch enrolled courses
    } catch (err) {
      console.error('Error enrolling in course:', err);
      alert(`Failed to enroll in course: ${err.message || 'Unknown error'}`);
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error fetching courses: {error.message}</p>;

  // Filter courses based on the search query
  const filteredCourses = data.courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Student</h1>
        <button className="logout-btn" onClick={handleLogout} title="Logout">🔓</button> {/* Logout Button */}
      </header>
      <div className="dashboard-body">
        <nav className="sidebar">
          <ul>
            <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
            <li onClick={() => setActiveTab('courses')}>All Courses</li>
            <li onClick={() => setActiveTab('enrolledCourses')}>Enrolled Courses</li>
            <li onClick={() => setActiveTab('courseStructure')}>Course Structure</li> {/* New Sidebar Link */}
          </ul>
        </nav>
        <main className="content">
        {activeTab === 'dashboard' && (
            <div className="dashboard">
              <h2>Welcome to Student Dashboard</h2>
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
          {activeTab === 'courses' && (
            <div className="courses">
              <h2>All Courses</h2>
              <input
                type="text"
                className="search-input"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="courses-grid">
                {filteredCourses.map(course => (
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
          {activeTab === 'enrolledCourses' && (
            <div className="enrolled-courses">
              <h2>My Enrolled Courses</h2>
              <div className="courses-grid">
                {enrolledData?.user?.enrolledCourses.map(course => (
                  <div key={course._id} className="course-card">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'courseStructure' && (  // New Tab Content
            <div className="course-structure">
              <h2>Course Structure</h2>
              <table className="course-structure-table">
                <thead>
                  <tr>
                    <th>Course name</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Emotional Intelligence & Reasoning Skills</td><td>1</td></tr>
                  <tr><td>IT Productivity Tools</td><td>1</td></tr>
                  <tr><td>Problem Solving and Programming in C</td><td>3</td></tr>
                  <tr><td>Basic Electrical and Electronics Engineering</td><td>4</td></tr>
                  <tr><td>Basic Electrical and Electronics Engineering lab</td><td>-</td></tr>
                  <tr><td>Communication Skills in English - Intermediate</td><td>2</td></tr>
                  <tr><td>Single Variable Calculus</td><td>2</td></tr>
                  <tr><td>Several Variable Calculus</td><td>2</td></tr>
                  <tr><td>Workshop</td><td>2</td></tr>
                  <tr><td>Physics</td><td>4</td></tr>
                  <tr><td>Physics Lab</td><td>-</td></tr>
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
