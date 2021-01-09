const axios = require("axios");

const geocode = (address, eMsg, callback) => {

    address.replace(/\s/g, '');

    const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidGFiaXNoYWRuYW4iLCJhIjoiY2tpbXVsdHRxMDJ0ZjJzbWxhemxsNWNwcCJ9.TALCbJgQt0dTHh8qVE124w&limit=1`

    axios.get(URL)
        .then(res => {
            if (res.data.features.length === 0) {
                const msg = "Please enter correct location !!!";
                eMsg(msg);
            } else {
                const lat = res.data.features[0].center[1];
                const lon = res.data.features[0].center[0];
                callback(lat, lon);
            }
        })
        .catch(err => {
            console.log(err);
        });

};

module.exports = geocode;