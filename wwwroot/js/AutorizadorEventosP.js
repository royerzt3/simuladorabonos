const POST = "POST";
const GET = "GET";
var ObjStatus = undefined;
var ObjOrdena = undefined;
var ObjUsuarios = undefined;
var ObjTipoEnvio = undefined;
let intObjTemporalOnFocus;
var ObjAutoriza = {};
var ObjCancelar = {};
var ObjAutoRecha = {};
var Usuario;
var Folio;
var Vigencia;
var Producto;
var TipoEnvio;
var Canal;
var FechaInicio;
var FechaFin;
var Solicitud;
var urlCadena;
let JSONEventosP= [];
var respuestaCorreo;
var fiSimulacionIdGlobal;
var valorMotvio;
let contenidoSucursal;
var ModalAutorizar;
var statusEvento = 0;
var odanmiento = 0;
$("#filter-date").datetimepicker({
    timepicker: false
});
$("#filter-date, #filter-date1").datetimepicker({
    timepicker: false,
    maxDate: "-0D"
});
$("#filter-date1").on('change', function () {
    validaFechasMenoresMayores();
});
function Principal() {
    var object = JSON.parse(localStorage.getItem('objectUsr'));
    datos = JSON.parse(object);

    obtStatusEven();
    obtOdenamiento();

    $('#idTipoEvento').hide();
    $('#idUsuarios').hide();
    $('#idRango').hide(); 


    todosEventos();
    
}

