package com.equipe1.controller;

import com.equipe1.model.CV;
import com.equipe1.service.CVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

// TODO: UNTESTED
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cvs")
public class CVController {

    @Autowired
    private CVService cvService;

    @GetMapping("/get/{id}")
    public ResponseEntity<byte[]> getCV(@PathVariable long id) {
        CV cv = cvService.getCVById(id);
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.valueOf("application/pdf"));
        header.setContentLength(cv.getData().length);
        header.set("Content-Disposition", "attachment; filename=" + cv.getName());
        return new ResponseEntity<>(cv.getData(), header, HttpStatus.OK);
    }

    @PutMapping("/create/{idEtudiant}")
    public CV saveCV(@RequestParam("file") MultipartFile file, @PathVariable Long idEtudiant) throws IOException {
        var cv = new CV();
        cv.setId(idEtudiant);
        cv.setData(file.getBytes());
        cv.setName(file.getOriginalFilename());
        cv.setStatus(CV.CVStatus.UNREVIEWED);
        return cvService.saveEtudiantCV(idEtudiant, cv);
    }

    @PutMapping("/update/{id}")
    public CV updateCVStatus(@RequestParam("isValid") boolean isValid, @PathVariable Long id) throws Exception {
        return cvService.updateCVStatus(isValid, id);
    }

}
