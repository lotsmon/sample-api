var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Simple API Gateway")
})

console.log("Simple API Gateway run on localhost:3000")

app.listen(3000);