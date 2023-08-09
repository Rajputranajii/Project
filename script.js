
    document.addEventListener("DOMContentLoaded", function () {
        const searchButton = document.getElementById("searchButton");
        const searchInput = document.getElementById("searchInput");
        const resultsContainer = document.getElementById("results");

        searchButton.addEventListener("click", function () {
            const searchTerm = searchInput.value;
            if (searchTerm.trim() === "") {
                return;
            }

            const apiKey = "0204e67e504f0f5398b0fc024efc0ba9"; // Replace with your actual TMDb API key
            const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;

            // Make an AJAX request
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    displayResults(data.results);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        });

        function displayResults(movies) {
            resultsContainer.innerHTML = ""; // Clear previous results

            if (!movies || movies.length === 0) {
                resultsContainer.innerHTML = "No results found.";
                return;
            }

            movies.forEach(movie => {
                const movieElement = document.createElement("div");
                movieElement.classList.add("movie");

                const posterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`; // Construct poster URL
                movieElement.innerHTML = `
                    <h2>${movie.title}</h2>
                    <div class="poster">
                        <img src="${posterUrl}" alt="${movie.title} Poster">
                    </div>
                    <p>Release Date: ${movie.release_date}</p>
                    <p>Rating: ${movie.vote_average}</p>
                    <p>${movie.overview}</p>
                `;
                resultsContainer.appendChild(movieElement);
            });
        }
    });

