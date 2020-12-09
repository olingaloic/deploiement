package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.time.LocalDate;

@EqualsAndHashCode(exclude="candidature")
@Entity
@Data
@AllArgsConstructor
@Builder
public class Contrat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private Candidature candidature;
    @ManyToOne(fetch = FetchType.LAZY)
    private Employeur employeur;
    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] documentContrat;
    private LocalDate dateGeneration;
    private LocalDate dateFinale;
    private SignatureEtat signatureEmployeur;
    private SignatureEtat signatureEtudiant;
    public enum SignatureEtat {
        SIGNE,
        PAS_SIGNE,
        EN_ATTENTE
    }

    public Contrat() {
        this.signatureEmployeur = SignatureEtat.PAS_SIGNE;
        this.signatureEtudiant = SignatureEtat.PAS_SIGNE;
        this.dateGeneration = LocalDate.now();
    }

    @Override
    public String toString() {
        return "Contrat{" +
                "id=" + id +
                ", dateGeneration=" + dateGeneration +
                ", dateFinale=" + dateFinale +
                ", signatureEmployeur=" + signatureEmployeur +
                ", signatureEtudiant=" + signatureEtudiant +
                '}';
    }
}