function printFrontFP(objFP) {
    
    //console.log(objFP);
    objFP.forEach((element, index) => {
        JSONEventosP = objFP;
        let dl = document.getElementsByClassName('accordion');

        let dt = document.createElement('dt');
        dl[0].appendChild(dt);
        let divAutorizador = document.createElement('div');
        divAutorizador.className = 'dtAutorizador';
        dt.appendChild(divAutorizador);
        let divEmpty = document.createElement('div');
        divEmpty.className = 'infoSimulacion';
        divAutorizador.appendChild(divEmpty);
        let divfcDescripcion = document.createElement('div');
        let contenidoDescripcion = document.createTextNode(element.fcDescEvento);
        divfcDescripcion.appendChild(contenidoDescripcion);
        divEmpty.appendChild(divfcDescripcion);
        let divfiSimulacion = document.createElement('div');
        divfiSimulacion.className = 'folioSimulacion';
        let contenidodivfiSimulacion = document.createTextNode(element.ficonsec);
        divfiSimulacion.appendChild(contenidodivfiSimulacion);
        divEmpty.appendChild(divfiSimulacion);
        if (element.fcdesstatus == "Solicitado") {
        let divLigaBtnAutorizar = document.createElement('div');
        divLigaBtnAutorizar.className = 'ligaA modalAutorizado_view';
        divLigaBtnAutorizar.id = "indiceBtnAutorizar" + index;
        divLigaBtnAutorizar.innerText = 'Autorizar';
        divAutorizador.appendChild(divLigaBtnAutorizar);
        let divLigaBtnRechazar = document.createElement('div');
        divLigaBtnRechazar.className = 'ligaR modalRechazo_view';
        divLigaBtnRechazar.innerText = 'Cancelar';
        divLigaBtnRechazar.id = "indiceBtnRechazar" + index;
        divAutorizador.appendChild(divLigaBtnRechazar);
        }

        let dd = document.createElement('dd');
        dl[0].appendChild(dd);
        let divGrow = document.createElement('div');
        divGrow.className = 'divGrow';
        dd.appendChild(divGrow);
        let divW65 = document.createElement('div');
        divW65.className = 'w65';
        divGrow.appendChild(divW65);
        let divCol = document.createElement('div');
        divCol.className = 'divCol';
        divW65.appendChild(divCol);
        let divCol1 = document.createElement('div');
        divCol1.className = 'col2';
        divCol.appendChild(divCol1);
        let strongEmpty = document.createElement('strong');
        strongEmpty.innerText = 'Nombre de Evento:';
        divCol1.appendChild(strongEmpty);
        let brEmpty = document.createElement('br');
        divCol1.appendChild(brEmpty);

        let contenidoJustificacion = document.createTextNode(element.fcDescEvento);
        
        //let contenidoJustificacion = document.createTextNode(element.infoSimulaciones.fcJustificacion);
        let divrespuesta = document.createElement('div');
        divrespuesta.className = 'respuesta';
        //divrespuesta.innerText = 'Ejemplo de una justificación medianamente larga'; 
        divrespuesta.appendChild(contenidoJustificacion);
        divCol1.appendChild(divrespuesta);



        let divCol1u = document.createElement('div');
        divCol1u.className = 'col2';
        divCol.appendChild(divCol1u);
        let strongEmptyu = document.createElement('strong');
        strongEmptyu.innerText = 'Usuario:';
        divCol1u.appendChild(strongEmptyu);
        let brEmptyu = document.createElement('br');
        divCol1u.appendChild(brEmptyu);

        let contenidoUsuario = document.createTextNode(element.fcNombre);

        //let contenidoJustificacion = document.createTextNode(element.infoSimulaciones.fcJustificacion);
        let divrespuestaU = document.createElement('div');
        divrespuestaU.className = 'respuesta';
        //divrespuesta.innerText = 'Ejemplo de una justificación medianamente larga'; 
        divrespuestaU.appendChild(contenidoUsuario);
        divCol1u.appendChild(divrespuestaU);


        let divCol3 = document.createElement('div');
        divCol3.className = 'col3';
        divCol.appendChild(divCol3);
        let strongEmpty1 = document.createElement('strong');
        strongEmpty1.innerText = 'Fecha Inicio:';
        divCol3.appendChild(strongEmpty1);
        let brEmpty1 = document.createElement('br');
        divCol3.appendChild(brEmpty1);
        //
        let contenidoFechaInicio = document.createTextNode(element.fdfecInicio.replace("T00:00:00", ""));
        let divrespuesta1 = document.createElement('div');
        divrespuesta1.className = 'respuesta';
        divrespuesta1.appendChild(contenidoFechaInicio);
        divCol3.appendChild(divrespuesta1);
        let divCol4 = document.createElement('div');
        divCol4.className = 'col3';
        divCol.appendChild(divCol4);
        let strongEmpty2 = document.createElement('strong');
        strongEmpty2.innerText = 'Fecha Finalización:';
        divCol4.appendChild(strongEmpty2);
        let brEmpty2 = document.createElement('br');
        divCol4.appendChild(brEmpty2);
        //
        let contenidoFechaFin = document.createTextNode(element.fdfecFin.replace("T00:00:00", ""));
        let divrespuesta2 = document.createElement('div');
        divrespuesta2.className = 'respuesta';
        divrespuesta2.appendChild(contenidoFechaFin);
        divCol4.appendChild(divrespuesta2);
        let divCol5 = document.createElement('div');
        divCol5.className = 'col3';
        divCol.appendChild(divCol5);
        let strongEmpty3 = document.createElement('strong');
        strongEmpty3.innerText = 'Tipo Envío:';
        divCol5.appendChild(strongEmpty3);
        let brEmpty3 = document.createElement('br');
        divCol5.appendChild(brEmpty3);
        //
        let contenidoTipoEnvio = document.createTextNode(element.fcDecEvenTipo);
        let divrespuesta3 = document.createElement('div');
        divrespuesta3.className = 'respuesta';
        divrespuesta3.appendChild(contenidoTipoEnvio);
        divCol5.appendChild(divrespuesta3);

        let divw31 = document.createElement('div');
        divw31.className = 'w31';
        divGrow.appendChild(divw31);
        let divCol7 = document.createElement('div');
        divCol7.className = 'divCol';
        divw31.appendChild(divCol7);
        let divCol8 = document.createElement('div');
        divCol8.className = 'col1';
        divCol7.appendChild(divCol8);
        let strongEmpty5 = document.createElement('strong');
        strongEmpty5.innerText = 'Pais:';
        divCol8.appendChild(strongEmpty5);
        let brEmpty5 = document.createElement('br');
        divCol8.appendChild(brEmpty5);
        let divCol9 = document.createElement('div');
        divCol9.className = 'archivo ';
        divCol8.appendChild(divCol9);

        let divCol10 = document.createElement('div');
        divCol9.appendChild(divCol10);

        let contenidoPais = document.createTextNode(element.fcdeslarga);
        let divrespuestaP = document.createElement('div');
        divrespuestaP.className = 'respuesta';
        divrespuestaP.appendChild(contenidoPais);
        divCol9.appendChild(divrespuestaP);
/*
        let img = document.createElement('img');
        img.src = '/SimuladorAbonos/img/icoAdjuntar1.svg';
        img.className = 'icoAdjuntar';
        */

      //  divCol10.appendChild(divrespuestaP);
        //

       // let anclaAnexo = document.createElement('a');
        //anclaAnexo.target = "_blank";

        //anclaAnexo.href = element.infoSimulaciones.fcArchivo;
        //Temporal null
        //anclaAnexo.href = "";
        //anclaAnexo.href = 'data:image/png;base64,' + element.infoSimulaciones.fcArchivo;
        //anclaAnexo.download = 'Anexo.png';
        //anclaAnexo.innerText = 'Anexo';  
        ///let divCol11 = document.createElement('div');
        ///divCol11.appendChild(anclaAnexo);
        //divCol9.appendChild(divCol11);


        let divCol13 = document.createElement('div');
        divCol13.className = 'col1';
        divCol7.appendChild(divCol13);
        let div12 = document.createElement('div');
        div12.className = 'clear';
        dl[0].appendChild(div12);
        let brEmpty7 = document.createElement('br');
        dl[0].appendChild(brEmpty7);
        let strongEmpty6 = document.createElement('strong');
        strongEmpty6.innerText = 'Sucursales:';
        divCol13.appendChild(strongEmpty6);
        let brEmpty6 = document.createElement('br');
        divCol13.appendChild(brEmpty6);

        let inputSuc = document.createElement('div');
        inputSuc.id = 'idSucursales' + index;
        inputSuc.hidden = true;

        //let contenidoSuc = document.createTextNode(element.infoSimulaciones.fiSucursalId)
        //Se agregar pais temporar pero tiene que ir sucursales 
        let contenidoSuc = document.createTextNode("")
        inputSuc.appendChild(contenidoSuc);
        divCol13.appendChild(inputSuc);
        //contenidoSucursal = document.createTextNode(element.infoSimulaciones.fiSucursalId);
         //Se agregar pais temporar pero tiene que ir sucursales 
        contenidoSucursal = document.createTextNode("");
        let ancla = document.createElement('a');
        ancla.href = '#';
        ancla.className = 'sucursal';
        ancla.id = index;
        ancla.innerText = 'Detalle Sucursales';

        //console.log('Sucursales:' + $('#idSucursales').text());

        divCol13.appendChild(ancla);


    });



    $('.sucursal').click(function () {

        var TotalSucursales = $('#idSucursales' + $(this).attr('id')).text();
        VentanaEmergente(TotalSucursales);

    });




    $('.accordion > dd').hide();
    $('.modalAutorizado_view').on('click', evtbtnAutorizar);
    $('.modalBuscar_view').on('click', evtbtnBuscar);
    $('.modalRechazo_view').on('click', evtCancelarEvento);
    $('.accordion > dt').on('click', evtClickdt);
    $('.btnA.simplemodal-close').on('click', evtCancelarEvento);

}

