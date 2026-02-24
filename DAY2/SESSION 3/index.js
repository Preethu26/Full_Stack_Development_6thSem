let defaultval = "avenger";

// Get search value from input
function findMovie() {
    let searchMovie = document.getElementById("searchhere");
    let searchVal = searchMovie.value;
    if (searchVal.trim()) {
        defaultval = searchVal;
    }
    console.log("Searching for:", defaultval);
}

// Fetch movies from OMDB API
async function getMovie() {
    try {
        let movies = await fetch(`http://www.omdbapi.com/?s=${defaultval}&apikey=a4029d62`);
        movies = await movies.json();

        let omdMovie = document.getElementById("showmoviedetails");
        omdMovie.innerHTML = ""; // clear previous results

        if (!movies.Search) {
            omdMovie.innerHTML = `<p>No movies found. Try another search.</p>`;
            return;
        }

        movies.Search.forEach((movie) => {
            omdMovie.innerHTML += `
            <div class="moviecard" onclick="showMovieDetails('${movie.imdbID}')">
                <div><h3>${movie.Title}</h3></div>
                <div class="movieimg">
                    <img src="${movie.Poster === "N/A" ? "https://via.placeholder.com/300x450?text=No+Image" : movie.Poster}" alt="${movie.Title}">
                </div>
                <p>Year: ${movie.Year}</p>
                <div class="click-hint">Click for details</div>
            </div>
            `;
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
        document.getElementById("showmoviedetails").innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    }
}

// Fetch detailed movie information
async function showMovieDetails(imdbID) {
    try {
        let response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=a4029d62`);
        let movie = await response.json();

        let modalBody = document.getElementById("modalBody");
        modalBody.innerHTML = `
            <div class="modal-header">
                <img src="${movie.Poster === "N/A" ? "https://via.placeholder.com/300x450?text=No+Image" : movie.Poster}" alt="${movie.Title}" class="modal-poster">
                <div class="modal-info">
                    <h2>${movie.Title}</h2>
                    <div class="movie-meta">
                        <span class="badge">${movie.Year}</span>
                        <span class="badge">${movie.Rated}</span>
                        <span class="badge">${movie.Runtime}</span>
                    </div>
                    <div class="rating">
                        <span class="imdb-rating">⭐ ${movie.imdbRating}/10</span>
                        <span class="votes">(${movie.imdbVotes} votes)</span>
                    </div>
                </div>
            </div>
            <div class="modal-details">
                <div class="detail-row">
                    <strong>Genre:</strong> ${movie.Genre}
                </div>
                <div class="detail-row">
                    <strong>Director:</strong> ${movie.Director}
                </div>
                <div class="detail-row">
                    <strong>Cast:</strong> ${movie.Actors}
                </div>
                <div class="detail-row">
                    <strong>Language:</strong> ${movie.Language}
                </div>
                <div class="detail-row">
                    <strong>Country:</strong> ${movie.Country}
                </div>
                <div class="plot-section">
                    <strong>Plot:</strong>
                    <p>${movie.Plot}</p>
                </div>
                ${movie.Awards !== "N/A" ? `
                <div class="awards-section">
                    <strong>🏆 Awards:</strong>
                    <p>${movie.Awards}</p>
                </div>
                ` : ''}
            </div>
        `;

        // Show modal
        document.getElementById("movieModal").style.display = "flex";
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
}

// Close modal
document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("movieModal").style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", function(event) {
    let modal = document.getElementById("movieModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Attach event listener to search button
document.getElementById("searchbtn").addEventListener("click", function () {
    findMovie();
    getMovie();
});

// Allow Enter key to search
document.getElementById("searchhere").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        findMovie();
        getMovie();
    }
});

// Load default movies on page load
window.addEventListener("load", function() {
    getMovie();
});