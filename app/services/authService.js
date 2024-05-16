const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users'); // Adjust the path based on your project structure
const { jwtSecret, jwtExpire } = require('../config/keys');

const authService = {
    signUp: async ({ name, email, address, password }) => {
        try {
            const user = await usersModel.findOne({ email });

            if (user) {
                return { success: 0, message: 'User already registered with this email' };
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);

                const newUser = new usersModel({
                    name,
                    email,
                    address,
                    password: hashPassword,
                });

                await newUser.save();

                return { success: 1, message: 'You are registered successfully, please login' };
            }
        } catch (error) {
            console.error(error);
            return { success: 0, message: error.message };
        }
    },

    signIn: async ({ email, password }) => {
        try {
            const user = await usersModel.findOne({ email });

            if (!user) {
                return { success: 0, message: 'Invalid credentials' };
            } else {
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    return { success: 0, message: 'Invalid credentials' };
                } else {
                    const payload = {
                        user: {
                            _id: user._id,
                            email: user.email,
                        },
                    };

                    const token = jwt.sign(payload, jwtSecret, {
                        expiresIn: jwtExpire,
                    });

                    return { success: 1, token };
                }
            }
        } catch (error) {
            console.error(error);
            return { success: 0, message: 'Server error' };
        }
    },
};

module.exports = authService;