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

### Screenshots
Home Page
<img width="1257" alt="Screenshot 2023-02-05 at 11 34 43 AM" src="https://user-images.githubusercontent.com/113153292/216832101-55b5a1e5-12da-4a3d-82ec-97a4abf04b85.png">

Login Page![WhatsApp Image 2023-02-05 at 11 42 59](https://user-images.githubusercontent.com/113153292/216832410-6b0a4535-fb41-44bc-a53c-6da753afbed5.jpeg)

![Uploading Screenshot 2023-02-05 at 11.34.43 AM.png…]()

Registration Page
![WhatsApp Image 2023-02-05 at 11 45 16](https://user-images.githubusercontent.com/113153292/216832501-010f55ae-2dd0-4e3b-8da0-c89e45d16ea6.jpeg)


All Quizzes opened by Instructor
![WhatsApp Image 2023-02-05 at 11 44 03](https://user-images.githubusercontent.com/113153292/216832515-dc990ff0-57ac-43e1-b2a8-bb49297b8deb.jpeg)

Onging Quiz
![WhatsApp Image 2023-02-05 at 11 47 20](https://user-images.githubusercontent.com/113153292/216832591-9480dacb-8bcf-40b3-928d-9bff9e9d567c.jpeg)

Submitted Quizes
![WhatsApp Image 2023-02-05 at 11 44 21](https://user-images.githubusercontent.com/113153292/216832534-5a996a33-081c-4332-bc1d-0f80880b6a00.jpeg)

Registering IP 
![WhatsApp Image 2023-02-05 at 11 44 41](https://user-images.githubusercontent.com/113153292/216832565-c35b3313-01e2-4f4b-8676-cd3b0e25a55f.jpeg)
