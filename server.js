require('dotenv').config();

const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

//middleware
app.use(cors());
app.use(bodyParser.json());

//DB Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

//API Router to handle Form Submit
app.post('/register', async (req, res) => {
    try {
        const {fname, lname, dob, age, address, mobile} = req.body;
        const query = `INSERT INTO users (first_name, last_name, dob, age, address, mobile) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [fname, lname, dob, age, address, mobile];

        const result = await pool.query(query, values);
        res.json({ success: true, message: "User registered successfully!", user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
});

//Run Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});