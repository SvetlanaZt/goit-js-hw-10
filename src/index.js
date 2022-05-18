import './css/styles.css';
import templateFunction from './template/country.hbs';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const listCountry = document.querySelector('.country-list')
const input = document.getElementById('search-box')

input.addEventListener('input', onClick)


function onClick(e) { 
    const value = e.currentTarget.value;

fetchCountries(value)
    .then(renderName)
    .cathc(error => console.log(error))
    .finally(() => {
        input.reset()
    })

}

function fetchCountries(name){
    return fetch(`https://restcountries.com/v3.1/name/${name}`).then(responsive => {
        return responsive.json()
    })
}

function renderName(name) {
    console.log(templateFunction(name[0]))
    const addCountry = templateFunction(name[0]);
    listCountry.innerHTML = addCountry;
}


