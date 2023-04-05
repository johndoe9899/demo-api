import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class authController {
  static userRegistration = async (req, res) => {
    const {
      fullName,
      contact,
      email,
      password,
      organisation,
      registrationNo,
      branchName,
      branchCode,
      branchAddress,
    } = req.body;

    const user = await userModel.findOne({ email: email });

    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      if (
        fullName &&
        contact &&
        email &&
        password &&
        organisation &&
        registrationNo &&
        branchName &&
        branchCode &&
        branchAddress
      ) {
        try {
          const salt = await bcrypt.genSalt(12);
          const hashPassword = await bcrypt.hash(password, salt);
          const newUser = userModel({
            fullName,
            contact,
            email,
            password,
            organisation,
            registrationNo,
            branchName,
            branchCode,
            branchAddress,
            password: hashPassword,
          });
          await newUser.save();

          const saved_user = await userModel.findOne({ email: email });

          // Generate jwt token
          // const token = jwt.sign(
          //   { userID: saved_user._id },
          //   process.env.JWT_SECRET_KEY,
          //   { expiresIn: "5d" }
          // );

          res.status(201).send({
            status: "success",
            message: "User Saved successfully",
            // token: token,
          });
        } catch (error) {
          console.log(error);
          res.send({ status: "failed", message: "unable to register" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await userModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);

          if (user.email == email && isMatch) {
            // generate jwt token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.send({
              status: "Success",
              message: "Login success",
              token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "Email or Password does not match",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not registered user",
          });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to login" });
    }
  };

  static getUsers = async (req, res) => {
    // let users = userModel.find();
    res.send('hello');
  };
}

export default authController;