function VentanaEmergente(sucursales) {
    console.log('IndexSucursales:' + sucursales);

    $('.tblModal > tbody tr').remove();

    $('.simplemodal-close.btnCerrar').show();
    $('.tblModal').append(
        '<tr><td class="txtModal"> Sucursales: <br><br></tr>' +
        '<tr><td id="infoSuc" class="txtModal" style="word-break:break-all;" width=800>' + sucursales + '<br><br></tr>'
    );

    $('#modalAutorizado').modal({
        focus: true,
        persist: true,
    });

    $(this).parent().parent().addClass("autorizado");
    return false;

}


function evtCancelarEvento() {
    $('.tblModal > tbody tr').remove();

    let fiEventoId = parseInt($(this).siblings('.infoSimulacion').children('.folioSimulacion').text());
    var eventoSele = JSONEventosP.find(evento => {
        return evento.ficonsec == fiEventoId;
    });
    ObjCancelar = {
        ficonsec: eventoSele.ficonsec,
        fcDescEvento: eventoSele.fcDescEvento,
        fcdeslarga: eventoSele.fcdeslarga,
        fipais: eventoSele.fipais,
        fcdesstatus: eventoSele.fcdesstatus,
        fcDecEvenTipo: eventoSele.fcDecEvenTipo,
        fcNombre: eventoSele.fcNombre,
        fcDecEven: eventoSele.fcDecEven,
        variable: (eventoSele.variable == "") ? "1" : eventoSele.variable,
        user: idEmpleadoLogin.toString(),

    }
    cancelarEventos(ObjCancelar)
    console.log("ObjCancelar => ", ObjCancelar)


    ModalAutorizar = $('#modalAutorizado').modal();
    $(this).parent().parent().addClass("rechazado");
    $('.verSubmenu').next().addClass('ver');
    return false;

}

