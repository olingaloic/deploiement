package com.equipe1.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@EqualsAndHashCode(exclude="etudiant")
@Entity
@Data
public class EvaluationStagiaire extends Evaluation{

    {
        this.type = "EvaluationStagiaire";
    }

    @OneToOne
    private Etudiant etudiant;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "employeur_id")
    private Employeur employeur;

}
