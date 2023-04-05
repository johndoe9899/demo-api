import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  organisation: {
    type: String,
    required: true,
  },
  registrationNo: {
    type: Number,
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  branchCode: {
    type: String,
    required: true,
  },
  branchAddress: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
