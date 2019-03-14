const axios = require('axios');
require('dotenv').config();
const APIKEY = process.env.MUSIXMATCH_APIKEY;
const url = "https://api.musixmatch.com/ws/1.1/";
const musixMatchStatusCodes = {
    200: "The request was successful",
    400: "The request had bad syntax or was inherently impossible to be satisfied ",
    401: "Authentication failed, probably because of invalid/missing API key.",
    402: "The usage limit has been reached, either you exceeded per day requests limits or your balance is insufficient.",
    403: "You are not authorized to perform this operation.",
    404: "The requested resource was not found.",
    405: "The requested method was not found.",
    500: "Ops. Something were wrong.",
    503: "Our system is a bit busy at the moment and your request can’t be satisfied."
}

module.exports = {

    getTrackIdOfTheSongByArtistAndSongTitle: function(req, res, err) {
        try {
            console.log("controller getTrackIdOfTheSongByArtistAndSongTitle Function");
            let queryParams = {
                apikey: APIKEY,     //apikey is required
                format: "json",
                page: 1,
                page_size: 5,
                s_track_rating: "desc",
                f_has_lyrics: 1
            }

            if (req.query.artist) {
                console.log("Artist name: ", req.query.artist);
                queryParams["q_artist"] = req.query.artist;
            }

            if (req.query.track) {
                console.log("Track name: ", req.query.track );
                queryParams["q_track"] = req.query.track;
            }


            
            // let track = req.query.track;
            // let artist = req.query.artist
            // console.log("Artist ", artist);
            // console.log("Song ", track);
            // console.log("APIKEY: ", APIKEY);
     
            let query = "track.search"; //search method used in the query    
            
            // let queryParams = {
            //     apikey: APIKEY,     //apikey is required
            //     q_artist: "Adele",
            //    // q_track: track,
            //     f_has_lyrics: 1,
            //     s_track_rating: "desc",
            //     //format: "json",
            //     page: 1,
            //     page_size: 5,
                
            // }
            
            let searchUrl = url + query;
            console.log("searchUrl value is: ", searchUrl);
            axios.get(searchUrl, {params:queryParams})
                .then(response => {
                    console.log("getTrackIdOfTheSongByArtistAndSongTitle response status code, " , response.data.message.header.status_code);

                    let responseStatusCode = response.data.message.header.status_code;

                    // console.log("getTrackIdOfTheSongByArtistAndSongTitle response, " , response.data.message.body.track_list[0].track.track_id);
                    let trackId = response.data.message.body.track_list[0].track.track_id;
                    //res.json({track_id: trackId});
                    // console.log("getTrackId response, " , response.data);
                    res.json(response.data.message.body.track_list);
                    //res.json(response.data.message.body);
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