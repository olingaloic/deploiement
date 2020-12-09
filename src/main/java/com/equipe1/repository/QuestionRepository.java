package com.equipe1.repository;

import com.equipe1.model.Evaluation;
import com.equipe1.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByEvaluation(Evaluation evaluation);

}
