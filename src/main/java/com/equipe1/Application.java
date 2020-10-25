package com.equipe1;

import com.equipe1.service.InsertDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

	@Autowired
	private InsertDataService service;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(){
		return new CommandLineRunner() {
			@Override
			public void run(String... args) throws Exception {
				service.insertEtudiant();
				service.insertEmployeur();
				service.insertStage();
				service.insertGestionnaire();
			}
		};
	}
}
