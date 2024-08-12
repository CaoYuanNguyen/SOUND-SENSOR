const mongoose = require("mongoose");

const soundSchema = mongoose.Schema({
    value: {
        type: String,
        require: [true,"Team?"],
    },
},{
    timestamps: true,
})

module.exports = mongoose.model("result", soundSchema);