import { useEffect, useState } from "react";

function Decks() {
    const [cards, setCards] = useState([])
    
    let searchDeck = (e) => {
        e.preventDefault()
        let deckId = document.getElementById("deckId").value;
        let deckPass = document.getElementById("deckPass").value;
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
        let deckId = document.getElementById("deckId").value;
        let deckPass = document.getElementById("deckPass").value;
        const API = "http://localhost:3000";
        let newDeck = {
            id: deckId,
            password: deckPass,
            cards: []
        }
        fetch(`${API}/decks/`, {
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
                console.log(error);
            });
    }
    
    
    
    return (
        <>
            <div>
                <div className="decks-div">

                    <div className="search-deck">
                        <h2 className="forms-title">Search deck</h2>
                        <form onSubmit={(e) => searchDeck(e)} className="deck-forms">
                            <input id="deckId" placeholder="Deck ID" />
                            <button className="landing-button">Search</button>
                        </form>
                    </div>

                    <div className="new-deck">
                        <h2 className="forms-title">Create deck</h2>
                        <form onSubmit={(e) => addDeck(e)} className="deck-forms">
                            <input id="deckId" placeholder="Deck ID" />
                            <input id="deckPass" placeholder="Deck Password" type="password" />
                            <button className="landing-button">Create deck</button>
                        </form>
                    </div>
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
}

export { Decks }