package com.equipe1.service;

import com.equipe1.model.Gestionnaire;
import com.equipe1.model.Role;
import com.equipe1.repository.GestionnaireRepository;
import com.equipe1.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class GestionnaireService {

    @Autowired
    private GestionnaireRepository gestionnaireRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    RoleRepository roleRepository;

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
        gestionnaire.setPassword(encoder.encode(gestionnaire.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(Role.ERole.ROLE_GESTIONNAIRE)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);
        gestionnaire.setRoles(roles);

        return gestionnaireRepository.save(gestionnaire);
    }

    public Gestionnaire updateGestionnairePassword(Gestionnaire newGestionnaire, long id){
        Optional<Gestionnaire> optionalGestionnaire = gestionnaireRepository.findById(id);
        optionalGestionnaire.get().setPassword(encoder.encode(newGestionnaire.getPassword()));
        return gestionnaireRepository.save(optionalGestionnaire.get());
    }
}
