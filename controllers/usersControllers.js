// import User model from models
import User from "../models/User.js";
// import bcrypt to hash password
import bcrypt from "bcrypt";
// import jwt from jsonwebtoken
import jwt from "jsonwebtoken";

// ----- CREATE SIGNUP CONTROLLER ----- //
export const signUp = async (req, res) => {
  try {
    // decunstruct email and password to hash it out of req.body
    const { email, password } = req.body;
    // hash password so its encrypted - as arguments us password and times to salt it(10)
    const hashedPassword = await bcrypt.hash(password, 10);
    // check if works by console logging
    // console.log(hashedPassword);
    // create new user in databse
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    // create token for user by using sign method of jwt
    const token = jwt.sign(
      { email: newUser.email }, // payload
      process.env.JWT_SECRET, // secret
      { expiresIn: "1h" } // expiring options
    );
    // check token by console logging
    // console.log(token);
    if (token && newUser) {
      res
        .status(201)
        // add field "Authorisation" with value of token to header of response
        .set("Authorisation", token)
        .send("User successfully created");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ----- CREATE LOGIN CONTROLLER ----- //
export const logIn = async (req, res) => {
  try {
    // deconstruct email and password
    const { email, password } = req.body;
    // first find user than check if password is correct
    // find user with email by using findOne
    // select the password to compare the password what client sends with password of the database
    const findUser = await User.findOne({ email }).select("+password");
    // check if password is correct with bcrypt compare
    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    // check if password is correct by console logging
    console.log(isPasswordCorrect); // returns true or false
    // if true we create a token and send it back
    if (isPasswordCorrect) {
      const token = jwt.sign(
        { email: findUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .set("Authorisation", token)
        .send("User successfully logged in");
    } else {
      res.status(401).send("Unauthorised");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ----- CREATE GET USER INFO CONTROLLER ----- //
export const getUserInfo = async (req, res) => {
  try {
    // deconstruct email out of req.user (req.user is newly created in middleware)
    const { email } = req.user;
    const findUser = await User.findOne({ email });
    res.status(200).json(findUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ----- CREATE VERIFYSESSION CONTROLLER ----- //
// everytime the middleware verifySession is called everything is fine so we
// just sent back a 200
export const verifySession = (req, res) => {
  res.status(200).send("Token successfully verified");
};
