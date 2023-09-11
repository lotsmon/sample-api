const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { users } = require('../../utils/authenticator');

const secret = '$2b$04$1J43vObuWYz0SwrqCvgyUe';

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/login', (req, res) => {
    let user = users.find((usr)=> usr.username == req.body.username);
    if (!user) return res.status(404).send("User not found");

    let passwordIsValid = bcrypt.compareSync(req.body.password || ';', user.password)
    if (!passwordIsValid) return res.status(401).send({ code: '' })

    let token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });

    res.status(200).send({ code: token });
})

router.post('/register', (req, res) => {
    let hashpass = bcrypt.hashSync(req.body.password, 8);
    let user = users.push({ id: bcrypt.genSaltSync(2), username: req.body.username, password: hashpass });
    let token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });
    
    console.log(users[user-1]);
    res.status(200).send({ code: token })
})


module.exports = router;