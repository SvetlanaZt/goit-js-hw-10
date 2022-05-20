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
    // if (value.length < 2) {
    //         Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    // }
    fetchCountries(value)
        .then(renderName)
        .then(country => console.log(country))
        // .cathc(specificName)
            //    
    // .finally(() => input.reset())
}



function renderName(name) {
    console.log(templateFunction(name[0]))
    const addCountry = templateFunction(name[0]);
    coutnryInfo.innerHTML = addCountry;
    
    const listCountrys = name.map(value => {
    return `<li class="list__item" ${value.flags.svg} ${value.name.official}"></li>`
}).join("")

listCountry.insertAdjacentHTML('afterbegin', listCountrys)
}


