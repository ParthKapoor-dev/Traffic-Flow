const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
    departdate: {
        type: Date
    }
}, {
    versionKey: false
});

const DateModel = mongoose.model("DepartDateColl", dateSchema);
module.exports = DateModel;