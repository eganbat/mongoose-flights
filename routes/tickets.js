const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

router.get('/tickets/new', ticketsCtrl.new);
router.post('/tickets', ticketsCtrl.create);
router.post('/flights/:flightId/tickets', ticketsCtrl.addToAvailable)
router.delete('/tickets/:id', ticketsCtrl.delete);

module.exports = router;