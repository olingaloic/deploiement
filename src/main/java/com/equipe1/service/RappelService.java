package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RappelService {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CVService cvService;
    @Autowired
    private StageService stageService;
    @Autowired
    private CandidatureService candidatureService;
    @Autowired
    private ContratService contratService;
    @Autowired
    private SessionService sessionService;

    public List<? extends Rappel> getRappelsPour(long userId) throws Exception {
        var optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            var user = optionalUser.get();
            if (user instanceof Gestionnaire) return remindersForGestionaire((Gestionnaire) user);
            else if (user instanceof Employeur) return remindersForEmployeur((Employeur) user);
            else if (user instanceof Etudiant) return remindersForEtudiant((Etudiant) user);
        }
        return new ArrayList<>();
    }

    private List<Rappel.GestionaireRappel> remindersForGestionaire(Gestionnaire user) throws Exception {
        Session currentSession;
        var sessionOptional = sessionService.findCurrentSession();
        if (sessionOptional.isEmpty()) throw new Exception("no current session!");
        else currentSession = sessionOptional.get();

        // cherche si il y a des cvs sans veto
        var messages = new ArrayList<Rappel.GestionaireRappel>();
        var cvs = cvService.getByDataIsNotNullAndStatusNotReviewed();
        if (!cvs.isEmpty()) {
            messages.add(Rappel.GestionaireRappel.CV_SANS_VETO);
        }

        // cherche si il y a des stages sans veto
        var stages = stageService.getByStatutWaiting();
        if (stages.stream()
                .anyMatch(stage -> stage.getSession().equals(currentSession))) {
            messages.add(Rappel.GestionaireRappel.STAGE_SANS_VETO);
        }

        // cherche si un contrat est pret a etre généré
        for (var stage : stageService.getStagesSessionEnCours())
            if (candidatureService.findCandidatureByStage(stage.getId())
                    .stream()
                    .anyMatch(candidature -> candidature
                            .getStatut()
                            .equals(Candidature.CandidatureStatut.CHOISI))) {
                messages.add(Rappel.GestionaireRappel.CONTRAT_PRET_A_ETRE_GENERE);
                break;
            }


        // cherche si une signature doit etre approuvee
        boolean gotEmployeur = false;
        boolean gotEtudiant = false;
        for (var contrat : contratService.getContrats(currentSession.getId())) {
            if (contrat.getSignatureEmployeur() == Contrat.SignatureEtat.EN_ATTENTE
                    && !gotEmployeur) {
                messages.add(Rappel.GestionaireRappel.SIGNATURE_A_APPROUVER_EMPLOYEUR);
                gotEmployeur = true;
            } else if (contrat.getSignatureEtudiant() == Contrat.SignatureEtat.EN_ATTENTE
                    && !gotEtudiant) {
                messages.add(Rappel.GestionaireRappel.SIGNATURE_A_APPROUVER_ETUDIANT);
                gotEtudiant = true;
            }
            if (gotEmployeur && gotEtudiant)
                break;
        }

        return messages;
    }

    private List<Rappel.EmployeurRappel> remindersForEmployeur(Employeur user) throws Exception {
        Session currentSession;
        var sessionOptional = sessionService.findCurrentSession();
        if (sessionOptional.isEmpty()) throw new Exception("no current session!");
        else currentSession = sessionOptional.get();
        var messages = new ArrayList<Rappel.EmployeurRappel>();

        // cherche si l'employeur a au moins un stage
        var stageCetteSession = stageService.getStagesByEmployeur(user.getId(), currentSession.getId());
        if (stageCetteSession.stream().findAny().isEmpty()) {
            messages.add(Rappel.EmployeurRappel.PAS_DE_STAGE_OUVERT_CETTE_SESSION);
        }


        // cherche si il manque une signature de la part de l'employeur sur un de ses contrats
        var contratsParEmployeurs = contratService.getContratsByEmployeur(user);

        for (var contrat : contratsParEmployeurs.stream()
                .filter(contrat -> contrat.getCandidature()
                        .getStage()
                        .getSession()
                        .equals(currentSession))
                .collect(Collectors.toList()))
            if (contrat.getSignatureEmployeur() == Contrat.SignatureEtat.PAS_SIGNE) {
                messages.add(Rappel.EmployeurRappel.SIGNATURE_MANQUANTE_SUR_UN_CONTRAT);
                break;
            }

        return messages;
    }

    private List<Rappel.EtudiantRappel> remindersForEtudiant(Etudiant user) throws Exception {
        Session currentSession;
        var sessionOptional = sessionService.findCurrentSession();
        if (sessionOptional.isEmpty()) throw new Exception("no current session!");
        else currentSession = sessionOptional.get();
        var messages = new ArrayList<Rappel.EtudiantRappel>();


        // cherche si l'etudiant n'a pas encore soumis son CV
        if (user.getCv() == null ||
                user.getCv().getData() == null ||
                user.getCv().getData().length == 0)
            messages.add(Rappel.EtudiantRappel.PAS_DE_CV);

//        System.out.println( "HELLO_--------------"+candidatureService.findCandidatureByEtudiant(user.getId(), currentSession.getId()));


        // cherche si l'etudiant n'a pas encore soumis sa candidature
        if (candidatureService.findCandidatureByEtudiant(user.getId(), currentSession.getId())
                .stream()
                .findAny()
                .isEmpty()
                && stageService.getStages(currentSession.getId())
                .stream()
                .findAny()
                .isEmpty()) {
            messages.add(Rappel.EtudiantRappel.PAS_DE_CANDIDATURE_SUR_UN_STAGE);
        }

        // cherche si il manque sa signature sur le contrat
        if (contratService.getContratsByEtudiantChoisi(user)
                .stream()
                .anyMatch(contrat -> contrat.getSignatureEtudiant()
                        .equals(Contrat.SignatureEtat.PAS_SIGNE)))
            messages.add(Rappel.EtudiantRappel.SIGNATURE_MANQUANTE_SUR_UN_CONTRAT);

        // cherche si l'etudiant est enregistré dans la session actuelle
        if (!user.getSessions().contains(currentSession))
            messages.add(Rappel.EtudiantRappel.PAS_ENREGISTRE_CETTE_SESSION);

        // cherche si l'etudiant n'a pas encore confirmé sa présence à un stage
        var candidaturesCetteSession = candidatureService.findCandidatureByEtudiant(user.getId(), currentSession.getId());
        if (candidaturesCetteSession
                .stream()
                .anyMatch(candidature -> candidature.getStatut() == Candidature.CandidatureStatut.APPROUVE &&
                        candidature.getStatut() != Candidature.CandidatureStatut.CHOISI)
        )
            messages.add(Rappel.EtudiantRappel.FREQUENTATION_DE_STAGE_PAS_CONFIRMEE);

        return messages;
    }
}
