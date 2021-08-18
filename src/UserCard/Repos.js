import React from "react";
import './Card.css';

function Repo(props){

    return(
        <div className="row repo">
            <div className="col-lg-6" style={{textAlign:'left'}}>
                <span className="repo_name">{props.repo_name}</span>
            </div>
            <div className="col-lg-6" style={{textAlign:"right"}}>
                <a  href={props.repo_url}>
                    <button className="go_to_btn">
                    <span>Перейти </span>
                    </button>
                    </a>
            </div>
            
        </div>
    )
}

export default Repo;