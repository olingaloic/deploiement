package com.equipe1.repository;

import com.equipe1.model.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

    Optional<Etudiant> findByMatricule(String matricule);

    Etudiant findByEmail(String email);

    List<Etudiant> findAllByProgramme(String programme);
}
