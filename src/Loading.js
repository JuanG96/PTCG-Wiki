import gif from './img/Rolling-1.2s-200px.gif';

function Loading() {
    return (
        <>
            <div className="loading-div">
                <h1>Loading...</h1>
                <img src={gif} alt="this slowpoke moves" className="gif" />
            </div>

        </>
    )
}

export {Loading}