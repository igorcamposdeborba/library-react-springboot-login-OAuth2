import React from 'react'
import "./Header.css";

export default (props) => {
    return (
        <header className="header d-none d-sm-flex flex-column"> {/*Diagramação com bootstrap para mobile*/}
            <h1 className="mt-3">
                <i className={`fa fa-${props.icon}`}></i> {props.title}  {/*Ícone do font-awesome*/}
            </h1>

            <p className="lead text-muted">{props.subtitle}</p>
        </header>
    )
}
