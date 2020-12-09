package com.equipe1.repository;

import com.equipe1.model.Enseignant;
import com.equipe1.model.Etudiant;
import com.equipe1.model.EvaluationMilieuStage;
import com.equipe1.model.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EvaluationMilieuStageRepository extends JpaRepository<EvaluationMilieuStage, Long> {
 Optional<EvaluationMilieuStage> findByEtudiant(Etudiant etudiant);
 List<EvaluationMilieuStage> findByEnseignant(Enseignant enseignant);
}
