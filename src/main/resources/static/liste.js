$(function () {
    hentBillettene();
});

function hentBillettene() {
    $.get("/hentBillettene", function (billetter) {
        visBillett(billetter);
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function visBillett(billetter) {
    let ut = "";

    ut += "<br/><table class='table table-striped table-bordered'>" +
        "<tr><th><strong>Film</strong></th>" +
        "<th><strong>Antall</strong></th>" +
        "<th><strong>Fornavn</strong></th>" +
        "<th><strong>Etternavn</strong></th>" +
        "<th><strong>Telefonnr</strong></th>" +
        "<th><strong>Epost</strong></th>" +
        "<th></th><th></th></tr>";

    for(let billett of billetter){
        ut += "<tr><td>" + billett.film + "</td><td>" + billett.antall;
        ut += "</td><td>" + billett.fornavn + "</td><td>" + billett.etternavn;
        ut += "</td><td>" + billett.telefonnr + "</td><td>" + billett.epost;
        ut += "</td><td><button class='btn btn-primary' onclick='endreMedID(" + billett.id + ")'>Endre</button>" +
            "</td><td><button class='btn btn-danger' onclick='slettEnBillett(" + billett.id + ")'>Slett</button></td></tr>";
    }
    ut += "</table>";
    $("#filmInfo").html(ut);
}

function endreMedID(id) {
    window.location.href = "/endring.html?" + id;
}

function slettEnBillett(id) {
    const url = "/slettEnBillett?id=" + id;
    $.get(url, function () {
        window.location.href= "/liste.html";
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function slettBillettene() {
    $.get("/slettBillettene", function () {
        hentBillettene();
    })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}

function loggUt() {
    $.get("/loggUt", function () {
        document.cookie="username=loggetInn; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "/";
    });
}

function registrerLink() {
    if(document.cookie === "username=loggetInn") {
        window.location.href = "/registrere.html";
    } else {
        $("#feil").html("Kan ikke registrere en ny billett: Du må være logget inn!");
    }

}