function evtbtnRechazarModal() {
    var validacion;
    fiSimulacionIdGlobal = $(this).siblings('.infoSimulacion').children('.folioSimulacion').text();
    $('.simplemodal-close.btnCerrar').show();
    var modalRechazo = $('#modalRechazo').modal({
        onClose: () => {
            validacion = validaciones();
            //if (validacion == true) {
                valorMotvio = $("#MotivoRechazo").val();
                console.log(valorMotvio);
                modalRechazo.close();
           // }
        }
    });



    $(this).parent().parent().addClass("rechazado");
    $('.verSubmenu').next().addClass('ver');
    return false;

}

function evtbtnAutorizar() {

   $('.tblModal > tbody tr').remove();

    let fiEventoId = parseInt( $(this).siblings('.infoSimulacion').children('.folioSimulacion').text());
    var eventoSele = JSONEventosP.find(evento => {
        return evento.ficonsec == fiEventoId;
    });
    ObjAutoriza = {
        ficonsec: eventoSele.ficonsec,
        fcDescEvento: eventoSele.fcDescEvento,
        fcdeslarga: eventoSele.fcdeslarga,
        fipais: eventoSele.fipais,
        fcdesstatus: eventoSele.fcdesstatus,
        fcDecEvenTipo: eventoSele.fcDecEvenTipo,
        fcNombre: eventoSele.fcNombre,
        fcDecEven: eventoSele.fcDecEven,
        variable: (eventoSele.variable == "") ?"1"  : eventoSele.variable,
        user: idEmpleadoLogin.toString(),

    }
    autorizarEventos(ObjAutoriza)
    console.log("ObjCorreo => ", ObjAutoriza)
  

    ModalAutorizar = $('#modalAutorizado').modal();
    $(this).parent().parent().addClass("autorizado");
    return false;
}


function consultaServicioAE(url, data, metodo, isJson, valorContentType) {
    return new Promise((resolve, reject) => {
        let header = new Headers();
        header.append("Content-Type", valorContentType);
        let request;
        switch (metodo) {
            case 'GET':
                request = new Request(url, {
                    method: metodo,
                    header: header,
                    signal: signalLogin,
                });
                break;
            case 'POST':
                request = new Request(url, {
                    method: metodo,
                    headers: header,
                    body: data,
                    signal: signalLogin,
                })
                break;
            default:
                break;
        }
        $("#cargando").show();
        fetch(request)
            .then(function (data) {
                $("#cargando").hide();
                if (data.status == 404 || (data.status >= 400 && data.status <= 499)) {
                    console.log(data);
                } else if (data.status >= 500) {
                    console.log(data);
                } else {
                    resolve(data);
                }
            })
            .catch(error => {
                $("#cargando").hide();
                console.log("Error: " + error);
                reject(error);
            });
    });
}

function evtClickdt() {
    $this = $(this);
    //the target panel content
    $target = $this.next();


    jQuery('.accordion > dt').removeClass('accordion-active');
    if ($target.hasClass("in")) {
        $this.removeClass('accordion-active');
        $target.slideUp();
        $target.removeClass("in");

    } else {
        $this.addClass('accordion-active');
        jQuery('.accordion > dd').removeClass("in");
        $target.addClass("in");
        $(".subSeccion").show();
        console.log("1");

        jQuery('.accordion > dd').slideUp();
        $target.slideDown();
        $('.accordion > dd').css("border-botton", "#ff0000");
    }
};

function validaciones() {

    jQuery.validator.setDefaults({
        rules: {
            MotivoRechazo: {
                required: true,
                maxlength: 1000
            }
        },
        messages: {
            MotivoRechazo: {
                required: "Ingresa un motivo de rechazo",
                maxlength: "El rechazo no puede ser mayor a 1000 caracteres"
            }
        }
    });

    var form = $("#modalRechazoForm");
    form.validate();

    return form.valid();

}


