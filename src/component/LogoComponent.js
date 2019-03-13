import React, {Component} from 'react';
import './LogoComponent.css';

class LogoComponent extends Component {
    render() {
        return (
            <div className="LogoComponent" onClick={() => {
                window.location = "/";
            }}>
                <div className="CapDiv">
                    CAP
                </div>
                <div className="TubeDiv">
                    Tube
                </div>
            </div>
        )
    }
}

export default LogoComponent