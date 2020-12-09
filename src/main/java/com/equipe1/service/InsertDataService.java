package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Component
public class InsertDataService {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private EmployeurRepository employeurRepository;

    @Autowired
    private StageService stageService;

    @Autowired
    StageRepository stageRepository;

    @Autowired
    private GestionnaireRepository gestionnaireRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    GenerateurPdfService generateurPdfService;

    @Autowired
    private EnseignantRepository enseignantRepository;

    private List<Session> sessionList;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional
    public void insertSession() {
        sessionList = new ArrayList<>();
        Session session;

        session = Session.builder().nom("ETE-2020").isCurrent(false)
                .dateDebut(LocalDate.of(2020, 6, 1))
                .dateFin(LocalDate.of(2020, 8, 31)).build();
        sessionRepository.save(session);
        sessionList.add(session);

        session = Session.builder().nom("AUT-2020").isCurrent(false)
                .dateDebut(LocalDate.of(2020, 9, 1))
                .dateFin(LocalDate.of(2020, 12, 31)).build();
        sessionRepository.save(session);
        sessionList.add(session);

        session = Session.builder().nom("HIV-2021").isCurrent(true)
                .dateDebut(LocalDate.of(2021, 1, 1))
                .dateFin(LocalDate.of(2021, 5, 31)).build();
        sessionRepository.save(session);
        sessionList.add(session);
    }

