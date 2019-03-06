import React, {Component} from 'react';
import './RoundedURLInput.css';

class RoundedURLInput extends Component {

    render() {
        return (
            <div className="RoundedURLInput">
                <div className="searchBarWrapper">
                    <input onKeyDown={async (event)=>{
                        if(event.keyCode == 13){
                            window.location.href='/search/'+event.target.value;
                        }
                    }} type="url" placeholder="CTRL+V URL"></input>
                    <div className="captureBtnDiv">
                    </div>
                </div>
            </div>
        );
    }
}

export default RoundedURLInput;