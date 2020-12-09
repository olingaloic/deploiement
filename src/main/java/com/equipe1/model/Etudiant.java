package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
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

    @ToString.Exclude
    @JsonIgnore
    @OneToOne(mappedBy = "etudiant")
    private EvaluationStagiaire evaluationStagiaire;

    @JsonIgnore
    @OneToOne(mappedBy = "etudiant")
    private EvaluationMilieuStage evaluationMilieuStage;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "enseignant_id")
    private Enseignant enseignant;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Session> sessions;

    private boolean isEnregistre;

}
