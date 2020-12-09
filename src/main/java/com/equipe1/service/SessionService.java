package com.equipe1.service;

import com.equipe1.model.Etudiant;
import com.equipe1.model.Session;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private EtudiantRepository etudiantRepository;

    public List<Session> getAll() {
        return sessionRepository.findAll();
    }

    public Session create(Session session) {
        Optional<Session> lastSession = sessionRepository.findCurrentSession();
        List<Etudiant> etudiants =  etudiantRepository.findAll();
        if (!lastSession.isEmpty()){
            lastSession.get().setCurrent(false);
            sessionRepository.save(lastSession.get());
        }

        for(Etudiant etudiant : etudiants){
            etudiant.setEnregistre(false);
            etudiantRepository.save(etudiant);
        }
        return sessionRepository.save(session);
    }

    public boolean isSessionSelectionneeEnCours (Long id){
        Session session = sessionRepository.findById(id).get();
        return session.equals(sessionRepository.findCurrentSession().get());
    }

    public Optional<Session> findCurrentSession() { return sessionRepository.findCurrentSession(); };

    public Session getSessionById(Long id) {
        return sessionRepository.findById(id).
                orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,String.format("Invalid Session id %s",id)));
    }
}
