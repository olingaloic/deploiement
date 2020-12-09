package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@Builder
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;

    @ManyToOne
    private Etudiant etudiant;


    @OneToOne
    private Stage stage;
    private CandidatureStatut statut;
    @JsonIgnore
    @OneToOne(mappedBy = "candidature")
    private Contrat contrat;
    private boolean isEvaluee;

    public Candidature() {
        this.statut = CandidatureStatut.EN_ATTENTE;
    }

    public Candidature(Etudiant etudiant, Stage stage) {
        this.etudiant = etudiant;
        this.stage = stage;
        this.statut = CandidatureStatut.EN_ATTENTE;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Etudiant getEtudiant() {
        return etudiant;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public Stage getStage() {
        return stage;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }


    public CandidatureStatut getStatut() {
        return statut;
    }

    public void setStatut(CandidatureStatut statut) {
        this.statut = statut;
    }

    public enum CandidatureStatut {
        EN_ATTENTE, REFUSE, CHOISI, APPROUVE
    }
}
