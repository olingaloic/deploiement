package com.equipe1;

import com.equipe1.service.InsertDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class Application {

    @Autowired
    private InsertDataService insertDataService;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Profile("!test")
    @Bean
    CommandLineRunner commandLineRunner() {
        return args -> {
            insertDataService.insertSession();
            insertDataService.insertEtudiant();
            insertDataService.insertEmployeur();
            insertDataService.insertStage();
            insertDataService.insertGestionnaire();
            insertDataService.insertEnseignants();
        };
    }
}