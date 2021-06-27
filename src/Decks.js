import { useEffect, useState } from "react";

function Decks() {
    const [cards, setCards] = useState([])
    const [status, setStatus] = useState(false)
    
    let searchDeck = (e) => {
        e.preventDefault()
        let deckId = document.getElementById("deckIdSearch").value;
        const API = "http://localhost:3000";

        fetch(`${API}/decks/` + deckId)
            .then(response => response.json())
            .then(data => {
                console.log(data.cards);
                setCards(data.cards);
                console.log(cards);
            })
            .catch(error => {
                console.log(error);
            });
    }

    let addDeck = (e) => {
        e.preventDefault()
        let deckId = document.getElementById("deckIdAdd").value;
        let deckPass = document.getElementById("deckPassAdd").value;
        const API = "http://localhost:3000";
        let newDeck = {
            id: deckId,
            password: deckPass,
            cards: []
        }
        fetch(`${API}/decks`, {
            method: "POST",
            body: JSON.stringify(newDeck),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            alert("There is another deck with the same ID")
        });
                        
    }
    
    let showTitle = () => {
        if (cards.length !== 0) {
            return (
                <h2 className="your-deck">
                    Your deck
                </h2>
            )
        } else {
            return (<></>)
        }
    }
    
    let deleteCard = (e,cardIndex) => {
        e.preventDefault()
        let deckId = document.getElementById("deckIdEdit").value;
        // let deckPass = document.getElementById("deckPass").value;
        const API = "http://localhost:3000";
        let completeDeck

        fetch(`${API}/decks/` + deckId)
            .then(response => response.json())
            .then(data => {

                        completeDeck = data
                        completeDeck.cards.splice(cardIndex, 1)
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
                                alert("Card deleted succesfully")
                            })
                            .catch(error => {
                                console.log(error);
                            });
            })
    }

    let editDeck = (e) => {
        e.preventDefault()
        let deckId = document.getElementById("deckIdEdit").value;
        let deckPass = document.getElementById("deckPassEdit").value;
        const API = "http://localhost:3000";

        fetch(`${API}/decks/` + deckId)
            .then(response => response.json())
            .then(data => {
                if (data.password === deckPass) {

                    console.log(data.cards);
                    setCards(data.cards);
                    console.log(cards);
                    setStatus(true)
                } else {
                    alert("Incorrect Id or password")
                }
                })
                .catch(error => {
                    console.log(error);
                });
    }

    let deleteButton = (pIndex) => {
        if (status) {
            return (
                <div className="delete-div">
                    <button onClick={(e) => deleteCard(e, pIndex)} className="delete-button">X</button>
                </div>
            )
        } else {
            return (
                <>
                </>
            )
        }

    }

    return (
        <>
            <div>
                <div className="decks-div">

                    <div className="search-deck">
                        <h2 className="forms-title">Search deck</h2>
                        <form onSubmit={(e) => searchDeck(e)} className="deck-forms">
                            <input id="deckIdSearch" placeholder="Deck ID" className="form-input" />
                            <button className="landing-button">Search</button>
                        </form>
                    </div>

                    <div className="edit-deck">
                        <h2 className="forms-title">Edit deck</h2>
                        <form onSubmit={(e) => editDeck(e)} className="deck-forms">
                            <input id="deckIdEdit" placeholder="Deck ID" className="form-input" />
                            <input id="deckPassEdit" placeholder="Deck Password" type="password" className="form-input" />
                            <button className="landing-button">Edit deck</button>
                        </form>
                    </div>

                    <div className="new-deck">
                        <h2 className="forms-title">Create deck</h2>
                        <form onSubmit={(e) => addDeck(e)} className="deck-forms">
                            <input id="deckIdAdd" placeholder="Deck ID" className="form-input" />
                            <input id="deckPassAdd" placeholder="Deck Password" type="password" className="form-input" />
                            <button className="landing-button">Create deck</button>
                        </form>
                    </div>
                </div>

                {showTitle()}

                <div className="set-cards">
                    {cards.map((element, index) =>
                        <div key={index}>
                            <div className="each-card">
                                <a  href={"/#/eachCard/" + element.id} >
                                <div>
                                    <img className="" src={element.images.small} alt={element.name} />
                                </div>
                                </a>
                            </div>
                            {deleteButton(index)}
                        </div>

                    )}
                </div>

            </div>
        </>
    )
}

export { Decks }