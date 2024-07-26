const DateModel = require("../models/DateModel");
const mongoose = require('mongoose');

async function fetchData(req, res) {
    try {
        const client = mongoose.connection.db;
        const collection = client.collection("trafficdataColl");
        const data = await collection.find({}).toArray();

        res.json({
            status: true,
            res: data
        });
    } catch (error) {
        res.json({ status: false, msg: "server error" });
    }
}

async function fetchDateRecord(req, res) {
    const date = req.body.seldate;
    console.log('date is ', date);
    try {
        const newData = await DateModel.findOne({ date });
        console.log(newData);
        res.status(200).json({
            message: 'Date saved successfully',
            date: newData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}



module.exports = {
    fetchData,
    fetchDateRecord
}