# Trackify

Trackify is a task management application built as a full-stack project with a Spring Boot backend and a React frontend. It allows users to effectively track their tasks, set deadlines, and manage their productivity.

**Current Features:**

* Create, read, update, and delete tasks (CRUD operations).
* Clear and intuitive user interface.
* RESTful API for backend communication.

**Potential Future Features:**

* User authentication and authorization.
* Task prioritization and categories.
* Due date and reminder functionality.
* Collaboration features for shared task lists.

Trackify is an ongoing project aimed at providing a useful and well-architected solution for task management, while also serving as a learning platform for modern web development technologies.

## Getting Started

This project consists of a Spring Boot backend and a React frontend. To run the application locally, follow these steps:

### Prerequisites

* **Java Development Kit (JDK):** Make sure you have a JDK installed (version 17 or higher recommended).
* **Maven:** If you want to build the backend manually (though the Maven Wrapper is included), ensure Maven is installed.
* **Node.js and npm (or yarn):** Required for running the React frontend. You can download them from [https://nodejs.org/](https://nodejs.org/).

### Running the Backend

The backend is a Spring Boot application and includes the Maven Wrapper (`mvnw` for macOS/Linux, `mvnw.cmd` for Windows).

1.  **Navigate to the backend directory:**
  ```bash
  cd trackify-backend
  ```

2.  **Run the Spring Boot application using the Maven Wrapper:**
  ```bash
  ./mvnw spring-boot:run  # For macOS/Linux
  .\mvnw.cmd spring-boot:run  # For Windows
  ```
  This will start the backend server, usually on port `8080`.

  **Note for Windows users with spaces in their username:** You might need to apply the fix mentioned later in this README to ensure the Maven Wrapper runs correctly.

### Running the Frontend

The frontend is built using React and managed with npm (or yarn).

1.  **Navigate to the frontend directory:**
  ```bash
  cd trackify-frontend
  ```

2.  **Install dependencies:**
  ```bash
  npm install
  ```

3.  **Start the React development server:**
  ```bash
  npm start 
  ```
  This will usually start the frontend in your browser at `http://localhost:3000`.


## Potential Windows Setup Issue

Users on Windows with spaces in their user profile directory (e.g., `C:\Users\John Doe\...`) might encounter an error when running the Maven Wrapper (`./mvnw` or `.\mvnw.cmd`) that says "Cannot start maven from wrapper".

**Solution:**

Edit the `mvnw.cmd` file in the project root and modify the following line:

**Before:**
```batch
@IF NOT "%__MVNW_CMD__%"=="" (%__MVNW_CMD__% %*)
```

**After:**
```batch
@IF NOT "%__MVNW_CMD__%"=="" ("%__MVNW_CMD__%" %*)
```

## Testing Backend Endpoints with curl

Due to the default security configuration of Spring Boot Security, the backend endpoints are protected with basic authentication. To test them using `curl`, you will need to provide the generated username and password.

**1. Find the Generated Password:**

When your Spring Boot application starts, look for a line in the logs similar to this:

Using generated security password: <your_generated_password>


Copy the password shown in your logs. The default username is usually `user`.

**2. Use `curl` with Basic Authentication:**

To make requests to your backend endpoints, include the `-u` flag followed by the username and password in the format `username:password`.

**Examples:**

* **Testing the `/api/tasks/test` endpoint:**

```bash
  curl -v -u user:<your_generated_password> http://localhost:8080/api/tasks/test
```
Replace <your_generated_password> with the actual password from your logs.
