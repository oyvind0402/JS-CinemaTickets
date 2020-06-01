function registrerBruker() {
    const bruker = {
        brukernavn: $("#brukernavn").val(),
        passord: $("#passord").val()
    };

    $.post("/registrerBruker", bruker, function (ok) {
        if(ok) {
            $("#feil").html("Bruker opprettet.");
        } else {
            $("#feil").html("En bruker med det samme brukernavnet eksisterer allerede!");
        }
    })
    .fail(function (jqXHR) {
        const json = $.parseJSON(jqXHR.responseText);
        $("#feil").html(json.message);
    });
}