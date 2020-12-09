package com.equipe1.service;

import com.equipe1.model.CV;
import com.equipe1.model.Etudiant;
import com.equipe1.repository.CVRepository;
import com.equipe1.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
        return cvRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invalid CV id %s", id)));
    }

    public CV getCVByEtudiantId(long id) {
        var etudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invalid CV id %s", id)));
        return etudiant.getCv();
    }

    public CV saveCV(CV cv) {
        return cvRepository.saveAndFlush(cv);
    }

    public CV saveEtudiantCV(long etudiantId, CV cv) {
        cvRepository.save(cv);
        Etudiant etudiant = etudiantRepository.findById(etudiantId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("Invalid student id %s", etudiantId)));
        etudiant.setCv(cv);
        etudiantRepository.save(etudiant);
        return cv;
    }

    public CV updateCVStatus(boolean isValid, long id) throws Exception {
        CV cv = cvRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invalid CV id %s", id)));
        cv.setStatus(isValid ? CV.CVStatus.APPROVED : CV.CVStatus.DENIED);
        cvRepository.save(cv);
        courrielService.sendMailCVApproval(etudiantRepository.findByCV(cv));
        return cv;
    }

    public CV updateCV(CV cv, long id) {
        cv.setId(id);
        return updateCV(cv);
    }

    public CV updateCV(CV cv) {
        return cvRepository.saveAndFlush(cv);
    }

    // TODO TEST
    public List<CV> getByDataIsNotNullAndStatusNotReviewed() {
        return cvRepository.getByDataIsNotNullAndStatus(CV.CVStatus.UNREVIEWED);
    }
}
