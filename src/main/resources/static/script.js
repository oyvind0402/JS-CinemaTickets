function kjopBillett() {

    let antall = document.getElementById("antallFilmer");
    let fornavn = document.getElementById("fornavn");
    let etternavn = document.getElementById("etternavn");
    let telefonnr = document.getElementById("telefonnr");
    let epost = document.getElementById("epost");
    let film = document.getElementById("film");

    const filmArray = [];

    if(film.value !== null && film.value !=='' && film.value !== "Velg film her!"){
        filmArray.push(film);
    } else {
        document.getElementById("filmError").innerHTML = "Du må velge en film"
    }

    if(antall.value !== null && antall.value !== ''){
        filmArray.push(antall);
    } else {
        document.getElementById("antallError").innerHTML = "Du må skrive et antall billetter";
    }

    if(fornavn.value !== null && fornavn.value !== ''){
        filmArray.push(fornavn);
    } else {
        document.getElementById("fornavnError").innerHTML = "Du må skrive inn et fornavn";
    }

    if(etternavn.value !== null && etternavn.value !== ''){
        filmArray.push(etternavn);
    } else {
        document.getElementById("etternavnError").innerHTML = "Du må skrive inn et etternavn";
    }

    if(telefonnr.value !== null && telefonnr.value !== ''){
        filmArray.push(telefonnr)
    } else {
        document.getElementById("telefonError").innerHTML = "Du må skrive inn et telefonnr";
    }

    if(epost.value !== null && epost.value !== ''){
        filmArray.push(epost);
    } else {
        document.getElementById("epostError").innerHTML = "Du må skrive inn en epost";
    }


    let ut = "";


        ut += "<table><tr><td><strong>Film</strong></td>" +
            "<td><strong>Antall</strong></td>" +
            "<td><strong>Fornavn</strong></td>" +
            "<td><strong>Etternavn</strong></td>" +
            "<td><strong>Telefonnr</strong></td>" +
            "<td><strong>Epost</strong></td></tr>" + "\n";

        ut += "<tr>";
        for(let film of filmArray){
            if(film.value !== null && film.value !== '' && film.value !== "Velg film her!" && antall.value !== '' && antall.value !== null && fornavn.value !== '' && fornavn.value !== null && etternavn.value !== '' && etternavn.value !== null && telefonnr.value !== '' && telefonnr.value !== null && epost.value !== '' && epost.value !== null) {
                ut += "<td>" + film.value + "</td>";
            }
        }

        ut += "</tr></table>"


    document.getElementById("filmInfo").innerHTML = ut;

    document.getElementById("fornavn").value = '';
    document.getElementById("etternavn").value = '';
    document.getElementById("film").value = '';
    document.getElementById("antallFilmer").value = '';
    document.getElementById("telefonnr").value = '';
    document.getElementById("epost").value = '';
}

function slettBilletter() {
    document.getElementById("filmInfo").innerHTML = "";
}