package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@EqualsAndHashCode(callSuper = true)
@Entity
//@Data
@NoArgsConstructor
@AllArgsConstructor
public class Etudiant extends User {

    {
        this.role = "Etudiant";

    }

    @NotBlank
    private String prenom;

    @NotBlank
    private String matricule;

    @NotBlank
    private String programme;

    @NotBlank
    private String adresse;

    private String statutStage;

    @OneToOne
    private CV cv;

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getProgramme() {
        return programme;
    }

    public void setProgramme(String programme) {
        this.programme = programme;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getStatutStage() {
        return statutStage;
    }

    public void setStatutStage(String statutStage) {
        this.statutStage = statutStage;
    }

    public CV getCv() {
        return cv;
    }

    public void setCv(CV cv) {
        this.cv = cv;
    }
}
