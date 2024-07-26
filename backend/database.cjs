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
    res.json({ status: true, res: data });
    console.log("sent data");
  } catch (error) {
    console.error(error);
    res.json({ status: false, msg: "server error" });
  }
});

const dateSchema = new mongoose.Schema(
  {
    departdate: {
      type: Date
    }
  }
)

const DateModel = mongoose.model("DepartDateColl", dateSchema);

app.get('/upload-date', async (req, res) => {
  const { date } = req.query;
  try {
      const newDate = new DateModel({ date });
      await newDate.save();
      res.status(200).json({ message: 'Date saved successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Failed to save date' });
  }
});