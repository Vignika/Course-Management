COURSE  MANAGEMENT SYSTEM

OBJECTIVE
The objective is to develop a responsive web application for college course management, enabling faculty to manage courses and students to enroll efficiently, using modern technologies like React and Node.js.
PROJECT OVERVIEW
This project involves building a full-stack web application to manage college courses. The frontend is developed using React, offering a responsive and user-friendly interface. Data is handled through GraphQL, which ensures smooth communication between the frontend and backend.
The backend is powered by a Node.js RESTful API, with MongoDB used for storing data. Faculty members can add, update, and delete courses, while students can browse and enroll in available courses. User authentication is included to secure sensitive data and ensure only authorized actions are taken.
For testing, Playwright is used for automated testing to ensure the application functions correctly. The project is managed using Git for version control and Jira for tracking tasks and progress.
SYSTEM ARCHITECTURE:
Frontend:
- React: Handles the user interface, rendering components based on user interactions and state changes.
- GraphQL: Interfaces with the backend to fetch and manipulate data.
Backend:
- Node.js:Serves as the runtime environment for the server, handling API requests and responses.
- Express.js: Powers the RESTful API, providing endpoints for course management and user authentication.
- MongoDB: Stores all application data, including user credentials, course details, and enrollment information.
- GraphQL:Facilitates efficient data queries and mutations, enabling flexible and precise interactions between the frontend and backend.
Authentication:
- Session-based Authentication: Ensures secure user login and session management.
Testing:
- Playwright:Used for automated testing, ensuring the application functions correctly across different environments.
This architecture provides a robust, scalable, and user-friendly course management system, meeting the needs of both faculty and students in a college setting.
TECHNOLOGY STACK
Frontend:
              - React: A JavaScript library for building dynamic user interfaces.
               - CSS: Styling language for designing the application's layout and appearance.
                - GraphQL: Used for efficient data fetching and manipulation, providing   
                    flexible  interaction with the backend.
Backend:
              - Node.js:A JavaScript runtime for building server-side logic.
             - Express.js:A web application framework for Node.js, facilitating server creation   
               and routing.
            - MongoDB: A NoSQL database for storing data, including user information, 
               courses and enrollments.
            - GraphQL: Used for efficient data management and communication between the 
               frontend and backend.
Testing:
                - Playwright: A framework for automated testing to ensure the application's 
                  functionality across different environments.
