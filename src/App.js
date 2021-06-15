import logo from './logo.svg';
import './assets/scss/App.scss';
import React, { useEffect, useState } from 'react'

function App() {
  let API = "https://api.pokemontcg.io/v2/cards"

  let [asd, setAsd ] = useState()

  useEffect(() => {

    fetch(API, {
      method: 'GET',
      headers: {
        'x-api-key' : '078f5182-ba40-4b8c-8946-788acbb1684b'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  },[])
    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
