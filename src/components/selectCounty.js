import React, {Component, Fragment} from 'react';

import CountyModel from "../models/counties";
import StateModel from "../models/states";

import './css/selectCounty.scss'

class SelectCounty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedState: "8",
            selectedCounty: "0"
        }
    }

    onStateChange(event){
        this.setState({
            selectedState: event.target.value,
            selectedCounty: "none"
        })
    }

    onCountyChange(event){
        const selectedCounty = event.target.value;
        this.setState({
            selectedCounty
        })
        this.props.onChange(selectedCounty);
    }

    stateSelect() {
        const options = StateModel.getStates().map(state => (
            <option value={state.BL_ID}>{state.BL}</option>
        ));

        return (
            <select name='state' id='state' value={this.state.selectedState} onChange={this.onStateChange.bind(this)}>
                {options}
            </select>
        )
    }

    countySelect() {
        let options = CountyModel.getCounties(this.state.selectedState).map(county => (
            <option value={county.RS}>{`${county.BEZ} ${county.GEN}`}</option>
        ));
        options.unshift(
            <option value="0">Bitte wählen</option>
        )

        return (
            <select name='county' id='county' value={this.state.selectedCounty} onChange={this.onCountyChange.bind(this)}>
                {options}
            </select>
        )
    }

    render() {
        return(
            <div className={"selectCounty-container"}>
                {this.stateSelect()}
                {this.countySelect()}
            </div>
        )
    }
}
export default SelectCounty;