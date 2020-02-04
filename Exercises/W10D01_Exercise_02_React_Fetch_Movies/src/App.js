import React from 'react';                                //! import React from 'react'; ---> V6 modules 
                                                            //+ Cannot use on the client side, because you need somehing to compile) 
                                                            //+ Equals to --> const = React = require ('react') COMMON JS
import logo from './logo.svg';
import './App.css';

let inputEl = document.getElementById('search-movie-input');
let resultsEl = document.getElementById('results');
let extraInfoEl = document.getElementById('extra-info');

document.getElementById('search-movie-btn').addEventListener('click', searchMovie);

function App() {
  return (
    <div className="App">
      <h1>Movies</h1>
    </div>
  );
}

async function searchMovie(event) {
  event.preventDefault();
  if (inputEl.value !== "") {
    const endpoint = 'https://www.omdbapi.com/?apikey=f6b97219&t=' + inputEl.value;
    let data = new Promise ((resolve, reject) => {
      fetch(endpoint)
      .then(res => res.json())
      .then(title => resolve(title))
      .catch(err => reject(err))
    });
    data.then((result) => {
      if (result.Title != undefined) {
        let liEl = document.createElement('li')
        extraInfoEl.innerHTML = '';
        liEl.innerHTML = `<img src="${result.Poster}" width="50px"> ${result.Title} (${result.Year}) - Actors: ${result.Actors}`
        resultsEl.appendChild(liEl);
      } else {
        extraInfoEl.innerHTML = `No movies match the title of ${inputEl.value}`
      }
      inputEl.value = '';
      inputEl.focus();
    }).catch((err) => {
      console.log(err);
    })
  } else {
    inputEl.focus();
  }
}

export default App;
