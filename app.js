const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { log } = require("console");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    const city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=7eda51612e6100485956bade593971db&units=metric&lang=tr&q=" + city;
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const iconID = weatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/" + iconID + "@2x.png ";
            
            res.writeHeader(200 , {"Content-Type" : "text/html; charset=utf-8"});
            res.write("<h1>"+ city + "'da hava " + weatherDescription + " ve sıcaklık " + temp + " derece.</h1>");
            res.write("<img src=" + iconURL + ">");
            res.send();
            
        })
    });
})


app.listen(3000, function() {
    console.log("Server started running on port 3000.");
})