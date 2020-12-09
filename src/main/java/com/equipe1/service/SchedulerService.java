package com.equipe1.service;

import com.equipe1.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class SchedulerService {

    @Autowired
    private SessionService sessionService;
    @Scheduled(cron = "0 0 0 1 JAN,JUN,SEP ?")
    public Session scheduleCreationSession() {
        String nomSession = configurationNomSession();
        LocalDate dateDebut = configurationDateDebut(nomSession);
        LocalDate dateFin = configurationDateFin(nomSession);
        Session session = Session.builder().nom(nomSession).dateDebut(dateDebut)
                .dateFin(dateFin).isCurrent(true).build();
        return sessionService.create(session);

    }

    public String configurationNomSession(){
        String nomDerniereSaison = sessionService.findCurrentSession().get().getNom().substring(0, 3);
        String nomNouvelleSaison = "";
        int nomNouvelleAnnee;
        if(nomDerniereSaison.equals("AUT")){
            nomNouvelleAnnee = LocalDate.now().getYear() + 1;
        }
        else {
            nomNouvelleAnnee = LocalDate.now().getYear();
        }
        switch (nomDerniereSaison){
            case "AUT" :
                nomNouvelleSaison = "HIV";
                break;
            case "HIV" :
                nomNouvelleSaison = "ETE";
                break;
            case "ETE" :
                nomNouvelleSaison = "AUT";
                break;
            default:
                break;
        }
        return nomNouvelleSaison + "-" + nomNouvelleAnnee;
    }

    public LocalDate configurationDateDebut(String nomSession){
        LocalDate dateDebut = LocalDate.now();
        String nomSaison = nomSession.substring(0, 3);
        switch (nomSaison){
            case "AUT" :
                dateDebut = LocalDate.of(LocalDate.now().getYear(), 9, 1);
                break;
            case "HIV" :
                dateDebut = LocalDate.of(LocalDate.now().getYear() + 1, 1, 1);
                break;
            case "ETE" :
                dateDebut = LocalDate.of(LocalDate.now().getYear(), 6, 1);
                break;
            default:
                break;

        }
        return dateDebut;
    }

    public LocalDate configurationDateFin(String nomSession){
        LocalDate dateFin = LocalDate.now();
        String nomSaison = nomSession.substring(0, 3);
        switch (nomSaison){
            case "AUT" :
                dateFin = LocalDate.of(LocalDate.now().getYear(), 12, 31);
                break;
            case "HIV" :
                dateFin = LocalDate.of(LocalDate.now().getYear() + 1, 5, 31);
                break;
            case "ETE" :
                dateFin = LocalDate.of(LocalDate.now().getYear(), 8, 31);
                break;
            default:
                break;

        }
        return dateFin;
    }

}
