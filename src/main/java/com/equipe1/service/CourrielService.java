package com.equipe1.service;

import com.equipe1.model.CV;
import com.equipe1.model.Courriel;
import com.equipe1.model.Etudiant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.Date;

@Service
public class CourrielService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CourrielService.class);

    @Autowired
    JavaMailSenderImpl emailSender;

    public void sendSimpleMessage(Courriel mail, String nomDestinataire) throws Exception {
        String mailBody = "Bonjour "+ nomDestinataire +  "\n\n" +mail.getContenu();
        configMail(mail.getDestinataire(), mail.getSujet(), mailBody);
    }

    public void sendMailCVApproval(Etudiant etudiant) throws Exception {
        String content = "";
        if (etudiant.getCv().getStatus() == CV.CVStatus.APPROVED)
            content = "Le CV que vous avez envoyé a été approuvé.";
        if (etudiant.getCv().getStatus() == CV.CVStatus.DENIED)
            content = "Le CV que vous avez envoyeé a été refusé.";
        String mailTo = etudiant.getEmail();
        String mailBody = "Bonjour, " + etudiant.getPrenom() + " " + etudiant.getNom() + " \n" + content;
        LOGGER.info("nom ==> " + etudiant.getNom());
        String subject = "Approbation de votre CV";
        configMail(mailTo, subject , mailBody);
    }

    private void configMail(String mailTo, String subject, String mailBody) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        helper.setTo(mailTo);
        helper.setSubject(subject);
        helper.setText(mailBody);
        helper.setSentDate(new Date());
        emailSender.send(message);
        LOGGER.info("Mail sent to ==> " + mailTo);
    }
}
