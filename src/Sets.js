import { useEffect, useState } from "react";

function Sets() {
    const [sets, setSets] = useState([])


    let API = "https://api.pokemontcg.io/v2/sets?orderBy=-releaseDate"

    useEffect(() => {
    
        fetch(API, {
            method: 'GET',
            headers: {
                'x-api-key': '078f5182-ba40-4b8c-8946-788acbb1684b'
            }
        })
        .then(response => response.json())
            .then(data => {
                setSets(data.data)
                console.log(data)
            })
        
    }, [])
    

    return (
        <>
            <div className="setCards">
            {sets.map(element =>
                <a key={element.id} href={"/#/setCards/" + element.id} className="set-cards-a">
                    <div className="set-card">
                        <div className="div-img">
                            <img className="" src={element.images.logo} alt={element.name} />
                        </div>
                        <div className="set-name">
                            <img src={element.images.symbol} alt={element.name} />
                            <p>{element.name}</p>
                        </div>
                        <p>Release date: {element.releaseDate}</p>
                    </div>
                </a>
            )}
            </div>
        </>
    )
}

export {Sets}