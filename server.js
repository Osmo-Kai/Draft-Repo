const express = require('express');
const db = require('./db');
const path = require('path');
const cors = require('cors'); 
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-user', async (req, res) => {
    const { fname, lname } = req.body;

    const query = 'INSERT INTO users (first_name, last_name) VALUES ($1, $2) RETURNING *';
    const values = [fname, lname];

    try {
        const result = await db.query(query, values);
        res.status(201).json({
            message: 'User saved!',
            user: result.rows[0]
        });
    } catch (error) {
        console.error('Database Error:', error.stack);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.listen(port, () => console.log(`✅ Server running at http://localhost:${port}`));


