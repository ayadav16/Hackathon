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
<img width="1257" alt="Screenshot 2023-02-05 at 11 34 43 AM" src="https://user-images.githubusercontent.com/113153292/216832101-55b5a1e5-12da-4a3d-82ec-97a4abf04b85.png">

![Uploading Screenshot 2023-02-05 at 11.34.43 AM.png…]()
