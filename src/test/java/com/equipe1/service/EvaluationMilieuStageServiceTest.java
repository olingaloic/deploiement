package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.EvaluationMilieuStageRepository;
import com.equipe1.repository.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class EvaluationMilieuStageServiceTest {

    @MockBean
    private EvaluationMilieuStageRepository evaluationMilieuStageRepository;
    @MockBean
    private EtudiantService etudiantService;
    @MockBean
    private QuestionRepository questionRepository;
    @MockBean
    private CommentaireService commentaireService;

    @MockBean
    private EnseignantService enseignantService;

    @MockBean
    private CandidatureService candidatureService;

    @MockBean
    private GenerateurPdfService generateurPdfService;

    @Autowired
    private EvaluationMilieuStageService evaluationMilieuStageService;

    private EvaluationMilieuStage evaluationMilieuStage;
    private EvaluationMilieuStage evaluationMilieuStage2;
    private Question question;
    private Question question1;
    private Commentaire commentaire;
    private RecepteurDonneesEvaluation receptorDonnesEvaluation;
    private Candidature candidature;
    private Stage stage;
    private Employeur employeur;
    private Enseignant enseignant;
    private Etudiant etudiant;
    private ByteArrayOutputStream fileByteArray;

    @BeforeEach
    public void setUp() {
        evaluationMilieuStage = new EvaluationMilieuStage();
        question = new Question();
        evaluationMilieuStage.setDateCreation(LocalDate.now());

        evaluationMilieuStage2 = new EvaluationMilieuStage();
        question = new Question();
        evaluationMilieuStage2.setDateCreation(LocalDate.now());

        question.setQuestion("enonce 1");
        question.setReponse("reponse question 1");
        question.setEvaluation(evaluationMilieuStage);

        question1 = new Question();
        question1.setQuestion("enonce 2");
        question1.setReponse("reponse question 2");
        question1.setEvaluation(evaluationMilieuStage);

        commentaire = new Commentaire();
        commentaire.setEnnonce("commentaire a la question");
        commentaire.setSection("Productivite");

        receptorDonnesEvaluation = new RecepteurDonneesEvaluation(Arrays.asList(question, question1),commentaire);
        employeur = new Employeur();
        stage = new Stage();
        candidature = new Candidature();
        enseignant = new Enseignant();
        etudiant = new Etudiant();
        fileByteArray = new ByteArrayOutputStream();

    }

    @Test
    public void save() {
        when(evaluationMilieuStageRepository.save(evaluationMilieuStage)).thenReturn(evaluationMilieuStage);
        EvaluationMilieuStage evaluation = evaluationMilieuStageService.save(evaluationMilieuStage);
        assertEquals(evaluation, evaluationMilieuStage);
        assertNotNull(evaluation);
    }

    @Test
    public void saveEvaluation() {
        stage.setEmployeur(employeur);
        candidature.setStage(stage);
        candidature.setEtudiant(etudiant);
        when(enseignantService.getEnseignantById(2l)).thenReturn(enseignant);
        when(candidatureService.findCandidatureById(1L)).thenReturn(Optional.of(candidature));

        EvaluationMilieuStage evaluation = evaluationMilieuStageService.saveEvaluation(receptorDonnesEvaluation,1L,2l);

        assertEquals(evaluation.getEmployeur(), employeur);
        assertNotNull(evaluation);
    }

    @Test
    public void getAll() {
        when(evaluationMilieuStageRepository.findAll()).thenReturn(Arrays.asList(evaluationMilieuStage, evaluationMilieuStage2));
        List<EvaluationMilieuStage> milieuStageList = evaluationMilieuStageService.getAll();

        assertEquals(milieuStageList.size(), 2);
        assertNotNull(milieuStageList);
    }

    @Test
    public void getByEtudaint() {
        evaluationMilieuStage.setEtudiant(etudiant);
        evaluationMilieuStage2.setEtudiant(etudiant);
        when(evaluationMilieuStageRepository.findByEtudiant(etudiant)).thenReturn(Optional.of(evaluationMilieuStage));

        Optional<EvaluationMilieuStage> milieuStageList = evaluationMilieuStageService.getByEtudiant(etudiant);

        assertEquals(milieuStageList.get().getEtudiant(), etudiant);
        assertNotNull(milieuStageList);
    }

    @Test
    public void getAllByEnseignant() {

        evaluationMilieuStage.setEnseignant(enseignant);
        evaluationMilieuStage2.setEnseignant(enseignant);
        when(enseignantService.getEnseignantById(1L)).thenReturn(enseignant);
        when(evaluationMilieuStageRepository.findByEnseignant(enseignant)).thenReturn(Arrays.asList(evaluationMilieuStage2, evaluationMilieuStage));

        List<EvaluationMilieuStage> milieuStageList = evaluationMilieuStageService.getAllByEnseignant(1L);
        assertEquals(milieuStageList.size(), 2);
        assertEquals(milieuStageList.get(0).getEnseignant(), enseignant);
        assertNotNull(milieuStageList);
    }

    @Test
    public void testGetDocumentEvaluationMilieuStage() throws Exception {
        when(generateurPdfService.createPdfEvaluationMilieuStage(evaluationMilieuStage.getId())).thenReturn(fileByteArray);
        ByteArrayOutputStream evaluationDociment = evaluationMilieuStageService.getDocumentEvaluationMilieuStage(evaluationMilieuStage.getId());
        assertNotNull(evaluationDociment);
        assertEquals(evaluationDociment,fileByteArray);
    }

    @Test
    public void testGetAll() {
        when(evaluationMilieuStageRepository.findAll()).thenReturn(Arrays.asList(evaluationMilieuStage2, evaluationMilieuStage));

        List<EvaluationMilieuStage> milieuStageList = evaluationMilieuStageService.getAll();
        assertEquals(milieuStageList.size(), 2);
        assertNotNull(milieuStageList);
    }
}