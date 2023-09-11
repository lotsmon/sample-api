const express = require('express');
const router = express.Router();
const {authenticator, users} = require('../../utils/authenticator');

router.get('/users', authenticator, (req, res) => {
    res.send(users);
  })

module.exports = router;