package com.equipe1.model;

public interface Rappel {

    enum EtudiantRappel implements Rappel {
        PAS_DE_CV, PAS_DE_CANDIDATURE_SUR_UN_STAGE, SIGNATURE_MANQUANTE_SUR_UN_CONTRAT, PAS_ENREGISTRE_CETTE_SESSION, FREQUENTATION_DE_STAGE_PAS_CONFIRMEE
    }

    enum EmployeurRappel implements Rappel {
        SIGNATURE_MANQUANTE_SUR_UN_CONTRAT, PAS_DE_STAGE_OUVERT_CETTE_SESSION
    }

    enum GestionaireRappel implements Rappel {
        CV_SANS_VETO, STAGE_SANS_VETO, CONTRAT_PRET_A_ETRE_GENERE,
        SIGNATURE_A_APPROUVER_EMPLOYEUR, SIGNATURE_A_APPROUVER_ETUDIANT
    }
}
