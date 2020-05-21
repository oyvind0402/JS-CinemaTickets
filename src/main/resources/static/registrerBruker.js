function registrerBruker() {
    const bruker = {
        brukernavn: $("#brukernavn").val(),
        passord: $("#passord").val()
    };

    $.post("/registrerBruker", bruker, function () {
        window.location.href = "/";
    })
    .fail(function (jqXHR) {
        const json = $.parseJSON(jqXHR.responseText);
        $("#feil").html(json.message);
    });
}