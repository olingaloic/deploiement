import CV from "./CV";
import User from "./User";

export default class Etudiant extends User {
    id;
    prenom = "";
    matricule = "";
    programme = "";
    adresse = "";
    statutStage = "";
    stage;
    cv = new CV();
}