Tools:
                 - Jira: Project management tool for tracking progress and managing tasks.
                 - Git: Version control system for managing code changes and collaboration.
                 







 USE CASE DIAGRAM
 
 ![Screenshot 2024-09-01 234527](https://github.com/user-attachments/assets/57ab4816-607d-41c4-82cf-6fb6eb040e3b)


Link to access : Use Case Model – FigJam (figma.com)


SCREENS STRUCTURE:

![Screenshot 2024-09-01 235030](https://github.com/user-attachments/assets/52cc7d2f-f05e-429f-bb61-10b17afe2249)


Link to access : Screens – Figma





Work Breakdown Structure (WBS) for Course Management System
Backend Development
          1. Setup Backend Environment
   - Install Node.js and required packages.
   - Configure MongoDB database.
   - Setup initial project structure.
2. Implement GraphQL API
   - Course Management
   - Develop GraphQL queries and mutations for adding, updating, deleting,    
      and retrieving courses.
   - Student Enrollment
             - Develop GraphQL queries and mutations for students to enroll in courses.
             - Implement logic to handle course enrollment limits.
3. GraphQL Integration
  - Set up a GraphQL server using Apollo Server or a similar library.
  - Define schemas and resolvers for all GraphQL queries and mutations to 
    manage course and enrollment operations efficiently.
4. Data Storage and Management
  - Design MongoDB schema for courses and student enrollments.
  - Implement data validation and error handling.

5. Testing Backend
   - Write automated tests for GraphQL queries and mutations using 
      Playwright.
 

Frontend Development
1. Setup Frontend Environment
  - Create React project.
  - Setup initial project structure.
2. User Interface Development
  - Course Management Interface
  - Design and implement UI for faculty to add, update, delete, and view 
    courses.
  - Enrollment Interface
  - Design and implement UI for students to browse and enroll in courses.
3. Integration with GraphQL
   - Setup GraphQL Client: Use Apollo Client or Relay for interacting with 
     the GraphQL server.
   - Implement GraphQL Queries and Mutations: Develop functions in 
     frontend components to perform CRUD operations for course 
    management and enrollment.
   - Handle API Responses: Manage data fetching and state updates based on 
     GraphQL responses to ensure a smooth user experience.
4. Styling and Responsiveness
   - Apply CSS styles to ensure a responsive and user-friendly interface.
   - Test interface on various devices.
5. Testing Frontend
  - Write automated tests for React components using Playwright.
Deployment
1. Web Application Deployment
   - Prepare the application for deployment.
   - Deploy the web application to a cloud platform (e.g., AWS, Vercel).
   - Configure environment variables and settings.
Version Control and Project Management
1. Version Control Setup
   - Create a Git repository for the project.
   - Follow best practices for commits, branching, and merging.
   - Maintain commit history, git graph, and documentation.
2. Project Management with Jira**
   - Create a Jira board to track project progress.
   - Manage user stories, tasks, and issues.
   - Illustrate work breakdown structure and track milestones.
Documentation
1. Technical Documentation
   - Document application architecture, GraphQL schemas and 
      resolvers, API endpoints, and setup instructions.
2. User Documentation
   - Create a user guide explaining how to use the application.
3. Testing Reports
   - Prepare reports of automated testing conducted using Playwright.









SCREENS:
Login Page:

![Screenshot 2024-09-02 002116](https://github.com/user-attachments/assets/c4596c84-a5d1-4179-9ab3-71b707949cf7)

SignUp Page:

![Screenshot 2024-09-02 002311](https://github.com/user-attachments/assets/89e5f812-36fa-468a-a95c-391b2804a1d8)



Faculty Dashboard:
Dashboard:
![Screenshot 2024-09-02 002548](https://github.com/user-attachments/assets/1ef1f135-3ef3-4643-b85b-c4c19cf62483)



Manage Courses:

![Screenshot 2024-09-02 002414](https://github.com/user-attachments/assets/fac875d9-4ee1-4054-a86d-2c28e7617b93)






All Course Enrolled Students:
![Screenshot 2024-09-02 002734](https://github.com/user-attachments/assets/73bb7743-5523-47b2-87d2-fbef90121e8e)

Student Dashboard:
Dashboard:


![Screenshot 2024-09-02 002907](https://github.com/user-attachments/assets/ad87cd8b-98c2-4807-b648-88db94bd3483)



All Courses:
![Screenshot 2024-09-02 002457](https://github.com/user-attachments/assets/a2a7a510-589b-4827-bc58-53f62b261b9d)


Enrolled Courses:

![Screenshot 2024-09-02 003010](https://github.com/user-attachments/assets/077d8141-c941-4823-bc66-1341e557d983)




Course Structure:

![Screenshot 2024-09-02 003044](https://github.com/user-attachments/assets/fd710341-dca0-4d4b-af6b-58c9c700fca6)


TEST CASES

![Screenshot 2024-09-01 125958](https://github.com/user-attachments/assets/450e1a27-52cb-4c41-9141-29fdfd83a4d8)

![Screenshot 2024-09-01 130419](https://github.com/user-attachments/assets/3cd83cad-443d-45bb-9017-007782ee176d)

![Screenshot 2024-09-01 130727](https://github.com/user-attachments/assets/0201ba73-8d69-4bfb-af2f-94faa1aae5cf)










CONCLUSION:
The Course Management System marks a major enhancement in academic administration, offering a streamlined and intuitive solution for managing courses and student enrollments. With its user-friendly interface and efficient backend integration using React, GraphQL, Node.js, and MongoDB, the system simplifies course management tasks for faculty and enrollment processes for students. Playwright ensures the system’s reliability through robust automated testing. This solution not only optimizes operational efficiency but also supports a dynamic educational environment. As we advance, our focus remains on delivering a flexible, scalable platform that meets the needs of educational institutions and adapts to future requirements.

REFERENCES :

Git-Hub Link:

https://github.com/Vignika/Course-Management.git



Jira Link:

https://vignikanathi10.atlassian.net/jira/software/projects/CM/boards/2/timeline?shared=&atlOrigin=eyJpIjoiYzI0ZWZlYjgyNDk3NGI2ZDljZjI0Y2Q3Mzg0ODkyMDgiLCJwIjoiaiJ9



  




