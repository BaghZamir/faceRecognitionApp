# FaceRecognitionApp

A service that can log in existing users and register new ones.
Here users can use clarifai API to recognise faces on images they upload.


Go ahead, try it here https://baghzamir.github.io/faceRecognitionApp/

## Frontend

Frontend is created using [Create React App](https://github.com/facebook/create-react-app).

This communicates with a Node server that handles sign-ins, registering and Clarifai API.


Frontend files: https://github.com/BaghZamir/faceRecognitionApp

## Backend

Backend is powered by [express](https://www.npmjs.com/package/express).

The backend handles user registration, sign-ins and [Clarifai API](https://www.npmjs.com/package/clarifai).

The passwords are encrypted using [bcrypt](https://www.npmjs.com/package/bcrypt).

Database handling is done with [knex](https://www.npmjs.com/package/knex).


Backend files: https://github.com/BaghZamir/facerecognitionBackendServer
