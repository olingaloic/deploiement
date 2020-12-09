package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RecepteurDonneesEvaluation {
        private List<Question> questions;
        private Commentaire commentaires;
}
