package com.equipe1.service;

import com.equipe1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.ByteArrayOutputStream;
import java.util.Date;

@Service
public class CourrielService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CourrielService.class);

    @Autowired
    JavaMailSender emailSender;

    @Autowired
    Environment env;

    @Autowired
    private JavaMailSender mailSender;

    public void sendOffreDeStageApprobationMail(Stage stage) throws Exception {
        String content = "Votre offre de stage a été approuvée. Des étudiants pourront désormais postuler à cette offre.";
        String mailTo = stage.getEmployeur().getEmail();
        String mailBody = "Bonjour, " + " \n" + content;
        String subject = "Approbation de votre offre de stage";
        LOGGER.info("employeur ==> " + stage.getEmployeur());
        configMail(mailTo, subject , mailBody);
    }



    public void sendMailCVApproval(Etudiant etudiant) throws Exception {
        String content = "";
        String subject = "Mise à jour concernant le statut de votre CV";
        if (etudiant.getCv().getStatus() == CV.CVStatus.APPROVED)
            content = "Le CV que vous avez envoyé a été approuvé. Vous pouvez maintenant postuler à des offres de stage.";
        if (etudiant.getCv().getStatus() == CV.CVStatus.DENIED)
            content = "Le CV que vous avez envoyé a été refusé. Nous vous invitons à retéléverser un CV valide sans quoi, vous ne pourrez pas postuler à des offres de stage.";
        String mailTo = etudiant.getEmail();
        String mailBody = "Bonjour, " + etudiant.getPrenom() + " " + etudiant.getNom() + ", \r \n " + content;
        LOGGER.info("nom ==> " + etudiant.getNom());
        configMail(mailTo, subject , mailBody);
    }
    public void sendCandidatureStatusUpdate(Candidature candidature) throws Exception {
        String content = "";
        if (candidature.getStatut() == Candidature.CandidatureStatut.APPROUVE)
            content = "Vous avez été accepté(e) pour le stage " + candidature.getStage().getTitre() + ".";
        if (candidature.getStatut() == Candidature.CandidatureStatut.REFUSE)
            content = "Vous avez été refusé(e) pour le stage " + candidature.getStage().getTitre() + ".";
        String mailTo = candidature.getEtudiant().getEmail();
        String mailBody = "Bonjour, " + candidature.getEtudiant().getPrenom() + " " + candidature.getEtudiant().getNom() + ", \r \n" + content;
        LOGGER.info("nom ==> " + candidature.getEtudiant().getNom());
        String subject = "Mise à jour concernant votre postulation pour le stage " + candidature.getStage().getTitre();
        configMail(mailTo, subject , mailBody);
    }

    private void configMail(String mailTo, String subject, String mailBody) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(mailTo);
        helper.setSubject(subject);
        helper.setText(mailBody,false);
        helper.setSentDate(new Date());
        emailSender.send(message);
        LOGGER.info("Mail sent to ==> " + mailTo);
    }



    public void sendContratScolarite(Contrat contrat, String desc) throws Exception {
        String mailTo = "";
        String subject = "";
        String mailBody = "";
        if (desc.equals("Employeur")){
            mailTo = contrat.getCandidature().getEtudiant().getEmail();
            subject = "Contrat pour votre stage " + contrat.getCandidature().getStage().getTitre() + " chez " + contrat.getEmployeur().getNom();
            mailBody = "Voici le contrat de stage en pièce jointe. \r \n Nous vous invitons à le dater, à le signer et à le retéléverser sur l'application afin qu'il puisse être transmis à l'administration du Cégep.";
        } else if (desc.equals("Systeme")){ //changer pour le vrai discriminat
            mailTo = contrat.getCandidature().getStage().getEmployeur().getEmail();
            subject = "Contrat pour offre de stage " + contrat.getCandidature().getStage().getTitre() + " pour l'étudiant " +
                    contrat.getCandidature().getEtudiant().getNom() + " " +
                    contrat.getCandidature().getEtudiant().getPrenom();
            mailBody = "Voici votre contrat de stage en pièce jointe. \r \n Nous vous invitons à le dater, à le signer et à le retéléverser sur l'application afin qu'il puisse être transmis à l'étudiant.";
        }
        else {
            mailTo = "stagescegepandrelaurendeau@gmail.com";
            subject = "Contrat de stage pour l'étudiant " + contrat.getCandidature().getEtudiant().getPrenom() + " " + contrat.getCandidature().getEtudiant().getNom();
            mailBody = "Voici le contrat de stage en pièce jointe.";
        }

        final InputStreamSource attachment = new ByteArrayResource(contrat.getDocumentContrat());
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(mailTo);
        helper.setSubject(subject);
        helper.setText(mailBody, true);
        helper.addAttachment("Contrat_" + contrat.getCandidature().getStage().getTitre() + contrat.getCandidature().getEtudiant().getNom() + ".pdf", attachment);
        mailSender.send(message);
        LOGGER.info("Mail sent to ==> " + mailTo);
    }


    public void sendRefusContrat(Contrat contrat, String desc) throws MessagingException {
        String mailTo = "";
        String subject = "";
        String mailBody = "";
        if (desc.equals("Employeur")){
            mailTo = contrat.getEmployeur().getEmail();
        }
        else {
            mailTo = contrat.getCandidature().getEtudiant().getEmail();
        }
        subject = "Le contrat que vous aviez téléversé est invalide";
        mailBody = "Le contrat que vous aviez téléversé est invalide, nous vous invitions à le signer et à le dater convenablement.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(mailTo);
        helper.setSubject(subject);
        helper.setText(mailBody, true);
        mailSender.send(message);
        LOGGER.info("Mail sent to ==> " + mailTo);
    }
}
