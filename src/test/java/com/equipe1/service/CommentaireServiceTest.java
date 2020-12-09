package com.equipe1.service;

import com.equipe1.model.Commentaire;
import com.equipe1.repository.CommentaireRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class CommentaireServiceTest {

    @MockBean
    private CommentaireRepository commentaireRepository;
    private Commentaire commentaire;

    @Autowired
    private CommentaireService commentaireService;

    @BeforeEach
    public void setUp() {
        commentaire = new Commentaire();
        commentaire.setEnnonce("commentaire a la question");
        commentaire.setSection("Productivite");
    }

    @Test
    void saveCommentaire() {
        when(commentaireRepository.save(commentaire)).thenReturn(commentaire);
        Commentaire commentaireTest = commentaireService.saveCommentaire(commentaire);
        assertEquals(commentaireTest, commentaire);
        assertNotNull(commentaireTest);
    }

}