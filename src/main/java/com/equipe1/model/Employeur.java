package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
//@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employeur extends User{

    {
        this.role = "Employeur";
    }
    private String adresse;
    private String nom;
    public Employeur(String nomEntreprise, String telephone, String adresse) {
        this.nom = nomEntreprise;
        this.telephone = telephone;
        this.adresse = adresse;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    @Override
    public String getNom() {
        return nom;
    }

    @Override
    public void setNom(String nom) {
        this.nom = nom;
    }
}