function obtStatusEven() {
    limpiarCombo("idCompStatus");

    var idStatus;
    var strDescStatus;

    var data = servicesCallMethod(urlCatalogos + 'getStatusEvento', null, POST, true).then(objJson => {
        objJson.json().then(objSM => {
            var select = document.getElementById("idCompStatus");

         

            $.each(objSM.respuesta, function (key, value) {

                    idStatus = value.fistatus;
                    strDescStatus = value.fcdesstatus;

                    var option = document.createElement("option");
                var varDescOpction = document.createTextNode(strDescStatus);
                    option.appendChild(varDescOpction);
                option.setAttribute("value", idStatus);
                    select.appendChild(option);
               

            });
            if (ObjStatus != undefined) {
                ObjStatus.dispose();
            }
            ObjStatus = new Dropkick("#idCompStatus");
            ObjStatus.refresh();
        });
    });
}

function obtUsuariosEven() {
    limpiarCombo("idCompUsuario");

    var idUsuario;
    var strDescUsuario;

    var data = servicesCallMethod(urlCatalogos + 'getUsers', null, POST, true).then(objJson => {
        objJson.json().then(objSM => {
            var select = document.getElementById("idCompUsuario");



            $.each(objSM.respuesta, function (key, value) {

                idUsuario = value.fiUsr;
                strDescUsuario = value.fcNombre;

                var option = document.createElement("option");
                var varDescOpction = document.createTextNode(strDescUsuario);
                option.appendChild(varDescOpction);
                option.setAttribute("value", idUsuario);
                select.appendChild(option);


            });
            if (ObjUsuarios != undefined) {
                ObjUsuarios.dispose();
            }
            ObjUsuarios = new Dropkick("#idCompUsuario");
            ObjUsuarios.refresh();
        });
    });
}


function obtTipoEven() {
    limpiarCombo("idCompTipoEven");

    var idTipoEven;
    var strDescTipoEven;

    var data = servicesCallMethod(urlCatalogos + 'getEvenTipo', null, POST, true).then(objJson => {
        objJson.json().then(objSM => {
            var select = document.getElementById("idCompTipoEven");



            $.each(objSM.respuesta, function (key, value) {
                if (value.fiEventTipo != 2) {
                    idTipoEven = value.fiEventTipo;
                    strDescTipoEven = value.fcDecEventoTipo;

                    var option = document.createElement("option");
                    var varDescOpction = document.createTextNode(strDescTipoEven);
                    option.appendChild(varDescOpction);
                    option.setAttribute("value", idTipoEven);
                    select.appendChild(option);


                }
                
            });
            if (ObjTipoEnvio != undefined) {
                ObjTipoEnvio.dispose();
            }
            ObjTipoEnvio = new Dropkick("#idCompTipoEven");
            ObjTipoEnvio.refresh();
        });
    });
}

function obtOdenamiento() {
    limpiarCombo("idCompTipoOrdena");

    var idFiltro;
    var strDescFiltro;

    var data = servicesCallMethod(urlCatalogos + 'getFiltroAutori', null, POST, true).then(objJson => {
        objJson.json().then(objSM => {
            var select = document.getElementById("idCompTipoOrdena");

            /*var option = document.createElement("option");
            var varDescOpction = document.createTextNode("Selecciona Ordenamiento");
            option.appendChild(varDescOpction);
            option.setAttribute("value", 0);
            select.appendChild(option);*/

            $.each(objSM.respuesta, function (key, value) {

                if (value.id != 1) {
                    idFiltro = value.id;
                    strDescFiltro = value.tipo;

                    var option = document.createElement("option");
                    var varDescOpction = document.createTextNode(strDescFiltro);
                    option.appendChild(varDescOpction);
                    option.setAttribute("value", idFiltro);
                    select.appendChild(option);
                }

            });
            if (ObjOrdena != undefined) {
                ObjOrdena.dispose();
            }
            ObjOrdena = new Dropkick("#idCompTipoOrdena");
            ObjOrdena.refresh();
        });
    });
}





function tipoOrdenamiento(even) {
    console.log("Tipo de ordenamiento");
    var _tipoOrdena = $('#idCompTipoOrdena').val();
    switch (_tipoOrdena) {
        case "0":
            $('#idUsuarios').hide();
            $('#idTipoEvento').hide(); 
            $('#idRango').hide(); 
            todosEventos();
            break;
        
        case "2":
            $('#idRango').show(); 
            $('#idUsuarios').hide();
            $('#idTipoEvento').hide();
            break;
        case "3":
            $('#idUsuarios').show();
            $('#idTipoEvento').hide();
            $('#idRango').hide(); 
            obtUsuariosEven();
            consultaEventosUsr();
            break;
        case "4":
            $('#idTipoEvento').show();
            $('#idUsuarios').hide();
            $('#idRango').hide(); 
            obtTipoEven();
            break;
    }
}


