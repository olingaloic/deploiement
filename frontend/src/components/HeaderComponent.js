import React, {Component} from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NotLoggedInNav() {
    return (
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
    );
}

function GestionnaireNav() {
    return (
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/gestionnaireStage">Liste des stages</Nav.Link>
            <Nav.Link href="/etudiants">Liste d'étudiants</Nav.Link>
            <Nav.Link href="/gestionnaire">Votre profil</Nav.Link>
            <Nav.Link href="/stageVeto">Liste des stages</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
    );
}

function EmployeurNav() {
    return (
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/createStage">Créer un stage</Nav.Link>
            <Nav.Link href="/stages">Voir toutes les offres de stage</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
    );
}

function EtudiantNav() {
    return (
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/etudiant">Votre profil</Nav.Link>
            <Nav.Link href="/offrestage">Offres de stage</Nav.Link>
            <Nav.Link href="/listecandidatures">Vos candidatures</Nav.Link>

            <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
    );
}


function NavType(props) {
    if (props.desc.toUpperCase() === "ETUDIANT")
        return <EtudiantNav/>
    else if (props.desc.toUpperCase() === "EMPLOYEUR")
        return <EmployeurNav/>
    else if (props.desc.toUpperCase() === "GESTIONNAIRE")
        return <GestionnaireNav/>
    else
        return <NotLoggedInNav/>
}

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {desc: localStorage.getItem("desc") == null ? "" : localStorage.getItem("desc")}

    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">
                    Projet intégré équipe 1
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavType desc={this.state.desc}/>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default HeaderComponent;