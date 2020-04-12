const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const port = 3333;

app.get('/', (req, res) => res.send('API on'));

app.get('/secret', isAuthenticated, (req, res) => {
    res.json({ "message": "Area de seguranca quase maxima!!!", date: new Date().toJSON() })
})

app.get('/readme', (req, res) => {
    res.json({ "message": "Aqui é casa da mae Joana!!!" })
})

let user = { user: 'pablo'}
let options = { algorithm: "HS256", expiresIn: 60 * 15 }
app.get('/login', (req, res) => {
    let privateKey = fs.readFileSync('./key/jwtRS256.key', 'utf8')

    //jwt.sign(payload, secretOrPrivateKey, [options, callback])
    let token = jwt.sign(user, privateKey, options)

    res.send({authorization: token})
})

function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization;
        let privateKey = fs.readFileSync('./key/jwtRS256.key', 'utf8');
        let options = { algorithm: "HS256" }

        //jwt.verify(token, secretOrPublicKey, [options, callback])
        jwt.verify(token, privateKey, options, (err, user) => {
            if (err) { 
                res.status(500).json({ error: "Not Authorized" });
                throw new Error("Not Authorized");
            }
            return next();
        });
    } else {
        res.status(500).json({ error: "Invalid Authorization" });
        throw new Error("Not Authorized");
    }
}

app.listen(port, () => console.log(`Express app listening on port ${port}`))