
var titulo = 'No tiene permiso para acceder a este Menú';
var color = '#ECE9E9';
var colorTexto = '#333333';
var idEmpleadoLogin;
var idUsrLogin;
var nombre;
var empresaUsr;
var foto;
var perfil;
var UserInfo;
var datos;
let modalFirmasPendientes;


$(document).ready(function () {

    getUserIP(function (ip) {
        localStorage.setItem('appIP', ip);
    });

    UserInfo = $('#usr').val();

    if (UserInfo != "") {
        localStorage.removeItem('objectUsr');
        localStorage.setItem('objectUsr', JSON.stringify(UserInfo));

        $('#usr').val(null);
    }

    var object = JSON.parse(localStorage.getItem('objectUsr'))

    //console.log(object);

    datos = JSON.parse(object);
    cargaUsuario(datos);

    $("a").each(function () {
        if ($(this).attr("href") == "") {
            $(this).css({ background: color, color: colorTexto }).attr('title', titulo);
            if ($(this).text() == 'Administrador') {
                $("#menu ul.nivel1 li ul").removeClass("nivel2");
                $("div").removeClass("flecha");
            }
            if ($(this).text() == 'TasaBase') {
                $("#menu ul.nivel1 li ul").removeClass("nivel2");
                $("div").removeClass("flecha");
            }
        }

    });

    $("#cerrarSession").click(function () {
        localStorage.clear();
    });

    validaMenu();

    if (window.location.pathname.includes("Autorizador")) {
        validaMenu(); 
        $('.simplemodal-close.btnCerrar').hide();
        $('.tblModal').append(
            '<tr><td class="txtModal"> Cargando Firmas Pendientes... <br><br></tr>' +
            '<tr><td class="txtModal"><img src="/SimuladorAbonos/img/cargando.gif"><br><br></tr>' 

        );

        modalFirmasPendientes =$('#modalAutorizado').modal({
            focus: true,
            persist: true,
        });

        Principal();

    }
    if (window.location.pathname.includes("Cotizador")) {

        validaMenu(); 
        cotizadorPrincipal();
        irAcordeon();
  
    }
    if (window.location.pathname.includes("TasaBasep")) {

        validaMenu();
        eventoPrestPrincipal();
        irAcordeon();

    }


});


function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
        noop = function () { },
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }, noop);

    //listen for candidate events
    pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

function cargaUsuario(datos) {

    idEmpleadoLogin = datos.InformacionUsuario["FiEmpleado"];
    idUsrLogin = datos.InformacionUsuario["FiUsuarioId"];
    nombre = datos.InformacionUsuario["FcNombre"];
    perfil = datos.InformacionUsuario["FiPerfilId"];
    foto = datos.InformacionUsuario["FcFoto"];
    empresaUsr = datos.InformacionUsuario["FcEmpresa"];

    $("#idUsr").val(idUsrLogin);
    $('#titulo').text("Bienvenido, " + nombre);
    $('#fotoUsr').css("background-image", "url(" + foto + ")");
    $('#idEmpleado').val(idEmpleadoLogin);
   
   
    catalogoPerfilLogin(nombre, perfil);

    cargaMenu(datos.LstPerfilMenu);


}

function catalogoPerfilLogin(nombre, perfil) {
    consultaServicio(urlCatalogos + "getPerfil", null, "GET", true, "application/json").then(objJson => {
        objJson.json().then(objSM => {
            $.each(objSM.respuesta.lstRespuestaPerfil, function (key, value) {

                if (perfil == value.fiPerfilId) {

                    $('#PerfilAd').text(value.fcDescripcion);
                    $('.name').html("<strong>¡Buenos días " + nombre + "!</strong> <br>" + value.fcDescripcion
                        + '<br><strong><a style="color: #6ead3a;" href="#" id="cerrarSesion">Salir <img src="/SimuladorAbonos/img/ico5.svg" class="imgConfig"> </strong>');
                    $("#cerrarSesion").attr("href", hrefLogout);

                }
            });
        })
    });

}


