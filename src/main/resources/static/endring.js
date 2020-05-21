window.onload = henteEnBillett;

function henteEnBillett() {
    const id = window.location.search.substring(1);
    const url = "/henteEnBillett?id=" + id;

    $.get(url, function (enBillett) {
        $("#id").val(enBillett.id);
        $("#film").val(enBillett.film);
        $("#antallBilletter").val(enBillett.antall);
        $("#fornavn").val(enBillett.fornavn);
        $("#etternavn").val(enBillett.etternavn);
        $("#telefonnr").val(enBillett.telefonnr);
        $("#epost").val(enBillett.epost);
    })
}

function endreBillett() {

    const billett = {
        id: $("#id").val(),
        film: $("#film").val(),
        antall: $("#antallBilletter").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };

    if(ingenValideringsFeil()) {
        $.post("/endreBillett", billett, function () {
            window.location.href = "/liste.html";
        })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
    }
}