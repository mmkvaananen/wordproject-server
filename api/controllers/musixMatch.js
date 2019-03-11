const axios = require('axios');
require('dotenv').config();
const APIKEY = process.env.MUSIXMATCH_APIKEY;
const url = "https://api.musixmatch.com/ws/1.1/";

module.exports = {

    getTrackIdOfTheSongByArtistAndSongTitle: function(req, res, err) {
        try {
            console.log("controller getTrackIdOfTheSongByArtistAndSongTitle Function");
            let track = req.query.track;
            let artist = req.query.artist
            console.log("Artist ", artist);
            console.log("Song ", track);
            console.log("APIKEY: ", APIKEY);
     
            let query = "track.search"; //search method used in the query
            //let query = "artist.search";
    
            
            let queryParams = {
                apikey: APIKEY,     //apikey is required
                //q_artist: "Queen",
                q_artist: artist,
                //f_artist_id: 118,
                //q_track: "We are the champions",
                q_track: track,
                format: "json",
                page_size: 1,
                f_has_lyrics: 1
            }
            
            let searchUrl = url + query;
            console.log("searchUrl value is: ", searchUrl);
            axios.get(searchUrl, {params:queryParams})
                .then(response => {
                    
                    console.log("getTrackId response, " , response.data.message.body.track_list[0].track.track_id);
                    let trackId = response.data.message.body.track_list[0].track.track_id;
                    res.json({track_id: trackId});
                    // console.log("getTrackId response, " , response.data);
                    //res.json(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        catch (err) {
            console.log("An error occurred: ", err);
            res.json({error: err});
        }  
    },

    getLyricsByTrackId: function(req, res, error) {

        try {
            console.log("controller getLyricsByTrackId Function");
            let track = req.query.trackId;
            console.log("Track id: ", track);

            let queryParams = {
                apikey: APIKEY,
                track_id: track,
                format: "json",
            }

            let query = "track.lyrics.get";
            let searchUrl = url + query;
            console.log("searchUrl value is: ", searchUrl);

            axios.get(searchUrl, {params:queryParams})
                .then(response => {
                    console.log("getLyricsByTrackId response, " , response.data);
                    //let trackId = response.data.message.body.track_list[0].track.track_id;
                    //res.json({track_id: trackId});
                    // console.log("getTrackId response, " , response.data);
                    res.json(response.data);
                })
                .catch(error => {
                    console.log(error);
                });

            
        }
        catch (error) {
            console.log("An error occurred: ", error);
            res.json({error: error});
        }

    }

}