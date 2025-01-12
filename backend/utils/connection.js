const mongoose = require("mongoose");
const connectToDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log("connection "+connect)
  } catch (Err) {
    console.log("Error " + Err);
  }
};
module.exports=connectToDb
