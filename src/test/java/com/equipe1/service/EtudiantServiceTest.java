package com.equipe1.service;

import com.equipe1.model.Etudiant;
import com.equipe1.repository.EtudiantRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class EtudiantServiceTest {

    @Autowired
    private EtudiantService service;

    @MockBean
    private EtudiantRepository repository;

    private Etudiant e1;
    private Etudiant e2;

    @BeforeEach
    public void setUp() {
        e1 = new Etudiant();
        e1.setNom("toto");
        e1.setMatricule("12345");
        e1.setEmail("e1@email.com");
        e1.setProgramme("Techniques de l’informatique");

        e2 = new Etudiant();
        e2.setNom("tata");
        e2.setMatricule("67890");
        e1.setEmail("e2@email.com");
        e1.setProgramme("Techniques de l’informatique");
    }

    @Test
    void testGetEtudiants() {
        // Arrange
        doReturn(Arrays.asList(e1, e2)).when(repository).findAll();
        // Act
        List<Etudiant> etudiants = service.getEtudiants();
        // Assert
        Assertions.assertEquals(2, etudiants.size());
    }

    @Test
    void testFindEtudiantById() {
        // Arrange
        doReturn(Optional.of(e1)).when(repository).findById(1l);
        // Act
        Optional<Etudiant> etudiant = service.findEtudiantById(1l);
        // Assert
        Assertions.assertTrue(etudiant.isPresent());
        Assertions.assertSame(etudiant.get(), e1);
    }

    @Test
    void testFindEtudiantByIdNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(repository).findById(1l);
        // Act
        Optional<Etudiant> etudiant = service.findEtudiantById(1l);
        // Assert
        Assertions.assertFalse(etudiant.isPresent());
    }

    @Test
    void testSaveEtudiant() {
        // Arrange
        doReturn(e1).when(repository).save(any());
        // Act
        Etudiant etudiant = service.saveEtudiant(e1);
        // Assert
        Assertions.assertNotNull(etudiant);
        Assertions.assertEquals(e1.getNom(), etudiant.getNom());
    }

    @Test
    void testUpdateEtudiant() {
        // Arrange + Act
        e1.setId(1l);
        e1.setProgramme("NONE");
        e1.setEmail("NONE");
        e1.setTelephone("NONE");
        e1.setAdresse("NONE");
        doReturn(e1).when(repository).save(any());
        Etudiant etudiant = repository.save(e1);

        Etudiant putContent = new Etudiant();
        putContent = e1;
        putContent.setProgramme("TI");
        putContent.setEmail("TI");
        putContent.setTelephone("TI");
        putContent.setAdresse("TI");
        doReturn(putContent).when(repository).save(any());
        doReturn(Optional.of(e1)).when(repository).findById(e1.getId());
        Etudiant updatedEtudiant = service.updateEtudiant(putContent, etudiant.getId());
        // Assert
        Assertions.assertNotNull(updatedEtudiant);
        Assertions.assertEquals(1l, updatedEtudiant.getId());
        Assertions.assertEquals(e1.getNom(), updatedEtudiant.getNom());
        Assertions.assertEquals("TI", updatedEtudiant.getProgramme());
        Assertions.assertEquals("TI", updatedEtudiant.getEmail());
        Assertions.assertEquals("TI", updatedEtudiant.getTelephone());
        Assertions.assertEquals("TI", updatedEtudiant.getAdresse());
    }

    @Test
    void testFindEtudiantByMatricule() {
        // Arrange
        doReturn(Optional.of(e1)).when(repository).findByMatricule("12345");
        // Act
        Optional<Etudiant> etudiant = service.findEtudiantByMatricule("12345");
        // Assert
        Assertions.assertTrue(etudiant.isPresent());
        Assertions.assertSame(etudiant.get(), e1);
    }

    @Test
    void testFindEtudiantByMatriculeNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(repository).findByMatricule("X");
        // Act
        Optional<Etudiant> etudiant = service.findEtudiantByMatricule("X");
        // Assert
        Assertions.assertFalse(etudiant.isPresent());
    }

    @Test
    void testFindEtudiantByEmail() {
        // Arrange
        doReturn(e1).when(repository).findByEmail("e1@email.com");
        // Act
        Etudiant etudiant = service.getEtudiantByEmail("e1@email.com");
        // Assert
        Assertions.assertNotNull(etudiant);
        Assertions.assertSame(etudiant, e1);
    }

    @Test
    void testFindEtudiantByEmailNotFound() {
        // Arrange
        doReturn(null).when(repository).findByEmail("no@email.com");
        // Act
        Etudiant etudiant = service.getEtudiantByEmail("no@email.com");
        // Assert
        Assertions.assertNull(etudiant);
    }

    @Test
    void testFindEtudiantByProgrammeFound() {
        // Arrange
        doReturn(Arrays.asList(e1, e2)).when(repository).findAllByProgramme("Techniques de l’informatique");
        // Act
        List<Etudiant> etudiants = service.getEtudiantsByProgramme("Techniques de l’informatique");
        // Assert
        Assertions.assertNotNull(etudiants);
        Assertions.assertEquals(etudiants.size(), 2);
    }

    @Test
    void testFindEtudiantByProgrammeNotFound() {
        // Arrange
        doReturn(null).when(repository).findAllByProgramme("RIEN");
        // Act
        List<Etudiant> etudiants = service.getEtudiantsByProgramme("RIEN");
        // Assert
        Assertions.assertNull(etudiants);
    }
}