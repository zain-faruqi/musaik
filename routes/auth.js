const router = require('express').Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(404).send({ message: 'User not found.' });
    
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: 'Invalid password.' });

        const token = user.generateAuthToken();
        res.status(200).send({ token: token, message: 'User logged in.' });

    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    });
    return schema.validate(user);
}

module.exports = router;