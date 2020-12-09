package com.equipe1.controller;

import com.equipe1.model.Candidature;
import com.equipe1.service.CandidatureService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/candidatures")
public class CandidatureController {

    private CandidatureService candidatureService;
    public CandidatureController(CandidatureService candidatureService){
        this.candidatureService = candidatureService;
    }

    @GetMapping(value = "findAll")
    public List<Candidature> getAllCandidatures(){
        return candidatureService.getCandidatures();
    }

    @GetMapping("get")
    public Candidature getCandidatureById(@RequestParam("idCandidature") Long idCandidature){
        return candidatureService.findCandidatureById(idCandidature).get();
    }
    @GetMapping("getByEtudiant/{idEtudiant}")
    public List<Candidature> getCandidatureByEtudiant(@PathVariable("idEtudiant") Long idEtudiant, @RequestParam("idSession") Long idSession){
        return candidatureService.findCandidatureByEtudiant(idEtudiant, idSession);
    }

    @GetMapping("/getByStage")
    public List<Candidature> findAllByStage(@RequestParam("stage") Long stage){
        return candidatureService.findCandidatureByStage(stage);
    }

    @PostMapping("createCandidature")
    public Candidature createCandidature(@RequestParam("idEtudiant") Long idEtudiant, @RequestParam("idStage") Long idStage){
        return candidatureService.createCandidature(idEtudiant, idStage);
    }

    @PutMapping("updateChoisi/{id}")
    public Candidature updateCandidatureChoisi(@PathVariable Long id){
        return candidatureService.updateCandidatureChoisi(id);
    }

    @PutMapping("updateApprouve/{id}")
    public Candidature updateCandidatureApprouve(@PathVariable Long id) throws Exception {
        return candidatureService.updateCandidatureApprouve(id);
    }

    @GetMapping("getChoisi/{id}")
    public Optional<Candidature> getCandidatureChoisi(@PathVariable Long id) {
        return candidatureService.getCandidatureChoisi(id);
    }

    @GetMapping("getAllChoisis")
    public List<Candidature> getAllCandidatureChoisi(@RequestParam("idSession") Long idSession) {
        return candidatureService.getListCandidaturesChoisis(idSession);
    }

    @GetMapping("getListAEvaluer/{idEmployeur}")
    public List<Candidature> getListAEvaluerParEmployeur(@PathVariable("idEmployeur") Long idEmployeur, @RequestParam("idSession") Long idSession) {
        return candidatureService.getListCandidatureByEmployeurSansEvaluationStagiaire(idEmployeur, idSession);

    }

    @GetMapping("getListByEnseignant/{idEnseignant}")
    public List<Candidature> getListByEnseignant(@PathVariable Long idEnseignant) {
        return candidatureService.getCandidatureDesEtudaintsByEnseignantId(idEnseignant);
    }

    @GetMapping("getListByEmployeurNonEvalues/{idEnseignant}")
    public List<Candidature> getCandidaturesEmployeurNonEvalues(@PathVariable Long idEnseignant) {
        return candidatureService.getCandidaturesByEmployeurSansEvalutionMilieuStage(idEnseignant);
    }

}
