import React, { Component } from 'react';
import '../App.css';
import './../css/Register.css';
import { Tab, Tabs } from 'react-bootstrap';
import EmployeurRegister from '../components/employeur/EmployeurRegister';
import EtudiantRegister from './EtudiantRegister';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 'etudiant',
        };
    }

    render(){
        
        return (

			<div className="container">
				<div className="container">
					<Tabs
						id="controlled-tab-example"
						activeKey={this.state.key}
						onSelect={key => this.setState({ key })}
					>
						<Tab eventKey="etudiant" title="Etudiant">
							<EtudiantRegister/>
						</Tab>
						<Tab eventKey="employeur" title="Employeur">
							<EmployeurRegister/>
						</Tab>
					</Tabs>
				</div>
			</div>

		);
    }
}