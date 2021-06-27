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

    const [card, setCard] = useState({
        "id": "gym2-2",
        "name": "Blaine's Charizard",
        "supertype": "Pokémon",
        "subtypes": [
            "Stage 2"
        ],
        "level": "50",
        "hp": "100",
        "types": [
            "Fire"
        ],
        "evolvesFrom": "Blaine's Charmeleon",
        "attacks": [
            {
                "name": "Roaring Flames",
                "cost": [
                    "Fire"
                ],
                "convertedEnergyCost": 1,
                "damage": "20+",
                "text": "Discard all Fire Energy cards attached to Blaine's Charizard. If all Energy cards attached to Blaine's Charizard provide 2 Fire Energy, discard all of them. This attack does 20 damage plus 20 more damage for each Fire Energy discarded in this way."
            },
            {
                "name": "Flame Jet",
                "cost": [
                    "Fire",
                    "Fire"
                ],
                "convertedEnergyCost": 2,
                "damage": "",
                "text": "Flip a coin. If heads, choose 1 of your opponent's Pokémon. This attack does 40 damage to that Pokémon. Don't apply Weakness and Resistance for this attack. (Any other effects that would happen after applying Weakness and Resistance still happen.)"
            }
        ],
        "weaknesses": [
            {
                "type": "Water",
                "value": "×2"
            }
        ],
        "resistances": [
            {
                "type": "Fighting",
                "value": "-30"
            }
        ],
        "retreatCost": [
            "Colorless",
            "Colorless",
            "Colorless"
        ],
        "convertedRetreatCost": 3,
        "set": {
            "id": "gym2",
            "name": "Gym Challenge",
            "series": "Gym",
            "printedTotal": 132,
            "total": 132,
            "legalities": {
                "unlimited": "Legal"
            },
            "ptcgoCode": "G2",
            "releaseDate": "2000/10/16",
            "updatedAt": "2020/08/14 09:35:00",
            "images": {
                "symbol": "https://images.pokemontcg.io/gym2/symbol.png",
                "logo": "https://images.pokemontcg.io/gym2/logo.png"
            }
        },
        "number": "2",
        "artist": "Ken Sugimori",
        "rarity": "Rare Holo",
        "nationalPokedexNumbers": [
            6
        ],
        "legalities": {
            "unlimited": "Legal"
        },
        "images": {
            "small": "https://images.pokemontcg.io/gym2/2.png",
            "large": "https://images.pokemontcg.io/gym2/2_hires.png"
        },
        "tcgplayer": {
            "url": "https://prices.pokemontcg.io/tcgplayer/gym2-2",
            "updatedAt": "2021/06/25",
            "prices": {
                "holofoil": {
                    "low": 200.0,
                    "mid": 289.99,
                    "high": 450.0,
                    "market": 321.35,
                    "directLow": null
                },
                "1stEditionHolofoil": {
                    "low": 600.0,
                    "mid": 1028.51,
                    "high": 1499.9,
                    "market": 1363.57,
                    "directLow": null
                }
            }
        }
    })
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
        // const searchCard = () => {
            fetch(API, {
                method: 'GET',
                headers: {
                    'x-api-key': '078f5182-ba40-4b8c-8946-788acbb1684b'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setCard(data.data)
                    console.log(data.data.tcgplayer.prices);
                    console.log(card);

                })
        // }
        // searchCard()
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
                    if (data.cards.length < 60) {
                        
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
                            alert("Card added succesfully to your deck")
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
                <div className="individual-card-div">
                    <div className="individual-card-img">
                        <img className="" src={card.images.large} alt={card.name} />
                    </div>
                    <div className="individual-card-info">
                        <div className="individual-card-name">
                            <h1>{card.name}</h1>
                        </div>
                        <div className="individual-card-prices">
                            <h1>Prices</h1>
                            <a href={card.tcgplayer.url}>Buy from TCGplayer</a>
                            {/* <div>
                                <div>
                                    <h2>NORMAL MARKET</h2>
                                    <p>{card.tcgplayer.prices[0].market}</p>
                                </div>
                                <div>
                                    <h2>NORMAL LOW</h2>
                                    <p>{card.tcgplayer.prices[0].low}</p>
                                </div>
                                <div>
                                    <h2>NORMAL MID</h2>
                                    <p>{card.tcgplayer.prices[0].mid}</p>
                                </div>
                                <div>
                                    <h2>NORMAL HIGH</h2>
                                    <p>{card.tcgplayer.prices[0].high}</p>
                                </div>

                                <div>
                                    <h2>REVERSE HOLOFOIL MARKET</h2>
                                    <p>{card.tcgplayer.prices[1].market}</p>
                                </div>
                                <div>
                                    <h2>REVERSE HOLOFOIL LOW</h2>
                                    <p>{card.tcgplayer.prices[1].low}</p>
                                </div>
                                <div>
                                    <h2>REVERSE HOLOFOIL MID</h2>
                                    <p>{card.tcgplayer.prices[1].mid}</p>
                                </div>
                                <div>
                                    <h2>REVERSE HOLOFOIL HIGH</h2>
                                    <p>{card.tcgplayer.prices[1].high}</p>
                                </div>
                            </div> */}
                        </div>
                        <div className="individual-card-attacks">
                            <h2>Attacks</h2>
                            {card.attacks.map((element, index) => 
                                <div key={index}>
                                    <h3>{element.name}</h3>
                                    <h4>{element.damage}</h4>
                                </div>
                            )}
                        </div>
                        <div>
                            <form onSubmit={(e) => addCard(e)}>
                                <input id="deckId" placeholder="Deck ID"/>
                                <input id="deckPass" placeholder="Deck Password" type="password"/>
                                <button>Add card</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
}

export {EachCard}