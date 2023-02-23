# Contacts App

## About the Project

This application is a system that allows the management of a contact book.

This app allows users to:

- Register and Login in the app
- See all the contacts on the homepage
- Save, edit and delete a contact
- Each contact can be saved with several phones, emails and addresses

## Built with:

- Semantic HTML5 markup
- CSS custom properties
- React.js with TypeScript 
- MUI
- React Hook Form
- Nest.js with TypeScript
- PostgreSQL and Sequelize
- Passport 
- Docker

## Some concepts that I put into practice

- Context, providers and useContext hook
- useReducer hook
- Axios Configuration and Interceptors
- Routing with React Router v6
- Routes Protection
- Local Storage
- Database Migration
- Nest.js Guards
- Authentication with Passport and JWT
- Custom Validation Pipe in Nest.js
- Dockerize Full Stack App React.js, Nest.js, PostgreSQL 

## Prerequisites

- Yarn
- Git
- Docker and Docker Compose

## Installation

The app can only run using docker compose.

- Clone the repository: 

```
    git clone https://github.com/ndamokongsuh/contacts-app.git
```

- Move to the App folder:

```
    cd contacts-app
```

- Build the Docker images using Docker Compose:

```
    docker compose build
```

- Starts Docker containers using Docker Compose:

```
    docker compose up -d
```

- The client runs on port 4173

- The server runs on port 3000

## Author

- Eder Andres Pineda Jimenez.