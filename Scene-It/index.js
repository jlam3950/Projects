const moviesContainer = document.querySelector('.movies-container');
const searchForm = document.getElementById('search-form');
const addBtn = document.querySelector('.btn');

document.addEventListener('DOMContentLoaded', function(){
    document.addEventListener('click', function(e){
        if(e.target.classList.contains('add-button')){ 
            let movieID = e.target.dataset.imdbid;
            saveToWatchList(movieID);
            return movieID;
        }
    })
});


function saveToWatchList(id){
    const movie = apiData.find(currentMovie => {
        return currentMovie.imdbID == id;
    })
    
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);
    if (watchlist == null){
        watchlist = [];
    } 
        watchlist.push(movie);
        watchlistJSON = JSON.stringify(watchlist);
        localStorage.setItem('watchlist', watchlistJSON);
        console.log(watchlist);

}

function renderMovies(movieArray){
    let movieHtmlArray = movieArray.map(currentMovie => {
            return `<div class = "col-3 mb-3 mt-3">
                    <div class="card" style ="max-width:15rem"> 
                    <img src= "${currentMovie.Poster}" class ='card-img-top'>
                    <div class = 'card-body'>
                        <h4 class ='card-title'>${currentMovie.Title}</h4>
                        <p class ='card-text'>${currentMovie.Year}</p>
                        <button class ='btn btn-primary add-button' data-imdbid = "${currentMovie.imdbID}" >Add</button>
                    </div>
                    </div>
                </div>`
    })
    console.log(movieHtmlArray);
    return movieHtmlArray.join('');
} 


searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    const searchString = document.getElementById('search-bar').value
    const urlEncodedSearchString = encodeURIComponent(searchString);

    fetch("http://www.omdbapi.com/?apikey=59354c85&s=" + urlEncodedSearchString).then(res =>{
        return res.json(); 
    }).then(data => {
        apiData = data.Search;
        console.log(apiData);
        const movieHTML = renderMovies(apiData);
        moviesContainer.innerHTML = movieHTML; 
        return apiData;
    }).catch(err => {
        console.log(err);
    })
})

