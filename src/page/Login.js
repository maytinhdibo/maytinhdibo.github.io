import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { login } from './../services/API.js';
import './../Login.css';
import { alertText } from '../dom';
class Login extends Component {
    login = (e) => {
        e.preventDefault();
        alertText("Sending....");
        login({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        }).then(object => {
            console.log(object);
            if(object.success){
               localStorage.name=object.data.user.name;
               localStorage.auth=object.data.accessToken;
               this.props.changeAuth(true);
            }else{
                alertText(object.message,true);
            }
        }
            );
    }
    render() {
        if (this.props.auth) {
            return <Redirect to="/home" />;
        } else
            return (
                <div className="login-page">
                    <div id="login-form">
                        <img alt="logo" src="img/logo.png" />
                        <form onSubmit={this.login}>
                        <input id="email" placeholder="@username" />
                        <input id="password" placeholder="@password" type="password" />
                        <button onClick={this.login}>Let's go!</button>
                        </form>
                        <p>Do you have an account?
                         <Link to="/signup"> Sign Up</Link>
                        </p>
                    </div>
                </div>
            )
    }
}

export default Login;