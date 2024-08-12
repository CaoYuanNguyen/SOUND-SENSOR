const mongoose = require("mongoose");

const connectDb = async () => {
    try{
        const connect = await mongoose.connect("mongodb+srv://nguyen:nguyen2807@soundsensor.araav.mongodb.net/?retryWrites=true&w=majority&appName=soundsensor");
        console.log("Database connected: ", connect.connection.host, connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;