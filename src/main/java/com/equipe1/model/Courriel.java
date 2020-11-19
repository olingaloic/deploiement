package com.equipe1.model;

import lombok.Data;
import lombok.NoArgsConstructor;

//@Data
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

    public String getDestinataire() {
        return destinataire;
    }

    public void setDestinataire(String destinataire) {
        this.destinataire = destinataire;
    }

    public String getEmetteur() {
        return emetteur;
    }

    public void setEmetteur(String emetteur) {
        this.emetteur = emetteur;
    }

    public String getSujet() {
        return sujet;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }
}
