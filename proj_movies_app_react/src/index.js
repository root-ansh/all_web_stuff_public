import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NavBarWithRouter} from "./components/navBar";
import {MovieListSection} from "./components/movieListSection";


function App(){
    return (
        <>
            <NavBarWithRouter/>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);

