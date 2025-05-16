import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../services/api';
import '../styles/styles.css';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate(); 

  const fetchPatients = () => {
    const offset = (page - 1) * limit;
    api.get(`/patients?limit=${limit}&offset=${offset}&order=asc`)
      .then(res => {
        setPatients(res.data);
        setHasMore(res.data.length === limit);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPatients();
  }, [page]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      api.delete(`/patients/${id}`)
        .then(() => fetchPatients())
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="patient-list">
      <h2>Patient List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.firstname}</td>
              <td>{patient.lastname}</td>
              <td>{patient.email}</td>
              <td>{patient.address}</td>
              <td>
                <button onClick={() => handleEdit(patient.id)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(patient.id)} className="btn-delete">Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage(p => hasMore ? p + 1 : p)} disabled={!hasMore}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PatientList;
