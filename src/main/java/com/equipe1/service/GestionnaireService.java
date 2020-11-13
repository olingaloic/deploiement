package com.equipe1.service;

import com.equipe1.model.Gestionnaire;
import com.equipe1.repository.GestionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GestionnaireService {

    @Autowired
    private GestionnaireRepository gestionnaireRepository;

    public GestionnaireService(GestionnaireRepository gestionnaireRepository){
        this.gestionnaireRepository = gestionnaireRepository;
    }

    public List<Gestionnaire> getGestionnaires(){
        return gestionnaireRepository.findAll();
    }

    public Optional<Gestionnaire> findGestionnaireById(Long idGestionnaire){
        return gestionnaireRepository.findById(idGestionnaire);
    }

    public Gestionnaire saveGestionnaire(Gestionnaire gestionnaire){
        gestionnaireRepository.save(gestionnaire);
        return gestionnaire;
    }

    public Gestionnaire updateGestionnaire(Gestionnaire newGestionnaire, long id){
        Optional<Gestionnaire> optionalGestionnaire = gestionnaireRepository.findById(id);
        optionalGestionnaire.get().setPassword(newGestionnaire.getPassword());
        return gestionnaireRepository.save(optionalGestionnaire.get());
    }

    public Gestionnaire getGestionnaireByPassword(String password) {
        return gestionnaireRepository.findByPassword(password);
    }
}
