import React from 'react';
import './Papad.scss'
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types';
import { useHistory,withRouter } from "react-router-dom";

class Papad extends React.Component {
    static contextTypes = {
        router: PropTypes.object
      }  
      
  handleClick = (e) =>{
    const history = useHistory();

    const routeChange = () =>{ 
      let path = `/papad_details`; 
      history.push(path);
    }
  }
    render() {
        return (
            <div className="papad">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="card" >
  <div className="card-body" >
   <button type="button" className="playButton" onClick={this.handleClick}>Play</button>
   
  </div>
</div>
            </div>
        );
    }
}

export default withRouter(Papad);