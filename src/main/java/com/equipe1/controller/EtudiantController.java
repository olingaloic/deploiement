package com.equipe1.controller;

import com.equipe1.model.Etudiant;
import com.equipe1.service.EtudiantService;
import org.springframework.web.bind.annotation.*;

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
    public List<Etudiant> getAllEtudiant(){
        return etudiantService.getEtudiants();
    }

    @GetMapping("/get")
    public Optional<Etudiant> getEtudiant(@RequestParam("idEtudiant") Long idEtudiant){
        return etudiantService.findEtudiantById(idEtudiant);
    }

    @PostMapping("/create")
    public Etudiant createEtudiant(@RequestBody Etudiant etudiant){
        return etudiantService.saveEtudiant(etudiant);
    }

    @PutMapping("/update/{id}")
    public Etudiant updateEtudiant(@RequestBody Etudiant etudiant, @PathVariable Long id){
        return etudiantService.updateEtudiant(etudiant, id);
    }

    @GetMapping("/matricule")
    public Optional<Etudiant> getEtudiantByMatricule(@RequestParam("matricule") String matricule){
        return etudiantService.findEtudiantByMatricule(matricule);
    }

    @PutMapping("/update/cv/{id}")
    public Etudiant updateEtudiantCV(@RequestBody Etudiant etudiant, @PathVariable Long id){
        return etudiantService.updateEtudiant(etudiant, id);
    }

    @GetMapping("/email")
    public Etudiant getEmployeurByEmail(@RequestParam("email") String email){
        return etudiantService.getEtudiantByEmail(email);
    }

    @GetMapping("/get/{programme}")
    public List<Etudiant> getAllEtudiantByProgramme(@PathVariable String programme){
        return etudiantService.getEtudiantsByProgramme(programme);
    }
}