package com.equipe1.controller;

import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import com.equipe1.service.StageService;
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

    @GetMapping(value = "/findAll")
    public List<Stage> getAllStages(){
        return stageService.getStages();
    }

    @GetMapping("getStage")
    public Optional<Stage> getStage(@RequestParam("idStage") Long idStage){
        return stageService.findStageById(idStage);
    }

    @GetMapping("/stageByEmployeurId")
    public List<Stage> getStageByEmployeurId(@RequestParam("idEmployeur") Long idEmployeur){
        return stageService.getStagesByEmployeur(idEmployeur);
    }

    @GetMapping("/stagesEtudiant")
    public List<Stage> getStagesEtudiant(@RequestParam("idEtudiant") Long idEtudiant){
        return stageService.getStagesEtudiant(idEtudiant);
    }

    @PostMapping("createStage")
    public Stage createStage(@RequestBody Stage stage){
        return stageService.saveStage(stage);
    }

    @PutMapping("updateStage/{id}")
    public Stage updateStage(@RequestBody Stage stage, @PathVariable Long id){
        return stageService.updateStage(stage, id);
    }

    @PutMapping("updateStatusStage/{id}")
    public Stage updateStatusStage(@RequestBody Stage stage, @PathVariable Long id) throws Exception {
        return stageService.updateStatus(stage, id);
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
    public List<Stage> getAllStagesApprouves(){
        return stageService.getStagesApprouves();
    }
}
