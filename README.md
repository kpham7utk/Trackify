# Trackify
 Full stack web app that allows users to track tasks

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

Due to the default security configuration of Spring Boot Security, your backend endpoints are likely protected with basic authentication. To test them using `curl`, you will need to provide the generated username and password.

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
