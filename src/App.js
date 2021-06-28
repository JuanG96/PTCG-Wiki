// import './assets/scss/App.scss';
import React, { useEffect } from 'react'
import { Navbar } from './Navbar';
import { Landing } from './Landing'
import { HashRouter, Route} from 'react-router-dom';
import { SetList } from './SetList';
import { Decks } from './Decks';
import { Search } from './Search';
import { SetCards } from './SetCards';
import { EachCard } from './EachCard';
import { Footer } from './Footer';
import { About } from './About';


function App() {
  let API = "https://api.pokemontcg.io/v2/cards"

  useEffect(() => {

    fetch(API, {
      method: 'GET',
      headers: {
        'x-api-key' : '078f5182-ba40-4b8c-8946-788acbb1684b'
      }
    })
    .then(response => response.json())
    .then(data => {})
    .catch(err => console.log(err))
  },[])
    
  return (
    <>
      <Navbar></Navbar>
      <HashRouter>
        <>
          <Route exact path='/' component={Landing} />
          <Route path='/sets' component={SetList} />
          <Route path='/decks' component={Decks} />
          <Route path='/search' component={Search} />
          <Route path='/setCards/:id' component={SetCards} />
          <Route path='/eachCard/:id' component={EachCard} />
          <Route path='/about' component={About} />

        </>
      </HashRouter>
      <Footer></Footer>
    
    </>
  );
}

export default App;
