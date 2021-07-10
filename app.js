require('dotenv').config();
const axios = require('axios');
const express = require('express');
const etsyjs = require('etsy-js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const url = require('url');
const app = express();

// axios.get(`https://www.etsy.com/oauth/connect?
// response_type=code
// &redirect_uri=http://localhost:3000/authorise
// &scope=transactions_r%20transactions_w
// &client_id=hdqn6kwt4c8n5aps1rsy0a0p
// &state=superstate
// &code_challenge=DSWlW2Abh-cf8CeLL8-g3hQ2WQyYdKyiu83u_s7nRhI
// &code_challenge_method=S256`);

app.get('/', async (req, res) => {
    // let response = await axios.get(`https://www.etsy.com/oauth/connect?
    //     response_type=code
    //     &redirect_uri=http://localhost:3000/authorise
    //     &scope=transactions_r%20transactions_w
    //     &client_id=hdqn6kwt4c8n5aps1rsy0a0p
    //     &state=superstate
    //     &code_challenge=DSWlW2Abh-cf8CeLL8-g3hQ2WQyYdKyiu83u_s7nRhI
    //     &code_challenge_method=S256`);
    res.redirect(`https://www.etsy.com/oauth/connect?
    response_type=code
    &redirect_uri=https://etsy-test.herokuapp.com/authorise
    &scope=transactions_r%20transactions_w
    &client_id=${process.env.CLIENT_ID}
    &state=superstate
    &code_challenge=DSWlW2Abh-cf8CeLL8-g3hQ2WQyYdKyiu83u_s7nRhI
    &code_challenge_method=S256`);
});


app.get('/authorise', (req, res) => {
    console.log("authorise");
    let query = url.parse(req.url, true).query;
    console.log(query);
    // let verifier = query.oauth_verifier;
    // client.accessToken(req.session.token, req.session.sec, verifier, (err, response) => {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log("accessToken: ", response);
    //     req.session.token = response.token;
    //     req.session.sec = response.tokenSecret;
    //     res.redirect('/find');
    // });
});

app.listen(process.env.PORT, () => {
    console.log("Server started.");
});