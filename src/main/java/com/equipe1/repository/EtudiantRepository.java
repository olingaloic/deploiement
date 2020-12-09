package com.equipe1.repository;

import com.equipe1.model.CV;
import com.equipe1.model.Enseignant;
import com.equipe1.model.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

    Etudiant findByEmail(String email);

    List<Etudiant> findAllByProgramme(String programme);

    @Query("SELECT e FROM Etudiant e WHERE e.cv = ?1")
    Etudiant findByCV(CV cv);

    List<Etudiant> findByEnseignant(Enseignant enseignant);


}
