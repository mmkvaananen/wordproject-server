const express = require('express');
const router = express.Router();
const associationsController = require('../api/controllers/wordAssociation');

router.get('/:text', associationsController.getWordAssociations);

module.exports = router;