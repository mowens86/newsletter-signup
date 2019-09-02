//jshint esversion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
});

app.post('/', (req, res) => {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const options = {
        url: "https://us17.api.mailchimp.com/3.0/lists/c89f3f2653",
        method: "POST",
        headers: {
            "Authorization": "mike1 673a25269ed03219e25892389633f859-us17"
        },
        body: jsonData
    };
    
    request(options, (error, response, body) => {
        error ? res.sendFile(`${__dirname}/failure.html`)
        : response.statusCode === 200 ? res.sendFile(`${__dirname}/success.html`)
        : res.sendFile(`${__dirname}/failure.html`)
        
    });
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(process.env.PORT || port, () => {
    console.log(`App is listening on ${process.env.PORT || port}`);
});

//API Key
//673a25269ed03219e25892389633f859-us17

//List ID
//c89f3f2653
