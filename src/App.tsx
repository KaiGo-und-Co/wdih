import React from 'react';
import logo from './logo.svg';

import './App.css';
import SelectCounty from "./components/selectCounty";
import CaseModel from './models/cases';

function App() {
    new CaseModel().get7DayCases().then(res => console.log(res));

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <SelectCounty/>
            </header>
        </div>
    );
}

export default App;
