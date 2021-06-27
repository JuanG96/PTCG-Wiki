import { useEffect, useState } from "react";

function Search() {
    const [cards, setCards] = useState([])


    let searchCard = (e) => {
        e.preventDefault()
        let cardName = document.getElementById("cardName").value;
        let API = "https://api.pokemontcg.io/v2/cards/?q=name:" + cardName + "*"

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



    return (
        <>
            <form onSubmit={(e) => searchCard(e)}>
                <input id="cardName" placeholder="Card name" />
                <button className="landing-button">Search card</button>
            </form>

            <div className="set-cards">
                {cards.map(element =>
                    <a key={element.id} href={"/#/eachCard/" + element.id} className="each-card">
                        <div>
                            <img className="" src={element.images.small} alt={element.name} />
                        </div>
                    </a>

                )}
            </div>


        </>
    )
}

export { Search }