function evtbtnBuscar() {
    var valFechaInicio = $('#filter-date').val();
    var valFechaFin = $('#filter-date1').val();
    console.log("Sevicio por fecha: ", valFechaInicio, " Final : ", valFechaFin);
    if (valFechaInicio == "" || valFechaFin == "") {
        mostrarModalMensaje(1, "La fecha inicio y fecha Fin son necesarias");
    } else {
        var valFechaInicio = $('#filter-date').val();
        var valFechaFin = $('#filter-date1').val();

        var fechI = valFechaInicio.split("/");
        var diaI = fechI[2].split(" ");
        var fechF = valFechaFin.split("/");
        var diaF = fechF[2].split(" ");
        fechI.push(diaI[0]);
        fechF.push(diaF[0]);
        var fechaInicio = fechI[1] + "/" + fechI[3] + "/" + fechI[0];
        var fechaFin = fechF[1] + "/" + fechF[3] + "/" + fechF[0];
        var _jsonEntrada = {
            "statusEvento": (($("#idCompStatus").val() == null) ? 0 : parseInt($("#idCompStatus").val())),
            "fechaInicio": fechaInicio,
            "fechaFin": fechaFin,
            "proceso": 4
        }
        console.log("_jsonEntrada Fecha: ", _jsonEntrada);
        consultaEventos(_jsonEntrada);

    }

        
    
    return false;
}

function validaFechasMenoresMayores() {
    try {
        var valFechaInicio = $('#filter-date').val();
        var valFechaFin = $('#filter-date1').val();

        var fechI = valFechaInicio.split("/");
        var diaI = fechI[2].split(" ");
        var fechF = valFechaFin.split("/");
        var diaF = fechF[2].split(" ");

        fechI.push(diaI[0]);
        fechF.push(diaF[0]);

        var fechaInicio = fechI[1] + "-" + fechI[3] + "-" + fechI[0];
        var fechaFin = fechF[1] + "-" + fechF[3] + "-" + fechF[0];

        if (Date.parse(fechaInicio) > Date.parse(fechaFin)) {

            mostrarModalMensaje(1, "La fecha inicio no puede ser mayor a la fecha final");
            $('#filter-date1').val("");

            return false;
        }
    } catch (e) {
        return false;
    }
   

    return true;
}

function mostrarModalMensaje(tipo, mensaje, complementoI, complementoII, complementoIII) {

    let modalMsje;

    switch (tipo) {
        case 1:
            $('.txtMdNotificaciones ').html(mensaje);

            if (complementoI != undefined) {
                $('.txtMsjeII ').html('<strong> ' + complementoI + ' </strong>');
            } else if (complementoII != undefined) {
                $('.txtMsjeIII ').html(complementoII);
            } else {
                $('.txtMsjeII ').html('<strong> ' + " " + ' </strong>');
                $('.txtMsjeIII ').html(" ");
            }
            modalMsje = $('#modalNotificaciones').modal({
                focus: true,
                persist: true,
                onClose: () => {
                    if (intObjTemporalOnFocus) {
                        $canfocus = $(':focusable');
                        $canfocus.eq(intObjTemporalOnFocus).focus();
                    }
                    modalMsje.close();
                }
            });
            break;
        case 2:
            $('.txtMsjeTbl ').html(mensaje);
            modalMsje = $('#modalNotificacionTabla').modal({
                focus: true,
                persist: true,
                onClose: () => {
                    modalMsje.close();
                }
            });
            break;
        case 3:
            $('.txtMsjeSucI').html(mensaje);
            $('.txtMsjeSuc').html(complementoI);
            modalMsje = $('#modalNotificacionSucursales').modal({
                focus: true,
                persist: true,
                onClose: () => {
                    modalMsje.close();
                }
            });
            break;
        case 4:
            $('.txtModal').html(mensaje);
            $('.txtMd').html('<strong> ' + complementoI + ' </strong>');
            $('.txtModalC').html(complementoII);
            $('.txtCh1').html(complementoIII);
            modalMsje = $('#modalGuardar').modal({
                focus: true,
                persist: true,
                onClose: () => {
                    window.location.replace(hrefIndex);
                }
            });
            break;
        case 5:
            $('.txtModal').html(mensaje);

            modalMsje = $('#modalGuardar').modal({
                focus: true,
                persist: true,
                onClose: () => {
                    window.location.replace(hrefAutorizaP);
                }
            });
            break;
    }
}

