import Employeur from './Employeur'
export default class Stage{
    id;
    titre = "";
    description = "";
    exigences= "";
    dateDebut= "";
    dateFin= "";
    nbHeuresParSemaine= "";
    salaire= "";
    nbAdmis= "";
    isOuvert;
    statut;
    dateLimiteCandidature= "";
    programme= "";
    ville ="";
    etudiantsAdmits = [];
    employeur= new Employeur();
}