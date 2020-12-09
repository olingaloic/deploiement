package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.Enseignant;
import com.equipe1.model.Role;
import com.equipe1.repository.EnseignantRepository;
import com.equipe1.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EnseignantService {

    @Autowired
    EnseignantRepository enseignantRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    RoleRepository roleRepository;

    public List<Enseignant> getEnseignants() {
        return enseignantRepository.findAll();
    }

    public Enseignant getEnseignantById(Long idEnseignant) {
        return enseignantRepository.findById(idEnseignant)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,String.format("Invalid Enseignant id %s",idEnseignant)));
    }

    public Enseignant saveEnseignant(Enseignant enseignant) {
        enseignant.setPassword(encoder.encode(enseignant.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(Role.ERole.ROLE_ENSEIGNANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);
        enseignant.setRoles(roles);

        return enseignantRepository.save(enseignant);
    }

    public Enseignant updateEnseignantPassword(Enseignant newEnseignant, Long id) {
        Optional<Enseignant> optionalEnseignant = enseignantRepository.findById(id);
        optionalEnseignant.get().setPassword(encoder.encode(newEnseignant.getPassword()));
        return enseignantRepository.save(optionalEnseignant.get());
    }
}
