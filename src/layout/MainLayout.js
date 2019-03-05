import React,{Component} from 'react';
import './MainLayout.css';
import LogoComponent from "../component/LogoComponent";

class MainLayout extends Component {
    render() {
        return (
            <div className="MainLayout">
                <LogoComponent/>
            </div>
        );
    }
}

export default MainLayout;