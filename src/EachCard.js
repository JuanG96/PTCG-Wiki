import { useEffect, useState } from "react";
import Colorless from "./img/Colorless.png"
import Darkness from "./img/Darkness.png"
import Dragon from "./img/Dragon.png"
import Fairy from "./img/Fairy.png"
import Fighting from "./img/Fighting.png"
import Fire from "./img/Fire.png"
import Grass from "./img/Grass.png"
import Lightning from "./img/Lightning.png"
import Metal from "./img/Metal.png"
import Psychic from "./img/Psychic.png"
import Water from "./img/Water.png"

import Modal from 'react-modal';
Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgb(88, 88, 88)',
        border: '1px solid black',
        boxShadow: '5px 5px rgb(56, 56, 56)'

    },
};




function EachCard(props) {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalText, setModalText] = useState("")

    let openModal = () => {
        setIsOpen(true);
    }

    let afterOpenModal = () => {
        // references are now sync'd and can be accessed.
    }

    let closeModal = () => {
        setIsOpen(false);
        window.location.reload()
    }

    const [card, setCard] = useState({
        "id": "",
        "name": "",
        "supertype": "",
        "subtypes": [],
        "level": "",
        "hp": "",
        "types": [],
        "evolvesFrom": "",
        "attacks": [],
        "weaknesses": [],
        "resistances": [],
        "retreatCost": [],
        "convertedRetreatCost": 0,
        "set": {
            "id": "",
            "name": "",
            "series": "",
            "printedTotal": 0,
            "total": 1302,
            "legalities": {
                "unlimited": ""
            },
            "ptcgoCode": "",
            "releaseDate": "",
            "updatedAt": "",
            "images": {
                "symbol": "",
                "logo": ""
            }
        },
        "number": "",
        "artist": "",
        "rarity": "",
        "nationalPokedexNumbers": [],
        "legalities": {
            "unlimited": ""
        },
        "images": {
            "small": "",
            "large": ""
        },
        "tcgplayer": {
            "url": "",
            "updatedAt": "",
            "prices": {
                "holofoil": {
                    "low": 0,
                    "mid": 0,
                    "high": 0,
                    "market": 0,
                    "directLow": 0
                },
                "1stEditionHolofoil": {
                    "low": 0,
                    "mid": 0,
                    "high": 0,
                    "market": 0,
                    "directLow": 0
                }
            }
        }
    })
    const [type, setType] = useState("")



    let setId = props.match.params
    let API = "https://api.pokemontcg.io/v2/cards/" + setId.id

    

    useEffect(() => {
            fetch(API, {
                method: 'GET',
                headers: {
                    'x-api-key': '078f5182-ba40-4b8c-8946-788acbb1684b'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.data.supertype === "Pokémon") {
                        setCard(data.data)
                    } else if (data.data.supertype === "Trainer" || data.data.supertype === "Energy") {
                        setCard({
                            "id": "",
                            "name": "",
                            "supertype": "",
                            "subtypes": [],
                            "rules": [],
                            "set": {
                                "id": "",
                                "name": "",
                                "series": "",
                                "printedTotal": 0,
                                "total": 0,
                                "legalities": {
                                    "unlimited": "",
                                    "standard": "",
                                    "expanded": ""
                                },
                                "ptcgoCode": "",
                                "releaseDate": "",
                                "updatedAt": "",
                                "images": {
                                    "symbol": "",
                                    "logo": ""
                                }
                            },
                            "number": "",
                            "artist": "",
                            "rarity": "",
                            "legalities": {
                                "unlimited": "",
                                "standard": "",
                                "expanded": ""
                            },
                            "images": {
                                "small": "",
                                "large": ""
                            },
                            "tcgplayer": {
                                "url": "",
                                "updatedAt": "",
                                "prices": {
                                    "normal": {
                                        "low": 0,
                                        "mid": 0,
                                        "high": 0,
                                        "market": 0,
                                        "directLow": 0
                                    },
                                    "reverseHolofoil": {
                                        "low": 0,
                                        "mid": 0,
                                        "high": 0,
                                        "market": 0,
                                        "directLow": 0
                                    }
                                }
                            }
                        })
                        setCard(data.data)
                    }
                })
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
                            setModalText("Card added succesfully to your deck")
                            openModal()
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    } else {
                        setModalText("Maximum number of cards")
                        openModal()
                    }
                } else {
                    setModalText("Incorrect Id or password")
                    openModal()
                }
            })    
            .catch(error => {
                console.log(error);
            });    
    
    }

    let Types = (value) => {
        switch (value) {
            case "Colorless":
                return Colorless;
            case "Darkness":
                return Darkness;
            case "Dragon":
                return Dragon;
            case "Fairy":
                return Fairy;
            case "Fighting":
                return Fighting;
            case "Fire":
                return Fire;
            case "Grass":
                return Grass;
            case "Lightning":
                return Lightning;
            case "Metal":
                return Metal;
            case "Psychic":
                return Psychic;
            case "Water":
                return Water;
            default:
                console.log("hola");
                break;
        }
    }
    
    let hp = () => {
        if (card.supertype === "Pokémon") {
            return (
                <>
                    <div className="individual-card-hp">
                        <p>HP {card.hp}</p>
                        <img src={Types(card.types[0])} alt="Type" className="type-img" />
                    </div>
                </>
            )
        } else if (card.supertype === "Trainer" || card.supertype === "Energy") {
            return (
                <>
                </>
            )
        }
    }

    let showWeakness = () => {
        if (card.weaknesses.length !== undefined) {
            return (
                <>
                    <div className="weakness-div">
                        <h3 className="other-title">Weakness</h3>
                        <div className="type-value">
                            <img src={Types(card.weaknesses[0].type)} alt="Type" className="type-img" />
                            <p>{card.weaknesses[0].value}</p>
                        </div>
                    </div>
                </>
            )
        }
    }

    let showResistance = () => {
        if (card.resistances !== undefined) {
            return (
                <>
                    <div className="resistance-div">
                        <h3 className="other-title">Resistances</h3>
                        <div className="type-value">
                            <img src={Types(card.resistances[0].type)} alt="Type" className="type-img" />
                            <p>{card.resistances[0].value}</p>
                        </div>

                    </div>
                </>
            )
        }
    }

    let showRetreat = () => {
        if (card.retreatCost.length !== undefined) {
            return (
                <>
                    <div className="retreat-div">
                        <h3 className="other-title">Retreat cost</h3>
                        <div className="type-value">
                        {card.retreatCost.map((element, index) =>
                            <img src={Types(element)} key={index} alt="Type" className="type-img" />
                            )}
                        </div>

                    </div>
                </>
            )
        }
    }






    let attack = () => {
        if (card.supertype === "Pokémon") {
            return (
                <>
                    <div className="individual-card-attacks">

                        <h2>Attacks</h2>
                        {card.attacks.map((element, index) =>

                            <div key={index} className="individual-attack">
                                <div className="individual-attack-global">
                                    <div className="attack-name-div">
                                        <div className="attack-image-div">

                                            {element.cost.map((cost, costIndex) =>
                                                <img src={Types(cost)} key={costIndex} alt="Type" className="type-img" />
                                            )}
                                            <h3>{element.name}</h3>
                                        </div>
                                        <div className="attack-stats">
                                            <h4>{element.damage}</h4>
                                        </div>
                                    </div>
                                    <div className="attack-description">
                                        <p>{element.text}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="sub-stats">
                            {showWeakness()}
                            {showResistance()}
                            {showRetreat()}
                        </div>
                        <div className="other-stats">
                            <div className="otherInfo-div">
                                <h3 className="other-title">Artist</h3>
                                <p>{card.artist}</p>
                            </div>
                            <div className="otherInfo-div">
                                <h3 className="other-title">Rarity</h3>
                                <p>{card.rarity}</p>
                            </div>
                            <div className="otherInfo-div">
                                <h3 className="other-title">Number</h3>
                                <p>{card.number}/{card.set.printedTotal}</p>
                            </div>

                        </div>
                    </div>

                </>
            )
        } else if (card.supertype === "Trainer" || card.supertype === "Energy") {
            console.log(card);
            return (
                <>
                    <div className="trainer-rules">
                        {card.rules.map((element, index) =>
                        <p key={index} className="trainer-each-rule">{element}</p>
                        )}
                    </div>
                </>
            )
        }
    }


        return (
            <>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="modal-div">
                        <h1 className="modal-title">{modalText}</h1>
                        <button className="landing-button" onClick={closeModal}>Close</button>
                    </div>
                </Modal>

                <div className="individual-card-div">
                    <div className="individual-card-img">
                        <img className="" src={card.images.large} alt={card.name} />
                    </div>
                    <div className="individual-card-info">
                        <div className="individual-card-name">
                            <h1>{card.name}</h1>
                        </div>
                        {hp()}
                        <hr className="individual-card-hr"/>
                        <div className="individual-card-prices">
                            <h1>Prices</h1>
                            <a href={card.tcgplayer.url} className="tcg-link">Buy from TCGplayer</a>
                            {Object.values(card.tcgplayer.prices).map((valueElement, index) => 
                                    <div key={index} className="prices-div">
                                        <div>
                                            <h2>{Object.keys(card.tcgplayer.prices)[index]} MARKET</h2>
                                            <p className="market-price">${valueElement.market}</p>
                                        </div>
                                        <div>
                                            <h2>{Object.keys(card.tcgplayer.prices)[index]} LOW</h2>
                                            <p className="low-price">${valueElement.low}</p>
                                        </div>
                                        <div>
                                            <h2>{Object.keys(card.tcgplayer.prices)[index]} MID</h2>
                                            <p className="mid-price">${valueElement.mid}</p>
                                        </div>
                                        <div>
                                            <h2>{Object.keys(card.tcgplayer.prices)[index]} HIGH</h2>
                                            <p className="high-price">${valueElement.high}</p>
                                        </div>
                                    </div>                            
                            )}
                        </div>
                        <hr className="individual-card-hr" />


                        {attack()}

                        <hr className="individual-card-hr" />
                        <div className="individual-card-form-div">

                            <form onSubmit={(e) => addCard(e)} className="individual-card-form">
                                <input id="deckId" placeholder="Deck ID" className="form-input"/>
                                <input id="deckPass" placeholder="Deck Password" type="password" className="form-input"/>
                                <button className="landing-button">Add card</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
}

export {EachCard}