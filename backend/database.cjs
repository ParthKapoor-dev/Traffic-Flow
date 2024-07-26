const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const cors = require("cors");

app.use(cors());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });  

// Replace with your MongoDB URI
const uri = 'mongodb+srv://bansalrehan731:TESTtest123@g2cmern.cxyid8a.mongodb.net/Traffic?retryWrites=true&w=majority&appName=g2cmern';

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/fetch', async (req, res) => {
  try {
    const client = await mongoose.connection.db;
    const collection = client.collection("trafficdataColl");
    const data = await collection.find({}).toArray();
    console.log(data);
    res.json({status: true, res: data});
    console.log("sent data");
  } catch (error) {
    console.error(error);
    res.json({status: false, msg: "server error"});
  }
});