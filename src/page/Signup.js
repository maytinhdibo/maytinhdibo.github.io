import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { register } from './../services/API.js';
import { alertText } from './../dom.js';
import './../Login.css';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false
        }
    }
    signup = (e) => {
        e.preventDefault();
        if (document.getElementById("password").value != document.getElementById("repassword").value) {
            alertText("Two password incorrect!", true)
        } else
            alertText("Sending data....")
        register({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            name: document.getElementById("name").value
        }).then(
            object => {
                console.log(object);
                if (!object.success) {
                    alertText(object.message, true);
                } else {
                    alertText("Done!", true);
                    this.setState({
                        done: true
                    });
                }
            }
            );
    }
    render() {
        if (this.state.done) {
            return (<Redirect to="/" />);
        } else
            return (
                <div className="login-page">
                    <div id="login-form">
                        <Link to="/"><div className="back">&lsaquo;</div>	</Link>
                        <img alt="logo" src="img/logo.png" />
                        <form onSubmit={this.signup}>
                            <input id="name" placeholder="@yourname" />
                            <input id="email" placeholder="@youremail" />
                            <input className="signup-password" style={{ marginRight: "1%" }} id="password" placeholder="@password" type="password" />
                            <input className="signup-password" id="repassword" placeholder="@re-password" id="repassword" type="password" />
                            <button onClick={this.signup}>Signup!</button>
                        </form>
                    </div>
                </div>
            )
    }
}

export default Signup;