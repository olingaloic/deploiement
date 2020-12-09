package com.equipe1.repository;

import com.equipe1.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    @Query("select s from Session s where s.isCurrent = true")
    Optional<Session> findCurrentSession();
}
