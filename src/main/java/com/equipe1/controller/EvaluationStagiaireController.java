package com.equipe1.controller;

import com.equipe1.model.EvaluationMilieuStage;
import com.equipe1.model.EvaluationStagiaire;
import com.equipe1.service.EvaluationStagiaireService;
import com.equipe1.model.RecepteurDonneesEvaluation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/evaluationStagiaire")
public class EvaluationStagiaireController {

    @Autowired
    private EvaluationStagiaireService evaluationStagiaireService;

    @PutMapping("/newEvaluation/{id}")
    public EvaluationStagiaire updateEtudiant(@RequestBody RecepteurDonneesEvaluation evaluation,
                                              @PathVariable  Long id){
        return evaluationStagiaireService.saveEvaluation(evaluation,id);
    }

    @GetMapping("findAll")
    public List<EvaluationStagiaire> getAll(){
        return evaluationStagiaireService.getAll();
    }

    @GetMapping("getByEtudiant/{id}")
    public List<EvaluationStagiaire> getEvaluationbyEtudaint(@PathVariable Long id){
        return evaluationStagiaireService.getByEtudiantId(id);
    }

    @GetMapping("getByEmployeur/{id}")
    public List<EvaluationStagiaire> getEvaluationStagiaireByEmployeurId(@PathVariable Long id, @RequestParam("idSession") Long idSession){
        return evaluationStagiaireService.getByEmployeurId(id, idSession);
    }
    @GetMapping("/getEvaluation/{idEvaluation}")
    public ResponseEntity<byte[]> getApercueContrat(@PathVariable Long idEvaluation) throws Exception {
        byte[] pdfile = evaluationStagiaireService.getDocumentEvaluationStagiaire(idEvaluation).toByteArray();
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.valueOf("application/pdf"));
        header.setContentLength(pdfile.length);
        header.set("Content-Disposition", "attachment; filename= ");
        return new ResponseEntity<>(pdfile, HttpStatus.OK);
    }

}