    @Transactional
    public void insertEtudiant(){
        Session sessionEte = sessionRepository.findById(1L).get();
        Session sessionAutomne = sessionRepository.findById(2L).get();
        Session session = sessionRepository.findCurrentSession().get();

        List<Session> sessions = new ArrayList<>();
        sessions.add(session);

        List<Session> sessionsPassees = new ArrayList<>();
        sessionsPassees.add(sessionEte);
        sessionsPassees.add(sessionAutomne);


        Etudiant e1 = new Etudiant();
        e1.setAdresse("123456");
        e1.setEmail("chanh@email.com");
        e1.setMatricule("1772397");
        e1.setPassword(encoder.encode("123456"));
        e1.setPrenom("Chanh");
        e1.setNom("Nguyen");
        e1.setStatutStage("possede stage");
        e1.setTelephone("555-555-5555");
        e1.setProgramme("Techniques de l’informatique");
        e1.setSessions(sessions);
        e1.setEnregistre(true);
        e1.setSessions(sessionList);

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(Role.ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e1.setRoles(roles);

        etudiantRepository.save(e1);

        Etudiant e2 = new Etudiant();
        e2.setAdresse("123456");
        e2.setEmail("alex@email.com");
        e2.setMatricule("1501279");
        e2.setPassword(encoder.encode("123456"));
        e2.setPrenom("Alex");
        e2.setNom("Nguyen");
        e2.setStatutStage("aucun stage");
        e2.setTelephone("555-444-4444");
        e2.setProgramme("Techniques de l’informatique");
        e2.setEnregistre(true);
        e2.setSessions(sessionList);

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e2.setRoles(roles);

        etudiantRepository.save(e2);

        Etudiant e3 = new Etudiant();
        e3.setAdresse("123456");
        e3.setEmail("olingamedjoloic@gmail.com");
        e3.setMatricule("1998277");
        e3.setPassword(encoder.encode("123456"));
        e3.setPrenom("Loic");
        e3.setNom("Olinga");
        e3.setStatutStage("possede stage");
        e3.setTelephone("555-444-4444");
        e3.setProgramme("Techniques de l’informatique");
        e3.setSessions(sessionList);
        e3.setEnregistre(true);

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e3.setRoles(roles);

        etudiantRepository.save(e3);

        Etudiant e4 = new Etudiant();
        e4.setAdresse("110 Rue Trichardt");
        e4.setEmail("jbmeyer@gmail.com");
        e4.setMatricule("1212024");
        e4.setPassword(encoder.encode("123456"));
        e4.setPrenom("Jean-Baptiste");
        e4.setNom("Meyer");
        e4.setTelephone("438-341-1212");
        e4.setProgramme("Techniques de la logistique du transport");
        e4.setSessions(sessionsPassees);
        e4.setEnregistre(false);

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e4.setRoles(roles);
        etudiantRepository.save(e4);

        Etudiant e5 = new Etudiant();
        e5.setAdresse("900 Avenue Trichardt");
        e5.setEmail("vanessahuppenkothen@gmail.com");
        e5.setMatricule("2421554");
        e5.setPassword(encoder.encode("123456"));
        e5.setPrenom("Vanessa");
        e5.setNom("Huppenkothen");
        e5.setTelephone("438-504-2123");
        e5.setProgramme("Techniques d’éducation à l’enfance");
        e5.setSessions(sessionsPassees);
        e5.setEnregistre(false);

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e5.setRoles(roles);
        etudiantRepository.save(e5);

        Etudiant e6 = new Etudiant();
        e6.setAdresse("8812 Rue Sherbrooke Ouest");
        e6.setEmail("kevinoliphant@gmail.com");
        e6.setMatricule("2178012");
        e6.setPassword(encoder.encode("123456"));
        e6.setPrenom("Kevin");
        e6.setNom("Oliphant");
        e6.setTelephone("438-504-2123");
        e6.setProgramme("Techniques de l’informatique");
        e6.setSessions(sessionsPassees);
        e6.setEnregistre(false);

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e6.setRoles(roles);
        etudiantRepository.save(e6);

        Etudiant e7 = new Etudiant();
        e7.setAdresse("2001 Rue Harding");
        e7.setEmail("georgesdupont@gmail.com");
        e7.setMatricule("1230112");
        e7.setPassword(encoder.encode("123456"));
        e7.setPrenom("Georges");
        e7.setNom("Dupont");
        e7.setTelephone("438-012-4132");
        e7.setProgramme("Techniques de l’informatique");
        e7.setSessions(sessionsPassees);
        e7.setEnregistre(false);

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e7.setRoles(roles);
        etudiantRepository.save(e7);

        Etudiant e8 = new Etudiant();
        e8.setAdresse("11 Avenue St-Just");
        e8.setEmail("claraarsenault12@hotmail.com");
        e8.setMatricule("4531124");
        e8.setPassword(encoder.encode("123456"));
        e8.setPrenom("Clara");
        e8.setNom("Arsenault");
        e8.setTelephone("438-991-2113");
        e8.setProgramme("Soins infirmiers");
        e8.setSessions(sessionsPassees);
        e8.setEnregistre(false);

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e8.setRoles(roles);
        etudiantRepository.save(e8);
    }

    @Transactional
    public void insertEmployeur(){
        Employeur e1 = new Employeur();
        e1.setEmail("carlos.test@gmail.com");
        e1.setPassword(encoder.encode("123456"));
        e1.setAdresse("12345");
        e1.setNom("Banque1");
        e1.setTelephone("888-888-8888");

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(Role.ERole.ROLE_EMPLOYEUR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e1.setRoles(roles);

        employeurRepository.save(e1);

        e1 = new Employeur();
        e1.setEmail("employeur@email.com");
        e1.setPassword(encoder.encode("123456"));
        e1.setAdresse("12345");
        e1.setNom("Hopital Général");
        e1.setTelephone("888-888-8888");

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_EMPLOYEUR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e1.setRoles(roles);
        
        employeurRepository.save(e1);
    }

    @Transactional
    public void insertStage(){
        Employeur e2 = employeurRepository.findEmployeurByEmail("carlos.test@gmail.com");
        Session session = sessionRepository.findCurrentSession().get();

        Stage stage1 = new Stage();
        stage1.setTitre("Stage_1");
        stage1.setDescription("stage informatique ");
        stage1.setNbAdmis(2);
        stage1.setDateDebut(LocalDate.of(2020,10,12));
        stage1.setDateFin(LocalDate.of(2020,12,12));
        stage1.setDateLimiteCandidature(LocalDate.of(2020,9,11));
        stage1.setExigences("aucune exigence");
        stage1.setProgramme("Techniques de l’informatique");
        stage1.setNbHeuresParSemaine(35);
        stage1.setVille("Montreal");
        stage1.setEmployeur(e2);
        stage1.setSalaire(15);

        stage1.setSession(session);
        stage1.setStatut(Stage.StageStatus.APPROUVÉ);

        stageService.saveStage(stage1);

        stage1 = new Stage();
        stage1.setTitre("stage_2");
        stage1.setDescription("stage informatique ");
        stage1.setNbAdmis(5);
        stage1.setDateDebut(LocalDate.now());
        stage1.setDateFin(LocalDate.of(2020,12,12));
        stage1.setDateLimiteCandidature(LocalDate.of(2020,12,11));
        stage1.setExigences("aucune exigence");
        stage1.setProgramme("Techniques de l’informatique");
        stage1.setNbHeuresParSemaine(37);
        stage1.setVille("Montreal");
        stage1.setEmployeur(e2);
        stage1.setSalaire(15);

        stage1.setSession(session);
        stage1.setStatut(Stage.StageStatus.APPROUVÉ);

        stageService.saveStage(stage1);

        Stage stage2 = new Stage();
        stage2.setTitre("Stage_2");
        stage2.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio euismod lacinia at quis risus sed vulputate. Faucibus in ornare quam viverra orci sagittis eu volutpat. ");
        stage2.setNbAdmis(5);
        stage2.setDateDebut(LocalDate.of(2021,4,7));
        stage2.setDateFin(LocalDate.of(2021,12,23));
        stage2.setDateLimiteCandidature(LocalDate.of(2020,12,6));
        stage2.setExigences("Travail d'equipe, Java, Python");
        stage2.setProgramme("Techniques de l’informatique");
        stage2.setNbHeuresParSemaine(40);
        stage2.setVille("Laval");
        stage2.setEmployeur(e2);
        stage2.setSalaire(18);
        stage2.setSession(session);

        e2 = employeurRepository.findEmployeurByEmail("employeur@email.com");

        stage2 = new Stage();
        stage2.setTitre("Stage en hémodialise");
        stage2.setDescription("Odio euismod lacinia at quis risus sed vulputate. Faucibus in ornare quam viverra orci sagittis eu volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
        stage2.setNbAdmis(14);
        stage2.setDateDebut(LocalDate.of(2021,1,9));
        stage2.setDateFin(LocalDate.of(2021,11,30));
        stage2.setDateLimiteCandidature(LocalDate.of(2020,12,5));
        stage2.setExigences("Travail d'equipe, compassion");
        stage2.setProgramme("Soins infirmiers");
        stage2.setNbHeuresParSemaine(38);
        stage2.setVille("Lasalle");
        stage2.setEmployeur(e2);
        stage2.setSalaire(20);
        stage2.setSession(session);
        stageService.saveStage(stage2);

    }

    @Transactional
    public void insertGestionnaire(){
        Gestionnaire g1 = new Gestionnaire();
        g1.setNom("admin01");
        g1.setPrenom("admin01");
        g1.setEmail("gestionnaire01@email.com");
        g1.setPassword(encoder.encode("123456"));
        g1.setTelephone("555-555-5555");

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(Role.ERole.ROLE_GESTIONNAIRE)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        g1.setRoles(roles);

        gestionnaireRepository.save(g1);
    }

    @Transactional
    public void insertEnseignants() {
        Enseignant enseignant1 = new Enseignant();
        enseignant1.setNom("Laure");
        enseignant1.setPrenom("Gaudreault ");
        enseignant1.setPassword(encoder.encode("123456"));
        enseignant1.setProgramme("Gestion de commerces");
        enseignant1.setEmail("laure@email.com");
        enseignant1.setTelephone("438956254");

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(Role.ERole.ROLE_ENSEIGNANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        enseignant1.setRoles(roles);

        enseignantRepository.save(enseignant1);

        Enseignant enseignant2 = new Enseignant();
        enseignant2.setNom("Leonie");
        enseignant2.setPrenom("Aguilar ");
        enseignant2.setPassword(encoder.encode("123456"));
        enseignant2.setProgramme("Gestion de commerces");
        enseignant2.setEmail("Leonie@email.com");
        enseignant2.setTelephone("438950000");

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_ENSEIGNANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        enseignant2.setRoles(roles);

        enseignantRepository.save(enseignant2);

        Enseignant enseignant3 = new Enseignant();
        enseignant3.setNom("Jia ");
        enseignant3.setPrenom("Haworth ");
        enseignant3.setPassword(encoder.encode("123456"));
        enseignant3.setProgramme("Gestion de commerces");
        enseignant3.setEmail("Jia@email.com");
        enseignant3.setTelephone("43895111111");

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_ENSEIGNANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        enseignant3.setRoles(roles);

        enseignantRepository.save(enseignant3);

        Enseignant enseignant4 = new Enseignant();
        enseignant4.setNom("Freja ");
        enseignant4.setPrenom("Vickers ");
        enseignant4.setPassword(encoder.encode("123456"));
        enseignant4.setProgramme("Techniques de l’informatique");
        enseignant4.setEmail("Freja@email.com");
        enseignant4.setTelephone("4389522222");

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_ENSEIGNANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        enseignant4.setRoles(roles);

        enseignantRepository.save(enseignant4);

        Enseignant enseignant5 = new Enseignant();
        enseignant5.setNom("Kristian ");
        enseignant5.setPrenom("Redman ");
        enseignant5.setPassword(encoder.encode("123456"));
        enseignant5.setProgramme("Techniques de l’informatique");
        enseignant5.setEmail("Kristian@email.com");
        enseignant5.setTelephone("4389522222");

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_ENSEIGNANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        enseignant5.setRoles(roles);

        enseignantRepository.save(enseignant5);
    }
}



