package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.EvaluationMilieuStageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EvaluationMilieuStageService {

    @Autowired
    private EvaluationMilieuStageRepository evaluationMilieuStageRepository;

    @Autowired
    private CandidatureService candidatureService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private CommentaireService commentaireService;

    @Autowired
    private EnseignantService enseignantService;

    @Autowired
    private EtudiantService etudiantService;

    @Autowired
    private GenerateurPdfService generateurPdfService;



    public EvaluationMilieuStage save(EvaluationMilieuStage evaluation) {
        return evaluationMilieuStageRepository.save(evaluation);
    }

    public EvaluationMilieuStage saveEvaluation(RecepteurDonneesEvaluation receptorDonnesEvaluation, Long idCandidature, Long idEnseignant) {
        Optional<Candidature> candidature = candidatureService.findCandidatureById(idCandidature);
        Enseignant enseignant = enseignantService.getEnseignantById(idEnseignant);

        Employeur employeur;
        Etudiant etudiant;
        EvaluationMilieuStage evaluationMilieuStage = new EvaluationMilieuStage();
        Commentaire commentaire =receptorDonnesEvaluation.getCommentaires();

        if (candidature.isPresent()) {
            employeur = candidature.get().getStage().getEmployeur();
            etudiant = candidature.get().getEtudiant();
            evaluationMilieuStage.setEmployeur(employeur);
            evaluationMilieuStage.setEnseignant(enseignant);
            evaluationMilieuStage.setEtudiant(etudiant);
        }
        evaluationMilieuStageRepository.save(evaluationMilieuStage);
        setQuestions(receptorDonnesEvaluation, evaluationMilieuStage);

        commentaire.setEvaluation(evaluationMilieuStage);
        commentaireService.saveCommentaire(receptorDonnesEvaluation.getCommentaires());

        return evaluationMilieuStage;
    }

    private void setQuestions(RecepteurDonneesEvaluation receptorDonnesEvaluation, EvaluationMilieuStage evaluationMilieuStage) {
        for (Question q : receptorDonnesEvaluation.getQuestions()) {
            q.setEvaluation(evaluationMilieuStage);
            questionService.saveQuestion(q);
        }
    }

    public List<EvaluationMilieuStage> getAll() {
        return evaluationMilieuStageRepository.findAll();
    }

    public Optional<EvaluationMilieuStage> getByEtudiant(Etudiant etudiant){
        return evaluationMilieuStageRepository.findByEtudiant(etudiant);
    }

    public List<EvaluationMilieuStage> getByEtudiantId(Long etudiantId){
        Optional<Etudiant>  etudiant = etudiantService.findEtudiantById(etudiantId);
        List<EvaluationMilieuStage> evaluationMilieuStageList = new ArrayList<>();
        if(etudiant.isPresent()){
            evaluationMilieuStageList.add(evaluationMilieuStageRepository.findByEtudiant(etudiant.get()).get());
        }
        return evaluationMilieuStageList;
    }

    public List<EvaluationMilieuStage> getAllByEnseignant(Long idEnseignant) {
        Enseignant enseignant = enseignantService.getEnseignantById(idEnseignant);
        return evaluationMilieuStageRepository.findByEnseignant(enseignant);
    }

    public ByteArrayOutputStream getDocumentEvaluationMilieuStage(Long idEvaluation) throws Exception {
        return generateurPdfService.createPdfEvaluationMilieuStage(idEvaluation);
    }
}
