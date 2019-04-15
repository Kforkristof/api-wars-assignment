function ajax(targetLink){

let request = XMLHttpRequest();

request.addEventListener('load', function () { // add an event listener to the load event of the request
    let responseData = JSON.parse(this.response);  // parse JSON format into JS object
});

request.open('GET', targetLink);  // set the method and the path
request.send(); // actually fire the Request
}
