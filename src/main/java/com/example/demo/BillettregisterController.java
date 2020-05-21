package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@RestController
public class BillettregisterController {

    @Autowired
    private HttpSession session;

    private Logger logger = LoggerFactory.getLogger(BillettregisterController.class);

    @Autowired
    private BillettRepository rep;

    @PostMapping("/lagreBillett")
    public void lagreBillett(Billett billett, HttpServletResponse response) throws IOException {
        if((boolean) session.getAttribute("loggetInn")) {
            if (validerBillettOk(billett)) {
                if (!rep.lagreBillett(billett)) {
                    response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere.");
                }
            } else {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Valideringsfeil i lagring av billett. Prøv igjen senere.");
            }
        } else {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Kan ikke registere en billett: Du må være logget inn!");
        }
    }

    @GetMapping("/hentBillettene")
    public List<Billett> hentBillettene(HttpServletResponse response) throws IOException{

        if((boolean) session.getAttribute("loggetInn")) {
            List<Billett> alleBilletter = rep.hentAlle();
            if(alleBilletter == null) {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere.");
            }
            return alleBilletter;
        } else {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Kan ikke vise register: Du må være logget inn!");
            return null;
        }
    }

    @GetMapping("/henteEnBillett")
    public Billett henteEnBillett(int id, HttpServletResponse response) throws IOException {
        if((boolean) session.getAttribute("loggetInn")) {
            Billett billett = rep.henteEnBillett(id);
            if (billett == null) {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere.");
            }
            return billett;
        } else {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Kan ikke endre billett: Du må være logget inn!");
            return null;
        }
    }

    @PostMapping("/endreBillett")
    public void endre(Billett billett, HttpServletResponse response) throws IOException{
        if((boolean) session.getAttribute("loggetInn")) {
            if (validerBillettOk(billett)) {
                if (!rep.endreBillett(billett)) {
                    response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere.");
                }
            } else {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Valideringsfeil i lagring av billett. Prøv igjen senere.");
            }
        } else {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Kan ikke endre billett: Du må være logget inn!");
        }
    }

    @GetMapping("/slettBillettene")
    public void slettBillettene(HttpServletResponse response) throws IOException{
        if((boolean) session.getAttribute("loggetInn")) {
            if (!rep.slettAlle()) {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere.");
            }
        } else {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Kan ikke slette billettene: Du må være logget inn!");
        }
    }

    @GetMapping("/slettEnBillett")
    public void slettEnBillett(int id, HttpServletResponse response) throws IOException {
        if((boolean) session.getAttribute("loggetInn")) {
            if (!rep.slettEnBillett(id)) {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere.");
            }
        } else {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Kan ikke slette billett: Du må være logget inn!");
        }
    }

    private boolean validerBillettOk(Billett billett) {
        String regexFilm = "[a-zA-ZæøåÆØÅ0-9 !\\-]{1,20}";
        String regexFornavn = "[a-zA-ZæøåÆØÅ. \\-]{2,20}";
        String regexEtternavn = "[a-zA-ZæøåÆØÅ. \\-]{2,20}";
        String regexTlf = "[+]?\\d{8,10}";
        String regexEpost = "[^\\s@]+@[^\\s@]+\\.[^\\s@]+";
        String regexAntall = "[1-9]";

        boolean filmOk = billett.getFilm().matches(regexFilm);
        boolean fornavnOk = billett.getFornavn().matches(regexFornavn);
        boolean etternavnOk = billett.getEtternavn().matches(regexEtternavn);
        boolean telefonnrOk = billett.getTelefonnr().matches(regexTlf);
        boolean epostOk = billett.getEpost().matches(regexEpost);
        boolean antallOk = billett.getAntallAsString().matches(regexAntall);

        if(filmOk && antallOk && fornavnOk && etternavnOk && telefonnrOk && epostOk) {
            return true;
        } else {
            logger.error("Valideringsfeil.");
            return false;
        }
    }

    @PostMapping("/registrerBruker")
    public void registrerBruker(Bruker bruker, HttpServletResponse response) throws IOException {
        if(!rep.lagreBruker(bruker)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Det finnes allerede en bruker med dette brukernavnet!");
        }
    }

    @PostMapping("/lagreAdmin")
    public void lagreAdmin(HttpServletResponse response) throws IOException {
        if(!rep.lagreAdmin()) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Det finnes allerede en bruker med dette brukernavnet!");
        }
    }

    @GetMapping("/loggInn")
    public boolean loggInn(String brukernavn, String passord) {
        if(rep.loggInn(brukernavn, passord)) {
            session.setAttribute("loggetInn", true);
            return true;
        } else {
            return false;
        }
    }

    @GetMapping("/loggUt")
    public void loggUt() {
        session.setAttribute("loggetInn", false);
    }
}