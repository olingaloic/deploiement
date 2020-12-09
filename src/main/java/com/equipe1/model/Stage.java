package com.equipe1.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String titre;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    private Employeur employeur;

    private String description;
    private String exigences;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private LocalDate dateLimiteCandidature;
    private float nbHeuresParSemaine;
    private int nbAdmis;
    private String programme;
    private String ville;
    private StageStatus statut;
    private int salaire;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    private Session session;

    @ToString.Exclude
    @ManyToMany
    private Set<Etudiant> etudiantsAdmits;

    //@OneToMany(mappedBy = "stage")
    //private Set<Etudiant> etudiant;

    public Stage() {
        this.statut = StageStatus.EN_ATTENTE;
    }

    public enum StageStatus {
        EN_ATTENTE, APPROUVÉ, REFUSÉ
    }

    public boolean isOuvert() {
        return dateLimiteCandidature.isAfter(LocalDate.now());
    }


}
