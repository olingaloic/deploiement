package com.equipe1.service;


import com.equipe1.model.Etudiant;
import com.equipe1.model.Session;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.SessionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
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
public class SchedulerServiceTest {

    @Autowired
    private SchedulerService schedulerService;

    @MockBean
    private SessionService sessionService;

    @MockBean
    private SessionRepository sessionRepository;

    @MockBean
    private EtudiantRepository etudiantRepository;

    private Session session;

    @BeforeEach
    void setUp() {

    }

    @Test
    void testScheduleCreationSessionHiver() {
        // Arrange
        session = Session.builder()
                .id(1L)
                .nom("AUT-2020")
                .isCurrent(true)
                .build();

        Session newSession = Session.builder()
                .nom("HIV-2021")
                .dateDebut(LocalDate.of(2021, 1, 1))
                .dateFin(LocalDate.of(2021, 5, 31))
                .isCurrent(true)
                .build();

        when(sessionService.findCurrentSession()).thenReturn(Optional.of(session));
        when(sessionService.create(newSession)).thenReturn(newSession);
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(newSession));

        // Act
        Session sessionActuelle = schedulerService.scheduleCreationSession();
        // Assert
        Assertions.assertEquals(newSession.getNom(), sessionActuelle.getNom());
        Assertions.assertEquals(newSession.getDateDebut(), sessionActuelle.getDateDebut());
        Assertions.assertEquals(newSession.getDateFin(), sessionActuelle.getDateFin());
    }

    @Test
    void testScheduleCreationSessionAutomne() {
        // Arrange
        session = Session.builder()
                .id(1L)
                .nom("ETE-2020")
                .isCurrent(true)
                .build();

        Session newSession = Session.builder()
                .nom("AUT-2020")
                .dateDebut(LocalDate.of(2020, 9, 1))
                .dateFin(LocalDate.of(2020, 12, 31))
                .isCurrent(true)
                .build();

        when(sessionService.findCurrentSession()).thenReturn(Optional.of(session));
        when(sessionService.create(newSession)).thenReturn(newSession);
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(newSession));

        // Act
        Session sessionActuelle = schedulerService.scheduleCreationSession();
        // Assert
        Assertions.assertEquals(newSession.getNom(), sessionActuelle.getNom());
        Assertions.assertEquals(newSession.getDateDebut(), sessionActuelle.getDateDebut());
        Assertions.assertEquals(newSession.getDateFin(), sessionActuelle.getDateFin());
    }

    @Test
    void testScheduleCreationSessionEte() {
        // Arrange
        session = Session.builder()
                .id(1L)
                .nom("HIV-2020")
                .isCurrent(true)
                .build();

        Session newSession = Session.builder()
                .nom("ETE-2020")
                .dateDebut(LocalDate.of(2020, 6, 1))
                .dateFin(LocalDate.of(2020, 8, 31))
                .isCurrent(true)
                .build();

        when(sessionService.findCurrentSession()).thenReturn(Optional.of(session));
        when(sessionService.create(newSession)).thenReturn(newSession);
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(newSession));

        // Act
        Session sessionActuelle = schedulerService.scheduleCreationSession();
        // Assert
        Assertions.assertEquals(newSession.getNom(), sessionActuelle.getNom());
        Assertions.assertEquals(newSession.getDateDebut(), sessionActuelle.getDateDebut());
        Assertions.assertEquals(newSession.getDateFin(), sessionActuelle.getDateFin());
    }
}
