const express = require('express');
const router = express.Router();
const lyricsController = require('../api/controllers/musixMatch');

router.get('/song', lyricsController.getTrackIdOfTheSongByArtistAndSongTitle);
router.get('/lyrics', lyricsController.getLyricsByTrackId);

module.exports = router;