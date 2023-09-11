const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const router = require('./routers/auth/controller');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Simple API Gateway")
})

console.log("Simple API Gateway run on localhost:3000")

const routers = fs.readdirSync('./routers');

for (rts of routers) {
    let log = { file: rts, routes: [] };
    rts = require(`./routers/${rts}/controller`)
    rts.stack.map((item)=> item.route && log.routes.push(item.route.path))
    app.use(rts);
    console.log(log)
}

app.listen(3000);