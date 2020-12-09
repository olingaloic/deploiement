package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import java.io.ByteArrayOutputStream;
import java.lang.reflect.Array;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class GenerateurPdfServiceTest {

    @MockBean
    private EmployeurRepository employeurRepository;
    @Autowired
    private GenerateurPdfService generateurPdfService;
    private Stage s;
    private Employeur user;
    private Etudiant etudiant;


    @MockBean
    private EvaluationStagiaireRepository evaluationStagiaireRepository;
    @MockBean
    private EvaluationMilieuStageRepository evaluationMilieuStageRepository;

    @MockBean
    private QuestionRepository questionRepository;

    @MockBean
    private CommentaireRepository commentaireRepository;
    private EvaluationStagiaire evaluationStagiaire;
    private EvaluationMilieuStage evaluationMilieuStage;
    private Question question1;
    private Question question2;
    private Commentaire commentaire;
    private Enseignant enseignant;


    @BeforeEach
    public void setUp() {
        s = new Stage();
        s.setNbAdmis(2);
        s.setProgramme("Tecnique informatique");
        s.setExigences("exigences");
        s.setVille("montreal");
        s.setDateDebut(LocalDate.of(2020, 10, 1));
        s.setDateFin(LocalDate.of(2020, 10, 31));

        user = new Employeur();
        user.setNom("carlos");
        user.setEmail("carlos.arturo@gmail");
        user.setTelephone("4444444444");
        user.setAdresse("adres12345");

        etudiant = new Etudiant();
        etudiant.setNom("Colomb");
        etudiant.setPrenom("Christophe");

        enseignant = new Enseignant();

        evaluationStagiaire = new EvaluationStagiaire();
        question1= new Question();
        question2= new Question();
        commentaire = new Commentaire();
        evaluationMilieuStage = new EvaluationMilieuStage();

    }

    @Test
    void testreatePdf() throws Exception {
        when(employeurRepository.findEmployeurByEmail("carlos.arturo@gmail")).thenReturn(user);
        ByteArrayOutputStream b = generateurPdfService.createPdf(s, user, etudiant);
        assertNotNull(b);
    }


    @Test
    public void testCreatePdfEvaluationMilieuStage() throws Exception {
        evaluationMilieuStage.setEtudiant(etudiant);
        evaluationMilieuStage.setEnseignant(enseignant);
        evaluationMilieuStage.setEmployeur(user);
        when(evaluationMilieuStageRepository.findById(evaluationMilieuStage.getId())).thenReturn(Optional.of(evaluationMilieuStage));
        when(questionRepository.findByEvaluation(evaluationMilieuStage)).thenReturn(Arrays.asList(question1,question2));
        when(commentaireRepository.findByEvaluation(evaluationMilieuStage)).thenReturn(Arrays.asList(commentaire));

        ByteArrayOutputStream b = generateurPdfService.createPdfEvaluationMilieuStage(evaluationMilieuStage.getId());
        assertNotNull(b);
    }

    @Test
    void testCreatePdfEvaluationStagiaire() throws Exception {
        evaluationStagiaire.setEtudiant(etudiant);
        evaluationStagiaire.setEmployeur(user);
        when(evaluationStagiaireRepository.findById(evaluationStagiaire.getId())).thenReturn(Optional.of(evaluationStagiaire));
        when(questionRepository.findByEvaluation(evaluationStagiaire)).thenReturn(Arrays.asList(question1,question2));
        when(commentaireRepository.findByEvaluation(evaluationStagiaire)).thenReturn(Arrays.asList(commentaire));

        ByteArrayOutputStream b = generateurPdfService.createPdfEvaluationStagiaire(evaluationStagiaire.getId());
        assertNotNull(b);
    }
}