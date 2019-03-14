const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const lyrics = require('./routes/musixMatch');
const associations = require('./routes/wordAssociation');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/songs', lyrics);
app.use('/api/associations', associations);

let server = app.listen(port, () => {
    console.log(`Server listening on ${server.address().port}`);
});