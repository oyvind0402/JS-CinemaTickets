package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BillettregisterController {

    @Autowired
    private BillettRepository rep;

    @PostMapping("/lagreBillett")
    public void lagreBillett(Billett billett) {
        rep.lagreBillett(billett);
    }

    @GetMapping("/hentBillettene")
    public List<Billett> hentBillettene() {
        return rep.hentAlle();
    }

    @GetMapping("/slettBillettene")
    public void slettBillettene() {
        rep.slettAlle();
    }
}
