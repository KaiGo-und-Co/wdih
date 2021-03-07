import {Component} from "react";


class ValueDisplay extends Component {
    render() {
        return (
            <div className="valueDisplay-container">
                <div className={"valueDisplay-headline"}>
                    Fälle der letzten 7 Tage:
                </div>
                <div className={"valueDisplay-value"}>
                    {this.props.cases7Days}
                </div>
            </div>
        );
    }
}

export default ValueDisplay;