const axios = require('axios');
const APIKEY = process.env.WORD_ASSOCIATION_APIKEY;
const url = "https://api.wordassociations.net/associations/v1.0/json/search?apikey=" +APIKEY;

module.exports = {

    getWordAssociations: function(req, res, err) {
        let text = req.params.text;
        console.log("controller getWordAssociations Function");
        let searchUrl = url + "&text=" + text +"&lang=en&type=response&pos=adjective";
        console.log("searchUrl value is: ", searchUrl);
        axios.get(searchUrl)
            .then(response => {
                console.log("getWordAssociations response, " , response.data);
                res.json(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}