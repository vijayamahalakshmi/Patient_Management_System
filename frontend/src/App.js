import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import PatientEdit from './components/PatientEdit';
import './styles/styles.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="main-header">
          <div className="header-content">
            <h1 className="app-title">Patient Management System</h1>
            <nav className="main-nav">
              <Link to="/" className="nav-link">Patient List</Link>
              <Link to="/add" className="nav-link">Add Patient</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/add" element={<PatientForm />} />
          <Route path="/edit/:id" element={<PatientEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
