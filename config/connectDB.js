import mongoose from "mongoose";

const connectDB = async (DATBASE_URL) => {
  try {
    mongoose.connect('mongodb://localhost:27017/usersdb',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
    console.log("databse connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
