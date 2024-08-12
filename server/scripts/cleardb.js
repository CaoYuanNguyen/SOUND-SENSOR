const mongoose = require('mongoose');
const soundModel = require('../soundModel');
const connectDb = require('../dbConnect');

const clearDataExceptLast = async () => {
    try{
        await connectDb()
        const lastDocument = await soundModel.findOne().sort({ _id: -1 }).exec();
        if(lastDocument){
            await soundModel.deleteMany({ _id: { $ne: lastDocument._id } });
            console.log('Cleared all data except the last document successfully');
        }else{
            console.log('No documents found in the collection');
        }
    }
    catch(error){
        console.error('Error clearing data:', error);
        process.exit(1);
    }
    finally {
        
        await mongoose.disconnect();
    }
}

clearDataExceptLast();