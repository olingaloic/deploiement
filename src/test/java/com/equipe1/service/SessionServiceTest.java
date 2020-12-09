package com.equipe1.service;


import com.equipe1.model.Etudiant;
import com.equipe1.model.Session;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.SessionRepository;
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
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class SessionServiceTest {

    @Autowired
    private SessionService sessionService;

    @MockBean
    private SessionRepository sessionRepository;

    @MockBean
    private EtudiantRepository etudiantRepository;

    private Session session;

    @BeforeEach
    void setUp() {
        session = Session.builder()
                .id(1L)
                .nom("AUT-2020")
                .isCurrent(true)
                .build();
        doReturn(session).when(sessionRepository).save(session);
        sessionRepository.save(session);
    }

    @Test
    void testGetAll() {
        // Arrange
        doReturn(Arrays.asList(session)).when(sessionRepository).findAll();
        // Act
        List<Session> sessions = sessionService.getAll();
        // Assert
        Assertions.assertEquals(1, sessions.size());
    }

    @Test
    void testCreate() {
        // Arrange
        Etudiant e1 = new Etudiant();
        e1.setEnregistre(true);
        etudiantRepository.save(e1);
        Session newSession = Session.builder().nom("HIV-2021").isCurrent(true).build();

        when(etudiantRepository.save(e1)).thenReturn(e1);
        when(etudiantRepository.findAll()).thenReturn(Arrays.asList(e1));
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(session));
        when(sessionRepository.save(newSession)).thenReturn(newSession);
        // Act
        Session currentSession = sessionService.create(newSession);
        // Assert
        Assertions.assertNotNull(currentSession);
        Assertions.assertTrue(currentSession.isCurrent());
        Assertions.assertEquals("HIV-2021", currentSession.getNom());
        Assertions.assertEquals(false, e1.isEnregistre());

    }

    @Test
    void testFindCurrentSession() {
        // Arrange
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(session));
        // Act
        Optional<Session> currentSession = sessionService.findCurrentSession();
        // Assert
        Assertions.assertTrue(currentSession.isPresent());
        Assertions.assertSame(currentSession.get(), session);
    }

    @Test
    void testIsSessionSelectionneeEnCours() {
        // Arrange
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(session));
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));

        // Act
        boolean sessionSelectionnee = sessionService.isSessionSelectionneeEnCours(session.getId());
        // Assert
        Assertions.assertTrue(sessionSelectionnee);
    }

    @Test
    public void testGetSessionById() {
        // Arrange
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));

        // Act
        Session sessionSelectionnee = sessionService.getSessionById(session.getId());
        // Assert
        Assertions.assertNotNull(sessionSelectionnee);
        Assertions.assertEquals(sessionSelectionnee, session);
    }
}
