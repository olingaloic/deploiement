package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.SessionRepository;
import com.equipe1.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class StageService {

    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private CandidatureService candidatureService;

    @Autowired
    CourrielService courrielService;

    @Autowired
    private SessionService sessionService;

    @Autowired
    Environment env;

    public StageService(StageRepository stageRepository) {
        this.stageRepository = stageRepository;
    }

    public List<Stage> getStages(Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Stage> stages = stageRepository.findAll();
        List<Stage> stagesFiltresAvecSession = new ArrayList<>();
        for(Stage stage : stages){
            if(stage.getSession().equals(session))
                stagesFiltresAvecSession.add(stage);
        }
        return stagesFiltresAvecSession;
    }

    public List<Stage> getStagesSessionEnCours()
    {
        Session sessionEnCours = sessionService.findCurrentSession().get();
        List<Stage> stages = stageRepository.findAll();
        List<Stage> stagesFiltresAvecSession = new ArrayList<>();
        for(Stage stage : stages){
            if(stage.getSession().equals(sessionEnCours))
                stagesFiltresAvecSession.add(stage);
        }
        return stagesFiltresAvecSession;
    }

    public List<Stage> getStagesByEmployeur(Long idEmployeur, Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Stage> stages = new ArrayList<>();

        for (Stage stage : stageRepository.findAll()) {
            if (stage.getEmployeur().getId() == idEmployeur && stage.getSession().equals(session))
                stages.add(stage);
        }
        return stages;
    }

    public List<Stage> getStagesEtudiant(Long idEtudiant, Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Candidature> candidatures = candidatureService.findCandidatureByEtudiant(idEtudiant, idSession);
        List<Stage> stages = stageRepository.findAll();
        List<Stage> stagesResul = new ArrayList<>();
        boolean isStageStudentCanApply;
        for (Stage resultStage : stages) {
            isStageStudentCanApply = false;
            for (Etudiant etudiant : resultStage.getEtudiantsAdmits()) {
                if (etudiant.getId().equals(idEtudiant)) {
                    isStageStudentCanApply = true;
                    break;
                }
            }
            for (Candidature resultCandidature : candidatures) {
                if (resultStage.getId().equals(resultCandidature.getStage().getId())) {
                    isStageStudentCanApply = false;
                    break;
                }
            }
            if (isStageStudentCanApply && resultStage.isOuvert() && resultStage.getStatut() == Stage.StageStatus.APPROUVÉ && resultStage.getSession().equals(session))
                stagesResul.add(resultStage);
        }
        return stagesResul;
    }

    public Optional<Stage> findStageById(Long idStage) {
        return stageRepository.findById(idStage);
    }

    public Stage saveStage(Stage stage) {
        Session sessionEnCours = sessionService.findCurrentSession().get();
        stage.setSession(sessionEnCours);
        stageRepository.save(stage);
        return stage;
    }

    public Stage updateStage(Stage newStage, long id) throws Exception {
        Optional<Stage> optionalStage = stageRepository.findById(id);
        if (optionalStage.isPresent()) {
            var stage = optionalStage.get();
            if (stage.getStatut() != newStage.getStatut())
                courrielService.sendOffreDeStageApprobationMail(newStage);
            stage.setTitre(newStage.getTitre());
            stage.setDescription(newStage.getDescription());
            stage.setExigences(newStage.getExigences());
            stage.setDateDebut(newStage.getDateDebut());
            stage.setDateFin(newStage.getDateFin());
            stage.setNbHeuresParSemaine(newStage.getNbHeuresParSemaine());
            stage.setNbAdmis(newStage.getNbAdmis());
            stage.setStatut(newStage.getStatut());
            stage.setDateLimiteCandidature(newStage.getDateLimiteCandidature());
            stage.setProgramme(newStage.getProgramme());
            stage.setSalaire(newStage.getSalaire());
            return stageRepository.save(stage);
        }
        return newStage;
    }

    public Stage updateEtudiantsAdmits(long stageId, Set<Etudiant> etudiants) {
        var optionnalStage = stageRepository.findById(stageId);
        if (optionnalStage.isPresent()) {
            var stage = optionnalStage.get();
            stage.setEtudiantsAdmits(etudiants);
            return stageRepository.save(stage);
        } else
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("there are no stage with id %s", stageId));
    }

    public Set<Etudiant> getEtudiantsAdmits(Long stageId) {
        Optional<Stage> optionnalStage = stageRepository.findById(stageId);
        if (optionnalStage.isPresent()) {
            var stage = optionnalStage.get();
            return stage.getEtudiantsAdmits();
        } else return null;
    }

    public List<Stage> getStagesApprouves(Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Stage> stages = stageRepository.findAll();
        List<Stage> stagesApprouves = new ArrayList<>();

        for (Stage stage : stages) {
            if (stage.getStatut() == Stage.StageStatus.APPROUVÉ && stage.getSession().equals(session)){
                stagesApprouves.add(stage);
            }
        }
        return stagesApprouves;
    }

    public List<Stage> getStagesNonApprouves(Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Stage> stages = stageRepository.findAll();
        List<Stage> stagesNonApprouves = new ArrayList<>();

        for (Stage stage : stages) {
            if (stage.getStatut() != Stage.StageStatus.APPROUVÉ && stage.getSession().equals(session)){
                stagesNonApprouves.add(stage);
            }
        }
        return stagesNonApprouves;
    }

    public List<Stage> getStagesNonComble(Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Stage> stages = stageRepository.findAll();
        List<Stage> resultStages = new ArrayList<>();
        for (Stage stage : stages) {
            if (!isComble(stage) && stage.getSession().equals(session))
                resultStages.add(stage);
        }
        return resultStages;
    }

    public boolean isComble(Stage stage) {
        List<Candidature> candidatures = candidatureService.findCandidatureByStage(stage.getId());
        int nbEtudiantsAdmis = 0;
        for (Candidature candidature : candidatures) {
            if (candidature.getStatut().equals(Candidature.CandidatureStatut.CHOISI))
                nbEtudiantsAdmis++;
        }
        return !(nbEtudiantsAdmis < stage.getNbAdmis());
    }

    public List<Stage> getByStatutWaiting() {
        return stageRepository.getByStatut(Stage.StageStatus.EN_ATTENTE);
    }

    public List<Stage> getStagesApprouvesByEmployeur(Long idEmployeur, Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Stage> stages = new ArrayList<>();

        for (Stage stage : stageRepository.findAll()) {
            if (stage.getEmployeur().getId() == idEmployeur && stage.getStatut() == Stage.StageStatus.APPROUVÉ  && stage.getSession().equals(session))
                stages.add(stage);
        }
        return stages;
    }

    public List<Stage> getStagesNonApprouvesByEmployeur(Long idEmployeur, Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Stage> stages = new ArrayList<>();

        for (Stage stage : stageRepository.findAll()) {
            if (stage.getEmployeur().getId() == idEmployeur && stage.getStatut() != Stage.StageStatus.APPROUVÉ && stage.getSession().equals(session))
                stages.add(stage);
        }
        return stages;
    }
}
