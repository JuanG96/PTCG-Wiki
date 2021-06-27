import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Carousel } from 'react-responsive-carousel';
import { HashRouter, Route, Link, Switch, NavLink } from 'react-router-dom';
import { Loading } from "./Loading";

function Landing() {
    const [carouselCards1, setCarouselCards1] = useState([])
    const [carouselCards2, setCarouselCards2] = useState([])
    const [carouselCards3, setCarouselCards3] = useState([])
    const [actualPage, setPage] = useState(1)


    let API = "https://api.pokemontcg.io/v2/cards"
    // let randomCards = []
    // let page = 1

    const generateCards = () => {
        // Arrays with random card numbers(0-250)
        let carouselRandom1 = []
        let carouselRandom2 = []
        let carouselRandom3 = []

        
        // Filling arrays with random numbers
        for (let i = 0; i < 6; i++) {
            carouselRandom1.push(Math.floor(Math.random() * (250 - 0)) + 0)
            carouselRandom2.push(Math.floor(Math.random() * (250 - 0)) + 0)
            carouselRandom3.push(Math.floor(Math.random() * (250 - 0)) + 0)
        }
        
        fetch(`${API}/?page=` + actualPage, {
            method: 'GET',
            headers: {
                'x-api-key': '078f5182-ba40-4b8c-8946-788acbb1684b'
            }
        })
        .then(response => response.json())
            .then(data => {
                console.log(data);
                let totalPage = Math.ceil(data.totalCount / 250);
                localStorage.setItem('totalCount', totalPage)

                        // Setting every state with objects from the cards from the previous numbers
                        setCarouselCards1(prevState => {
                            let arr = []
                            carouselRandom1.forEach(element => arr.push(data.data[element]))
                            return arr
                        })
                        
                        setCarouselCards2(prevState => {
                            let arr = []
                            carouselRandom2.forEach(element => arr.push(data.data[element]))
                            return arr
                        })

                        setCarouselCards3(prevState => {
                            let arr = []
                            carouselRandom3.forEach(element => arr.push(data.data[element]))
                            return arr
                        })
            })
            .catch(err => console.log(err))


    }

    useEffect(() => {
         generateCards() 
    }, [])

    if (carouselCards3.length !== 0) {
        
    
        return (
            <>
                <div>
                    <div className="landing-container">
                        <h1>Welcome to TCG Wiki</h1>
                        <p>An amazing website where you can search ALL the PTCG cards and build your own deck.</p>
                        <h2>Let's get started!</h2>
                        <div className="button-div">
                            <Link to="/decks" >
                                    <button className="landing-button">Build deck</button>
                            </Link>
                            <Link to="/search" >
                                <button className="landing-button">Search card</button>
                            </Link>
                        </div>
                    </div>
                    <Carousel showThumbs={false} autoPlay={true} interval={2000} infiniteLoop={true}>
                        <div className="landing-cards">
                            {carouselCards1.map(element => <Card key={element.id} img={element.images.small}></Card>)}
                        </div>
                        <div className="landing-cards">
                            {carouselCards2.map(element => <Card key={element.id} img={element.images.small}></Card>)}
                        </div>
                        <div className="landing-cards">
                            {carouselCards3.map(element => <Card key={element.id} img={element.images.small}></Card>)}
                        </div>
                    </Carousel>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Loading></Loading>
            </>
        )
    }
}

export {Landing}