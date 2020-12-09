package com.equipe1.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Commentaire {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "evaluation_id")
    private Evaluation evaluation;
    private String ennonce;
    private String section;
}
