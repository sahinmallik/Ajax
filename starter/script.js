'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className = '') {
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
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
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
// const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);

const getCountryData = country => {
  //country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      //then used to handle the promise
      return response.json(); //json is a asynchronous function that's why we have to handle this promise also
    })
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];

      //country 2

      return fetch(`https:restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    });
};
getCountryData('india');
