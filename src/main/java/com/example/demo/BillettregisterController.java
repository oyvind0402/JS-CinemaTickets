package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettregisterController {

    public final List<Billett> billettRegister= new ArrayList<>();

    @PostMapping("/lagreBillett")
    public void lagreBillett(Billett billett) {
        billettRegister.add(billett);
    }

    @GetMapping("/hentBillettene")
    public List<Billett> hentBillettene() {
        return billettRegister;
    }

    @GetMapping("/slettBillettene")
    public void slettBillettene() {
        billettRegister.clear();
    }
}
