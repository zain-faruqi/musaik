const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ display_name: req.body.username });
        if (user) {
            res.status(200).send(JSON.stringify(user));
        } else {
            res.status(404).send(JSON.stringify({message: 'User not found.'}));
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;