import { useEffect, useState } from "react";
import { Type } from "./Type";
import colorLess from './img/colorLess.png';
import dark from './img/dark.png';
import dragon from './img/dragon.png';
import electric from './img/electric.png';
import fairy from './img/fairy.png';
import fight from './img/fight.png';
import fire from './img/fire.png';
import grass from './img/grass.png';
import psychic from './img/psychic.png';
import steel from './img/steel.png';
import water from './img/water.png';

function EachCard(props) {

    const [card, setCard] = useState({ name: "", images: { large: "" }, types:[] })
    const [type, setType] = useState("")



    let setId = props.match.params
    let API = "https://api.pokemontcg.io/v2/cards/" + setId.id

    
    // let setTypeImg = (type) => {
    //     switch (type) {
    //         case "Colorless":
    //             setType(colorLess)
    //             break;
    //         case "Darkness":
    //             setType(dark)
    //             break;
    //         case "Dragon":
    //             setType(dragon)
    //             break;
    //         case "Fairy":
    //             setType(fairy)
    //             break;
    //         case "Fighting":
    //             setType(fight)
    //             break;
    //         case "Fire":
    //             setType(fire)
    //             break;
    //         case "Grass":
    //             setType(prevState => prevState = grass)
    //             break;
    //         case "Lightning":
    //             setType(electric)
    //             break;
    //         case "Metal":
    //             setType(steel)
    //             break;
    //         case "Psychic":
    //             setType(psychic)
    //             break;
    //         case "Water":
    //             setType(water)
    //             break;
    //         default:
    //             console.log("error");
    //             break;
    //     }

        
    // }


    useEffect(() => {
        const searchCard = () => {
            fetch(API, {
                method: 'GET',
                headers: {
                    'x-api-key': '078f5182-ba40-4b8c-8946-788acbb1684b'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setCard(data.data)
                    console.log(data.data);
                    console.log(card);

                })
        }
        searchCard()
    }, [])


    let addCard = (e) => {
        e.preventDefault()
        let deckId = document.getElementById("deckId").value;
        let deckPass = document.getElementById("deckPass").value;
        const API = "http://localhost:3000";
        let completeDeck

        fetch(`${API}/decks/` + deckId)
            .then(response => response.json())
            .then(data => {
                if (data.password === deckPass) {
                    if (data.cards.length < 3) {
                        
                        completeDeck = data
                        completeDeck.cards.push(card)
                        console.log(completeDeck);
                        fetch(`${API}/decks/` + deckId, {
                            method: "PATCH",
                            body: JSON.stringify(completeDeck),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    } else (
                        alert("Maximum number of cards")
                    )
                } else {
                    alert("Incorrect Id or password")
                }
            })    
            .catch(error => {
                console.log(error);
            });    
    
    }
            
        return (
            <>
                <div>
                    <div className="individual-card-div">
                        <img className="" src={card.images.large} alt={card.name} />
                    </div>
                    <div className="individual-card-name">
                        <h1>{card.name}</h1>
                    </div>
                    <div>
                        <form onSubmit={(e) => addCard(e)}>
                            <input id="deckId" placeholder="Deck ID"/>
                            <input id="deckPass" placeholder="Deck Password" type="password"/>
                            <button>Add card</button>
                        </form>
                    </div>
                </div>
            </>
        )
}

export {EachCard}