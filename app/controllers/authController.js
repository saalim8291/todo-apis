const usersModel = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtSecret, jwtExpire } = require("../config/keys");
const authService = require("../services/authService")

// const authController = {
//     signUp: async (req, res) => {

//         const { name, email, address, password } = req.body;

//         try {
//             const user = await usersModel.findOne({ email });
//             if (user) {
//                 return res.json({
//                     errorMessage: 'User already registered with this email'
//                 });
//             } else {

//                 const salt = await bcrypt.genSalt(10);
//                 const hashPassword = await bcrypt.hash(password, salt);

//                 const newUser = new usersModel({
//                     name: name,
//                     email: email,
//                     address: address,
//                     password: hashPassword
//                 })

//                 await newUser.save()
//                 res.json({ successMessage: "You are registered successfully, please login" })
//             }

//         } catch (error) {
//             console.error(error);
//             res.json({
//                 errorMessage: "Server error"
//             })
//         }

//     },

//     signIn: async (req, res) => {

//         const { email, password } = req.body;

//         try {
//             const user = await usersModel.findOne({ email })
//             if (!user) {
//                 return res.json({
//                     errorMessage: 'Invalid credentials'
//                 })

//             } else {
//                 const passwordMatch = await bcrypt.compare(password, user.password);
//                 // console.log(passwordMatch);

//                 if (!passwordMatch) {
//                     return res.json({
//                         errorMessage: "Invalid credentials",
//                     })

//                 } else {
//                     const payload = {
//                         user: {
//                             _id: user._id,
//                             email: user.email
//                         }
//                     };

//                     jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {

//                         if (err) console.error('jwt error:', err);

//                         res.json({
//                             token,
//                         })

//                     })

//                 }
//             }
//         } catch (error) {
//             console.log(error)
//         }

//     }
// }

const authController = {
  signUp: async (req, res) => {
    const { name, email, address, password } = req.body;
    const result = await authService.signUp({ name, email, address, password });
    res.json(result);
  },

  signIn: async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.signIn({ email, password });
    res.json(result);
  },
};

module.exports = authController;