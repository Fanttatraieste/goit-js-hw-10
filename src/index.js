import './css/styles.css';

const DEBOUNCE_DELAY = 300;

fetch("https://restcountries.com/v3.1/all?limit=20")
    .then(res => res.json())
    .then(data => {
        //console.log(data);
    });
