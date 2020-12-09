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
public class Enseignant extends User {

    {
        this.role = "Enseignant";
    }
    @JsonIgnore
    @OneToMany(mappedBy = "enseignant")
    protected List<EvaluationMilieuStage> evaluationMilieuStage;

    @JsonIgnore
    @OneToMany(mappedBy = "enseignant")
    protected List<Etudiant> etudiants;

    private String prenom;
    private String programme;
}
