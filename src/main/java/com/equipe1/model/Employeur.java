package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employeur extends User{

    {
        this.desc = "Employeur";
    }
    private String adresse;
    private String nom;
    public Employeur(String nomEntreprise, String telephone, String adresse) {
        this.nom = nomEntreprise;
        this.telephone = telephone;
        this.adresse = adresse;
    }

}
