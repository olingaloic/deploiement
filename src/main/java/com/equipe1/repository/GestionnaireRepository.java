package com.equipe1.repository;

import com.equipe1.model.Gestionnaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GestionnaireRepository extends JpaRepository<Gestionnaire, Long> {

}
