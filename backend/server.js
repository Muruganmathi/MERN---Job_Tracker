
require('dotenv').config({ path: './routes/.env' }); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const applicationRoutes = require('./routes/applications'); 

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 

app.use('/api/applications', applicationRoutes); 

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully!');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Access the backend at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error. Check MONGO_URI in .env:', error.message);
        process.exit(1); 
    });
