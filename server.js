require('dotenv').config();
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;


const submissionsRoute = require('./routes/submission.js');

const allowedOrigins = [
  'http://localhost:3000', // Development URL
  'https://www.uwecho.site', // Production URL
  'http://www.uwecho.site',
  'www.uwecho.site',
  'uwecho.site',
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin, like mobile apps or curl requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      // Origin is allowed
      callback(null, true);
    } else {
      // Origin is not allowed
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // for cookies, authorization headers with HTTPS
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json());

// routes
app.use('/api/submissions', submissionsRoute);

// connect to mongo
const connectToDB = async () => {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(process.env.MONGO_URL);
      console.log("connected to database pog 🚀")
    } catch (err) {
      console.error(err.message);
      // process fail
      process.exit(1);
    }
  }

app.listen(port, () => {
    connectToDB()
    console.log(`sprinting on port ${port}... 🏃💨 `)
});
