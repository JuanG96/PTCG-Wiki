import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'

function Navbar() {
    return (
        <>
        <header>
                <div className="container">
                    <a href="/#" className="logo" >TCG Wiki</a>
                    <nav>
                        <ul>
                            <li><a href="/#/sets">SETS</a></li>
                            <li><a href="/#/decks">DECKS</a></li>
                            <li><a href="/#/search">SEARCH</a></li>
                            <li><a href="/#/about">ABOUT</a></li>
                            <li><a href="/#/buy">BUY</a></li>
                            <li><a href=""><FontAwesomeIcon icon={faLightbulb} /></a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export {Navbar}