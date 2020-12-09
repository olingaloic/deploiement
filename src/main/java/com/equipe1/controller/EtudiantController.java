package com.equipe1.controller;

import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.service.EtudiantService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/etudiants")
public class EtudiantController {

    private EtudiantService etudiantService;

    public EtudiantController(EtudiantService service){
        this.etudiantService = service;
    }

    @GetMapping("/findAll")
    public List<Etudiant> getAllEtudiant(@RequestParam("idSession") Long idSession){
        return etudiantService.getEtudiants(idSession);
    }

    @GetMapping("/get")
    public Optional<Etudiant> getEtudiant(@RequestParam("idEtudiant") Long idEtudiant){
        return etudiantService.findEtudiantById(idEtudiant);
    }

    @PutMapping("/registration/register/{id}")
    public Optional<Etudiant> registerEtudiant(@PathVariable long id) {
        return etudiantService.registerEtudiantSession(id);
    }

    @GetMapping("/registration/isRegistered/{id}")
    public boolean isEtudiantRegistered(@PathVariable long id) {
        return etudiantService.isEtudiantRegistered(id);
    }

    @PostMapping("/create")
    public Etudiant createEtudiant(@RequestBody Etudiant etudiant){
        return etudiantService.saveEtudiant(etudiant);
    }

    @GetMapping("/email")
    public Etudiant getEmployeurByEmail(@RequestParam("email") String email){
        return etudiantService.getEtudiantByEmail(email);
    }

    @GetMapping("/get/{programme}")
    public List<Etudiant> getAllEtudiantByProgramme(@PathVariable String programme, @RequestParam("idSession") Long idSession){
        return etudiantService.getEtudiantsByProgramme(programme, idSession);
    }

    @GetMapping("/get/aucunStage")
    public List<Etudiant> getAllEtudiantsAucunStage(@RequestParam("idSession") Long idSession){
        return etudiantService.getEtudiantsAucunStage(idSession);
    }

    @GetMapping("/getAllSansCV")
    public List<Etudiant> getEtudiantsAucunCV(@RequestParam("idSession") Long idSession){
        return etudiantService.getEtudiantsAucunCV(idSession);
    }

    @GetMapping("/getAllCVNonApprouve")
    public List<Etudiant> getEtudiantsCVNonApprouve(@RequestParam("idSession") Long idSession){
        return etudiantService.getEtudiantsCVNonApprouve(idSession);
    }

    @PutMapping("updatePassword/{id}")
    public Etudiant updateEtudiantPassword(@Valid @RequestBody Etudiant etudiant, @PathVariable Long id){
        return etudiantService.updateEtudiantPassword(etudiant, id);
    }

    @GetMapping("/getAllbyEnseignant/{idEnseignant}")
    public List<Etudiant> getEtudiantsbyEnseignant(@PathVariable Long idEnseignant){
        return etudiantService.getEtudaintsByEnseignant(idEnseignant);
    }

    @PutMapping("setEnseignant/{idEtudiant}/{idEnseigant}")
    public Etudiant setEnseignant( @PathVariable Long idEtudiant, @PathVariable Long idEnseigant){
        return etudiantService.setEnseignant(idEtudiant,idEnseigant);
    }

    @PutMapping("enleverEnseignant/{idEtudiant}/{idEnseigant}")
    public Etudiant enleverEnseignant( @PathVariable Long idEtudiant, @PathVariable Long idEnseigant){
        return etudiantService.enleverEnseignant(idEtudiant,idEnseigant);
    }
}