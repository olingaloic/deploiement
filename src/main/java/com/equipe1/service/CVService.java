package com.equipe1.service;

import com.equipe1.model.CV;
import com.equipe1.model.Etudiant;
import com.equipe1.repository.CVRepository;
import com.equipe1.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@Service
public class CVService {

    @Autowired
    private CVRepository cvRepository;

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private CourrielService courrielService;

    public List<CV> getCVs() {
        return cvRepository.findAll();
    }

    public CV getCVById(long id) {
        return cvRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invalid CV id %s", id)));
    }

    public CV getCVByEtudiantId(long id) {
        var etudiant = etudiantRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invalid CV id %s", id)));
        return etudiant.getCv();
    }

    public CV saveCV(CV cv) {
        return cvRepository.saveAndFlush(cv);
    }

    public CV saveEtudiantCV(long etudiantId, MultipartFile file) throws IOException {
        CV cv = new CV();
        cv.setId(etudiantId);
        cv.setData(file.getBytes());
        cv.setName(file.getOriginalFilename());
        cv.setStatus(CV.CVStatus.UNREVIEWED);
        cvRepository.save(cv);
        Etudiant etudiant = etudiantRepository.findById(etudiantId).get();
        etudiant.setCv(cv);
        etudiantRepository.save(etudiant);
        return cv;
    }

    public CV updateCV(CV cv, long id){
        cv.setId(id);
        return updateCV(cv);
    }
    public CV updateCVStatus(boolean isValid, long id) throws Exception {
        CV cv = cvRepository.findById(id).get();
        Etudiant etudiant = etudiantRepository.findById(id).get();
        if (isValid) {
            cv.setStatus(CV.CVStatus.APPROVED);
        }
        else {
            cv.setStatus(CV.CVStatus.DENIED);
        }
        cvRepository.save(cv);
        courrielService.sendMailCVApproval(etudiant);
        return cv;

    }

    public CV updateCV(CV cv) {
        return cvRepository.saveAndFlush(cv);
    }

    public void deleteCV(long id) {
        cvRepository.deleteById(id);
    }
}
