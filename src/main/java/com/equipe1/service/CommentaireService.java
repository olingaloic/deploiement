package com.equipe1.service;

import com.equipe1.model.Commentaire;
import com.equipe1.repository.CommentaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentaireService {

    @Autowired
    private CommentaireRepository commentaireRepository;

    public Commentaire saveCommentaire(Commentaire commentaire){
        return commentaireRepository.save(commentaire);
    }

}
