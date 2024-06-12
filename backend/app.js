const express = require('express');
const app = express();
const mongoose = require('mongoose')
const connectDB = require('./db/connect')
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const videoRoutes = require('./routes/video')
require('dotenv').config()
const port = 3000;

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/video', videoRoutes);
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });
// app.get('/', (req, res) => {
//     res.send('Hello, sunil!');
//   });

// console.log(process.env.MONGO_URL)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => { console.log(`Server running at http://localhost:${port}`);  })
    } catch (error) {
        console.log(error)
    }
}

start();

