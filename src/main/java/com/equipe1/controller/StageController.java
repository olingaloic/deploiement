package com.equipe1.controller;

import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import com.equipe1.service.StageService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/stages")
public class StageController {
    private StageService stageService;

    public StageController(StageService stageService){
        this.stageService = stageService;
    }

    // never used
    @GetMapping(value = "/findAll")
    public List<Stage> getAllStages(@RequestParam("idSession") Long idSession){
        return stageService.getStages(idSession);
    }

    // never used
    @GetMapping(value = "/getStagesSession")
    public List<Stage> getStagesSessionEnCours(){
        return stageService.getStagesSessionEnCours();
    }

    @GetMapping("getStage")
    public Optional<Stage> getStage(@RequestParam("idStage") Long idStage){
        return stageService.findStageById(idStage);
    }

    // never used
    @GetMapping("/stageByEmployeurId/{idEmployeur}")
    public List<Stage> getStageByEmployeurId(@PathVariable("idEmployeur") Long idEmployeur, @RequestParam("idSession") Long idSession){
        return stageService.getStagesByEmployeur(idEmployeur, idSession);
    }

    @GetMapping("/stagesEtudiant/{idEtudiant}")
    public List<Stage> getStagesEtudiant(@PathVariable("idEtudiant") Long idEtudiant, @RequestParam("idSession") Long idSession){
        return stageService.getStagesEtudiant(idEtudiant, idSession);
    }

    @PostMapping("createStage")
    public Stage createStage(@RequestBody Stage stage){
        return stageService.saveStage(stage);
    }

    @PutMapping("updateStage/{id}")
    public Stage updateStage(@RequestBody Stage stage, @PathVariable Long id) throws Exception {
        return stageService.updateStage(stage, id);
    }


    @PutMapping("updateEtudiantsAdmits/{stageId}")
    public Stage updateEtudiantsAdmits(@PathVariable long stageId, @RequestBody List<Etudiant> etudiants){
        return stageService.updateEtudiantsAdmits(stageId, new HashSet<>(etudiants));
    }

    @GetMapping("getEtudiantsAdmits/{stageId}")
    public Set<Etudiant> getEtudiantsAdmits(@PathVariable long stageId){
        return stageService.getEtudiantsAdmits(stageId);
    }

    @GetMapping("approuves")
    public List<Stage> getAllStagesApprouves(@RequestParam("idSession") Long idSession){
        return stageService.getStagesApprouves(idSession);
    }

    @GetMapping("nonComble")
    public List<Stage> getAllStagesNonComble(@RequestParam("idSession") Long idSession){
        return stageService.getStagesNonComble(idSession);
    }

    @GetMapping("nonApprouves")
    public List<Stage> getAllStagesNonApprouves(@RequestParam("idSession") Long idSession){
        return stageService.getStagesNonApprouves(idSession);
    }

    @GetMapping("/stagesApprouvesByEmployeurId/{idEmployeur}")
    public List<Stage> getStagesApprouvesByEmployeurId(@PathVariable("idEmployeur") Long idEmployeur, @RequestParam("idSession") Long idSession){
        return stageService.getStagesApprouvesByEmployeur(idEmployeur, idSession);
    }

    @GetMapping("/stagesNonApprouvesByEmployeurId/{idEmployeur}")
    public List<Stage> getStagesNonApprouvesByEmployeurId(@PathVariable("idEmployeur") Long idEmployeur, @RequestParam("idSession") Long idSession){
        return stageService.getStagesNonApprouvesByEmployeur(idEmployeur, idSession);
    }
}
