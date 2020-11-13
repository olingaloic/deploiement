package com.equipe1.repository;

import com.equipe1.model.Candidature;
import com.equipe1.model.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    Optional<Candidature> findByEtudiant(Etudiant etudiant);

}
