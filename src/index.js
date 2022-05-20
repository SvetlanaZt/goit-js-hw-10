import './css/styles.css';
import templateFunction from './template/country.hbs';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries'

const DEBOUNCE_DELAY = 300;

const listCountry = document.querySelector('.country-list')
const coutnryInfo = document.querySelector('.country-info')
const input = document.getElementById('search-box')

listCountry.style.listStyle = 'none'


input.addEventListener('input', debounce(onClick, DEBOUNCE_DELAY))


function onClick(e) { 
    const value = e.target.value.trim();
    if (value === '') {
        coutnryInfo.innerHTML = '';
        listCountry.innerHTML = '';
    }

    fetchCountries(value)
        .then(renderName)
        .catch(error => { Notiflix.Notify.failure('Oops, there is no country with that name') })
        }

function renderName(name) {
    console.log(name.length)
        if (name.length === 1) {
            const addCountry = templateFunction(name[0]);
            listCountry.innerHTML = '';
        return coutnryInfo.innerHTML = addCountry;
    }
        else if (name.length > 2 && name.length < 10) {
        const listCountrys = name.map(value => {
            const createEl = `<li> <img src=${value.flags.svg} alt="Флаг" width="20" height="20"/>${value.name.official}</li>`
            return createEl
        }).join("")

        listCountry.insertAdjacentHTML('afterbegin', listCountrys)
    }
        else {
         Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    }
}


