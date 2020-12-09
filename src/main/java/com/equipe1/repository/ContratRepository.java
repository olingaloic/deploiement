package com.equipe1.repository;

import com.equipe1.model.Candidature;
import com.equipe1.model.Contrat;
import com.equipe1.model.Employeur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContratRepository extends JpaRepository<Contrat, Long> {

    List<Contrat> findByEmployeur(Employeur employeur);
    Optional<Contrat> findByCandidature(Candidature candidature);
}
