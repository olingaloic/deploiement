package com.equipe1.repository;

import com.equipe1.model.Commentaire;
import com.equipe1.model.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentaireRepository extends JpaRepository<Commentaire, Long> {
    List<Commentaire> findByEvaluation(Evaluation evaluation);
}
