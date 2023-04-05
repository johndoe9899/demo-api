import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/connectDB.js";
import mongoose from "mongoose";
import userModel from "./models/userModel.js";
const app = express();

// configure dot env
dotenv.config();
const PORT = process.env.PORT;
const DATBASE_URL = process.env.DATBASE_URL;

// CORS Policy
// app.use(cors());

//Database connection
const connection = mongoose
  .connect(process.env.MONGO_CONNECTION_URL)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });


// Json parser
app.use(express.json());

// to accept url encoded data
app.use(express.urlencoded({ extended: false }));

// configuring routes
app.use("/api", userRoutes);

app.get('/',async (req,res) => {
const users = await userModel.find({}).exec()
res.send(users)
console.log(users);
})

app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
});
