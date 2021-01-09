const path = require("path");

const express = require("express");

const hbs = require("hbs");

const app = express();

const geocode = require("./utils/geocode.js");

const forcastcode = require("./utils/forcastcode.js");

const port = process.env.PORT || 3000;

const pubDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

app.use(express.static(pubDirPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tabish Adnan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Tabish Adnan",
  });
});

app.get("/weather", (req, res) => {
  if (req.query.address) {
    geocode(
      req.query.address,
      (eMsg) => {
        res.send({
          error: eMsg,
        });
      },
      (lat, lon) => {
        forcastcode(lat, lon, (forcastdata) => {
          res.send({
            temperature: forcastdata.current.temperature,
            feelslike: forcastdata.current.feelslike,
            icon: forcastdata.current.weather_icons[0],
          });
        });
      }
    );
  } else {
    res.send({
      error: "Must be enter search term !!!",
    });
  }
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Tabish Adnan",
  });
});

app.listen(port, () => {
  console.log("server runnig on port " + port);
});
