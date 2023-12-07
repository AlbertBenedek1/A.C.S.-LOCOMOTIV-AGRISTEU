document.getElementById("search").onsubmit = async function(event){ //az anonym functiont async functionre alakítottam
    event.preventDefault(); 
    var searchInput = document.getElementsByName('search')[0].value;
    var yearInput = document.getElementsByName('year')[0].value;
    if (searchInput == ''){
        alert("Keresőszó kitöltése kötelező");
        return;
    }

    var url = `http://www.omdbapi.com/?s=${encodeURI(searchInput)}&y=${encodeURI(yearInput)}&apiKey=9606ae0f`; //az encodeURI függvény url kompatibilis formára alakítja a két inputot

    var response = await fetch(url); //await - addig nem megyunk tovabb amig a fetch által visszaküldött promise nem rezolválódik és nem lessz a kezünkben csak a kérésre adott válasz
    if(!response.ok){
        alert("Kereses sikertelen");
        return;
    }
    //console.log(response);    //kicsomagolatlan
    var movieResponse = await response.json(); // a választ kicsomaguluk a json formátumból (és mivel mindez asyncron művelet, ezért be kell várni)
    console.log(movieResponse);   //kicsomagolt
    if(!movieResponse.Search){
      alert("Kereses sikertelen");
        return;
    }
    renderMovieList(movieResponse.Search);

};

function renderMovieList(movies){
    var movieListTemplate = '';
    for (var movie of movies){
        movieListTemplate += `
            <li>
              <div class="poster-wrap">
                <a>
                  <img src="${movie.Poster}" class="movie-poster" />
                </a>
              </div>
              <p data-imdbid="${movie.imdbID}" class="single-movie-btn">
                <span class="movie-title" >
                  ${movie.Title}
                </span>
              </p>
              <span class="movie-year">
                ${movie.Year}
              </span>
            </li> `
        }
    document.getElementById("movies").innerHTML = movieListTemplate;
    var movieTitles = document.querySelectorAll(".single-movie-btn");
    for (var movieTitle of movieTitles){
        movieTitle.onclick = function(event){
            console.log(event.target.parentElement.dataset.imdbid); //ha nem módosithatjuk mi az a felső templateIteralt akkor használljuk ezt a parentElement kulcsot (mivel nekünk nem a span-ba lévő címre van szükszégünk, hanem a <p> -be lévő id-ra)
            //ebben a datasetben mindenki felsorolódik, aki az adott elementre data atributumként rá van rakva
            
            //templateIteralban rakjuk össze mert van statikus és dinamikus része is az url-nek
            var url = `http://www.omdbapi.com/?i=${event.target.parentElement.dataset.imdbid}&apiKey=9606ae0f` //az URL-be írt ${...} lessz a dinamikus komponens
            
            fetch(url) //most async helyett promise chaint építek
            .then(function(response) {
                return response.json();
            })
            .then(function(singleMovie){
                console.log(singleMovie);
                document.getElementById("movie-description").innerHTML = `
                <h1>${singleMovie.Title}</h1>
                <p>${singleMovie.Plot}</p1>
                `;
            })
        }
    }
}

//ennél a programnál sem frissül a weboldal, azért mert ajax kéréseket küldünk a szerverhez (esetünkben ehhez a filmes weboldalhoz)