function filtrosBusqueda() {
   

}
function consultaEventosUsr() {

    console.log("Eventos por usuarios ");
    var usuarioId = (($("#idCompUsuario").val() == null) ? 0 : parseInt($("#idCompUsuario").val()));
    if (usuarioId != 0) {
        var _jsonEntrada = {

            "statusEvento": (($("#idCompStatus").val() == null) ? 0 : parseInt($("#idCompStatus").val())),
            "idUsuarios": usuarioId,
            "proceso": 3
        }
        console.log("_jsonEntrada: ", _jsonEntrada);
        consultaEventos(_jsonEntrada);
    }
 

}
function consultaEventosTipo() {

    console.log("Eventos por Tipo de evento ");
    var eventoId = (($("#idCompTipoEven").val() == null) ? 3 : parseInt($("#idCompTipoEven").val()));
    if (eventoId != 3) {
        var _jsonEntrada = {

            "statusEvento": (($("#idCompStatus").val() == null) ? 0 : parseInt($("#idCompStatus").val())),
            "idTipoEnvio": eventoId,
            "proceso": 2
        }
        console.log("_jsonEntrada: ", _jsonEntrada);
        consultaEventos(_jsonEntrada);
    }


}
function todosEventos() {
    $('#idUsuarios').hide();
    $('#idTipoEvento').hide();
    $('#idRango').hide(); 
    var _jsonEntrada = {

        "statusEvento": (($("#idCompStatus").val() == null) ? 0 : parseInt($("#idCompStatus").val())),
        "proceso": 1
    }
    console.log("_jsonEntrada: ", _jsonEntrada);
    consultaEventos(_jsonEntrada);
}

function autorizarEventos(_jsonPeticion) {
       $('.simplemodal-close.btnCerrar').hide();
            $('.tblModal').append(
                '<tr><td class="txtModal"> Evento Autorizado <br><br></tr>' +
                '<tr><td class="txtModal"> Proceso Envio a Central de Descargas esto podría demorar algunos minutos: <br><br></tr>' +
                '<tr><td class="txtModal"><img src="/SimuladorAbonos/img/cargando.gif"><br><br></tr>'
            );
    let uriVariablesId = "";
    var metodo = "autorizaEvento";
    var nuri = urlEventosP.replace("GeneraEvento", "AutorizaEvento")
    uriVariablesId = `${nuri}/${metodo}`;
    var data = servicesCallMethod(uriVariablesId, JSON.stringify(_jsonPeticion), POST, true).then(objJson => {
        objJson.json().then(objSM => {

            var respuesta = objSM.respuesta;
            if (respuesta.length > 0) {

                ModalAutorizar.close();
                $('.tblModal > tbody tr').remove();
                $(".simplemodal-close").show();
                $('.tblModal').append(
                    '<tr><td class="txtModal" style="color: #000000; font-size:16px;"> <strong> Evento Procesado y Enviado Correctamente. </strong> </tr>'
                );
                $('.tblModal').append(
                    '<tr><td class="txtModal" style="color: #000000; font-size:16px;"> <strong>'+ respuesta[0]+'</strong></tr>'
                ).append(
                    '<tr><td class="txtModal" style="color: #000000; font-size:16px;"> <strong> '+respuesta[1]+'</strong> </tr>'
                ).append(
                    '<tr><td class="txtModal" style="color: #000000; font-size:16px;"> <strong> ' + respuesta[2] + '</strong> </tr>'
                ).append(
                    '<tr><td class="txtModal" style="color: #000000; font-size:16px;"> <strong> ' + respuesta[3] + '</strong> </tr>'
                ).append(
                    '<tr><td class="txtModal" style="color: #000000; font-size:16px;"> <strong> ' + respuesta[4] + '</strong> </tr>'
                ).append(
                    '<tr><td class="txtModal" style="color: #000000; font-size:16px;"> <strong> ' + respuesta[5] + '</strong> </tr>'
                ).append(
                    '<tr><td class="txtModal" style="color: #000000; font-size:16px;"> <strong> ' + respuesta[6] + '</strong> </tr>'
                );


                $('#modalAutorizado').modal({
                    focus: true,
                    persist: true,
                    onClose: () => {
                        window.location.replace(hrefAutorizaP);
                    }
                });
              
//                mostrarModalMensaje(5, "Evento Autorizado con exito \n" + respuesta[0]);
            }



        });

    });
}

