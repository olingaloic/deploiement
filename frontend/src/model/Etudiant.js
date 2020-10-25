import CV from "./CV";
import User from "./User";

export default class Etudiant extends User {
    id;
    matricule = "";
    password = "";
    nom = "";
    prenom = "";
    programme = "";
    email = "";
    telephone = "";
    adresse = "";
    statutStage = "";
    stage;
    cv = new CV() ;
}