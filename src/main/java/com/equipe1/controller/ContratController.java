package com.equipe1.controller;

import com.equipe1.model.Candidature;
import com.equipe1.model.Contrat;
import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.repository.EmployeurRepository;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.StageRepository;
import com.equipe1.service.ContratService;
import com.equipe1.service.CourrielService;
import com.equipe1.service.GenerateurPdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("contrats")
public class ContratController {

    @Autowired
    private ContratService contratService;
    @Autowired
    StageRepository stageRepository;
    @Autowired
    CourrielService courrielService;
    @Autowired
    GenerateurPdfService generateurPdfService;
    @Autowired
    EtudiantRepository etudiantRepository;
    @Autowired
    EmployeurRepository employeurRepository;

    @GetMapping("/getContratFile/{id}")
    public ResponseEntity<byte[]> getContratById(@PathVariable Long id) throws Exception {
        Contrat contrat = contratService.getContratById(id);
        byte[] pdfile = contrat.getDocumentContrat();
        InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(pdfile));
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.valueOf("application/pdf"));
        header.setContentLength(pdfile.length);
        header.set("Content-Disposition", "attachment; filename=");
        return new ResponseEntity<>(pdfile, header, HttpStatus.OK);
    }

    @GetMapping(value = "findAll")
    public List<Contrat> getContrats(@RequestParam("idSession") Long idSession) {
        return contratService.getContrats(idSession);
    }

    @GetMapping(value = "getContratById/{id}")
    public Contrat getById(@PathVariable Long id) {
        return contratService.getContratById(id);
    }


    @GetMapping(value = "getByEmployeurId/{id}")
    public List<Contrat> getContratsByEmployeur(@PathVariable Long id) {
        Optional<Employeur> employeur = employeurRepository.findById(id);
        return contratService.getContratsByEmployeur(employeur.get());
    }

    @GetMapping(value = "getCandidaturesSansContrat")
    public List<Candidature> getCandidaturesSansContrat(@RequestParam("idSession") Long idSession) {
        return contratService.listCandidatureSansContrat(idSession);
    }

    @GetMapping(value = "getByEtudiantId/{id}")
    public List<Contrat> getContratsByEtudiant(@PathVariable Long id) {
        Optional<Etudiant> etudiant = etudiantRepository.findById(id);
        return contratService.getContratsByEtudiantChoisi(etudiant.get());
    }

    @PutMapping(value = "accepteSignatureContrat/{id}")
    public Contrat accepteSignatureContrat(@PathVariable Long id, @RequestParam("desc") String desc) throws Exception {
        return contratService.updateStatutContrat(desc, Contrat.SignatureEtat.SIGNE, id);
    }

    @PutMapping(value = "refuseSignatureContrat/{id}")
    public Contrat refuseSignatureContrat(@PathVariable Long id, @RequestParam("desc") String desc) throws Exception {
        return contratService.updateStatutContrat(desc, Contrat.SignatureEtat.PAS_SIGNE, id);
    }

    @GetMapping(value = "contratExiste/{id}")
    public boolean candidatureHasContrat(@PathVariable Long id) {
        return contratService.candidatureHasContrat(id);
    }

    @GetMapping(value = "getApercueContrat/{idCandidature}")
    public ResponseEntity<byte[]> getApercueContrat(@PathVariable Long idCandidature) throws Exception {
        byte[] pdfile = contratService.createApercueContrat(idCandidature).toByteArray();
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.valueOf("application/pdf"));
        header.setContentLength(pdfile.length);
        header.set("Content-Disposition", "attachment; filename=");
        return new ResponseEntity<>(pdfile, HttpStatus.OK);
    }

    @PutMapping("update/{idContrat}")
    public ResponseEntity<String> updateContrat(@RequestParam("file") MultipartFile file, @RequestParam("desc") String desc, @PathVariable Long idContrat) throws IOException {
        String message = "";
        contratService.updateContrat(file, idContrat, desc);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/create/{idCandidature}")
    public ResponseEntity<String> saveContrat(@RequestParam("file") MultipartFile file, @PathVariable Long idCandidature) throws Exception {
        String message = "";
        contratService.createContrat(file, idCandidature);
        message = "Fichier " + file.getOriginalFilename() + " téléversé avec succès. ";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/createAuto/{idCandidature}")
    public ResponseEntity<String> createAuto(@PathVariable Long idCandidature) throws Exception {
        String message = "";
        contratService.createContratEtDocument(idCandidature);
        message = " Contrat créé avec succès";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping(value = "getContratsNonSignesEtudiant")
    public List<Contrat> getContratsNonSignesEtudiant(@RequestParam("idSession") Long idSession) {
        return contratService.getContratsNonSignesEtudiant(idSession);
    }

    @GetMapping(value = "getContratsNonSignesEmployeur")
    public List<Contrat> getContratsNonSignesEmployeur(@RequestParam("idSession") Long idSession) {
        return contratService.getContratsNonSignesEmployeur(idSession);
    }

    @GetMapping(value = "getContratsNonSignesAdministration")
    public List<Contrat> getContratsNonSignesAdministration(@RequestParam("idSession") Long idSession) {
        return contratService.getContratsNonSignesAdministration(idSession);
    }
}

