import { useEffect, useState } from "react";
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


function Decks() {
    const [cards, setCards] = useState([])
    const [status, setStatus] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalText, setModalText] = useState("")

    // Search a deck from the db by id
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

    // Add a new deck to the db
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
            setModalText("Deck created")
            openModal()
        })
            .catch(error => {
                setModalText("There is another deck with the same ID")
                openModal()
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
    
    // Deletes a card from a specific deck
    let deleteCard = (e,cardIndex) => {
        e.preventDefault()
        let deckId = document.getElementById("deckIdEdit").value;
        const API = "http://localhost:3000";
        let completeDeck

        fetch(`${API}/decks/` + deckId)
            .then(response => response.json())
            .then(data => {
                        completeDeck = data
                        completeDeck.cards.splice(cardIndex, 1)
                        fetch(`${API}/decks/` + deckId, {
                            method: "PATCH",
                            body: JSON.stringify(completeDeck),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                setModalText("Card deleted succesfully from the deck")
                                openModal()
                            })
                            .catch(error => {
                                console.log(error);
                            });
            })
    }

    // Shows the deck, but it cheks the password, and puts a button to delete a card from the deck.
    let editDeck = (e) => {
        e.preventDefault()
        let deckId = document.getElementById("deckIdEdit").value;
        let deckPass = document.getElementById("deckPassEdit").value;
        const API = "http://localhost:3000";

        fetch(`${API}/decks/` + deckId)
            .then(response => response.json())
            .then(data => {
                if (data.password === deckPass) {
                    setCards(data.cards);
                    setStatus(true)
                } else {
                    setModalText("Incorrect Id or password")
                    openModal()
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
    let openModal =() =>{
        setIsOpen(true);
    }

    let afterOpenModal=()=> {
    }

    let closeModal=()=> {
        setIsOpen(false);
        window.location.reload()
    }

    if (cards !== undefined) {
        
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

                <div>
                    <div className="decks-div">
    
                        <div className="search-deck">
                            <h2 className="forms-title">Search deck</h2>
                            <form onSubmit={(e) => searchDeck(e)} className="deck-forms">
                                <input id="deckIdSearch" placeholder="Deck ID" className="form-input form-input-margin" />
                                <button className="landing-button">Search</button>
                            </form>
                        </div>
    
                        <div className="edit-deck">
                            <h2 className="forms-title">Edit deck</h2>
                            <form onSubmit={(e) => editDeck(e)} className="deck-forms">
                                <input id="deckIdEdit" placeholder="Deck ID" className="form-input form-input-margin" />
                                <input id="deckPassEdit" placeholder="Deck Password" type="password" className="form-input form-input-margin" />
                                <button className="landing-button">Edit deck</button>
                            </form>
                        </div>
    
                        <div className="new-deck">
                            <h2 className="forms-title">Create deck</h2>
                            <form onSubmit={(e) => addDeck(e)} className="deck-forms">
                                <input id="deckIdAdd" placeholder="Deck ID" className="form-input form-input-margin" />
                                <input id="deckPassAdd" placeholder="Deck Password" type="password" className="form-input form-input-margin" />
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
}

export { Decks }