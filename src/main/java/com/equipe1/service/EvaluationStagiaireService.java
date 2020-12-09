package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.EmployeurRepository;
import com.equipe1.repository.EvaluationStagiaireRepository;
import com.equipe1.repository.QuestionRepository;
import com.equipe1.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EvaluationStagiaireService {

    @Autowired
    private EvaluationStagiaireRepository evaluationStagiaireRepository;
    @Autowired
    private EtudiantService etudiantService;

    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private CommentaireService commentaireService;
    @Autowired
    private CandidatureService candidatureService;
    @Autowired
    private EmployeurRepository employeurRepository;
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private GenerateurPdfService generateurPdfService;


    public EvaluationStagiaire save(EvaluationStagiaire e) {
        return evaluationStagiaireRepository.save(e);
    }

    public List<EvaluationStagiaire> getByEmployeurId(Long idEmployeur, Long idSession){
        Session session = sessionRepository.findById(idSession).get();
        Employeur employeur = employeurRepository.findById(idEmployeur).get();
        List<EvaluationStagiaire> evaluationStagiaires = evaluationStagiaireRepository.findByEmployeur(employeur);
        List<EvaluationStagiaire> evaluationSessionEnCours = new ArrayList<>();
        if (!evaluationStagiaires.isEmpty()){
            evaluationSessionEnCours = evaluationStagiaires.stream()
                    .filter(evaluationStagiaire -> evaluationStagiaire.getEtudiant().getSessions().contains(session))
                    .collect(Collectors.toList());
        }
        return evaluationSessionEnCours;
    }


    public EvaluationStagiaire saveEvaluation(RecepteurDonneesEvaluation receptorDonnesEvaluation, Long idCandidature) {
        Etudiant etudiant = new Etudiant();
        Employeur employeur = new Employeur();
        Optional<Candidature> candidature = candidatureService.findCandidatureById(idCandidature);

        if(candidature.isPresent()){
            etudiant = candidature.get().getEtudiant();
            employeur = candidature.get().getStage().getEmployeur();

            candidature.get().setEvaluee(true);
        }
        EvaluationStagiaire evaluationStagiaire = evaluationStagiaireRepository.findByEtudiant(etudiant);
        Commentaire commentaire =receptorDonnesEvaluation.getCommentaires();

        if(evaluationStagiaire == null){
            evaluationStagiaire = new EvaluationStagiaire();
            evaluationStagiaire.setEmployeur(employeur);
            evaluationStagiaire.setEtudiant(etudiant);
            evaluationStagiaireRepository.save(evaluationStagiaire);
        }

        for (Question q: receptorDonnesEvaluation.getQuestions()) {
            q.setEvaluation(evaluationStagiaire);
            questionRepository.save(q);
        }
        commentaire.setEvaluation(evaluationStagiaire);
        commentaireService.saveCommentaire(receptorDonnesEvaluation.getCommentaires());

        return evaluationStagiaire;

    }

    public ByteArrayOutputStream getDocumentEvaluationStagiaire(Long idEvaluation) throws Exception {
        return generateurPdfService.createPdfEvaluationStagiaire(idEvaluation);
    }


    public List<EvaluationStagiaire> getByEtudiantId(Long etudiantId){
        Optional<Etudiant>  etudiant = etudiantService.findEtudiantById(etudiantId);
        List<EvaluationStagiaire> evaluationStagiaire = new ArrayList<>();
        if(etudiant.isPresent()){
            evaluationStagiaire.add(evaluationStagiaireRepository.findByEtudiant(etudiant.get()));
        }
        return evaluationStagiaire;
    }


    public List<EvaluationStagiaire> getAll() {
        return evaluationStagiaireRepository.findAll();
    }



}
