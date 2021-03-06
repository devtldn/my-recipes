const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = process.env.PORT || 1122;

const dbURL = "mongodb://localhost/recipe";

const mongconn = mongoose.connection;

const app = express();

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect(dbURL);
}

mongconn.on("error", function(err) {
    console.log("MONGOOSE ERROR: ", err);
});

mongconn.once("open", function(err) {
    console.log("MONGOOSE CONNECTED");
});

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


app.get('/scrape', function(req, res) {
    return axios.get("https://www.bonappetit.com/ingredient/chicken").then(function(response) {
        var $ = cheerio.load(response.data);
        
        var result = {};

        $("li.component-river-item").each(function (i, element) {
            result.Image = $(element).find("img").attr("srcset").split(" ")[0];
            result.Dish = $(element).find("h1.feature-item-hed").text();
            result.Summary = $(element).find("p.feature-item-dek").text();
            result.Link = "https://www.bonappetit.com" + $(element).find("h1.feature-item-hed").children("a").attr("href");
            
            db.Chicken.create(result).then(function(dbChicken) {
                console.log(dbChicken);
            }).catch(function(err) {
                res.json("CREATION ERR: ", err);
            });

            res.end();
        });
    });
});

app.get('/chicken', function(req, res) {
    db.Chicken.find({}).then(function(dbChicken) {
        res.json(dbChicken);
    }).catch(function(err) {
        res.json(err);
    });
});

app.get('/chicken/:id', function(req, res) {
    db.Chicken.findOne({ _id: req.params.id }).populate("notes").then(function(dbChicken) {
        res.json(dbChicken);
    }).catch(function(err) {
        res.json(err);
    });
});

app.post("/chicken/:id", function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
        return db.Chicken.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    }).then(function(dbChicken) {
        res.json(dbChicken);
    }).catch(function(err) {
        res.json(err);
    });
});


app.listen(PORT, function() {
    console.log(`** APP IS RUNNING ON THE DESIGNATED ${PORT} **`);
});