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

import static org.mockito.Mockito.*;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class CourrielServiceTest {

    @Autowired
    private CourrielService courrielService;

    @MockBean
    private CVRepository cvRepository;

    @MockBean
    private EtudiantRepository etudiantRepository;

    @MockBean
    private StageRepository stageRepository;

    @MockBean
    private CandidatureRepository candidatureRepository;

    @MockBean
    private EmployeurRepository employeurRepository;

    private Courriel mail;
    private Etudiant etudiant;
    private Employeur employeur;
    private Stage stage;
    private CV cv1;
    private CV cv2;
    private Candidature candidature;
    private Contrat contrat;

    @BeforeEach
    public void setUp() {

        cv1 = new CV();
        cv1.setStatus(CV.CVStatus.APPROVED);
        when(cvRepository.save(cv1)).thenReturn(cv1);

        cv2 = new CV();
        cv2.setStatus(CV.CVStatus.APPROVED);
        when(cvRepository.save(cv2)).thenReturn(cv2);

        etudiant = new Etudiant();
        etudiant.setCv(cv1);
        etudiant.setPrenom("prenom");
        etudiant.setNom("nom");
        etudiant.setEmail("test@test.com");
        when(etudiantRepository.save(etudiant)).thenReturn(etudiant);

        employeur = new Employeur();
        employeur.setNom("test");
        employeur.setEmail("employeur@gmail.com");
        when(employeurRepository.save(employeur)).thenReturn(employeur);


        stage = new Stage();
        stage.setEmployeur(employeur);
        when(stageRepository.save(stage)).thenReturn(stage);


        candidature = new Candidature();
        candidature.setEtudiant(etudiant);
        candidature.setStage(stage);
        candidature.setStatut(Candidature.CandidatureStatut.CHOISI);
        when(candidatureRepository.save(candidature)).thenReturn(candidature);

        contrat = new Contrat();
        contrat.setDocumentContrat(new byte[10]);
        contrat.setCandidature(candidature);
        contrat.setEmployeur(employeur);
    }

    @Test
    public void sendOffreDeStageApprobationMailTest() throws Exception {
        courrielService.sendOffreDeStageApprobationMail(stage);
        CourrielService courriel = mock(CourrielService.class);
        courriel.sendOffreDeStageApprobationMail(stage);
        verify( courriel).sendOffreDeStageApprobationMail(stage);
    }

    @Test
    public void sendMailCVApprovalTest() throws Exception {
        courrielService.sendMailCVApproval(etudiant);

        CourrielService courriel = mock(CourrielService.class);

        courriel.sendMailCVApproval(etudiant);
        verify( courriel, times(1)).sendMailCVApproval(etudiant);

        etudiant.setCv(cv2);
        courriel.sendMailCVApproval(etudiant);
        verify( courriel, times(2)).sendMailCVApproval(etudiant);
    }

    @Test
    public void sendCandidatureStatusUpdate() throws Exception {
        courrielService.sendCandidatureStatusUpdate(candidature);
        CourrielService courriel = mock(CourrielService.class);
        courriel.sendCandidatureStatusUpdate(candidature);
        verify( courriel, times(1)).sendCandidatureStatusUpdate(candidature);

    }

    @Test
    public void testSendContratScolariteEmployeur() throws Exception {
        courrielService.sendContratScolarite(contrat, "Employeur");
        CourrielService courriel = mock(CourrielService.class);
        courriel.sendContratScolarite(contrat, "Employeur");
        verify( courriel, times(1)).sendContratScolarite(contrat, "Employeur");
    }

    @Test
    public void testSendContratScolariteEtudiant() throws Exception {
        courrielService.sendContratScolarite(contrat, "Etudiant");
        CourrielService courriel = mock(CourrielService.class);
        courriel.sendContratScolarite(contrat, "Etudiant");
        verify( courriel, times(1)).sendContratScolarite(contrat, "Etudiant");
    }

    @Test
    public void testSendRefusContratEmployeur() throws Exception {
        courrielService.sendRefusContrat(contrat, "Employeur");
        CourrielService courriel = mock(CourrielService.class);
        courriel.sendRefusContrat(contrat, "Employeur");
        verify( courriel, times(1)).sendRefusContrat(contrat, "Employeur");
    }

    @Test
    public void testSendRefusContratEtudiant() throws Exception {
        courrielService.sendRefusContrat( contrat, "Etudiant");
        CourrielService courriel = mock(CourrielService.class);
        courriel.sendRefusContrat(contrat, "Etudiant");
        verify( courriel, times(1)).sendRefusContrat(contrat, "Etudiant");
    }
}