import React, {Component} from 'react';
import logo from './logo.svg';

import './App.css';
import SelectCounty from "./components/selectCounty";
import CaseModel from './models/cases';

class App extends Component {

    logCases(id: string) {
        new CaseModel().get7DayCases(id).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <SelectCounty onChange={this.logCases}/>
                </header>
            </div>
        );
    }

}

export default App;
