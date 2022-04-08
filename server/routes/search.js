const router = require('express').Router();
const { User } = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const user = await User.findOne({username: req.query.username});
        if (user) {
            res.send(JSON.stringify(user));
        } else {
            res.send(JSON.stringify({message: 'User not found.'}));
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;