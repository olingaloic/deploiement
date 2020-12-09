package com.equipe1.controller;

import com.equipe1.model.Gestionnaire;
import com.equipe1.service.GestionnaireService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController()
@RequestMapping("/gestionnaires")
public class GestionnaireController {

    private GestionnaireService gestionnaireService;

    public GestionnaireController(GestionnaireService service){
        this.gestionnaireService = service;
    }

    // never used
    @GetMapping("findAll")
    public List<Gestionnaire> getAllGestionnaire(){
        return gestionnaireService.getGestionnaires();
    }

    @GetMapping("get")
    public Optional<Gestionnaire> getGestionnaire(@RequestParam("idGestionnaire") Long idGestionnaire){
        return gestionnaireService.findGestionnaireById(idGestionnaire);
    }

    @PostMapping("create")
    public Gestionnaire createGestionnaire(@RequestBody Gestionnaire gestionnaire){
        return gestionnaireService.saveGestionnaire(gestionnaire);
    }

    @PutMapping("updatePassword/{id}")
    public Gestionnaire updateGestionnairePassword(@RequestBody Gestionnaire gestionnaire, @PathVariable Long id){
        return gestionnaireService.updateGestionnairePassword(gestionnaire, id);
    }
}
