package com.equipe1.repository;

import com.equipe1.model.CV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CVRepository extends JpaRepository<CV, Long> {

    List<CV> getByDataIsNotNullAndStatus(CV.CVStatus status);
}
