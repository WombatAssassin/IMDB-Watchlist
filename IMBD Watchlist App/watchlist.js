const key = "548509d1";
const filmArea = document.getElementById("higher-film-area-2")
let watchlistArray = [];



const renderMovie = (imdbID) => {

    fetch(`https://www.omdbapi.com/?apiKey=${key}&i=${imdbID}`)
        .then(res => res.json())
        .then(data => {
            let watchlistHTML = watchlistArray.includes(imdbID) ? "- Watchlist ❌" : "+ Watchlist ✅";
            filmArea.innerHTML += `
                                            <div class="result" id="${data.imdbID}">
                                                <div class="film-holder-area">
                                                    <div class="film-holder-area-img">
                                                        <img src="${data.Poster === null ? "images/reels.png" : data.Poster}">
                                                    </div>
                                                    <div class="film-holder-area-not-img">
                                                        <div class="film-holder-area-content">
                                                            <h3 class="film-name">${data.Title}</h3>
                                                            <p class="film-score">⭐ ${data.Ratings[0].Value}</p>
                                                        </div>
                                                        <div class="film-holder-area-content">
                                                            <p>${data.Runtime}</p>
                                                            <p>${data.Genre}<p>
                                                            <span class="watchlist-label">${watchlistHTML}</span>
                                                        </div>
                                                        <div class="film-holder-area-content description">
                                                            <p>${data.Plot}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        `
        })

}
function handleAddRemove() {
    filmArea.addEventListener("click", e => {
        // If clicked on the "add to watchlist " button.
        if (e.target.matches(".watchlist-label")) {
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
            filmArea.textContent = null;
            if (watchlistArray.length) {
                watchlistArray.forEach(mov => {
                    renderMovie(mov);
                })
            } else {
                filmArea.innerHTML = `
                                        <div class="middle-content default" id="middle-content-2">
                                            <p class="grey-fade">Your watchlist is looking a little empty...</p>
                                            <a href="index.html">🎬 Let's add some movies! 🍿</a>
                                        </div>
                                        `
            }
        }
    })
}
handleAddRemove()

const updateWatchlist = _ => {
    if (JSON.parse(localStorage.getItem("watchlist")).length) {
        watchlistArray = JSON.parse(localStorage.getItem("watchlist"))
        filmArea.innerHTML = null;
        watchlistArray.forEach(movie => {
            renderMovie(movie)
        })

    }
}
updateWatchlist()