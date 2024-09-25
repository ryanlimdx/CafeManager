# Café Manager

## Overview
Café Manager is designed to help users manage cafés and their employees efficiently. It offers functionalities to add, edit, delete, and view both cafés and their associated employees.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setting Up Your Local Environment](#setting-up-your-local-environment)
- [API Endpoints](#api-endpoints)


## Features

### Café Management
- View a list of cafés, including their description, location, and the number of employees.
- Add a new café with details such as name, description, and location.
- Edit the details of an existing café.
- Delete a café from the system (with confirmation).

### Employee Management
- View a list of employees, including their name, phone number, email, gender, and assigned café.
- Filter employees by their assigned café.
- Add a new employee with details such as name, email, phone number, gender, and assigned café.
- Edit the details of an existing employee.
- Delete an employee from the system (with confirmation).
- Calendar input for assigning start dates for employees.

### Navigation
- Seamless navigation between the cafés and employees pages.
- Each café links to its associated employees for easy management.

## Technologies

- **Frontend**: React, Material-UI (MUI), TanStack React Router, React Query, AG-Grid
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB
- **API Communication**: RESTful APIs

## Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js** (version 14 or later) [Download Node.js](https://nodejs.org/en/download/prebuilt-installer)
- **MongoDB** (running locally or hosted via a service like MongoDB Atlas)

Optionally, the following tool is useful to facilitate testing of API endpoints:

- **Postman** (latest version): [Download Postman](https://www.postman.com/downloads/)

## Setting Up Your Local Environment


### Step 1: Clone the Repository:
```bash
git clone https://github.com/ryanlimdx/CafeManager.git
cd cafe-manager
```

### Step 2: Install Dependencies
Navigate to both frontend and backend folders and install the necessary dependencies:

```bash
cd frontend
npm install

cd ../backend
npm install
```

### Step 3: Environment Variables
Create a .env file in the backend folder with the following content:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
```

Feel free to make use of the .env.example file located in `backend`.

Make sure to whitelist the IP address you will be using in Mongo Atlas.

### Step 4: Run the application
Start the frontend and backend by running the following command in the main directory:

```bash
npm start
```

Alternatively, you may choose to launch each of them separately:

***Backend***: Start the backend server by running the following command in the backend directory:

```bash
npm start
```

***Frontend***: Start the frontend development server in the frontend directory:

```bash
npm start
```

### Step 5: Open the Application
Navigate to http://localhost:3000 in your web browser.


## API Endpoints
To test the API endpoints, you may use a tool like **Postman** and create requests to the following URL:
```
http://localhost:5000/api/path
```
Replace `/path` with actual endpoints (such as `/cafes` or `/employees`) to interact with the API through `GET`, `PUT`, `POST` and `DELETE` requests.

The following are available endpoints:

### Cafés API
- `GET /cafes` - Retrieve all cafés.
- `POST /cafes` - Add a new café.
- `PUT /cafes/:id` - Update an existing café.
- `DELETE /cafes/:id` - Delete a café.

### Employees API
- `GET /employees` - Retrieve all employees or filter by café.
- `POST /employees` - Add a new employee.
- `PUT /employees/:id` - Update an existing employee.

Sample data is located in the `backend` directory.