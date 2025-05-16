require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./sequelize'); 
const Patient = require('./models/Patient');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


sequelize.sync()
  .then(() => console.log(' Database synced with Sequelize'))
  .catch(err => {
    console.error('Database sync error:', err);
  
  });




// Create patient API
app.post('/patients', async (req, res) => {
  const { firstname, lastname, email, address } = req.body;

  if (!firstname || !lastname || !email || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const [result] = await sequelize.query(
      'SELECT COUNT(*) AS count FROM patient WHERE email = ?',
      { replacements: [email], type: sequelize.QueryTypes.SELECT }
    );

    if (result.count > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const now = new Date();
    const [insertResult] = await sequelize.query(
      'INSERT INTO patient (firstname, lastname, email, address, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      { replacements: [firstname, lastname, email, address, now, now] }
    );

    res.status(201).json({ id: insertResult, message: 'Patient created' });
  } catch (err) {
    console.error('Error creating patient:', err);
    res.status(500).json({ error: 'Database error' });
  }
});


// Get all patients API
app.get('/patients', async (req, res) => {
  let limit = parseInt(req.query.limit);
  let offset = parseInt(req.query.offset);
  let order = req.query.order ? req.query.order.toUpperCase() : 'ASC';

  if (isNaN(limit) || limit <= 0 || limit > 100) limit = 10;
  if (isNaN(offset) || offset < 0) offset = 0;
  if (order !== 'ASC' && order !== 'DESC') order = 'ASC';

  try {
    const [results] = await sequelize.query(
      `SELECT * FROM patient ORDER BY id ${order} LIMIT ? OFFSET ?`,
      { replacements: [limit, offset] }
    );
    res.json(results);
  } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get  patient By ID
app.get('/patients/:id', async (req, res) => {
  try {
    const [results] = await sequelize.query(
      'SELECT * FROM patient WHERE id = ?',
      { replacements: [req.params.id] }
    );

    if (!results.length) return res.status(404).json({ error: 'Patient not found' });
    res.json(results[0]);
  } catch (err) {
    console.error('Error fetching patient:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update patient By ID
app.put('/patients/:id', async (req, res) => {
  const { firstname, lastname, email, address } = req.body;

  if (!firstname || !lastname || !email || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const [existing] = await sequelize.query(
      'SELECT * FROM patient WHERE id = ?',
      { replacements: [req.params.id] }
    );

    if (!existing.length) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check for email conflict
    const [conflict] = await sequelize.query(
      'SELECT COUNT(*) AS count FROM patient WHERE email = ? AND id != ?',
      { replacements: [email, req.params.id] }
    );

    if (conflict[0].count > 0) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const now = new Date();
    await sequelize.query(
      'UPDATE patient SET firstname = ?, lastname = ?, email = ?, address = ?, updatedAt = ? WHERE id = ?',
      { replacements: [firstname, lastname, email, address, now, req.params.id] }
    );

    res.json({ message: 'Patient updated' });
  } catch (err) {
    console.error('Error updating patient:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete patient By ID
app.delete('/patients/:id', async (req, res) => {
  try {
    const [result] = await sequelize.query(
      'DELETE FROM patient WHERE id = ?',
      { replacements: [req.params.id] }
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted' });
  } catch (err) {
    console.error('Error deleting patient:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
