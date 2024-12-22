import React from "react";
import * as C from "./styles";

const ButtonSmall = ({ Text, onClick, Type = "button" }) => {

    return ( 
        <C.ButtonSmall type={Type} onClick={onClick}>
            {Text}
        </C.ButtonSmall>
    )
}

export default ButtonSmall;