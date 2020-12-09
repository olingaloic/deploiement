package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.RoleRepository;
import com.equipe1.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EtudiantService {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private CandidatureService candidatureService;

    @Autowired
    private EnseignantService enseignantService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    RoleRepository roleRepository;

    public EtudiantService(EtudiantRepository etudiantRepository){
        this.etudiantRepository = etudiantRepository;
    }

    public List<Etudiant> getEtudiants(Long idSession){
        Session session = sessionRepository.findById(idSession).get();
        List<Etudiant> etudiants = etudiantRepository.findAll();
        List<Etudiant> etudiantsSessionEnCours = new ArrayList<>();
        if(!etudiants.isEmpty()){
            etudiantsSessionEnCours = etudiants.stream()
                    .filter(etudiant -> etudiant.getSessions().contains(session))
                    .collect(Collectors.toList());
        }

        return etudiantsSessionEnCours;
    }

    public Optional<Etudiant> findEtudiantById(Long idEtudiant){
        return etudiantRepository.findById(idEtudiant);
    }

    public Etudiant saveEtudiant(Etudiant etudiant){
        Session sessionEnCours = sessionRepository.findCurrentSession().get();
        List<Session> sessions = new ArrayList<>();
        sessions.add(sessionEnCours);
        etudiant.setStatutStage("aucun stage");
        etudiant.setSessions(sessions);
        etudiant.setEnregistre(true);

        etudiant.setPassword(encoder.encode(etudiant.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(Role.ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);
        etudiant.setRoles(roles);

        etudiant = etudiantRepository.save(etudiant);
        return etudiant;
    }

    public Etudiant getEtudiantByEmail(String email){
        return etudiantRepository.findByEmail(email);
    }

    public List<Etudiant> getEtudiantsByProgramme(String programme, Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Etudiant> etudiants = etudiantRepository.findAllByProgramme(programme);
        List<Etudiant> etudiantsFiltresAvecSession = new ArrayList<>();
        if (etudiants != null){
            for(Etudiant etudiant : etudiants){
                if(etudiant.getSessions().contains(session))
                    etudiantsFiltresAvecSession.add(etudiant);
            }
        }
        return etudiantsFiltresAvecSession;
    }


    public Optional<Etudiant> registerEtudiantSession(long id) {
        var optionalEtudiant = findEtudiantById(id);
        if (optionalEtudiant.isPresent()) {
            Optional<Session> session = sessionRepository.findCurrentSession();
            optionalEtudiant.get().getSessions().add(session.get());
            optionalEtudiant.get().setEnregistre(true);
            etudiantRepository.save(optionalEtudiant.get());
        }
        return optionalEtudiant;
    }

    public boolean isEtudiantRegistered(long id) {
        var optionalEtudiant = findEtudiantById(id);
        if (optionalEtudiant.isPresent()) {
            Optional<Session> sessionActuelle = sessionRepository.findCurrentSession();
            return optionalEtudiant.get()
                                   .getSessions()
                                   .stream()
                                   .anyMatch(sessionEtudiant -> sessionEtudiant.getId() == sessionActuelle.get().getId());
        }
        return false;
    }

    public List<Etudiant> getEtudiantsAucunStage(Long idSession){
        List<Etudiant> etudiants = etudiantRepository.findAll();
        List<Etudiant> resultListEtudiants = new ArrayList<>();
        for (Etudiant etudiant : etudiants){
            if (!hasStage(etudiant, idSession))
                resultListEtudiants.add(etudiant);
        }
        return resultListEtudiants;
    }

    private boolean hasStage(Etudiant etudiant, Long idSession) {
        if(candidatureService.findCandidatureByEtudiant(etudiant.getId(), idSession).isEmpty()){
            return false;
        }
        else {
            List<Candidature> candidatures = candidatureService.findCandidatureByEtudiant(etudiant.getId(), idSession);
            for(Candidature candidature : candidatures){
                if(candidature.getStatut().equals(Candidature.CandidatureStatut.CHOISI))
                    return true;
            }
           return false;
        }
    }


    public List<Etudiant> getEtudiantsAucunCV(Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Etudiant> etudiantsInscrits = etudiantRepository.findAll().stream()
                .filter(etudiant -> etudiant.getSessions().contains(session) && etudiant.getCv() == null)
                .collect(Collectors.toList());
        return etudiantsInscrits;
    }

    public List<Etudiant> getEtudiantsCVNonApprouve(Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Etudiant> etudiantsInscrits = etudiantRepository.findAll().stream()
                .filter(etudiant -> etudiant.getSessions().contains(session) &&
                        etudiant.getCv() != null && etudiant.getCv().getStatus() != CV.CVStatus.APPROVED)
                .collect(Collectors.toList());
        return etudiantsInscrits;
    }

    public Etudiant updateEtudiantPassword(Etudiant newEtudiant, Long id) {
        Optional<Etudiant> optionalEtudiant = etudiantRepository.findById(id);
        optionalEtudiant.get().setPassword(encoder.encode(newEtudiant.getPassword()));
        return etudiantRepository.save(optionalEtudiant.get());
    }

    public Etudiant setEnseignant(Long idEtudiant, Long idEnseignant){
        Optional<Etudiant> etudiant = etudiantRepository.findById(idEtudiant);
        Enseignant enseignant = enseignantService.getEnseignantById(idEnseignant);
        if(etudiant.isPresent()){
            etudiant.get().setEnseignant(enseignant);
            etudiantRepository.save(etudiant.get());
        }
        return etudiant.orElse(new Etudiant());
    }
    public List<Etudiant> getEtudaintsByEnseignant(Long idEnseignant){
        Enseignant enseignant = enseignantService.getEnseignantById(idEnseignant);
        return etudiantRepository.findByEnseignant(enseignant);
    }

    public Etudiant enleverEnseignant(Long idEtudiant, Long idEnseignant){
        Optional<Etudiant> etudiant = etudiantRepository.findById(idEtudiant);
        Enseignant enseignant = enseignantService.getEnseignantById(idEnseignant);
        if(etudiant.isPresent()){
            if(etudiant.get().getEnseignant().equals(enseignant)){
                etudiant.get().setEnseignant(null);
                etudiantRepository.save(etudiant.get());
            }
        }
        return etudiant.orElse(new Etudiant());
    }
}


