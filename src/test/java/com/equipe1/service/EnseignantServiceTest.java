package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.Enseignant;
import com.equipe1.repository.EnseignantRepository;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class EnseignantServiceTest {

    @Autowired
    private EnseignantService enseignantService;

    @MockBean
    private EnseignantRepository enseignantRepository;
    private Enseignant enseignant1;
    private Enseignant enseignant2;


    @BeforeEach
    public void setUp() {
        enseignant1 = new Enseignant();
        enseignant1.setPassword("123456");
        enseignant2 = new Enseignant();
        enseignant2.setPassword("123456");
    }

    @Test
    public void getEnseignants() {
        when(enseignantRepository.findAll()).thenReturn(Arrays.asList(enseignant1, enseignant2 ));
        List<Enseignant> all = enseignantService.getEnseignants();
        assertEquals(2, all.size());
    }

    @Test
    public void getEnseignantById() {
        when(enseignantRepository.findById(1L)).thenReturn(Optional.of(enseignant1));
        Enseignant enseignant = enseignantService.getEnseignantById(1L);
        assertEquals(enseignant, enseignant1);
    }

    @Test
    void saveEnseignant() {
        when(enseignantRepository.save(enseignant1)).thenReturn(enseignant1);
        Enseignant enseignant = enseignantService.saveEnseignant(enseignant1);
        assertNotNull(enseignant);
        assertEquals(enseignant.getNom(), enseignant1.getNom());
    }

    @Test
    void updateEnseignantPassword() {
        enseignant1.setPassword("123456");
        when(enseignantRepository.findById(1L)).thenReturn(Optional.of(enseignant1));
        when(enseignantRepository.save(enseignant1)).thenReturn(enseignant1);

        Enseignant enseignant = new Enseignant();
        enseignant.setPassword("abcdefghi");

        Enseignant updateEnseignant = enseignantService.updateEnseignantPassword(enseignant, 1L);

        Assertions.assertNotNull(updateEnseignant);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Assertions.assertTrue(encoder.matches("abcdefghi", updateEnseignant.getPassword()));
    }
}