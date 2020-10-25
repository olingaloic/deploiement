import React, { Component } from 'react';
import './../App.css';
import './../css/Register.css';
import LoginService from "../service/LoginService";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {user : {}, isNotlogin : false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    async handleSubmit(event) {
        event.preventDefault();

        let user = await LoginService.login(this.state["email"], this.state["password"])
        if (user.id !== undefined){
            this.props.history.push('/?refresh');
        }else{
            this.setState({isNotlogin : true})
        }
    }

    render(){

        
        return (
            <div className="formBox">
                <h3>Login</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input type="email" name="email" onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" onChange={this.handleChange} />
                     
                    </label>
                    <input type="submit" value="Login"/>
                    {this.state.isNotlogin &&
                         <div className="alert alert-danger mt-3" role="alert">
                         Email ou password invalide
                       </div>
                    }
                </form>

               

        
            </div>
        );
    }
}

