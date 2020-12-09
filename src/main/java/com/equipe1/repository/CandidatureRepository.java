package com.equipe1.repository;

import com.equipe1.model.Candidature;
import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    List<Candidature>findByStatut(Candidature.CandidatureStatut statut);
    List<Candidature> findByEtudiant(Etudiant etudiant);
}
