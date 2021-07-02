import { useEffect, useState } from "react";
import { Loading } from "./Loading";


function SetCards(props) {

    const [cards, setCards] = useState([])


    let setId = props.match.params
    let API = "https://api.pokemontcg.io/v2/cards/?q=set.id:" + setId.id


    const searchCards = () => {
        fetch(API, {
                method: 'GET',
                headers: {
                    'x-api-key': '078f5182-ba40-4b8c-8946-788acbb1684b'
                }
            })
            .then(response => response.json())
            .then(data => {
                setCards(data.data)                    
            })
    }
        

    useEffect(() => {
        searchCards()
    }, [])
    
    console.log(props.match.params)


    if (cards.length !== 0) {

    return (
        <>
            <div>
                <div className="set-name-div">
                    <img src={cards[0].set.images.logo} alt="asd" className="set-name-img"/>
                    <h1 className="set-name-cards">{cards[0].set.name}</h1>
                </div>

            <div className="set-cards">
                {cards.map(element => 
                    <a key={element.id} href={"/#/eachCard/" + element.id} className="each-card">
                        <div>
                            <img className="" src={element.images.small} alt={element.name} />
                        </div>
                    </a>

                )}
            </div>
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

export {SetCards}