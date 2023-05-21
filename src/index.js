import './css/styles.css';
import Notiflix from "notiflix";

const DEBOUNCE_DELAY = 300;

// fetch("https://restcountries.com/v3.1/name/swe")
//     .then(res => res.json())
//     .then(data => {
        
//         console.log(data);
        
//         const capital = data[0].capital[0];
//         const population = data[0].population;
//         const name = data[0].name.official;
//         const languages = data[0].languages.deu;
//         const flag = data[0].flags.svg;
//         console.log({capital, population, name, languages, flag});

//     });

const searchBar = document.getElementById('search-box');
//console.log(searchBar);

//Pasul 1. Iau inputul din search bar si il trimit ca request
//pentru asta voi adauga un event de input pentru search bar, ca sa pot vizualiza in js ce se introduce in el
//Pasul 2. Vreau sa adaug tarile returnate de catre api in ul din html


searchBar.addEventListener('input', (event) => {
    let userInput = searchBar.value;
   // console.log(userInput);

    //in variabila country acum am textul introdus de user
    //vreau sa ma folosesc de ea ca sa completez pasul 1

    fetchCountries(userInput);   //aici completez pasul 1, fac requestul catre api de a gasi tara / tarile in functie de ce introduce userul
});

let fetchCountries = (userInput) => {
    fetch("https://restcountries.com/v3.1/name/" + userInput)
        .then(res => res.json())   //primesc un string, pe care il transform in format json
        .then(data => {    //aici primesc o lista de obiecte
            //lista pe care o primesc contine n obiecte
            //fiecare obiect contine caracterizarea api-ului a unei tari, si au multe atribute care nu ne int
            //voi construi o lista de obiecte care contin doar atributele care ma intereseaza
            let countryList = [];
            data.forEach(country => {
                const capital = country.capital[0];
                const population = country.population;
                const nameCommon = country.name.common;
                const nameOfficial = country.name.official;
                const languages = country.languages;
                const flag = country.flags.svg;
                countryList.push({capital, population, nameCommon, nameOfficial, languages, flag});
            });
                createList(countryList);   //aici continui cu pasul 2
        }).catch(() => {
             Notiflix.Notify.failure(
                `Oops, there is no country with that name`,
              )
        });
};

const createList = (foundCountries) => {
    console.log(foundCountries);
    //functia regasita la pasul 2
    //vreau sa targetez elementul ul din html
    //si sa ii adaug la innerhtml toate tarile returnate de catre api
    const htmlList = document.querySelector(".country-list");
    const countryInfo = document.querySelector(".country-info");

    //inainte sa adaug elementele gasite, vreau sa sterg ce am gasit inainte
    htmlList.innerHTML = "";  //smecherie
    countryInfo.innerHTML="";

    let displayCountries = foundCountries.map((item) => {
        const name = item.nameCommon;
        const flagSvg = item.flag;
        console.log(flagSvg);
        return `<li>
                    <img src="${flagSvg}" width="50" />
                    ${name}
                </li>`;
    });
    displayCountries = displayCountries.join("");
    htmlList.innerHTML = displayCountries;

    
    if (foundCountries.length == 1)  {   //daca am gasit o singura tara
        const capital = foundCountries[0].capital;
        const name = foundCountries[0].nameOfficial;
        const population = foundCountries[0].population;
        let languagesObject = foundCountries[0].languages;
        let languagesList = [];
        //am un obiect cu limbile tarii gasite
        //vreau sa parcurg limbile, si sa le adaug intr-o lista
        
        for (key in languagesObject) {
            languagesList.push(languagesObject[key]);
        }

        languagesList = languagesList.join(", ");

        const displayInfo = `
                                <p>
                                    Capital: <span>${capital}</span>
                                </p>
                                <p>
                                    Population: <span>${population}</span>
                                </p>
                                <p>
                                    Official name: <span>${name}</span>
                                </p>
                                <p>
                                    Languages: <span>${languagesList}</span>
                                </p>
                            `;
        countryInfo.innerHTML = displayInfo;
    }
};