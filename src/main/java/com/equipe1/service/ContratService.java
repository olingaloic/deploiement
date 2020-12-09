package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.CandidatureRepository;
import com.equipe1.repository.ContratRepository;
import com.equipe1.repository.SessionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ContratService {

    @Autowired
    private ContratRepository contratRepository;
    @Autowired
    private CandidatureRepository candidatureRepository;
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    CandidatureService candidatureService;
    @Autowired
    CourrielService courrielService;
    @Autowired
    GenerateurPdfService generateurPdfService;
    @Autowired
    private SessionService sessionService;

    private static final Logger LOGGER = LoggerFactory.getLogger(ContratService.class);


    public List<Contrat> getContrats(Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Contrat> contrats = contratRepository.findAll();
        List<Contrat> contratsSessionSelectionnee = new ArrayList<>();
        if (!contrats.isEmpty()){
            contratsSessionSelectionnee = contrats.stream()
                    .filter(contrat -> contrat.getCandidature().getStage().getSession().equals(session))
                    .collect(Collectors.toList());
        }
        
        return contratsSessionSelectionnee;
    }

    public Contrat getContratById(long id) {
        return contratRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invalid contrat id %s", id)));
    }

    public Contrat saveContrat(Contrat contrat) {
        return contratRepository.save(contrat);
    }

    public List<Contrat> getContratsByEmployeur(Employeur employeur) {
        return contratRepository.findByEmployeur(employeur);
    }

    public List<Contrat> getContratsByEtudiantChoisi(Etudiant etudiant) {
        List<Contrat> contratSignatureEmployeurOk = new ArrayList<>();
        for (Candidature candidatureTmp : candidatureRepository.findAll()) {
            if (isSigneParEmployeur(etudiant, candidatureTmp)) {
                contratSignatureEmployeurOk.add(candidatureTmp.getContrat());
            }
        }
        return contratSignatureEmployeurOk;
    }

    public Contrat updateContrat(MultipartFile file,  Long idContrat, String desc) throws IOException {
        Contrat contrat = contratRepository.findById(idContrat).get();
        contrat.setDocumentContrat(file.getBytes());
        if (desc.equals("ROLE_EMPLOYEUR"))
            contrat.setSignatureEmployeur(Contrat.SignatureEtat.EN_ATTENTE);
        if (desc.equals("ROLE_ETUDIANT"))
            contrat.setSignatureEtudiant(Contrat.SignatureEtat.EN_ATTENTE);
        return contratRepository.save(contrat);
    }
    public Contrat createContrat(MultipartFile file, Long idCandidature) throws Exception {
        Optional<Candidature> candidature = candidatureService.findCandidatureById(idCandidature);
        Optional<Contrat> contrat = contratRepository.findByCandidature(candidature.get());
        if (contrat.isPresent()) {
            contrat.get().setDocumentContrat(file.getBytes());
            return contratRepository.save(contrat.get());
        } else {
            Contrat newContrat = createContratBuilder(candidature);
            newContrat.setDocumentContrat(file.getBytes());
            courrielService.sendContratScolarite(newContrat,"Systeme");
            return contratRepository.save(newContrat);
        }
    }

    public Contrat createContratEtDocument(Long idCandidature) throws Exception {
        Optional<Candidature> candidature = candidatureService.findCandidatureById(idCandidature);
        if(candidatureHasContrat(idCandidature)){
            Optional<Contrat> contrat = contratRepository.findByCandidature(candidature.get());
            LOGGER.info("Contrat override ==> " + contrat.get().getDateGeneration());
            return contratRepository.save(contrat.get());
        } else {
            Contrat newContrat = createContratBuilder(candidature);
            newContrat.setDocumentContrat(newContratDocument(candidature).toByteArray());
            LOGGER.info("New Contrat cree ==> " + newContrat.getDateGeneration());
            courrielService.sendContratScolarite(newContrat,"Systeme");
            return contratRepository.save(newContrat);
        }

    }

    public ByteArrayOutputStream createApercueContrat(Long idCandidature) throws Exception {
        Optional <Candidature> candidature = candidatureService.findCandidatureById(idCandidature);
        return newContratDocument(candidature);
    }

    public ByteArrayOutputStream newContratDocument(Optional<Candidature> candidature) throws Exception {
        return generateurPdfService.createPdf(candidature.get().getStage(),
                candidature.get().getStage().getEmployeur(), candidature.get().getEtudiant());
    }

    public boolean candidatureHasContrat(Long candidatureId) {
        boolean hasContrat = false;
        Optional<Candidature> candidature = candidatureService.findCandidatureById(candidatureId);
        if(candidature.isPresent()){
            for (Contrat c : contratRepository.findAll()) {
                hasContrat = c.getCandidature().equals(candidature.get());
            }
        }
        return hasContrat;
    }


    private boolean isSigneParEmployeur(Etudiant etudiant, Candidature candidatureTmp) {
        return candidatureTmp.getEtudiant().equals(etudiant)
                && candidatureTmp.getContrat() != null
                && candidatureTmp.getContrat().getSignatureEmployeur() != null
                && candidatureTmp.getContrat().getSignatureEmployeur().equals(Contrat.SignatureEtat.SIGNE);
    }

    public Contrat createContratBuilder(Optional<Candidature> candidature) {
            Contrat newContrat = Contrat.builder()
                    .dateFinale(candidature.get().getStage().getDateFin())
                    .dateGeneration(LocalDate.now())
                    .signatureEmployeur(Contrat.SignatureEtat.PAS_SIGNE)
                    .signatureEtudiant(Contrat.SignatureEtat.PAS_SIGNE)
                    .candidature(candidature.get())
                    .dateFinale(candidature.get().getStage().getDateFin())
                    .employeur(candidature.get().getStage().getEmployeur())
                    .build();
            return newContrat;
    }

    public List<Candidature> listCandidatureSansContrat(Long idSession){
        List<Candidature> canditaturesSansContrat = new ArrayList<>();
        List<Candidature> canditaturesTemp = candidatureService.getListCandidaturesChoisis(idSession);
        for (Candidature candTemp: canditaturesTemp) {
            if(!contratRepository.findByCandidature(candTemp).isPresent()){
                canditaturesSansContrat.add(candTemp);
            }
        }
        return canditaturesSansContrat;
    }

    public Contrat updateStatutContrat(String desc, Contrat.SignatureEtat etat, Long id) throws Exception {
        Contrat contrat = contratRepository.findById(id).get();
        if (desc.equals("Employeur")){
            contrat.setSignatureEmployeur(etat);
            contratRepository.save(contrat);
            if(etat.equals(Contrat.SignatureEtat.SIGNE))
                courrielService.sendContratScolarite(contrat, desc);
            if(etat.equals(Contrat.SignatureEtat.PAS_SIGNE))
                courrielService.sendRefusContrat(contrat, desc);
        }

        if (desc.equals("Etudiant")){
            contrat.setSignatureEtudiant(etat);
            contratRepository.save(contrat);
            if(etat.equals(Contrat.SignatureEtat.SIGNE))
                courrielService.sendContratScolarite(contrat, desc);
            if(etat.equals(Contrat.SignatureEtat.PAS_SIGNE))
                courrielService.sendRefusContrat(contrat, desc);
        }

        return contrat;
    }

    public List<Contrat> getContratsNonSignesEtudiant(Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Contrat> contrats = contratRepository.findAll();
        List<Contrat> contratsNonSignes = new ArrayList<>();

        for (Contrat contrat : contrats) {
            if (contrat.getSignatureEtudiant() != Contrat.SignatureEtat.SIGNE &&
                    contrat.getSignatureEmployeur() == Contrat.SignatureEtat.SIGNE &&
                    contrat.getCandidature().getStage().getSession().equals(session)){
                contratsNonSignes.add(contrat);
            }
        }
        return contratsNonSignes;
    }

    public List<Contrat> getContratsNonSignesEmployeur(Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Contrat> contrats = contratRepository.findAll();
        List<Contrat> contratsNonSignes = new ArrayList<>();

        for (Contrat contrat : contrats) {
            if (contrat.getSignatureEtudiant() != Contrat.SignatureEtat.SIGNE &&
                    contrat.getSignatureEmployeur() != Contrat.SignatureEtat.SIGNE &&
                    contrat.getCandidature().getStage().getSession().equals(session)){
                contratsNonSignes.add(contrat);
            }
        }
        return contratsNonSignes;
    }

    public List<Contrat> getContratsNonSignesAdministration(Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Contrat> contrats = contratRepository.findAll();
        List<Contrat> contratsNonSignes = new ArrayList<>();

        for (Contrat contrat : contrats) {
            if (contrat.getSignatureEtudiant() == Contrat.SignatureEtat.SIGNE &&
                    contrat.getSignatureEmployeur() == Contrat.SignatureEtat.SIGNE &&
                    contrat.getCandidature().getStage().getSession().equals(session)){
                contratsNonSignes.add(contrat);
            }
        }
        return contratsNonSignes;
    }
}