function cancelarEventos(_jsonPeticion) {
    $('.simplemodal-close.btnCerrar').hide();
    $('.tblModal').append(
        '<tr><td class="txtModal"> Cancelando Evento. <br><br></tr>' +
        '<tr><td class="txtModal"><img src="/SimuladorAbonos/img/cargando.gif"><br><br></tr>'
    );
    let uriVariablesId = "";
    var metodo = "cancelaEvento";
    var nuri = urlEventosP.replace("GeneraEvento", "AutorizaEvento")
    uriVariablesId = `${nuri}/${metodo}`;
    var data = servicesCallMethod(uriVariablesId, JSON.stringify(_jsonPeticion), POST, true).then(objJson => {
        objJson.json().then(objSM => {

            var respuesta = objSM.respuesta;
            if (respuesta.length > 0) {

                ModalAutorizar.close();
                $('.tblModal > tbody tr').remove();
                $(".simplemodal-close").show();
                $('.tblModal').append(
                    '<tr><td class="txtModal" style="color: #000000; font-size:16px;"> <strong> ' + respuesta+' </strong> </tr>'
                );

                $('#modalAutorizado').modal({
                    focus: true,
                    persist: true,
                    onClose: () => {
                        window.location.replace(hrefAutorizaP);
                    }
                });

                //                mostrarModalMensaje(5, "Evento Autorizado con exito \n" + respuesta[0]);
            }



        });

    });
}


function consultaEventos(_jsonEntrada) {
   

    modalFirmasPendientes = $('#modalAutorizado').modal({
        focus: true,
        persist: true
    });

    var metodo = "AutorizaEvento/api/getFoliosEvento";
    var cadenaSpl = urlEventosP.split("GeneraEvento/api");


    let uriVariablesId = "";

    uriVariablesId = `${cadenaSpl[0]}${metodo}`;
    console.log("Values: ",$("#idCompStatus").val())
   
    console.log("_jsonEntrada: ", _jsonEntrada)
    let dl1 = document.getElementsByClassName('accordion');
    dl1[0].innerText = "";

    var texto = document.getElementById("statusEvento");
    switch ((($("#idCompStatus").val() == null) ? 0 : parseInt($("#idCompStatus").val()))) {
        case 0:
            texto.innerHTML = "Eventos Solicitados".bold().toUpperCase();
            break;
        case 1:
            texto.innerHTML = "Eventos Cancelados".bold().toUpperCase();
            break;
        case 2:
            texto.innerHTML = "Eventos Autorizados".bold().toUpperCase();
            break;
        case 3:
            texto.innerHTML = "Eventos Enviados".bold().toUpperCase();
            break;
        case 5:
            texto.innerHTML = "Eventos Procesandos".bold().toUpperCase();
            break;
        case 6:
            texto.innerHTML = "Eventos Por Autorizar".bold().toUpperCase();
            break;
    }
  

    consultaServicioAE(uriVariablesId, JSON.stringify(_jsonEntrada), POST, true, "application/json")
        .then(objJsonP => {
            switch (objJsonP.status) {
                case 200:
                    objJsonP.json().then(objFP => {
                        if (objFP.respuesta.eventosStatus.length > 0) {
                            printFrontFP(objFP.respuesta.eventosStatus);
                            modalFirmasPendientes.close();
                        }
                        else {
                            modalFirmasPendientes.close();
                           // $('.tblModal > tbody tr').remove();
                            //$('.simplemodal-close.btnCerrar').show();

                            /*$('.tblModal').append(
                                '<tr><td class="txtModal"> No se encontraron eventos... <br><br></tr>'
                            );*/
                        }

                    })
                    break;
                default:
                    break;
            }
        }).catch(error => {
            error.text()
                .then(objeto => {
                    if (objeto.length > 0) {
                        let jsonObjeto = JSON.parse(objeto);
                        Swal.fire({
                            icon: 'error',
                            title: 'Sistema de mercadeo de tasas',
                            text: `Estatus error: ${error.status},
                                Mensaje: ${jsonObjeto.errorMessage}`
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Sistema de mercadeo de tasas',
                            text: `Estatus error: ${error.status},
                                Texto estatus: ${error.statusText},
                                Recurso no encontrado o no disponible: ${error.url}`
                        });
                    }
                });
        });
}

