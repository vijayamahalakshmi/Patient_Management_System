# Patient Management System

A full-stack web application for managing patient records with a modern React frontend and Node.js/Express backend.

## Application Overview

The Patient Management System is a comprehensive solution for healthcare providers to manage patient information efficiently.

### Key Features

- **Patient Management**: Add, view, edit, and delete patient records
- **Data Validation**: Real-time form validation for email and required fields
- **Pagination**: Efficient browsing of patient records with pagination support
- **RESTful API**: Well-structured backend API for all patient operations

## Project Structure

The project is organized into two main directories:

### Backend

```
backend/
├── models/          # Database models
│   └── Patient.js   # Patient model definition
├── .env.example     # Example environment variables
├── index.js         # Main server file with API endpoints
├── package.json     # Backend dependencies
└── sequelize.js     # Database connection configuration
```

### Frontend

```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # React components
│   │   ├── PatientEdit.jsx   # Edit patient component
│   │   ├── PatientForm.jsx   # Add patient component
│   │   └── PatientList.jsx   # List patients component
│   ├── services/
│   │   └── api.js   # API service for backend communication
│   ├── styles/
│   │   └── styles.css  # Application styles
│   ├── App.js       # Main application component
│   └── index.js     # Application entry point
└── package.json     # Frontend dependencies
```

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example`:
   ```
   cp .env.example .env
   ```

4. Configure your `.env` file with your MySQL database credentials:
   ```
   DB_HOST=127.0.0.1
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=patient_management_db
   PORT=3000
   ```

5. Start the backend server:
   ```
   npm start
   ```

   The server will run on http://localhost:3000 by default.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

   The application will open in your browser at http://localhost:3001.



## API Endpoints

The backend provides the following RESTful API endpoints:

- `GET /patients`: Get a list of patients with pagination
  - Query parameters: `limit`, `offset`, `order`
- `GET /patients/:id`: Get a specific patient by ID
- `POST /patients`: Create a new patient
- `PUT /patients/:id`: Update an existing patient
- `DELETE /patients/:id`: Delete a patient

## Database Schema

The application uses a MySQL database with a `patient` table that has the following structure:

- `id`: Auto-incremented primary key
- `firstname`: Patient's first name
- `lastname`: Patient's last name
- `email`: Patient's email address (unique)
- `address`: Patient's address
- `createdAt`: Timestamp of record creation
- `updatedAt`: Timestamp of last update




