const searchButton = document.getElementById("search-button")
const searchBar = document.getElementById("search-bar")
const filmArea = document.getElementById("higher-film-area")
let watchlistArray = [];

const updateWatchlist = _ => {
    if (localStorage.watchlist) {
        watchlistArray = JSON.parse(localStorage.getItem("watchlist"))
    }
}
updateWatchlist()

searchButton.addEventListener("click", () => {
    
    fetch(`https://www.omdbapi.com/?s=${searchBar.value}&apikey=d9354bb7`)
        .then(res => res.json())
        .then(data => {
            filmArea.innerHTML = ""
            let films = data.Search
            console.log(films)
            for(const film of films) {
                fetch(`https://www.omdbapi.com/?t=${film.Title}&apikey=d9354bb7`)
                    .then(res => res.json())
                    .then(data => {
                        document.getElementById("middle-content").classList.add("hide")
                        filmArea.innerHTML += `
                            <div class="result" id="${data.imdbID}">
                                <div class="film-holder-area">
                                    <div class="film-holder-area-img">
                                        <img src="${data.Poster === null ? "images/reels.png" : data.Poster}">
                                    </div>
                                    <div class="film-holder-area-not-img">
                                        <div class="film-holder-area-content">
                                            <h3 class="film-name">${data.Title}</h3><p class="film-score">⭐ ${data.Ratings[0].Value}</p>
                                        </div>
                                        <div class="film-holder-area-content">
                                            <p>${data.Runtime}</p><p>${data.Genre}</p><button class="watchlist-add-remove">+ Watchlist ✅</button>
                                        </div>
                                        <div class="film-holder-area-content description">
                                            <p>${data.Plot}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                
                    })
        }})})
        
        function handleAddRemove() {

    filmArea.addEventListener("click", e => {
        // If clicked on the "add to watchlist " button.
        if (e.target.matches(".watchlist-add-remove")) {
            // Fetch movieID from e.target.
            let movieID = e.target.closest(".result").id;
            // If the movie is a part of the watchlist
            if (watchlistArray.includes(movieID)) {
                // Remove the item from array and display add button.
                watchlistArray = watchlistArray.filter(id => id !== movieID)
                e.target.textContent = "+ Watchlist ✅"
            } else {
                // Add item to the array, and display remove button.
                watchlistArray.push(movieID)
                e.target.textContent = "- Watchlist ❌"
            }
            // Update the localstorage data with the change made.
            localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
        }
    })
}
handleAddRemove()