const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pins: { type: Array, default: [] },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: '7d'});
    return token;
}

const User = mongoose.model('user', userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().required().label('Username'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    });
    return schema.validate(user);
}

module.exports = { User, validateUser };