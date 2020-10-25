import React, { Component } from 'react';
import '../../App.css';
import { Tab, Nav, Col, Row } from 'react-bootstrap';
import GestionnaireProfile from './GestionnaireProfile';
import GestionnaireUpdate from './GestionnaireUpdate';

export default class GestionnaireOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 'first',
        };
    }

    render(){
        
        return (

			<div className="container">
                
                <div className="col">
                <div className="card p-3 m-3">

                <Tab.Container id="left-tabs-example" 
                            defaultActiveKey="first" 
                            activeKey={this.state.key} 
                            onSelect={key => this.setState({ key })}>
                    <Row>
                        <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                            <Nav.Link eventKey="first">Votre profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="second">Changer mot de passe</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <GestionnaireProfile/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <GestionnaireUpdate/>
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
			    
                </div>
                </div>

            </div>

		);
    }
}