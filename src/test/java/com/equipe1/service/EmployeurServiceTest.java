package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.repository.EmployeurRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class EmployeurServiceTest {

    @Autowired
    private EmployeurService employeurService;

    @MockBean
    private EmployeurRepository employeurRepository;

    private Employeur employeur1;
    private Employeur employeur2;

    @BeforeEach
    public void setUp() {
        employeur1 = new Employeur("Employeur_test_1", "438-568-896", "589 abc 23 re");
        employeur1.setEmail("e1@email.com");
        employeur1.setPassword("123456");
        employeur2 = new Employeur("Employeur_test_2", "222-222-222", "abc adress test");
        employeur2.setEmail("e2@email.com");
        employeur2.setPassword("123456");
    }

    @Test
    public void testGetEmployeurs() {
        when(employeurRepository.findAll()).thenReturn(Arrays.asList(employeur1, employeur2));
        List<Employeur> all = employeurService.getEmployeurs();
        Assertions.assertEquals(2, all.size());
    }

    @Test
    public void testGetEmployeurById() {
        when(employeurRepository.findById(1L)).thenReturn(Optional.of(employeur1));
        Employeur employeur = employeurService.getEmployeurById(1L);
        assertEquals(employeur, employeur1);
    }

    @Test
    public void testSaveEmployeur() {
        when(employeurRepository.save(employeur1)).thenReturn(employeur1);
        Employeur employeur = employeurService.saveEmployeur(employeur1);
        assertNotNull(employeur1);
        assertEquals(employeur.getNom(), employeur.getNom());
    }

    @Test
    public void testGetEmployeurByEmail() {
        when(employeurRepository.findEmployeurByEmail("e1@email.com")).thenReturn(employeur1);
        Employeur employeur = employeurService.getEmployeurByEmail("e1@email.com");
        assertEquals(employeur, employeur1);
    }

    @Test
    void testUpdateEtudiantPassword() {
        // Arrange + Act
        employeur1.setId(1l);
        employeur1.setPassword("12345");
        doReturn(employeur1).when(employeurRepository).save(any());
        Employeur employeur = employeurRepository.save(employeur1);

        Employeur putContent = new Employeur();
        putContent = employeur1;
        putContent.setPassword("totototo");
        doReturn(putContent).when(employeurRepository).save(any());
        doReturn(Optional.of(employeur1)).when(employeurRepository).findById(employeur1.getId());
        Employeur updateEtudiant = employeurService.updateEmployeurPassword(putContent, employeur1.getId());
        // Assert
        Assertions.assertNotNull(updateEtudiant);
        Assertions.assertEquals(1l, updateEtudiant.getId());
        Assertions.assertEquals(employeur1.getNom(), updateEtudiant.getNom());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Assertions.assertTrue(encoder.matches("totototo", employeur1.getPassword()));
    }
}