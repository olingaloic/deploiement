package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.CandidatureRepository;
import com.equipe1.repository.EmployeurRepository;
import com.equipe1.repository.SessionRepository;
import com.equipe1.repository.StageRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class StageServiceTest {

    @Autowired
    private StageService stageService;

    @MockBean

    private CourrielService courrielService;

    @MockBean
    private StageRepository stageRepository;

    @MockBean
    private CandidatureRepository candidatureRepository;

    @MockBean
    private EmployeurService employeurService;

    @MockBean
    private CandidatureService candidatureService;

    @MockBean
    private EmployeurRepository employeurRepository;

    @MockBean
    private SessionRepository sessionRepository;

    private Session session;
    private Stage s1;
    private Stage s2;
    private Employeur employeur;
    private Candidature c1, c2, c3, c4;


    @BeforeEach
    public void setUp() {
        session = Session.builder()
                .id(1L)
                .nom("AUT-2020")
                .build();
        //sessionRepository.save(session);
        s1 = new Stage();
        s1.setDateLimiteCandidature(LocalDate.now().plusDays(1));
        s1.setId(30L);
        s1.setTitre("java");
        //s1.setStatut(Stage.StageStatus.APPROVED);
        s1.setSession(session);
        s1.setStatut(Stage.StageStatus.APPROUVÉ);
        s1.setNbAdmis(2);
        s2 = new Stage();
        s2.setDateLimiteCandidature(LocalDate.now().plusDays(1));
        s2.setId(35L);
        s2.setTitre("c++");
        //s2.setStatut(Stage.StageStatus.DENIED);
        s2.setSession(session);
        s2.setStatut(Stage.StageStatus.REFUSÉ);
        employeur = new Employeur();
        employeur.setNom("test");
        employeur.setEmail("test@email.com");
        c1 = new Candidature();
        c1.setStatut(Candidature.CandidatureStatut.EN_ATTENTE);
        c1.setStage(s1);
        c2 = new Candidature();
        c2.setStatut(Candidature.CandidatureStatut.APPROUVE);
        c2.setStage(s2);
        c3 = new Candidature();
        c3.setStatut(Candidature.CandidatureStatut.CHOISI);
        c3.setStage(s2);
        c4 = new Candidature();
        c4.setStatut(Candidature.CandidatureStatut.CHOISI);
        c4.setStage(s1);


    }

    @Test
    void testGetStages() {
        // Arrange
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));
        doReturn(Arrays.asList(s1, s2)).when(stageRepository).findAll();
        // Act
        List<Stage> stages = stageService.getStages(session.getId());
        // Assert
        Assertions.assertEquals(2, stages.size());
    }
    @Test
    void testGetStagesSessionEnCours () {
        // Arrange
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(session));
        doReturn(Arrays.asList(s1, s2)).when(stageRepository).findAll();
        // Act
        List<Stage> stages = stageService.getStagesSessionEnCours();
        // Assert
        Assertions.assertEquals(2, stages.size());
    }

    @Test
    void testFindStageById() {
        // Arrange
        doReturn(Optional.of(s1)).when(stageRepository).findById(1l);
        // Act
        Optional<Stage> stage = stageService.findStageById(1l);
        // Assert
        Assertions.assertTrue(stage.isPresent());
        Assertions.assertSame(stage.get(), s1);
    }

    @Test
    void testFindStageByIdNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(stageRepository).findById(1l);
        // Act
        Optional<Stage> stage = stageService.findStageById(1l);
        // Assert
        Assertions.assertFalse(stage.isPresent());
    }

    @Test
    void testSaveStage() {
        // Arrange
        when(sessionRepository.save(session)).thenReturn(session);
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(session));
        doReturn(s1).when(stageRepository).save(any());
        // Act
        Stage stage = stageService.saveStage(s1);
        // Assert
        Assertions.assertNotNull(stage);
        Assertions.assertEquals(s1.getTitre(), stage.getTitre());
    }


    @Test
    void testUpdateStage() throws Exception {
        s1.setId(1l);
        s1.setTitre("Stage en programmation");
        s1.setProgramme("None");
        s1.setNbAdmis(1);
        s1.setNbHeuresParSemaine(37.5f);
        s1.setDateLimiteCandidature(LocalDate.of(2021, 1, 1));
        s1.setDateDebut(LocalDate.of(2021, 1, 20));
        s1.setDateFin(LocalDate.of(2021, 8, 20));
        s1.setExigences("Etre empathique");
        s1.setDescription("Ceci un stage en java");
        doReturn(s1).when(stageRepository).save(any());
        Stage stage = stageRepository.save(s1);
        Stage stageUpdate;
        stageUpdate = s1;
        stageUpdate.setProgramme("Informatique");
        stageUpdate.setNbAdmis(2);
        stageUpdate.setNbHeuresParSemaine(35f);
        stageUpdate.setDateLimiteCandidature(LocalDate.of(2021, 1, 2));
        stageUpdate.setDateDebut(LocalDate.of(2021, 1, 21));
        stageUpdate.setDateFin(LocalDate.of(2021, 8, 21));
        stageUpdate.setExigences("Etre en 3eme annee de DEC");
        stageUpdate.setDescription("Ceci un stage en java pour les etudiants en 3eme annee de DEC");
        doReturn(stageUpdate).when(stageRepository).save(any());
        doReturn(Optional.of(s1)).when(stageRepository).findById(s1.getId());
        Stage updatedStage = stageService.updateStage(stageUpdate, stage.getId());
        // Assert
        Assertions.assertNotNull(updatedStage);
        Assertions.assertEquals(1l, updatedStage.getId());
        Assertions.assertEquals("Stage en programmation", updatedStage.getTitre());
        Assertions.assertEquals("Informatique", updatedStage.getProgramme());
        Assertions.assertEquals(true, updatedStage.isOuvert());
        Assertions.assertEquals("Ceci un stage en java pour les etudiants en 3eme annee de DEC", updatedStage.getDescription());
        Assertions.assertEquals(2, updatedStage.getNbAdmis());
        Assertions.assertEquals(35f, updatedStage.getNbHeuresParSemaine());
        Assertions.assertEquals("Etre en 3eme annee de DEC", updatedStage.getExigences());
        Assertions.assertEquals(LocalDate.of(2021, 1, 2), updatedStage.getDateLimiteCandidature());
        Assertions.assertEquals(LocalDate.of(2021, 1, 21), updatedStage.getDateDebut());
        Assertions.assertEquals(LocalDate.of(2021, 8, 21), updatedStage.getDateFin());
    }

    @Test
    void getStagesByEmployeur() {
        // Arrange
        when(sessionRepository.save(session)).thenReturn(session);
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));
        s1.setEmployeur(employeur);
        s2.setEmployeur(employeur);

        when(stageRepository.findAll()).thenReturn(Arrays.asList(s1,s2));

        s1.setSession(session);
        doReturn(s1).when(stageRepository).save(s1);
        stageRepository.save(s1);

        s2.setSession(session);
        doReturn(s2).when(stageRepository).save(s2);
        stageRepository.save(s2);

        // Act
        List<Stage> stages = stageService.getStagesByEmployeur(employeur.getId(), session.getId());
        // Assert
        Assertions.assertNotNull(stages);
        Assertions.assertEquals(2, stages.size());
    }

    @Test
    public void testGetStagesEtudiantValide(){

        s1.setId(2L);
        s1.setStatut(Stage.StageStatus.APPROUVÉ);
        Etudiant e1 = new Etudiant();
        e1.setId(6L);
        Set <Etudiant> etudiantsAdmis = new HashSet<>();
        etudiantsAdmis.add(e1);
        s1.setEtudiantsAdmits(etudiantsAdmis);
        doReturn(s1).when(stageRepository).save(s1);
        Candidature c = new Candidature();
        c.setStage(new Stage());
        c.setEtudiant(e1);
        List<Candidature> candidatures = new ArrayList<>();
        candidatures.add(c);

        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));
        doReturn(candidatures).when(candidatureService).findCandidatureByEtudiant(e1.getId(), session.getId());
        Mockito.when(stageRepository.findAll()).thenReturn(Arrays.asList(s1));
        List<Stage> stageList = stageService.getStagesEtudiant(e1.getId(), session.getId());
        // Assert
        Assertions.assertNotNull(stageList);
        Assertions.assertEquals(stageList.size(), 1);
        Assertions.assertEquals(stageList.get(0), s1);
    }

    @Test
    public void testGetStagesEtudiantInvalide(){
        s1.setId(2L);
        s1.setStatut(Stage.StageStatus.APPROUVÉ);
        Etudiant e1 = new Etudiant();
        e1.setId(6L);
        Set <Etudiant> etudiantsAdmis = new HashSet<>();
        etudiantsAdmis.add(e1);
        s1.setEtudiantsAdmits(etudiantsAdmis);

        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));
        doReturn(s1).when(stageRepository).save(s1);
        Candidature c = new Candidature();
        c.setStage(s1);
        c.setEtudiant(e1);
        List<Candidature> candidatures = new ArrayList<>();
        candidatures.add(c);
        doReturn(candidatures).when(candidatureService).findCandidatureByEtudiant(e1.getId(), session.getId());
        Mockito.when(stageRepository.findAll()).thenReturn(Arrays.asList(s1));
        List<Stage> stageList = stageService.getStagesEtudiant(e1.getId(), session.getId());
        // Assert
        Assertions.assertEquals(stageList.size(), 0);
    }

    @Test
    public void testUpdateEtudiantsAdmits(){
        s1.setId(1L);
        s1.setStatut(Stage.StageStatus.APPROUVÉ);
        Etudiant e1 = new Etudiant();
        e1.setId(6L);
        Etudiant e2 = new Etudiant();
        e2.setId(7L);
        Set<Etudiant> set = new HashSet<>();
        set.add(e1); set.add(e2);
        s1.setEtudiantsAdmits(set);
        doReturn(s1).when(stageRepository).save(s1);
        doReturn(Optional.of(s1)).when(stageRepository).findById(s1.getId());
        // Act
        Stage stage = stageService.updateEtudiantsAdmits(s1.getId(), set);
        // Assert
        Assertions.assertNotNull(stage);
        Assertions.assertEquals(stage.getEtudiantsAdmits().size(), 2);
    }

    @Test
    public void testGetEtudiantsAdmitsByValideStageId(){
        s1.setId(1L);
        s1.setStatut(Stage.StageStatus.APPROUVÉ);
        Etudiant e1 = new Etudiant();
        e1.setId(6L);
        Etudiant e2 = new Etudiant();
        e2.setId(7L);
        Set<Etudiant> set = new HashSet<>();
        set.add(e1); set.add(e2);
        s1.setEtudiantsAdmits(set);
        doReturn(s1).when(stageRepository).save(s1);
        doReturn(Optional.of(s1)).when(stageRepository).findById(s1.getId());
        // Act
        Set<Etudiant> stageList = stageService.getEtudiantsAdmits(s1.getId());
        // Assert
        Assertions.assertNotNull(stageList);
        Assertions.assertEquals(stageList.size(), 2);
    }

    @Test
    public void testGetEtudiantsAdmitsByInvalideStageId(){
        // Act
        Set<Etudiant> stageList = stageService.getEtudiantsAdmits(22L);
        // Assert
        Assertions.assertNull(stageList);
    }

    @Test
    public void testGetAllStagesApprouves(){
        // Arrange
        when(sessionRepository.save(session)).thenReturn(session);
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));
        doReturn(Arrays.asList(s1)).when(stageRepository).findAll();

        s1.setSession(session);
        doReturn(s1).when(stageRepository).save(s1);
        stageRepository.save(s1);
        // Act
        List<Stage> stageList = stageService.getStagesApprouves(session.getId());
        // Assert
        Assertions.assertNotNull(stageList);
        Assertions.assertEquals(1, stageList.size());
    }

    @Test
    public void testGetAllStagesNonApprouves(){
        // Arrange
        when(sessionRepository.save(session)).thenReturn(session);
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));
        doReturn(Arrays.asList(s1)).when(stageRepository).findAll();

        s1.setSession(session);
        s1.setStatut(Stage.StageStatus.REFUSÉ);
        doReturn(s1).when(stageRepository).save(s1);
        stageRepository.save(s1);
        // Act
        List<Stage> stageList = stageService.getStagesNonApprouves(session.getId());
        // Assert
        Assertions.assertNotNull(stageList);
        Assertions.assertEquals(1, stageList.size());
    }

    @Test
    public void testGetAllStagesNonComble(){
        // Arrange
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));
        doReturn(Arrays.asList(c1)).when(candidatureService).findCandidatureByStage(30L);
        doReturn(Arrays.asList(c2, c3)).when(candidatureService).findCandidatureByStage(35L);
        doReturn(Arrays.asList(s1, s2)).when(stageRepository).findAll();

        // Act
        List<Stage> stageList = stageService.getStagesNonComble(session.getId());
        // Assert
        Assertions.assertNotNull(stageList);
        Assertions.assertEquals(stageList.size(), 1);
        Assertions.assertEquals(stageList.get(0), s1);

    }

}
