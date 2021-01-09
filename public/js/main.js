console.log("client side js");

const myform = document.querySelector("form");
const search = document.querySelector("input");
const msgone = document.querySelector("#msg-one");

myform.addEventListener("submit", (e) => {
  e.preventDefault();

  msgone.innerHTML = "Loading .....";

  // console.log(search.value);

  fetch("/weather?address=" + search.value)
    .then((res) => {
      res.json().then((data) => {
        if (data.error) {
          msgone.innerHTML = data.error;
        } else {
          msgone.innerHTML = `<div class="weather-card">
                    <img class="weather-icon" src=${data.icon} title=${data.temperature}°C />
                    <p>Weather is ${data.temperature}°C and it feels look like ${data.feelslike}°C .</p>
                </div>`;
        }
      });
    })
    .catch((err) => {
      console.log("err main js", err);
    });

  myform.reset();
});
