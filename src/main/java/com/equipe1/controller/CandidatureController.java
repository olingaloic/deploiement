package com.equipe1.controller;

import com.equipe1.model.Candidature;
import com.equipe1.model.Employeur;
import com.equipe1.repository.CandidatureRepository;
import com.equipe1.service.CandidatureService;
import com.equipe1.service.EmployeurService;
import com.equipe1.service.StageService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    @GetMapping("getByEtudiant")
    public List<Candidature> getCandidatureByEtudiant(@RequestParam("idEtudiant") Long idEtudiant){
        return candidatureService.findCandidatureByEtudiant(idEtudiant);
    }


    @PostMapping("createCandidature")
    public Candidature createCandidature(@RequestParam("idEtudiant") Long idEtudiant, @RequestParam("idStage") Long idStage){
        return candidatureService.createCandidature(idEtudiant, idStage);
    }

    @PutMapping("update/{id}")
    public Candidature updateCandidature(@Valid @RequestBody Candidature candidature, @PathVariable Long id) {
        return candidatureService.updateCandidature(candidature, id);
    }
}
