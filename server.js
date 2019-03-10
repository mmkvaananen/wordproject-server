const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let server = app.listen(port, () => {
    console.log(`Server listening on ${server.address().port}`);
});