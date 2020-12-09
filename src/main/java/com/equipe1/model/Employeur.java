package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;


@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employeur extends User{

    {
        this.role = "Employeur";
    }
    private String adresse;
    private String nom;

    @JsonIgnore
    @OneToMany(mappedBy = "employeur")
    protected List<EvaluationMilieuStage> evaluationMilieuStage;

    @JsonIgnore
    @OneToMany(mappedBy = "employeur")
    protected List<EvaluationStagiaire> evaluationStagiaires;


    public Employeur(String nom, String telephone, String adresse) {
        this.nom = nom;
        this.telephone = telephone;
        this.adresse = adresse;
    }

}
