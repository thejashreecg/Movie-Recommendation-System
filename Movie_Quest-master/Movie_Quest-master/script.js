const searchForm =document.querySelector('form');
const movieContainer =document.querySelector('.movie');
const inputBox =document.querySelector('.inputBox');
const searchText=document.getElementById('search_text');
        // apikey=http://www.omdbapi.com/?i=tt3896198&apikey=4aac7fbf
        

// Fetching movie details 
const getmovieinfo = async (movie) =>
    {
    const myapi='6d4b3add'
    const url =`https://www.omdbapi.com/?apikey=${myapi}&t=${movie}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "False") {
            movieContainer.classList.remove('nobackground');
            searchText.innerText="Error Fetching Movie Data: No movie found";
            // movieContainer.innerHTML = ''; // Clear previous movie data
        } else {
            showmoviedata(data);
        }
    } catch (error) {
        // console.error("Error fetching movie data:", error);
    }
}

const showmoviedata = (data) =>
    {
        // const movieContainer = document.createElement('div');
        // movieContainer.classList.add('movie-container') 
        movieContainer.innerHTML = '';// Clear previous movie data
        movieContainer.classList.remove('nobackground')
        const {Title,imdbRating,Genre,Language,Runtime,Actors,Released,Plot,Poster}=data; //storing data into an array

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-info');
        movieElement.innerHTML=`<h2 id="title">${Title}</h2><p id="rating"><strong>Rating  :${imdbRating}  &#9733  </strong></p> `;

        const  movieGenreElement= document.createElement('div');
        movieGenreElement.classList.add('movie-genre');
        
        Genre.split(",").forEach(element => {
            const p=document.createElement('p');
            p.innerText=element;
            movieGenreElement.appendChild(p);
            
        });
        movieElement.appendChild(movieGenreElement);
        
        movieElement.innerHTML +=`<p><strong>Language : </strong>${Language}</p><p><strong>Duration : </strong>${Runtime}</p><p><strong>Actors : </strong>${Actors}</p><p><strong>Released date :  </strong>${Released}</p><p id="plot"><strong>Plot:  </strong>${Plot}</p>`;

        // creating div for movie poster 
        const moviePoster = document.createElement('div');
        moviePoster.classList.add('movie-poster');
        moviePoster.innerHTML = `<img id="poster" src="${Poster}"/>`;

        movieContainer.appendChild(moviePoster);
        movieContainer.appendChild(movieElement);

        // movieContainer.appendChild(movieElement);
    }



searchForm.addEventListener('submit', (ev) => {
ev.preventDefault()
// console.log(inputBox.value)   
const movieName=inputBox.value.trim();
if (movieName !== "")
    {
        document.getElementById('search_text').innerHTML = 'Fetching details..';
        getmovieinfo(movieName);
    }
else
{
    alert("Please Enter Your Movie Name..!")
    movieContainer.classList.add('nobackground')

    // movie.innerHTML("omkar")
}
})
// console.log("omkarpatil3821@gmail.com")