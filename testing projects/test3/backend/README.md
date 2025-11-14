# College Educational Platform - Backend API
    
    This is the backend for the College Educational Platform, built with Node.js, Express, TypeScript, and MongoDB.
    
    ## Features
    
    -   **Authentication**: JWT-based authentication (Access &amp; Refresh Tokens) for secure access.
    -   **Role-Based Access Control**: Differentiated permissions for Students, Faculty, and Admins.
    -   **User Management**: Student and Faculty profile creation and management.
    -   **Course Management**: CRUD operations for courses.
    -   **Enrollment System**: Students can enroll in courses, and faculty can manage rosters and grades.
    -   **Layered Architecture**: Clear separation of concerns between routes, controllers, services, and models.
    -   **Type-Safe**: Fully implemented in TypeScript for robust and maintainable code.
    
    ## Setup and Installation
    
    1.  **Clone the repository**:
        ```bash
        # Git is not available in this environment, but this would be the command.
        ```
    
    2.  **Install dependencies**:
        ```bash
        npm install
        ```
    
    3.  **Set up environment variables**:
        Create a `.env` file in the root directory by copying the `.env.example` file:
        ```bash
        cp .env.example .env
        ```
        Update the `.env` file with your database connection string and JWT secrets.
    
    4.  **Run the development server**:
        ```bash
        npm run dev
        ```
        The server will start on the port specified in your `.env` file (default: 5000).
    
    ## API Endpoints
    
    All endpoints are prefixed with `/api/v1`.
    
    ### Authentication (`/auth`)
    
    -   `POST /register`: Register a new user (Student or Faculty).
    -   `POST /login`: Log in to receive JWT tokens.
    
    ### Users (`/users`) - Protected
    
    -   `GET /me`: Get the profile of the currently authenticated user.
    -   `PUT /me`: Update the profile of the currently authenticated user.
    
    ### Courses (`/courses`)
    
    -   `GET /`: List all active courses (Public).
    -   `GET /:courseId`: Get details for a specific course (Public).
    -   `POST /`: Create a new course (Protected: Faculty/Admin).
    -   `POST /:courseId/enroll`: Enroll in a course (Protected: Student).
    -   `GET /:courseId/roster`: Get the student roster for a course (Protected: Instructor/Admin).
    -   `PATCH /:courseId/grade/:studentId`: Update a student's grade for a course (Protected: Instructor).