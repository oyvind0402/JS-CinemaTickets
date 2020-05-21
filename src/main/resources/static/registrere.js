function registrerBillett() {

    const billett = {
        film: $("#film").val(),
        antall: $("#antallBilletter").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };

    if(ingenValideringsFeil()) {
        $.post("/lagreBillett", billett, function () {
            window.location.href = "/liste.html";
        })
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });

        $("#film").get(0).selectedIndex = 0;
        $("#antallBilletter").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    }
}