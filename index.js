const express = require('express');
const etsyjs = require('etsy-js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const url = require('url');

const app = express();
app.use(cookieParser('secEtsy'));
app.use(session());

const client = etsyjs.client({
    key: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    callbackURL: 'http://localhost:3000/authorise'
});

app.get('/', (req, res) => {
    client.requestToken((err, response) => {
        if (err) {
            return console.log(err);
        }

        console.log("requestToken: ", response);
        req.session.token = response.token;
        req.session.sec = response.tokenSecret;
        res.redirect(response.loginUrl);
    });
});

app.get('/authorise', (req, res) => {
    console.log("authorise");
    let query = url.parse(req.url, true).query;
    let verifier = query.oauth_verifier;
    client.accessToken(req.session.token, req.session.sec, verifier, (err, response) => {
        if (err) {
            return console.log(err);
        }
        console.log("accessToken: ", response);
        req.session.token = response.token;
        req.session.sec = response.tokenSecret;
        res.redirect('/find');
    });
});

app.get('/find', (req, res) => {
    client.auth(req.session.token, req.session.sec).user("etsyjs").find((err, body, headers) => {
        if (err) {
            return console.log(err);
        }

        console.log(body.results[0]);
    });
});

app.listen(3000, () => {
    console.log("Server started @3000");
});