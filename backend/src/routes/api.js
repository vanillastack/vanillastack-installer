const express = require('express');
const router = express.Router();
const {sendMessage, clientArray} = require('../websocket');

const connectionRouter = require('./api/connection');
const setupRouter = require('./api/setup')
const infoRouter = require('./api/info');
const keyGenRouter = require('./api/keygen');

router.use('/connection', connectionRouter);
router.use('/setup', setupRouter);
router.use('/info', infoRouter);
router.use('/keygen', keyGenRouter);

router.get('/', function (req, res) {
    res.send('Hello World');
    sendMessage(clientArray[0].uuid, 'Hello World');
});

module.exports = router;
