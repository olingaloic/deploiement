package com.equipe1.service;

import com.equipe1.model.Question;
import com.equipe1.repository.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class QuestionServiceTest {

    @MockBean
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionService questionService;

    private Question q1;
    private Question q2;

    @BeforeEach
    public void setUp() {
        q1 = new Question();
        q1.setQuestion("enonce 1");
        q1.setReponse("reponse question 1");

        q2 = new Question();
        q2.setQuestion("enonce 2");
        q2.setReponse("reponse question 2");
    }

    @Test
    void saveQuestion() {
        when(questionRepository.save(q1)).thenReturn(q1);
        Question questionTest = questionService.saveQuestion(q1);
        assertEquals(questionTest, q1);
        assertNotNull(questionTest);
    }

    @Test
    void saveAllQuestions() {
        when(questionRepository.saveAll(Arrays.asList(q1, q2))).thenReturn(Arrays.asList(q1, q2));
        List<Question> questionList = questionService.saveAllQuestions(Arrays.asList(q1, q2));
        assertEquals(questionList.size(), 2);
        assertTrue(questionList.contains(q1));
    }
}