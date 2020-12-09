package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.Role;
import com.equipe1.repository.EmployeurRepository;
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
public class EmployeurService {

    @Autowired
    private EmployeurRepository employeurRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    public EmployeurService (EmployeurRepository employeurRepository){
        this.employeurRepository = employeurRepository;
    }

    public List<Employeur> getEmployeurs(){
        return employeurRepository.findAll();
    }

    public Employeur getEmployeurById(Long idEmployeur){
        return employeurRepository.findById(idEmployeur)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,String.format("Invalid Employeur id %s",idEmployeur)));
    }

    public Employeur getEmployeurByEmail(String email){
        return employeurRepository.findEmployeurByEmail(email);
    }

    public Employeur saveEmployeur(Employeur employeur){
        employeur.setPassword(encoder.encode(employeur.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(Role.ERole.ROLE_EMPLOYEUR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);
        employeur.setRoles(roles);

        return employeurRepository.save(employeur);
    }

    public Employeur updateEmployeurPassword(Employeur newEmployeur, Long id) {
        Optional<Employeur> optionalEmployeur = employeurRepository.findById(id);
        optionalEmployeur.get().setPassword(encoder.encode(newEmployeur.getPassword()));
        return employeurRepository.save(optionalEmployeur.get());
    }
}
