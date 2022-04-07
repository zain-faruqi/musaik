const router = require('express').Router();
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(409).send({message: 'User already registered.'});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message: 'User created.'});
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'});
    }
});

module.exports = router;