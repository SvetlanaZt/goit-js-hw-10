import './css/styles.css';
import templateFunction from './template/country.hbs';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries'

const DEBOUNCE_DELAY = 300;

const listCountry = document.querySelector('.country-list')
const coutnryInfo = document.querySelector('.country-info')
const input = document.getElementById('search-box')

input.addEventListener('input', debounce(onClick, DEBOUNCE_DELAY))


function onClick(e) { 
    const value = e.target.value.trim();


    fetchCountries(value)
        .then(renderName)
        .catch(error => { Notiflix.Notify.failure('Oops, there is no country with that name') })
//          .finally(() => {
//     input.reset();
//   });
        
}

function renderName(name) {
    console.log(name.length)
      if (name.length > 10) {
      return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
      }
    else if (name.length === 1) {
        const addCountry = templateFunction(name[0]);
        coutnryInfo.innerHTML = addCountry;
    }
    
    const listCountrys = name.map(value => {
    return `<li class="list__item" ${value.flags.svg} ${value.name.official}"></li>`
}).join("")

listCountry.insertAdjacentHTML('afterbegin', listCountrys)
}


