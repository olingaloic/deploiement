package com.equipe1.service;

import com.equipe1.model.CV;
import com.equipe1.model.Etudiant;
import com.equipe1.repository.CVRepository;
import com.equipe1.repository.EtudiantRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class CVServiceTest {

    @Autowired
    private CVService cvService;

    @MockBean
    private CVRepository cvRepository;

    @MockBean
    private EtudiantRepository etudiantRepository;

    @MockBean
    private CourrielService courrielService;

    public CV cv1, cv2, cv3;
    public Etudiant etudiant1, etudiant2, etudiant3;

    @BeforeEach
    private void setup() {
        cv1 = new CV(); cv2 = new CV(); cv3 = new CV();
        cv1.setId(101L); cv2.setId(102L); cv3.setId(103L);
        etudiant1 = new Etudiant(); etudiant2 = new Etudiant(); etudiant3 = new Etudiant();
        etudiant1.setNom("toto"); etudiant1.setId(100L);
        etudiant2.setNom("titi"); etudiant2.setId(200L);
        etudiant3.setNom("tata"); etudiant3.setId(300L);
    }

    @Test
    public void testGetCVs() {
        when(cvRepository.findAll()).thenReturn(Arrays.asList(cv1, cv2, cv3));

        var cvs = cvService.getCVs();

        assertEquals(cvs.size(), 3);
    }

    @Test
    public void testGetCVById_ValidId() {
        when(cvRepository.findById(101L)).thenReturn(Optional.of(cv1));

        var cv = cvService.getCVById(101L);

        assertEquals(cv1, cv);
    }

    @Test
    public void testGetCVById_InvalidId() {
        when(cvRepository.findById(101L)).thenReturn(Optional.empty());
        boolean wentInCatchBlock;

        try {
            var cv = cvService.getCVById(101L);
            wentInCatchBlock = false;
        } catch (ResponseStatusException e){
           wentInCatchBlock = true;
        }

        assertTrue(wentInCatchBlock);
    }

    @Test
    public void testGetCVByEtudiantId_ValidId() {
        etudiant1.setCv(cv1);
        when(etudiantRepository.findById(100L)).thenReturn(Optional.of(etudiant1));

        var cv = cvService.getCVByEtudiantId(100L);

        assertEquals(cv, cv1);
    }

    @Test
    public void testGetCVByEtudiantId_InvalidId() {
        when(etudiantRepository.findById(100L)).thenReturn(Optional.empty());
        boolean wentInCatchBlock;

        try {
            cvService.getCVByEtudiantId(100L);
            wentInCatchBlock = false;
        } catch (ResponseStatusException e) {
            wentInCatchBlock = true;
        }

        assertTrue(wentInCatchBlock);
    }

    @Test
    public void testSaveCV() {
        when(cvRepository.saveAndFlush(cv1)).thenReturn(cv1);

        var cv = cvService.saveCV(cv1);

        assertEquals(cv, cv1);
    }

    @Test
    public void testSaveEtudiantCV_ValidId() {
        when(etudiantRepository.findById(100L)).thenReturn(Optional.of(etudiant1));

        var cv = cvService.saveEtudiantCV(100L, cv1);

        assertEquals(cv, etudiant1.getCv());
    }

    @Test
    public void testSaveEtudiantCV_InvalidId() {
        when(etudiantRepository.findById(100L)).thenReturn(Optional.empty());
        boolean wentInCathcBlock;

        try {
            cvService.saveEtudiantCV(100L, cv1);
            wentInCathcBlock = false;
        } catch (ResponseStatusException e) {
            wentInCathcBlock = true;
        }

        assertTrue(wentInCathcBlock);
    }

    @Test
    public void testUpdateCVStatus_ValidId() throws Exception {
        when(cvRepository.findById(101L)).thenReturn(Optional.of(cv1));

        cvService.updateCVStatus(true, 101L);

        assertEquals(cv1.getStatus(), CV.CVStatus.APPROVED);
    }

    @Test
    public void testUpdateCVStatus_InvalidId() {
        when(cvRepository.findById(101L)).thenReturn(Optional.empty());
        boolean wentInCatchBlock = false;

        try {
            cvService.updateCVStatus(true, 101L);
            wentInCatchBlock = false;
        } catch (ResponseStatusException e) {
            wentInCatchBlock = true;
        } catch (Exception e) {
            e.printStackTrace();
            fail();
        }

        assertTrue(wentInCatchBlock);

    }

    @Test
    public void testUpdateCV() {
        when(cvRepository.saveAndFlush(cv1)).thenReturn(cv1);

        var cv = cvService.updateCV(cv1, 1L);

        assertEquals(cv1.getId(), 1L);
    }

}
