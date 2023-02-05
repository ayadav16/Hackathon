# Hackathon
### Start the application
```
npm run devStart
```

### Create key.js in config folder  with mongo connection string and  secret for bearer token authorization
```
module.exports = {
    mongoURI: "mongodb://host/db",
    secretOrKey:"********"
}
```

### Routes 
Public Routes
```
/
/login
/register
/cat
/logout

```

Authenticated Routes
```
/dashboard/student
/dashboard/instructor
/quiz
/api/auth
/api/users
/quiz/take
/quiz/new
/quiz/submitted
/quiz/submit/{id}
/quiz/id
/quiz/summary/{id}
```

### TO DO
* Enable Unit Testing
