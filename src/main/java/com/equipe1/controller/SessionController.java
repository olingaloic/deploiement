package com.equipe1.controller;
import com.equipe1.model.Session;
import com.equipe1.service.SessionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController()
@RequestMapping("/sessions")
public class SessionController {
    private SessionService sessionService;

    public SessionController(SessionService sessionService){
        this.sessionService = sessionService;
    }

    @GetMapping("findAll")
    public List<Session> getAllSessions(){
        return sessionService.getAll();
    }

    @GetMapping("findById/{id}")
    public Session getSessionById(@PathVariable Long id){
        return sessionService.getSessionById(id);
    }
    @GetMapping("getSessionEnCours")
    public Session getSessionEnCours(){
        return sessionService.findCurrentSession().get();
    }
    @PostMapping("createSession")
    public Session createSession(@RequestBody Session session){
        return sessionService.create(session);
    }

    @GetMapping("isSessionSelectionneeEnCours/{id}")
    public boolean isSessionSelectionneeEnCours(@PathVariable Long id){
        return sessionService.isSessionSelectionneeEnCours(id);
    }



}
