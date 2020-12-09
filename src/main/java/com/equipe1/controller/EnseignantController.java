package com.equipe1.controller;

import com.equipe1.model.Enseignant;
import com.equipe1.service.EnseignantService;
import com.equipe1.service.EnseignantService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/enseignants")
public class EnseignantController {

    private EnseignantService enseignantService;

    public EnseignantController(EnseignantService enseignantService){
        this.enseignantService=enseignantService;
    }

    @GetMapping(value = "findAll")
    public List<Enseignant> getAllEnseignants(){
        return enseignantService.getEnseignants();
    }

    @GetMapping("get")
    public Enseignant getEnseignantById(@RequestParam("idEnseignant") Long idEnseignant){
        return enseignantService.getEnseignantById(idEnseignant);
    }

    @PostMapping("createEnseignant")
    public Enseignant createEnseignant(@RequestBody Enseignant enseignant){
        return enseignantService.saveEnseignant(enseignant);
    }

    @PutMapping("updatePassword/{id}")
    public Enseignant updateEnseignantPassword(@Valid @RequestBody Enseignant enseignant, @PathVariable Long id){
        return enseignantService.updateEnseignantPassword(enseignant, id);

    }


}
