$(function () {
    hentAdmin()
});

//window.onload = hentAdmin;

function loggInn() {
    const url = "/loggInn?brukernavn="+$("#brukernavn").val()+"&passord="+$("#passord").val();
    $.get(url, function (ok) {
        if(ok) {
            document.cookie = "username=loggetInn;";
            window.location.href = "/liste.html";
        } else {
            $("#feil").html("Feil brukernavn / passord.")
        }
    })
    .fail(function (jqXHR) {
        const json = $.parseJSON(jqXHR.responseText);
        $("#feil").html(json.message());
    });
}

function hentAdmin() {
    $.post("/lagreAdmin");
}