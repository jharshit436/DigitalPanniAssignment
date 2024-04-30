const mongoose = require('mongoose')

const connectDb = async function () {
    try {
        await mongoose.connect(process.env.MongoDB_URL);
        console.log(`Mongodb connected`)
    } catch (e) {
        console.log(e);
    }
}

module.exports=connectDb