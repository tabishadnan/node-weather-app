const axios = require("axios");

const forcastcode = (lat, lon, forcastback) => {

    const URL = `http://api.weatherstack.com/current?access_key=d0374de6bfbd3d9b9062365496fca2ef&query=${lat},${lon}`

    axios.get(URL)
    .then(res => {
        forcastback(res.data);
    })
    .catch(err => {
        console.log(err);
    });

};

module.exports = forcastcode;