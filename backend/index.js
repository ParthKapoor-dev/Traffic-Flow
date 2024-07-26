const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/index');
const cors = require("cors");
require('dotenv').config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded(true));

console.log(process.env.PORT);

app.listen(process.env.PORT || 5000, () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
  console.log(`Server running on port ${process.env.PORT}`);
});


app.use('/', router);