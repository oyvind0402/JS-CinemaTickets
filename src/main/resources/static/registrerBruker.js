function registrerBruker() {
    const bruker = {
        brukernavn: $("#brukernavn").val(),
        passord: $("#passord").val()
    };

    $.post("/registrerBruker", bruker, function () {
        $("#feil").html("Bruker opprettet.")
    })
    .fail(function (jqXHR) {
        const json = $.parseJSON(jqXHR.responseText);
        $("#feil").html(json.message);
    });
}