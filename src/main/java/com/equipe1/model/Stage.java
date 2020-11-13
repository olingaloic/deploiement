package com.equipe1.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

@Entity
//@Data
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String titre;
    @ManyToOne(fetch = FetchType.LAZY)
    private Employeur employeur;
    private String description;
    private String exigences;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private LocalDate dateLimiteCandidature;
    private float nbHeuresParSemaine;
    private int nbAdmis;
    private boolean isOuvert;
    private String programme;
    private String ville;
    private StageStatus statut;
    private int salaire;


    @ManyToMany
    private Set<Etudiant> etudiantsAdmits;

    public Stage() {
        this.isOuvert = false;
        this.statut = StageStatus.WAITING;
    }

    public enum StageStatus {
        WAITING, APPROVED, DENIED
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public Employeur getEmployeur() {
        return employeur;
    }

    public void setEmployeur(Employeur employeur) {
        this.employeur = employeur;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExigences() {
        return exigences;
    }

    public void setExigences(String exigences) {
        this.exigences = exigences;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public LocalDate getDateLimiteCandidature() {
        return dateLimiteCandidature;
    }

    public void setDateLimiteCandidature(LocalDate dateLimiteCandidature) {
        this.dateLimiteCandidature = dateLimiteCandidature;
    }

    public float getNbHeuresParSemaine() {
        return nbHeuresParSemaine;
    }

    public void setNbHeuresParSemaine(float nbHeuresParSemaine) {
        this.nbHeuresParSemaine = nbHeuresParSemaine;
    }

    public int getNbAdmis() {
        return nbAdmis;
    }

    public void setNbAdmis(int nbAdmis) {
        this.nbAdmis = nbAdmis;
    }

    public boolean isOuvert() {
        return isOuvert;
    }

    public void setOuvert(boolean ouvert) {
        isOuvert = ouvert;
    }

    public String getProgramme() {
        return programme;
    }

    public void setProgramme(String programme) {
        this.programme = programme;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public StageStatus getStatut() {
        return statut;
    }

    public void setStatut(StageStatus statut) {
        this.statut = statut;
    }

    public int getSalaire() {
        return salaire;
    }

    public void setSalaire(int salaire) {
        this.salaire = salaire;
    }

    public Set<Etudiant> getEtudiantsAdmits() {
        return etudiantsAdmits;
    }

    public void setEtudiantsAdmits(Set<Etudiant> etudiantsAdmits) {
        this.etudiantsAdmits = etudiantsAdmits;
    }
}
