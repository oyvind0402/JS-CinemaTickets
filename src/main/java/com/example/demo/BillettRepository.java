package com.example.demo;

import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    private Logger logger = LoggerFactory.getLogger(BillettRepository.class);

    private String krypterPassord(String passord) {
        String kryptertPassord = BCrypt.hashpw(passord, BCrypt.gensalt(5));
        return kryptertPassord;
    }

    private boolean sjekkPassord(String passord, String hashPassord) {
        return BCrypt.checkpw(passord, hashPassord);
    }

    public boolean lagreBillett(Billett billett) {
        String sql = "INSERT INTO Billett (film,antall,fornavn,etternavn,telefonnr,epost) VALUES(?,?,?,?,?,?)";
        try {
            db.update(sql, billett.getFilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnr(), billett.getEpost());
            return true;
        } catch (Exception e) {
            logger.error("Feil i lagreBillett " + e);
            return false;
        }
    }


    public List<Billett> hentAlle() {
        String sql = "SELECT * FROM Billett";
        try {
            return db.query(sql, new BeanPropertyRowMapper<>(Billett.class));
        } catch (Exception e) {
            logger.error("Feil i hentAlle " + e);
            return null;
        }
    }

    public Billett henteEnBillett(int id) {
        String sql = "SELECT * FROM Billett WHERE id=?";
        try {
            List<Billett> enBillett = db.query(sql, new BeanPropertyRowMapper<>(Billett.class), id);
            return enBillett.get(0);
        } catch (Exception e) {
            logger.error("Feil i hentEnBillett " + e);
            return null;
        }
    }

    public boolean endreBillett(Billett billett) {
        String sql = "UPDATE Billett SET film =?, antall=?, fornavn=?, etternavn=?, telefonnr=?, epost=? WHERE id=?";
        try {
            db.update(sql, billett.getFilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnr(), billett.getEpost(), billett.getId());
            return true;
        } catch (Exception e) {
            logger.error("Feil i endreBillett " + e);
            return false;
        }
    }

    public boolean slettAlle() {
        String sql = "DELETE FROM Billett";
        try {
            db.update(sql);
            return true;
        } catch (Exception e) {
            logger.error("Feil i slettAlle " + e);
            return false;
        }
    }

    public boolean slettEnBillett(int id) {
        String sql = "DELETE FROM Billett WHERE id =?";
        try {
            db.update(sql, id);
            return true;
        } catch (Exception e) {
            logger.error("Feil i slettEnBillett " + e);
            return false;
        }
    }

    public boolean loggInn(String brukernavn, String passord) {
        String sql = "SELECT * FROM Bruker WHERE brukernavn = ?";
        try {
            List<Bruker> brukere = db.query(sql, new BeanPropertyRowMapper<>(Bruker.class), brukernavn);

            if(brukere != null) {
                if(sjekkPassord(passord, brukere.get(0).getPassord())) {
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean fantBruker(String brukernavn) {
        String sql = "SELECT COUNT(*) FROM Bruker WHERE brukernavn = ?";
        try {
            int funnetBruker = db.queryForObject(sql, Integer.class, brukernavn);
            if(funnetBruker != 1) {
                return false;
            } else {
                return true;
            }
        } catch (Exception e) {
            logger.error("Feil i finnBruker " + e);
            return true;
        }
    }

    public boolean lagreBruker(Bruker bruker) {
        String hash = krypterPassord(bruker.getPassord());
        String sql = "INSERT INTO Bruker (brukernavn, passord) VALUES (?,?)";
        try {
            if(!fantBruker(bruker.getBrukernavn())) {
                db.update(sql, bruker.getBrukernavn(), hash);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            logger.error("Feil i lagreBruker " + e);
            return false;
        }
    }

    public boolean lagreAdmin() {
        String brukernavn = "Admin";
        String passord = "Admin1234";
        String hash = krypterPassord(passord);
        String sql = "INSERT INTO Bruker (brukernavn, passord) VALUES (?,?)";

        try {
            if(!fantBruker(brukernavn)) {
                db.update(sql, brukernavn, hash);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            logger.error("Feil i lagreAdmin " + e);
            return false;
        }
    }

}
