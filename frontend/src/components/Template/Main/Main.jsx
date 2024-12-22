import React, { Fragment } from 'react';
import "./Main.css";
import Header from '../Header/Header';

export default (props) => {
  return (
    <Fragment>
        <Header { ...props }/>
        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children}
            </div>
        </main>
    </Fragment>
    )
}

