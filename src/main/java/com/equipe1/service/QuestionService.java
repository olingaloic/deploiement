package com.equipe1.service;

import com.equipe1.model.Evaluation;
import com.equipe1.model.Question;
import com.equipe1.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }

    public List<Question> saveAllQuestions(List<Question> questions) {
        return  questionRepository.saveAll(questions);
    }


}
