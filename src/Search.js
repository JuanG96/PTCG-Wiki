import { useEffect, useState } from "react";

function Search() {
    const [cards, setCards] = useState([])
    const [filters, setFilters] = useState(false)
    const [superTypes, setSuperTypes] = useState([])
    const [subTypes, setSubTypes] = useState([])
    const [types, setTypes] = useState([])


    useEffect(() => {

    let API2 = "https://api.pokemontcg.io/v2/"
    fetch(API2 + "supertypes", {
        method: 'GET',
        headers: {
            'x-api-key': '078f5182-ba40-4b8c-8946-788acbb1684b'
        }
    })
        .then(response => response.json())
        .then(data => {
            setSuperTypes(data.data)
        })

    fetch(API2 + "subtypes", {
        method: 'GET',
        headers: {
            'x-api-key': '078f5182-ba40-4b8c-8946-788acbb1684b'
        }
    })
        .then(response => response.json())
        .then(data => {
            setSubTypes(data.data)
        })

    fetch(API2 + "types", {
        method: 'GET',
        headers: {
            'x-api-key': '078f5182-ba40-4b8c-8946-788acbb1684b'
        }
    })
        .then(response => response.json())
        .then(data => {
            setTypes(data.data)
        })

    },[])

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

    let changeFilter = (e) => {
        e.preventDefault()
        setFilters(prevState => !prevState)
    }

    let filteredSearch = (e) => {
        let APIFilter = "https://api.pokemontcg.io/v2/cards/?q="

        let supertypesOption = document.getElementById("supertypes");
        let subtypesOption = document.getElementById("subtypes");
        let typesOption = document.getElementById("types");
        let cardName = document.getElementById("cardName");
        console.log(cardName.value);

        if (cardName.value !== "") {
            APIFilter += "name:" + cardName.value +"*"
        }


        if (supertypesOption.value !== "Supertypes") {
            APIFilter += " supertype:" + supertypesOption.value
        }

        if (subtypesOption.value !== "Subtypes") {
            APIFilter += " subtypes:" + subtypesOption.value
        }

        if (typesOption.value !== "Types") {
            APIFilter += " types:" + typesOption.value
        }

        fetch(APIFilter, {
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

    let showFilters = () => {
        if (filters) {
            return (
                <>
                    <div className="filters-div">
                        <div className="supertype-div">
                            <h2>Supertypes</h2>
                            <select className="select-filter" id="supertypes">
                                <option>Supertypes</option>
                                {superTypes.map((element, index) =>
                                    <option key={index}>{element}</option>
                                )}
                            </select>

                        </div>
                        <div className="subtype-div">
                            <h2>Subtypes</h2>
                            <select className="select-filter" id="subtypes">
                                <option>Subtypes</option>
                                {subTypes.map((element, index) =>
                                    <option key={index}>{element}</option>
                                )}
                            </select>

                        </div>
                        <div className="type-div">
                            <h2>Types</h2>
                            <select className="select-filter" id="types">
                                <option>Types</option>
                                {types.map((element, index) =>
                                    <option key={index} className="asd">{element}</option>
                                )}
                            </select>
                        </div>
                        <div className="filter-search-div">
                            <button className="landing-button" onClick={e => filteredSearch(e)}>Apply</button>
                        </div>

                    </div>
                </>
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
                <form onSubmit={(e) => searchCard(e)} className="search-div">
                    <input id="cardName" placeholder="Pokemon name" className="search-input"/>
                    <button className="landing-button search-button">Search card</button>
                    <button className="landing-button" onClick={e=>changeFilter(e)}>Filters</button>
                </form>
            {showFilters()}
 
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