function About() {
    return (
        <>
            <div className="about container">
                <h1>Guide</h1>
                <p>Pokémon TCG Wiki is an application where you can search all available cards from the current sets.</p>
                <p>You can search by set or by card.</p>
                <p>If you want to search by card, you can search them by name or some filters.</p>

                <h2>Decks</h2>
                <p>Here you can simulate your deck, it has a limit of 60 cards. And you can share your ID with your friends, so they can also see your deck.</p>
                <p>To create or edit a deck you need to put a password. DO NOT SHARE YOUR PASSWORD.</p>

                <h2>Technical Documentation</h2>
                <p>Pokémon TCG Wiki is an application based on React, retrieving data from the <a href="https://pokemontcg.io/">Pokémon TCG API.</a></p>
                <p>For the styling I use Sass, and the json-server as a database to manage the decks.</p>
                <p>As React libraries, I used json-server, react-modal, react-router, react-carousel.</p>

                <h2>Further improvements</h2>
                <ul>
                    <li>Add more filters to search cards.</li>
                    <li>A map where you can find all the stores near you to buy Pokémon cards.</li>
                    <li>Statistics from your deck.</li>
                    <li>Add button dark/light mode.</li>
                    <li>Create an Image Magnifier Glass over the card images.</li>
                </ul>
            </div>

        </>
    )
}

export { About }