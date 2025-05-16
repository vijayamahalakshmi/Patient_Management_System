import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/styles.css';

function PatientForm() {
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', address: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    
    if (touched.email) {
      if (!form.email) {
        setErrors(prev => ({ ...prev, email: 'Email is required' }));
      } else if (!validateEmail(form.email)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors(prev => ({ ...prev, email: null }));
      }
    }
  }, [form.email, touched.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstname || !form.lastname || !form.email || !form.address) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    api.post('/patients', form)
      .then(() => {
        alert('Patient added successfully');
        setForm({ firstname: '', lastname: '', email: '', address: '' }); 
      })
      .catch(err => {
        if (err.response?.data?.error) {
          alert(err.response.data.error);
        } else {
          alert('Something went wrong. Please try again.');
          console.error(err);
        }
      });
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2>Add New Patient</h2>
      <input 
        name="firstname" 
        value={form.firstname} 
        onChange={handleChange} 
        onBlur={handleBlur}
        placeholder="First Name" 
        required 
      />
      
      <input 
        name="lastname" 
        value={form.lastname} 
        onChange={handleChange} 
        onBlur={handleBlur}
        placeholder="Last Name" 
        required 
      />
      
      <div className="form-field">
        <input 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          onBlur={handleBlur}
          placeholder="Email" 
          className={errors.email && touched.email ? "input-error" : ""}
          required 
        />
        {errors.email && touched.email && (
          <div className="error-message">{errors.email}</div>
        )}
      </div>
      
      <input 
        name="address" 
        value={form.address} 
        onChange={handleChange} 
        onBlur={handleBlur}
        placeholder="Address" 
        required 
      />
      
      <button type="submit">Add Patient</button>
    </form>
  );
}

export default PatientForm;
