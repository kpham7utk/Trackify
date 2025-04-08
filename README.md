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
