package com.equipe1.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Courriel {

    public Courriel(String destinataire, String sujet, String contenu) {
        this.destinataire = destinataire;
        this.sujet = sujet;
        this.contenu = contenu;
    }
    private String destinataire;
    private String emetteur;
    private String sujet;
    private String contenu;
}
