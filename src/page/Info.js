import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Info extends Component {

    render() {
            return (
                <div className="popup">
                    <div className="popup-content">
                        <h2>App information</h2>
                        <li>Desgin: Tran Manh Cuong</li>
                        <li>API: UETCodeCamp</li>
                        <li>Github Repo: <a target="_blank" rel="noopener noreferrer" href="https://github.com/maytinhdibo/uetcodecamp">maytinhdibo/uetcodecamp</a></li>
                        <p>This app build for responsive design, please test on mobile mode and desktop mode both.</p>
                        <div style={{textAlign:"center",paddingTop:"12px"}}><i>Thanks for Mr. Minh and Mr. Tu</i></div>
                        <Link to="/home"><div className="button">Close</div></Link>
                    </div>
                </div>
            )
    }
}

export default Info;