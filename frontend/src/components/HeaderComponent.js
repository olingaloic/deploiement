import React, {Component} from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SessionService from "../service/SessionService";

import AuthService from "../service/security/auth.service";

function Logout(){
    function handleSelect(){
        AuthService.logout();
    }
    return (
        <Nav.Link href="/?refresh" onSelect={handleSelect} className="ml-auto">SE DÉCONNECTER</Nav.Link>
    );
}

function NotLoggedInNav() {
    return (
        <Nav className="ml-auto">
            <Nav.Link href="/login">CONNEXION</Nav.Link>
            <Nav.Link href="/register">INSCRIPTION</Nav.Link>
        </Nav>
    );
}

function GestionnaireNav(props) {
    return (
        <Nav className="container-fluid">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/profilGestionnaire">Votre profil</Nav.Link>
            <Nav.Link href="/rapportEnseignant">Enseignants</Nav.Link>
            <Nav.Link href="/rapportEtudiant/0">Étudiants</Nav.Link>
            <Nav.Link href="/rapportStage/0">Stages</Nav.Link>
            <Nav.Link href="/rapportContrat/0">Contrats</Nav.Link>
            <Nav.Link href="/rapportEvaluations">Évaluations</Nav.Link>
            <ChangeSessionNavDropdown sessions={props.sessions}/>
            <Logout/>
        </Nav>
    );
}

function EmployeurNav(props) {

    return (
        <Nav className="container-fluid">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/profilEmployeur">Votre profil</Nav.Link>
            <Nav.Link href="/createStage">Créer un stage</Nav.Link>
            <Nav.Link href="/rapportStageEmployeur">Voir toutes les offres de stage</Nav.Link>
            <Nav.Link href="/listeContrats/0">Contrats</Nav.Link>
            <Nav.Link href="/evaluationsEmployeur">Évaluations stagiaires</Nav.Link>
            <ChangeSessionNavDropdown sessions={props.sessions}/>
            <Logout/>
        </Nav>
    );
}

function EtudiantNav(props) {
    return (
        <Nav className="container-fluid">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/profilEtudiant/0">Votre profil</Nav.Link>
            <Nav.Link href="/offrestage">Offres de stage</Nav.Link>
            <Nav.Link href="/listecandidatures">Vos candidatures</Nav.Link>
            <Nav.Link href="/listeContrats/0">Contrats</Nav.Link>
            <ChangeSessionNavDropdown sessions={props.sessions}/>
            <Logout/>

        </Nav>
    );
}

function EnseignantNav() {

    return (
        <Nav className="container-fluid">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/profilEnseignant">Votre profil</Nav.Link>
            <Nav.Link href="/etudiantsEnCharge">Étudiants en charge</Nav.Link>
            <Nav.Link href="/evaluationMilieuStageHome">Évaluations milieu de stage</Nav.Link>
            <Logout/>
        </Nav>
    );
}

function ChangeSessionNavDropdown(props) {
    let nomSession = window.localStorage.getItem("nomSession");

    return (
        <NavDropdown title={nomSession} id="nav-dropdown">
         {props.sessions.map(
                data =>
                    <NavDropdown.Item key={data.id} eventKey="4.1" onClick={() => changeSession(data.id, data.nom)}>{data.nom}</NavDropdown.Item>
            )}
        </NavDropdown>
    );
}


async function changeSession(id, nom) {
    await SessionService.changeSession(id, nom);
    setTimeout(function() {
        window.location.reload();
    }, 200);
}

function NavBrand(props){
    if (props.desc.toUpperCase() === "ROLE_ETUDIANT")
        return <Navbar.Brand href="/">
                    ÉTUDIANT
                </Navbar.Brand>
    else if (props.desc.toUpperCase() === "ROLE_EMPLOYEUR")
        return <Navbar.Brand href="/">
                    EMPLOYEUR
                </Navbar.Brand>
    else if (props.desc.toUpperCase() === "ROLE_GESTIONNAIRE")
        return <Navbar.Brand href="/">
                    GESTIONNAIRE
                </Navbar.Brand>
    else if (props.desc.toUpperCase() === "ROLE_ENSEIGNANT")
        return <Navbar.Brand href="/">
                    ENSEIGNANT
                </Navbar.Brand>
    else
        return <Navbar.Brand href="/">
                    Projet intégré équipe 1
                </Navbar.Brand>
}

function NavType(props) {
    if (props.desc.toUpperCase() === "ROLE_ETUDIANT")
        return <EtudiantNav sessions={props.sessions}/>
    else if (props.desc.toUpperCase() === "ROLE_EMPLOYEUR")
        return <EmployeurNav sessions={props.sessions}/>
    else if (props.desc.toUpperCase() === "ROLE_GESTIONNAIRE")
        return <GestionnaireNav sessions={props.sessions}/>
    else if (props.desc.toUpperCase() === "ROLE_ENSEIGNANT")
        return <EnseignantNav sessions={props.sessions} />
    else
        return <NotLoggedInNav/>
}

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {desc: AuthService.getTokenDESC() === null ? "" : AuthService.getTokenDESC(), sessions: []}
    }

    async componentDidMount() {
        const { data: sessions } = await SessionService.getAllSessions();
        this.setState({ sessions });
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <NavBrand
                    desc={this.state.desc}
                />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavType
                        desc={this.state.desc}
                        sessions={this.state.sessions}
                    />

                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default HeaderComponent;