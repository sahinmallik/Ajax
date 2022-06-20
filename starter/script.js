"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
const renderCountry = function (data, className = "") {
  const name = data.name.common;
  const flag = data.flags.svg;
  const region = data.region;
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${flag}" />
    <div class="country__data">
      <h3 class="country__name">${name}</h3>
      <h4 class="country__region">${region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${language}</p>
      <p class="country__row"><span>💰</span>${currency}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const renderError = (msg) => {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

const getJson = (url, error = "Something went wrong") => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Country not found (${response.status})`);
    }

    return response.json();
  });
};

// our first api call: XMLHttpRequest
// const getCountry = country => {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const name = data.name.common;
//     const flag = data.flags.svg;
//     const region = data.region;
//     const language = Object.values(data.languages)[0];
//     const currency = Object.values(data.currencies)[0].name;
//     const html = `
//   <article class="country">
//     <img class="country__img" src="${flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${name}</h3>
//       <h4 class="country__region">${region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${language}</p>
//       <p class="country__row"><span>💰</span>${currency}</p>
//     </div>
//   </article>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountry('america');
// getCountry('germany');
// getCountry('india');
// getCountry('portugal');

//PROMISD SEND
// const request = fetch("https://restcountries.com/v3.1/name/portugal");
// console.log(request);

// const getCountryData = (country) => {
//country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => {
//       //then used to handle the promise

//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }

//       return response.json();
//       //json is a asynchronous function that's why we have to handle this promise also
//     })
//     .then((data) => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders?.[0];

//       //country 2

//       return fetch(`https:restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0], "neighbour");
//     })
//     .catch((err) => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
//   getJson(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
//     .then((data) => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) {
//         throw new Error("No neighbour found!");
//       }
//       //country 2
//       return getJson(
//         `https:restcountries.com/v3.1/alpha/${neighbour}`,
//         `Country not found`
//       );
//     })
//     .then((data) => {
//       renderCountry(data[0], "neighbour");
//     })
//     .catch((err) => {
//       renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener("click", () => {
//   getCountryData("portugal");
// });

//building a own promise.
// const lotteyPromise = new Promise(function (resolve, reject) {
//   console.log("Lottery started");
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve("You won!");
//     } else {
//       reject(new Error("You lost!"));
//     }
//   }, 2000);
// });

// lotteyPromise
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// //promosifying setTimeout
// const wait = (s) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, s * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log("1 second passed");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("2 second passed");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("3 second passed");
//     return wait(1);
//   })
//   .then(() => console.log("4 second passed"));

//use of async/await key word....

/*const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async (country) => {
  try {
    //geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //reverse geo coding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) {
      throw new Error("Problem of getting the location data");
    }

    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    //country data
    // fetch(`https://restcountries.com/v3.1/name/${country}`).then((res) => {
    //   console.log(res);
    // });
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) {
      throw new Error("Problem of getting the location data");
    }
    // console.log(res);
    const data = await res.json();
    // console.log(data);
    if (dataGeo.country === "India") {
      renderCountry(data[1]);
    } else {
      renderCountry(data[0]);
    }

    return `you are in ${dataGeo.city},${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);

    //Rejecting promise returned from async function
    throw err;
  }
};

console.log("1: Will get location data");
// whereAmI()
//   .then((city) => {
//     console.log(`2: ${city}`);
//   })
//   .catch((err) => {
//     console.error(`2: ${err.message} 💥`);
//   })
//   .finally(() => {
//     console.log("3: I'm done");
//   });

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch {
    console.error(`2: ${err.message} 💥`);
  }
  console.log("3: I'm done");
})();
*/

/*
//Running multiple promise parallely
const get3Countries = async (c1, c2, c3) => {
  try {
    // const [data1] = await getJson(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJson(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJson(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJson(`https://restcountries.com/v3.1/name/${c1}`),
      getJson(`https://restcountries.com/v3.1/name/${c2}`),
      getJson(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map((d) => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countries("USA", "UAE", "Russia");
*/

//Promise.race
(async function () {
  const res = await Promise.race([
    getJson(`https://restcountries.com/v3.1/name/italy`),
    getJson(`https://restcountries.com/v3.1/name/egypt`),
    getJson(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res[0]);
})();
