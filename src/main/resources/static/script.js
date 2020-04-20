$(function () {
    hentBillettene();
});

function registrerBillett() {

    const billett = {
        film: $("#film").val(),
        antall: $("#antallBilletter").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };

    const error = validerInput();
    if(!error) {
        $.post("/lagreBillett", billett, function () {
            hentBillettene();
        });

        $("#film").get(0).selectedIndex = 0;
        $("#antallBilletter").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    }
}

function hentBillettene() {
    $.get("/hentBillettene", function (billetter) {
        visBillett(billetter);
    });
}


function validerInput() {

    $("#filmError").html("");
    $("#fornavnError").html("");
    $("#etternavnError").html("");
    $("#telefonError").html("");
    $("#epostError").html("");
    $("#antallError").html("");

    let error = false;

    if($("#film").val()==="" || $("#film").val()==="Velg film her!"){
        $("#filmError").html("Du må velge en film!");
        error = true;
    }
    if($("#antallBilletter").val()===""){
        $("#antallError").html("Du må skrive et antall billetter");
        error = true;
    }
    if($("#fornavn").val()===""){
        $("#fornavnError").html("Du må skrive inn et fornavn");
        error = true;
    }
    if($("#etternavn").val()===""){
        $("#etternavnError").html("Du må skrive inn et etternavn");
        error = true;
    }
    if($("#telefonnr").val()===""){
        $("#telefonError").html("Du må skrive inn et telefonnr");
        error = true;
    }
    if($("#epost").val()===""){
        $("#epostError").html("Du må skrive inn en epost");
        error = true;
    }
    return error;
}

function visBillett(billetter) {
    let ut = "";

    ut += "<br/><table class='table table-striped table-bordered'>" +
        "<tr><th><strong>Film</strong></th>" +
        "<th><strong>Antall</strong></th>" +
        "<th><strong>Fornavn</strong></th>" +
        "<th><strong>Etternavn</strong></th>" +
        "<th><strong>Telefonnr</strong></th>" +
        "<th><strong>Epost</strong></th></tr>";

    for(let billett of billetter){
        ut += "<tr><td>" + billett.film + "</td><td>" + billett.antall;
        ut += "</td><td>" + billett.fornavn + "</td><td>" + billett.etternavn;
        ut += "</td><td>" + billett.telefonnr + "</td><td>" + billett.epost;
        ut += "</td></tr>"
    }
    ut += "</table>";
    $("#filmInfo").html(ut);
}

function slettBillettene() {
    $.get("/slettBillettene", function () {
        hentBillettene();
    })
}