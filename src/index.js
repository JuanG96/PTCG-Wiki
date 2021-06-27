import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/scss/partials/navbar.scss'
import './assets/scss/partials/sets.scss'
import './assets/scss/partials/landing.scss'
import './assets/scss/partials/cards.scss'
import './assets/scss/partials/eachCard.scss'
import './assets/scss/partials/decks.scss'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
