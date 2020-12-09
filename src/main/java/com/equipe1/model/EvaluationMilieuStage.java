package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@EqualsAndHashCode(exclude="etudiant")
@Entity
@Data
public class EvaluationMilieuStage extends Evaluation {

    {
        this.type = "EvaluationMilieuStage";
    }

    @ManyToOne
    @JoinColumn(name = "enseignant_id")
    private Enseignant enseignant;

    @ManyToOne
    @JoinColumn(name = "employeur_id")
    private Employeur employeur;

    @OneToOne
    private Etudiant etudiant;

}
