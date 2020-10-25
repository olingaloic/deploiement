package com.equipe1.repository;

import com.equipe1.model.Employeur;
import com.equipe1.model.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StageRepository extends JpaRepository<Stage, Long> {
    List<Stage> findByEmployeur(Employeur employeur);
}
