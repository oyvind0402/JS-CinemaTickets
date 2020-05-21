function validerFornavn() {
    const fornavn = $("#fornavn").val();
    const regExp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/;
    const ok = regExp.test(fornavn);

    if(!ok) {
        $("#fornavnError").html("Fornavnet må bestå av 2 til 20 bokstaver!");
        return false;
    } else {
        $("#fornavnError").html("");
        return true;
    }
}

function validerEtternavn() {
    const etternavn = $("#etternavn").val();
    const regExp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/;
    const ok = regExp.test(etternavn);

    if(!ok) {
        $("#etternavnError").html("Etternavnet må bestå av 2 til 20 bokstaver!");
        return false;
    } else {
        $("#etternavnError").html("");
        return true;
    }
}

function validerEpost() {
    const epost = $("#epost").val();
    const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ok = regExp.test(epost.toLowerCase());

    if(!ok) {
        $("#epostError").html("Eposten er er ikke gyldig!");
        return false;
    } else {
        $("#epostError").html("");
        return true;
    }
}

function validerTlf() {
    const tlf = $("#telefonnr").val();
    const regExp = /^[+]?\d{8,10}$/;
    const ok = regExp.test(tlf);

    if(!ok) {
        $("#telefonError").html("Telefonnummeret er ikke gyldig!");
        return false;
    } else {
        $("#telefonError").html("");
        return true;
    }
}

function validerAntall() {
    const antall = $("#antallBilletter").val();
    const regExp = /^[1-9]$/;
    const ok = regExp.test(antall);

    if(!ok) {
        $("#antallError").html("Antall må være et tall fra 1 til 10!");
        return false;
    } else {
        $("#antallError").html("");
        return true;
    }
}

function validerFilm() {
    const film = $("#film").val();

    if(film === "Velg film her!") {
        $("#filmError").html("Du må velge en film!");
        return false;
    } else {
        $("#filmError").html("");
        return true;
    }
}

function ingenValideringsFeil() {
    return(validerFilm() && validerAntall() && validerFornavn() && validerEtternavn() && validerTlf() && validerEpost());
}