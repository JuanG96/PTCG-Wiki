import './assets/scss/partials/card.scss';

function Card(props) {
    return (
        <>
            <img className="landing-img" src={props.img} alt={props.name} />
        </>
    )
}

export {Card}