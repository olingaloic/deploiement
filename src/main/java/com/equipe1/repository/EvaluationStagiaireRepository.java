package com.equipe1.repository;

import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.model.Evaluation;
import com.equipe1.model.EvaluationStagiaire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EvaluationStagiaireRepository extends JpaRepository<EvaluationStagiaire, Long> {

    List<EvaluationStagiaire> findByEmployeur(Employeur employeur);
    EvaluationStagiaire findByEtudiant(Etudiant etudiant);

}
