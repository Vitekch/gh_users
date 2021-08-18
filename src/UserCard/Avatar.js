import React from "react";
import './Card.css';

function UserAvatar(props){

    return(
        <img className="Avatar" src={props.avatar} width={props.avatar_width} alt=":-D"/>
    )
}

export default UserAvatar;