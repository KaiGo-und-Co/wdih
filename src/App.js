import React, {Component} from 'react';

import CaseModel from './models/cases';
import SelectCounty from "./components/selectCounty";
import ValueDisplay from "./components/valueDisplay";

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cases7Days: "N/A"
        }
    }

    logCases(id) {
        new CaseModel().get7DayCases(id).then(res => {
            this.setState({
                cases7Days: res
            })
        })
    }

    render() {
        return (
            <div className="App">
                <SelectCounty onChange={this.logCases.bind(this)}/>
                <ValueDisplay cases7Days={this.state.cases7Days}/>
            </div>
        );
    }

}

export default App;
