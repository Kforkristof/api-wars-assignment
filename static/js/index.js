let request = new XMLHttpRequest();  // instantiate a new Request
let table = document.getElementById('main_table');
let residentsButton = document.getElementsByClassName('btn btn-warning');
let residentsTableHeaders = `<tr>
                <th>Name</th>
                <th>Height</th>
                <th>Mass</th>
                <th>Hair Color</th>
                <th>Skin Color</th>
                <th>Eye Color</th>
                <th>Birth Year</th>
                <th>Gender</th>
                </tr>`;
let planetsPage = 1;
let nextButton = document.getElementById('btn-next');
let previousButton = document.getElementById('btn-previous');
let starterTableHeader = `<tr>
                    <thead class="thead-dark">
                        <th>Name</th>
                        <th>Diameter</th>
                        <th>Climate</th>
                        <th>Terrain</th>
                        <th>Surface Water</th>
                        <th>Population</th>
                        <th>Residents</th>
                    </thead>
                   </tr>`;
let residentsTable = document.getElementById('resident-table');
let residents = [];

const scrollPlanetsUp = function () {
    if (planetsPage < 6) {
        planetsPage += 1;
        sendPlanetAjax(planetsPage)
    }
};

const scrollPlanetsDown = function () {
    if (planetsPage > 1) {
        planetsPage -= 1;
        sendPlanetAjax(planetsPage)
    }
};

const sendPlanetAjax = function (page) {
    request.open('GET', `https://swapi.co/api/planets/?page=${page}`);  // set the method and the path
    request.send(); // actually fire the Request
};

const makeModalTableContent = function () {
    let residentsURLs = $(this).data('residents').split(',');
    residentsTable.innerHTML = residentsTableHeaders;

    for (let url of residentsURLs) {

        $.getJSON(url, function (response) {
            residentsTable.insertAdjacentHTML('beforeend',
                `<tr>
                    <td>${response.name}</td>
                    <td>${response.height}</td>
                    <td>${response.mass}</td>
                    <td>${response.hair_color}</td>
                    <td>${response.skin_color}</td>
                    <td>${response.eye_color}</td>
                    <td>${response.birth_year}</td>
                    <td>${response.gender}</td>
               </tr>`);
        });
    }
};

const makeTableFromAjax = function () {
    let responseData = JSON.parse(this.response);  // parse JSON format into JS object
    let planets = responseData.results;
    table.innerHTML = starterTableHeader;
    for (let i in planets) {
        table.insertAdjacentHTML('beforeend', `<tr><td>${planets[i].name}</td>
                                                                <td>${planets[i].diameter} km</td>
                                                                <td>${planets[i].climate}</td>
                                                                <td>${planets[i].terrain}</td>
                                                                <td>${(planets[i].surface_water !== 'unknown') ? `${planets[i].surface_water}%` : 'Unknown'}</td>
                                                                <td>${(planets[i].population === 'unknown') ? 'Unkown' : `${planets[i].population} people`}</td>
                                                                <td>${(planets[i].residents.length > 0) ?
            `<button type='button' class="btn btn-warning" class="btn btn-primary" data-toggle="modal" data-target="#residents-modal"   data-residents=${planets[i].residents}>${planets[i].residents.length} resident(s)</button>` : 'No residents'}</td>
                                                                </tr>`);

    }
    for (let button of residentsButton) {
        button.addEventListener('click', makeModalTableContent)
    }
};

const main = function () {
    request.addEventListener('load', makeTableFromAjax);
    sendPlanetAjax(planetsPage);
    nextButton.addEventListener('click', scrollPlanetsUp);
    previousButton.addEventListener('click', scrollPlanetsDown)

};

main();
