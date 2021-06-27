import { useEffect, useState } from "react";
import colorLess from './img/colorLess.png';
import dark from './img/dark.png';
import dragon from './img/dragon.png';
import electric from './img/electric.png';
import fairy from './img/fairy.png';
import fight from './img/fight.png';
import fire from './img/fire.png';
import grass from './img/grass.png';
import psychic from './img/psychic.png';
import steel from './img/steel.png';
import water from './img/water.png';






function Type(props) {

    const [type, setType] = useState()



    // switch (props.types[0]) {
    //     case "Colorless":
    //         setType(colorLess)
    //         break;
    //     case "Darkness":
    //         setType(dark)
    //         break;
    //     case "Dragon":
    //         setType(dragon)
    //         break;
    //     case "Fairy":
    //         setType(fairy)
    //         break;
    //     case "Fighting":
    //         setType(fight)
    //         break;
    //     case "Fire":
    //         setType(fire)
    //         break;
    //     case "Grass":
    //         setType(grass)
    //         break;
    //     case "Lightning":
    //         setType(electric)
    //         break;
    //     case "Metal":
    //         setType(steel)
    //         break;
    //     case "Psychic":
    //         setType(psychic)
    //         break;
    //     case "Water":
    //         setType(water)
    //         break;
    //     default:
    //         console.log("error");
    //         break;
    // }






    return (
        <>
            <img src={type} alt=""/>
        </>
    )
}

export { Type }