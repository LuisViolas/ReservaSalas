function initMap() {
    var esmad = { lat: 41.3670341, lng: -8.7390409 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: esmad
    });
    var marker = new google.maps.Marker({
        position: esmad,
        map: map
    });
}

$(document).ready(function () {

    //Login
    var nome_reserva;
    $("#login").click(function () {

        console.log("n")
        var user = $("#user_name").val();
        var palavra_pass = $("#pass").val();

        var validado = false;

        for (var i = 0; i < localStorage.length; i++) {
            console.log("a")
            utilizador = JSON.parse(localStorage.getItem(localStorage.key(i)));


            $.each(utilizador, function (i, item) {

                console.log("b")
                if (user == item.user_id && palavra_pass == item.pass) {
                    validado = true;
                    console.log("nao regista")
                }
            })
        }
        if (validado == true) {
            nome_reserva = user

            sessionStorage.setItem("sent", nome_reserva);

            window.open("RS Main Page_1.html");
        }
        else {
            window.alert("O seu nome de utilizador ou palavra passe estão incorretos")
        }
    })

    $("#reservar").click(function () {
        window.alert("Tem de iniciar a sessão primeiro!");
    });

    //Registar

    $("#registar").click(function () {
        console.log("b")

        utilizador = [];

        var nomeRegisto = $("#nome").val()
        var emailRegisto = $("#email").val()
        var cursoRegisto = $("#curso option:selected").html()
        var anoRegisto = $("#ano option:selected").html()
        var userRegisto = $("#user").val()
        var passRegisto = $("#password").val()

        var registado = false;
        var preenchido = false;
        var isNumero = true;
        var isMenor7 = false;

        if (userRegisto.length < 7) {
            isMenor7 = true;
        }

        for (var i = 0; i < userRegisto.length; i++) {
            if (isNaN(parseInt(userRegisto[i]))) {
                isNumero = false;
                break;
            }
        };

        if (nomeRegisto != "" && emailRegisto != "" && userRegisto != "" && passRegisto != "" && cursoRegisto != "Escolher Curso" && anoRegisto != "Escolher Ano" && isNumero == true && isMenor7 == false) {
            preenchido = true;
        }
        else {
            window.alert("Preencha os campos obrigatórios")
        }

        if (localStorage.getItem("utilizadores") == null) {
            localStorage.setItem("utilizadores", "");
        }

        if (localStorage.getItem("utilizadores").length == 0 && preenchido == true) {
            window.alert("Registado");

            utilizador.push({ nome: nomeRegisto, email: emailRegisto, curso: cursoRegisto, ano: anoRegisto, user_id: userRegisto, pass: passRegisto });

            localStorage.setItem("utilizadores", JSON.stringify(utilizador));

            nome_reserva = userRegisto

            sessionStorage.setItem("sent", nome_reserva);

            window.open("RS Main Page_1.html");
        }
        else if (localStorage.getItem("utilizadores").length != 0 && preenchido == true) {
            for (var i = 0; i < localStorage.length; i++) {
                console.log("a")
                utilizador = JSON.parse(localStorage.getItem(localStorage.key(i)));


                $.each(utilizador, function (i, item) {
                    console.log("bbb")
                    if (userRegisto == item.user_id) {
                        registado = true;
                        console.log("nao regista")
                    }
                })
            }

            if (registado == false) {
                window.alert("Registado!")

                utilizador.push({ nome: nomeRegisto, email: emailRegisto, curso: cursoRegisto, ano: anoRegisto, user_id: userRegisto, pass: passRegisto });

                nome_reserva = userRegisto

                sessionStorage.setItem("sent", nome_reserva);

                localStorage.setItem("utilizadores", JSON.stringify(utilizador));

                window.open("RS Main Page_1.html");
            }
            else {
                window.alert("Esse nome de utilizador já existe");
            }
            console.log(utilizador)
        }
    })
});


