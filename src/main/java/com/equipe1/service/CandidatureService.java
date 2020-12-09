package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.CandidatureRepository;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.SessionRepository;
import com.equipe1.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CandidatureService {

    @Autowired
    private CandidatureRepository candidatureRepository;

    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private EtudiantRepository etudiantRepository;
    @Autowired
    private CourrielService courrielService;
    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private EvaluationMilieuStageService evaluationMilieuStageService;

    private SessionService sessionService;

    public CandidatureService(CandidatureRepository candidatureRepository){
        this.candidatureRepository = candidatureRepository;
    }

    public List<Candidature> getCandidatures(){
        return candidatureRepository.findAll();
    }

    public Optional<Candidature> findCandidatureById(Long idCandidature){
        return candidatureRepository.findById(idCandidature);
    }

    public List<Candidature> findCandidatureByEtudiant(Long idEtudiant, Long idSession){
        Etudiant etudiant = etudiantRepository.findById(idEtudiant).get();
        List<Candidature> candidatures = candidatureRepository.findAll();
        List<Candidature> candidatureList = new ArrayList<>();
        Session session = sessionRepository.findById(idSession).get();

        for (Candidature candidature: candidatures) {

            if(candidature.getEtudiant().equals(etudiant) && candidature.getStage().getSession().equals(session))
                candidatureList.add(candidature);
        }
        return candidatureList;
    }

    public Candidature createCandidature(Long idEtudiant, Long idStage){
        Candidature candidature = new Candidature();
        Optional<Stage> stage = stageRepository.findById(idStage);
        Optional<Etudiant> etudiant = etudiantRepository.findById(idEtudiant);
        candidature.setEtudiant(etudiant.isPresent() ?etudiant.get() : null);
        candidature.setStage(stage.isPresent() ? stage.get() : null);
        candidatureRepository.save(candidature);
        return candidature;
    }

    public Candidature updateCandidatureApprouve(Long id) throws Exception {
        Candidature updatedCandidature = candidatureRepository.findById(id).get();
        updatedCandidature.setStatut(Candidature.CandidatureStatut.APPROUVE);
        candidatureRepository.save(updatedCandidature);
        courrielService.sendCandidatureStatusUpdate(updatedCandidature);
        return updatedCandidature;
    }

    public List<Candidature> findCandidatureByStage(Long idStage){
        List<Candidature> candidatures = candidatureRepository.findAll();
        List<Candidature> candidatureList = new ArrayList<>();
        for (Candidature candidature: candidatures) {
            if(candidature.getStage().getId().equals(idStage))
                candidatureList.add(candidature);
        }
        return candidatureList;
    }

    public Candidature updateCandidatureChoisi(Long id) {
        Candidature updatedCandidature = candidatureRepository.findById(id).get();
        updatedCandidature.setStatut(Candidature.CandidatureStatut.CHOISI);
        return candidatureRepository.save(updatedCandidature);
    }

    public Optional<Candidature> getCandidatureChoisi(Long id) {
        Optional<Candidature> optionalCandidature = Optional.empty();
        boolean flag = false;
        List<Candidature> currentSessionCandidatures = new ArrayList<>();
        Optional<Etudiant> optionalEtudiant = etudiantRepository.findById(id);
        if (optionalEtudiant.isPresent()) {

            Optional<Session> sessionActuelle = sessionRepository.findCurrentSession();
            flag = optionalEtudiant.get()
                    .getSessions()
                    .stream()
                    .anyMatch(sessionEtudiant -> sessionEtudiant.getId() == sessionActuelle.get().getId());

            currentSessionCandidatures = candidatureRepository.findAll();
        }
        if (flag){
            Set<Candidature> filtered = currentSessionCandidatures.stream()
                                        .filter(candidature -> candidature.getEtudiant().getId() == id && candidature.getStatut() == Candidature.CandidatureStatut.CHOISI)
                                        .collect(Collectors.toSet());

            if (!filtered.isEmpty())
                optionalCandidature = Optional.of(filtered.iterator().next());
        }
        return optionalCandidature;
    }

    public List<Candidature> getListCandidaturesChoisis(Long idSession){
        Session session = sessionRepository.findById(idSession).get();
        List<Candidature> candidatures =  candidatureRepository.findByStatut(Candidature.CandidatureStatut.CHOISI);
        List<Candidature> candidaturesChoisiesSession = new ArrayList<>();
        if(!candidatures.isEmpty()){
            candidaturesChoisiesSession = candidatures.stream()
                    .filter(candidature -> candidature.getStage().getSession().equals(session))
                    .collect(Collectors.toList());
        }
        return candidaturesChoisiesSession;
    }

    public List<Candidature> getListCandidatureByEmployeurSansEvaluationStagiaire(Long idEmployeur, Long idSession){
        List<Candidature> candidatureByemployeur = new ArrayList<>();
        for (Candidature c: getListCandidaturesChoisis(idSession)) {
            //validation date fin stage => && isStageUneSemaineAvantLaFin(c)
            if(employeurExiste(idEmployeur, c) && !c.isEvaluee() ){
                candidatureByemployeur.add(c);
            }
        }
        return candidatureByemployeur;
    }

    public List<Candidature> getCandidatureDesEtudaintsByEnseignantId(Long idEnseignant){
        List<Candidature> candidatures = new ArrayList<>();
        for (Candidature c : candidatureRepository.findByStatut(Candidature.CandidatureStatut.CHOISI)) {
          if(c.getEtudiant().getEnseignant() != null && c.getEtudiant().getEnseignant().getId()==idEnseignant){
              candidatures.add(c);
          }
        }
        return candidatures;
    }

    public List<Candidature> getCandidaturesByEmployeurSansEvalutionMilieuStage(Long idEnseignant){
        List<Candidature> candidatures = new ArrayList<>();
        Optional<EvaluationMilieuStage> evaluationMilieuStage;
        for (Candidature c : getCandidatureDesEtudaintsByEnseignantId(idEnseignant)) {
            evaluationMilieuStage = evaluationMilieuStageService.getByEtudiant(c.getEtudiant());
            if(!evaluationMilieuStage.isPresent()){
                candidatures.add(c);
            }
        }
        return candidatures;
    }

    private boolean isStageUneSemaineAvantLaFin(Candidature c) {
        var semaineAvantLafinStage = c.getStage().getDateFin().minusWeeks(2);
        return LocalDate.now().isAfter(semaineAvantLafinStage);
    }

    private boolean employeurExiste(Long idEmployeur, Candidature c) {
        return c.getStage().getEmployeur().getId() == idEmployeur;
    }
    private boolean isStageApresQuatriemeSemaine(Candidature c) {
        return LocalDate.now().isAfter(c.getStage().getDateDebut().plusMonths(1L)) && !c.isEvaluee() &&
                c.getStatut().equals(Candidature.CandidatureStatut.CHOISI);
    }
}
