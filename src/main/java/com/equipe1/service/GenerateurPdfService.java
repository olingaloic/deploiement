package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.*;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.*;
import java.util.List;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class GenerateurPdfService {

    private final int FONT_TAILLE_TITRE = 16;
    private final int FONT_TAILLE_REGULIER = 14;

    @Autowired
    private Environment env;
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private CommentaireRepository commentaireRepository;

    @Autowired
    private EvaluationMilieuStageRepository evaluationMilieuStageRepository;

    @Autowired
    private EvaluationStagiaireRepository evaluationStagiaireRepository;

    @Autowired
    private CandidatureRepository candidatureRepository;


    public ByteArrayOutputStream createPdf(Stage s, Employeur employeur, Etudiant etudiant) throws Exception {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter writer = PdfWriter.getInstance(document, out);
        // Document document = new Document(PageSize.A4);
        // PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("/home/carlos/Documents/test.pdf"));
        document.open();

        String text2 = " Le CÉGEP ANDRÉ-LAURENDEAU, corporation légalement constituée, situé au" +
                " 1111, rue Lapierre, LASALLE (Québec), H8N 2J4, ici représenté par Madame Diane Turcotte" +
                " ci-après désigné «Le Collège»,  l’entreprise ";
        String text3 = "ayant sa place d’affaires au ";
        document.add(getImage());
        document.add(setTitre("ENTENTE DE STAGE COOPÉRATIF"));
        document.add(setParagraphe(Arrays.asList(
                setPhrase("Dans le cadre de la formule Alternance travail-études du programme de ", false),
                setPhrase(s.getProgramme(), true),
                setPhrase(text2, false),
                setPhrase(text3, false),
                setPhrase(s.getVille() + " ,", true),
                setPhrase(" à l'adresse: ", false),
                setPhrase(employeur.getAdresse() + " ,", true),
                setPhrase(" au téléphone ", false),
                setPhrase(employeur.getTelephone() + " ,", true),
                setPhrase(" et l'étudiant ", false),
                setPhrase(etudiant.getPrenom() + " " + etudiant.getNom() + " ,", true),
                setPhrase("conviennent des conditions de stage suivantes : ", false)
        )));

        //create table
        document.add(tableTitre("ENDROIT DU STAGE"));

        document.add(createTable(Arrays.asList(
                createBoldCell("Ville: ", s.getVille(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Adresse: ", employeur.getAdresse(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Téléphone: ", employeur.getTelephone(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Courriel: ", employeur.getEmail(), setFond(FONT_TAILLE_REGULIER, true))
        ), 2, false));

        document.add(tableTitre("MODALITÉ DE SUPERVISION DU STAGIAIRE"));

        document.add(createTable(Arrays.asList(createBoldCell("Nombre d’heures /semaine prévu: ",
                "10", setFond(FONT_TAILLE_REGULIER, true))), 1, false));

        document.add(tableTitre("DÉTAILS DU STAGE"));

        document.add(createTable(Arrays.asList(
                createBoldCell("Date de début : ", s.getDateDebut().toString(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Date de fin : ", s.getDateFin().toString(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Nombre total de semaines : ", getDureStage(s).toString(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Salaire : ", String.valueOf(s.getSalaire()), setFond(FONT_TAILLE_REGULIER, true))
                ), 2, false)
        );

        //liste taches et responsabilites
        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, true), "TÂCHES ET RESPONSABILITÉS DU STAGIAIRE"));

        document.add(setListOrdonee(Arrays.asList(
                "Modéliser, implémenter de nouvelles fonctionnalités dans les logiciels de l'entreprise. ",
                "Définir et automatiser les tests de certains aspects fonctionnels et non-fonctionnels de la solution en collaboration " +
                        "avec le département d’assurance qualité.", "Participer à l’investigation et la résolution de bogues reliés à la " +
                        "solution.",
                "Supporter l’équipe des développeurs dans la réalisation de fonctionnalités complexes.",
                "Supporter la migration des clients existants pour des fonctionnalités complexes."
        )));

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, true), "RESPONSABILITÉS"));
        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, true), "Le Collège s’engage à :"));

        document.add(setListOrdonee(Arrays.asList(
                "Fournir à l’entreprise tous les renseignements concernant les conditions spécifiques du programme " +
                        "d’études et du programme d’alternance travail études.",
                "Collaborer, au besoin, à la définition du plan de stage.",
                "Effectuer un suivi de l’étudiant stagiaire pendant la durée du stage.",
                "Fournir à l’entreprise les documents nécessaires à l’évaluation de l’étudiant stagiaire.",
                "Collaborer avec l’entreprise pour résoudre des problèmes qui pourraient survenir en cours de stage, le cas échéant.",
                "Conserver tous les dossiers de stage et les rapports des étudiants.",
                "Fournir à l’entreprise le formulaire d’attestation de participation à un stage " +
                        "de formation admissible après réception du formulaire « Déclaration " +
                        "Relative au crédit d’impôt remboursable pour les stages »."
        )));

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, true), "L’entreprise s’engage à :"));

        document.add(setListOrdonee(Arrays.asList(
                "test desde responsablity",
                "Embaucher l’étudiant stagiaire  aux conditions précisées dans la présente entente.",
                "Désigner un superviseur de stage qui assurera l’encadrement de l’étudiant stagiaire pour toute la durée du stage.",
                "mettre en place des mesures d’accueil, d’intégration et d’encadrement de l’étudiant stagiaire.",
                "procéder à l’évaluation de l’étudiant stagiaire."
        )));

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, true), "L’étudiant s’engage:"));
        document.add(setListOrdonee(Arrays.asList(
                "Assumer de façon responsable et sécuritaire, les tâches qui lui sont confiées.",
                "Respecter les politiques, règles et procédures de l’entreprise ainsi que l’horaire de travail au même titre qu’un employé.",
                "respecter les dates de début et de fin de stage.",
                "référer rapidement au responsable des stages au cégep toute situation " +
                        "problématique affectant le bon déroulement du stage;"
        )));

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, false), "Les parties s’engagent à respecter cette entente de stage " +
                "en foi de quoi les parties ont signé, "));

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, true), "Signatures "));
        document.add(Chunk.NEWLINE);

        //Signatures
        document.add(createTable(Arrays.asList(
                createBoldCell("Pour l’entreprise", "", setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Date", "", setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("L’étudiant", "", setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Date", "", setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Pour le Collège", "", setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Date", "", setFond(FONT_TAILLE_REGULIER, true))
                ), 2, true)
        );
        document.close();
        writer.close();
        return out;
    }

    private com.itextpdf.text.List setListOrdonee(List<String> line) {
        com.itextpdf.text.List taches = new com.itextpdf.text.List(false, 8);
        for (String l : line) {
            taches.add(l);
        }
        return taches;
    }

    private Paragraph setTitre(String s2) {
        Paragraph title = new Paragraph(s2, setFond(FONT_TAILLE_TITRE, true));
        title.setAlignment(Element.TITLE);
        title.setSpacingAfter(20);
        return title;
    }

    private Image getImage() throws BadElementException, IOException {
        Image image1 = Image.getInstance("src/main/resources/static/images/logoCegep.jpg");
        image1.scaleAbsolute(120, 60);
        image1.setAlignment(Element.IMGTEMPLATE);
        return image1;
    }

    private Paragraph subtitre(Font fontRegularBold, String text) {
        final float SPACE_APRES = 10f;
        final float SPACE_BEFORE = 10f;
        Paragraph program = new Paragraph(text, fontRegularBold);
        program.setAlignment(Element.ALIGN_LEFT);
        program.setSpacingAfter(SPACE_APRES);
        program.setSpacingBefore(SPACE_BEFORE);
        return program;
    }

    private Long getDureStage(Stage s) {
        Long days = DAYS.between(s.getDateDebut(), s.getDateFin());
        return days;
    }

    private Paragraph createBoldCell(String title, String data, Font fontRegularBold) {
        Paragraph paragraph = new Paragraph();
        Phrase phrase = new Phrase(title, fontRegularBold);
        paragraph.add(phrase);
        paragraph.add(data);
        return paragraph;
    }

    private PdfPTable tableTitre(String titre) {
        PdfPTable table2 = new PdfPTable(1);
        table2.setWidthPercentage(100);
        table2.setSpacingBefore(10f);

        PdfPCell cell1 = new PdfPCell(new Paragraph(titre));
        cell1.setPadding(10);
        cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
        cell1.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell1.setBackgroundColor(BaseColor.LIGHT_GRAY);
        table2.addCell(cell1);
        return table2;

    }

    private PdfPTable createTable(List<Paragraph> paragraphs, int numColumns, boolean isSignature) {
        final float LARGEUR_TABLE = 100f;
        PdfPTable table = new PdfPTable(numColumns);
        table.setWidthPercentage(LARGEUR_TABLE);


        for (int i = 0; i < paragraphs.size(); i++) {
            PdfPCell cell2 = new PdfPCell(paragraphs.get(i));
            cell2.setPaddingBottom(10);
            if (isSignature) {
                cell2.setPaddingBottom(50);
                cell2.setBorder(1);

            }

            cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
            table.addCell(cell2);
        }
        return table;
    }

    private Font setFond(int taille, boolean isBold) {
        return new Font(Font.FontFamily.TIMES_ROMAN, taille, isBold ? Font.BOLD : Font.NORMAL);
    }

    private Phrase setPhrase(String mot, boolean isGras) {
        return new Phrase(mot, setFond(FONT_TAILLE_REGULIER, isGras));
    }

    private Paragraph setParagraphe(List<Phrase> phrases) {
        Paragraph paragraph = new Paragraph();
        for (Phrase p : phrases) {
            paragraph.add(p);
        }
        return paragraph;
    }

    public ByteArrayOutputStream createPdfEvaluationMilieuStage(Long idEvaluationMiliauStage) throws Exception {
    EvaluationMilieuStage evaluation = evaluationMilieuStageRepository.findById(idEvaluationMiliauStage).orElseThrow();
    List<Question> questions = questionRepository.findByEvaluation(evaluation);
    List<Commentaire> commentaires = commentaireRepository.findByEvaluation(evaluation);
    //List<Candidature> candidatures = candidatureRepository.findByEtudiant(evaluation.getEtudiant());


        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter writer = PdfWriter.getInstance(document, out);
        //Document document = new Document(PageSize.A4);                    //test in main
        //PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("D:/Desktop/test.pdf")); // test in main
        document.open();

        document.add(getImage());
        document.add(setTitre("ÉVALUATION DU MILIEU DE STAGE"));

        //create table identfication entreprise
        document.add(tableTitre("IDENTIFICATION DE L’ENTREPRISE"));

        document.add(createTable(Arrays.asList(
                createBoldCell("Nom de l'entreprise: ", evaluation.getEmployeur().getNom(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Adresse: ", evaluation.getEmployeur().getAdresse(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Téléphone: ", evaluation.getEmployeur().getTelephone(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Courriel: ", evaluation.getEmployeur().getEmail(), setFond(FONT_TAILLE_REGULIER, true))
        ), 2, false));


        //create table identfication entreprise
        document.add(tableTitre("IDENTIFICATION DU STAGIAIRE"));

        document.add(createTable(Arrays.asList(
                createBoldCell("Nom du stagiaire: ", evaluation.getEtudiant().getNom(), setFond(FONT_TAILLE_REGULIER, true)),
                //createBoldCell("Date du stage: ", candidature.getStage().getDateDebut().toString(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Téléphone: ", evaluation.getEtudiant().getTelephone(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Courriel: ", evaluation.getEtudiant().getEmail(), setFond(FONT_TAILLE_REGULIER, true))
        ), 2, false));

        Paragraph paragraph = new Paragraph();
        Phrase phrase = new Phrase("Questions", setFond(FONT_TAILLE_REGULIER, true));
        paragraph.add(phrase);
        Paragraph paragraph2 = new Paragraph();
        Phrase phrase2 = new Phrase("Réponses", setFond(FONT_TAILLE_REGULIER, true));
        paragraph2.add(phrase2);
        document.add(tableTitre("EVALUATION"));

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.addCell(paragraph);
        table.addCell(paragraph2);
        for (Question q: questions) {
            table.addCell(q.getQuestion());
            table.addCell(q.getReponse());
        }
        document.add(table);
        document.add(setPhrase("Commentaire: ",true));
        document.add(setPhrase(getCommentaireBySection(commentaires,"Evaluation milieu stage"), false));
        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);

        document.add(setParagraphe(Arrays.asList(
                setPhrase("Note: ", true),
                setPhrase("Cette évaluation a été réalisée avec l'application du projet d'équipe1. La personne jointe en bas de page a accepté les conditions de remplissage en ligne. ", false))));


        document.add(Chunk.NEWLINE);
        document.add(setParagraphe(Arrays.asList(
                setPhrase("Évaluation réalisée par: ", true),
                setPhrase(evaluation.getEnseignant().getPrenom() + " " + evaluation.getEnseignant().getNom(), false))));

        document.close();
        writer.close();
        return out;
    }


    public ByteArrayOutputStream createPdfEvaluationStagiaire(Long evaluationId) throws Exception {
        EvaluationStagiaire evaluation = evaluationStagiaireRepository.findById(evaluationId).orElseThrow();
    List<Question> questions = questionRepository.findByEvaluation(evaluation);
    List<Commentaire> commentaires = commentaireRepository.findByEvaluation(evaluation);
    //Candidature candidature = candidatureRepository.findByEtudiant(evaluation.getEtudiant()).orElseThrow();


        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter writer = PdfWriter.getInstance(document, out);
       // Document document = new Document(PageSize.A4);  //test
        //PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("D:/Desktop/test.pdf")); //test
        document.open();

        document.add(getImage());
        document.add(setTitre("FICHE D’ÉVALUATION DU STAGIAIRE "));

        //create table identfication entreprise
        document.add(tableTitre("IDENTIFICATION DU STAGIAIRE"));

        document.add(createTable(Arrays.asList(
                createBoldCell("Nom du stagiaire: ", evaluation.getEtudiant().getNom(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Programme: ", evaluation.getEtudiant().getNom(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Téléphone: ", evaluation.getEtudiant().getTelephone(), setFond(FONT_TAILLE_REGULIER, true)),
                createBoldCell("Courriel: ", evaluation.getEtudiant().getEmail(), setFond(FONT_TAILLE_REGULIER, true))
                //createBoldCell("Nom de l’entreprise: ", candidature.getStage().getEmployeur().getNom(), setFond(FONT_TAILLE_REGULIER, true)),
                //createBoldCell("Stage: ", candidature.getStage().getTitre(), setFond(FONT_TAILLE_REGULIER, true))
        ), 2, false));


        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, true),"EVALUATION"));

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, false),"1. PRODUCTIVITÉ "));
        document.add(createTableQuestions(questions,"Productivité"));
        document.add(setPhrase("Commentaire: ",true));
        document.add(setPhrase(getCommentaireBySection(commentaires,"Productivité"), false));
        document.add(Chunk.NEWLINE);

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, false),"2. QUALITÉ DU TRAVAIL"));
        document.add(createTableQuestions(questions, "Qualité du travail"));
        document.add(setPhrase("Commentaire: ",true));
        document.add(setPhrase(getCommentaireBySection(commentaires,"Qualité du travail"), false));
        document.add(Chunk.NEWLINE);

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, false),"3. QUALITÉS DES RELATIONS INTERPERSONNELLES"));
        document.add(createTableQuestions(questions,"Qualité des relations interpersonnelles"));
        document.add(setPhrase("Commentaire: ",true));
        document.add(setPhrase(getCommentaireBySection(commentaires,"Qualité des relations interpersonnelles"), false));
        document.add(Chunk.NEWLINE);

        document.add(subtitre(setFond(FONT_TAILLE_REGULIER, false),"4. HABILETÉS PERSONNELLES"));
        document.add(createTableQuestions(questions,"Habilités personnelles"));
        document.add(setPhrase("Commentaire: ",true));
        document.add(setPhrase(getCommentaireBySection(commentaires,"Habilités personnelles"), false));
        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);

        document.add(setParagraphe(Arrays.asList(
                setPhrase("Note: ", true),
                setPhrase("Cette évaluation a été réalisée avec l'application du projet d'équipe1. La personne jointe en bas de page a accepté les conditions de remplissage en ligne. ", false))));


        document.add(Chunk.NEWLINE);
        document.add(setParagraphe(Arrays.asList(
                setPhrase("Évaluation réalisée par: ", true),
                setPhrase(evaluation.getEmployeur().getNom() , false))));

        document.add(Chunk.NEWLINE);
        document.add(setParagraphe(Arrays.asList(
                setPhrase("Date: ", true),
                setPhrase(evaluation.getDateCreation().toString(), false))));

        document.close();
        writer.close();
        return out;
    }

    private String getCommentaireBySection(List<Commentaire> commentaires, String section){
        String commentaire = "";
        for (Commentaire c : commentaires) {
            if(c.getSection()!=null && c.getSection().equals(section)){
                commentaire = c.getEnnonce();
            }
        }
        return commentaire;
    }


    private PdfPTable createTableQuestions(List<Question> questions, String section) {
        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.addCell(new Paragraph(setPhrase("Questions",true)));
        table.addCell(new Paragraph(setPhrase("Réponses",true)));
        for (Question q: questions) {
            if(q.getSection()!= null  && q.getSection().equals(section)){
                table.addCell(q.getQuestion());
                table.addCell(q.getReponse());
            }
        }
        return table;
    }

}
