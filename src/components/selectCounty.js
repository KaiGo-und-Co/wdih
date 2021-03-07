import React, {Component, Fragment} from 'react';
import states from '../data/states.json'
import counties from '../data/counties.json'

class SelectCounty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedState: "8",
            selectedCounty: "none"
        }
    }

    onStateChange(event){
        this.setState({
            selectedState: event.target.value,
            selectedCounty: "none"
        })
    }

    onCountyChange(event){
        this.setState({
            selectedCounty: event.target.value
        })
        console.log(event.target.value);
    }

    stateSelect() {
        const options = states.map(state => (
            <option value={state.BL_ID}>{state.BL}</option>
        ));

        return (
            <select name='state' id='state' value={this.state.selectedState} onChange={this.onStateChange.bind(this)}>
                {options}
            </select>
        )
    }

    countySelect() {
        const countiesInState = counties.filter(county => county.BL_ID === this.state.selectedState);
        let options = countiesInState.map(county => (
            <option value={county.GEN}>{`${county.BEZ} ${county.GEN}`}</option>
        ));
        options.unshift(
            <option value="none">Bitte wählen</option>
        )

        return (
            <select name='county' id='county' value={this.state.selectedCounty} onChange={this.onCountyChange.bind(this)}>
                {options}
            </select>
        )
    }

    render() {
        return(
            <Fragment>
                {this.stateSelect()}
                {this.countySelect()}
            </Fragment>
        )
    }
}
export default SelectCounty;