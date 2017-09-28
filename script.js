/**
 * 
 * Gets called every time something is written inside search input field and find button is pressed. 
 * This function finds for JSON data from Wikipedia API asynchorously using Promises and thus dsplays 
 * data into related HTML tags.
 * 
 */
function update() {
    let queryToSearch = document.getElementById('query-string').value;

    getData(queryToSearch, 'GET')
    .then(function(data){
        let queryNameArr = data[1];
        let queryDetailArr = data[2];
        let queryLinksArr = data[3];
    
        if(document.getElementById('data-container').innerHTML.length !== 0) {
            document.getElementById('data-container').innerHTML = '';
        }
        for(let i=0; i<queryNameArr.length; i++) {
            document.getElementById('data-container').innerHTML += `<div class="single-entry">
            <h2 id="single-entry-heading">${queryNameArr[i]}</h2>
            <p id="single-entry-paragraph">${queryDetailArr[i]}</p>
            <a id="single-entry-link" href="${queryLinksArr[i]}" target="_blank">Read More</a>
        </div>`; 
        }
    })
    .catch(function(error){
        document.getElementById('data-container').innerHTML = `<div class="error-div-style">Couldn't load Wikipedia articles. Please try again.</div>`;
    });
}

/**
 * It returns a Promise and sends an asynchronous requests to get data
 * 
 * @param query - unique string to query against
 * @param method method of fetching the data (like GET)
 * @returns - a native Promise to fetch data from Wikipedia API
 */
function getData(query, method) {
    return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open(method, `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&redirects=return&search=${query}`);
        xhr.send();
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                resolve(response);
            }
        }
        xhr.onerror = function(){
            reject(xhr.statusText);
        }
    });
}