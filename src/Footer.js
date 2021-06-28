
function Footer() {
    return (
        <>
            <div className="footer">
                <p>All data available in <a href="https://pokemontcg.io/">Pokémon TCG API</a></p>
                <p>Pokémon TCG Wiki created by Juan Gianina</p>
                <div className="icons">
                    <a href="https://github.com/JuanG96" className="github-icon"><i className="fab fa-github-square fa-2x"></i></a>
                    <a href="https://linkedin.com/in/juan-gianina" className="linkedin-icon"><i className="fab fa-linkedin fa-2x"></i></a>
                </div>
            </div>
        </>
    )
}

export { Footer }