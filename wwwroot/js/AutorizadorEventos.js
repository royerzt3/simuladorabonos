var ObjCorreo = {};
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
let JSONFirmasPendientes = [];
var respuestaCorreo;
var fiSimulacionIdGlobal;
var valorMotvio;
let contenidoSucursal;
var ModalAutorizar;

function Principal() {
    var object = JSON.parse(localStorage.getItem('objectUsr'));
    datos = JSON.parse(object);

    consultaServicioAE(urlAutorizacion + "getFirmasPendientes?piUsuarioId=" + idUsrLogin, null, "GET", true, "application/json")
        .then(objJsonP => {
            switch (objJsonP.status) {
                case 200:
                    objJsonP.json().then(objFP => {
                        if (objFP.respuesta.lstRespuestaLeeFirmas.length > 0) {
                            printFrontFP(objFP.respuesta.lstRespuestaLeeFirmas);
                            modalFirmasPendientes.close();
                        }
                        else {
                            $('.tblModal > tbody tr').remove();
                            $('.simplemodal-close.btnCerrar').show();

                            $('.tblModal').append(
                                '<tr><td class="txtModal"> No Cuenta con Firmas Pendientes... <br><br></tr>'
                            );
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

function printFrontFP(objFP) {
    let dl = document.getElementsByClassName('accordion');
    console.log(objFP);
    objFP.forEach((element, index) => {
        JSONFirmasPendientes = objFP;


        let dt = document.createElement('dt');
        dl[0].appendChild(dt);
        let divAutorizador = document.createElement('div');
        divAutorizador.className = 'dtAutorizador';
        dt.appendChild(divAutorizador);
        let divEmpty = document.createElement('div');
        divEmpty.className = 'infoSimulacion';
        divAutorizador.appendChild(divEmpty);
        let divfcDescripcion = document.createElement('div');
        let contenidoDescripcion = document.createTextNode(element.fcDescripcion);
        divfcDescripcion.appendChild(contenidoDescripcion);
        divEmpty.appendChild(divfcDescripcion);
        let divfiSimulacion = document.createElement('div');
        divfiSimulacion.className = 'folioSimulacion';
        let contenidodivfiSimulacion = document.createTextNode(element.fiSimulacion);
        divfiSimulacion.appendChild(contenidodivfiSimulacion);
        divEmpty.appendChild(divfiSimulacion);
        let divLigaBtnAutorizar = document.createElement('div');
        divLigaBtnAutorizar.className = 'ligaA modalAutorizado_view';
        divLigaBtnAutorizar.id = "indiceBtnAutorizar" + index;
        divLigaBtnAutorizar.innerText = 'Autorizar';
        divAutorizador.appendChild(divLigaBtnAutorizar);
        let divLigaBtnRechazar = document.createElement('div');
        divLigaBtnRechazar.className = 'ligaR modalRechazo_view';
        divLigaBtnRechazar.innerText = 'Rechazar';
        divLigaBtnRechazar.id = "indiceBtnRechazar" + index;
        divAutorizador.appendChild(divLigaBtnRechazar);

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
        divCol1.className = 'col1';
        divCol.appendChild(divCol1);
        let strongEmpty = document.createElement('strong');
        strongEmpty.innerText = 'Justificación:';
        divCol1.appendChild(strongEmpty);
        let brEmpty = document.createElement('br');
        divCol1.appendChild(brEmpty);

        let contenidoJustificacion = document.createTextNode(element.infoSimulaciones.fcJustificacion);
        let divrespuesta = document.createElement('div');
        divrespuesta.className = 'respuesta';
        //divrespuesta.innerText = 'Ejemplo de una justificación medianamente larga'; 
        divrespuesta.appendChild(contenidoJustificacion);
        divCol1.appendChild(divrespuesta);
        let divCol3 = document.createElement('div');
        divCol3.className = 'col3';
        divCol.appendChild(divCol3);
        let strongEmpty1 = document.createElement('strong');
        strongEmpty1.innerText = 'Fecha Inicio:';
        divCol3.appendChild(strongEmpty1);
        let brEmpty1 = document.createElement('br');
        divCol3.appendChild(brEmpty1);
        //
        let contenidoFechaInicio = document.createTextNode(element.infoSimulaciones.fdFechaIni);
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
        let contenidoFechaFin = document.createTextNode(element.infoSimulaciones.fdFechaFin);
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
        let contenidoTipoEnvio = document.createTextNode(element.infoSimulaciones.fcTipoEnvio);
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
        strongEmpty5.innerText = 'Archivos de justificación:';
        divCol8.appendChild(strongEmpty5);
        let brEmpty5 = document.createElement('br');
        divCol8.appendChild(brEmpty5);
        let divCol9 = document.createElement('div');
        divCol9.className = 'archivo ';
        divCol8.appendChild(divCol9);

        let divCol10 = document.createElement('div');
        divCol9.appendChild(divCol10);
        let img = document.createElement('img');
        img.src = '/SimuladorAbonos/img/icoAdjuntar1.svg';
        img.className = 'icoAdjuntar';
        divCol10.appendChild(img);
        //

        let anclaAnexo = document.createElement('a');
        anclaAnexo.target = "_blank";
        anclaAnexo.href = element.infoSimulaciones.fcArchivo;
        //anclaAnexo.href = 'data:image/png;base64,' + element.infoSimulaciones.fcArchivo;
        //anclaAnexo.download = 'Anexo.png';
        anclaAnexo.innerText = 'Anexo';  
        let divCol11 = document.createElement('div');
        divCol11.appendChild(anclaAnexo);
        divCol9.appendChild(divCol11);


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
        let contenidoSuc = document.createTextNode(element.infoSimulaciones.fiSucursalId)
        inputSuc.appendChild(contenidoSuc);
        divCol13.appendChild(inputSuc);


        contenidoSucursal = document.createTextNode(element.infoSimulaciones.fiSucursalId);
        let ancla = document.createElement('a');
        ancla.href = '#';
        ancla.className = 'sucursal';
        ancla.id = index;
        ancla.innerText = 'Detalle Sucursales';

        console.log('Sucursales:' + $('#idSucursales').text());

        divCol13.appendChild(ancla);


    });



    $('.sucursal').click(function () {

        var TotalSucursales = $('#idSucursales' + $(this).attr('id')).text();
        VentanaEmergente(TotalSucursales);

    });




    $('.accordion > dd').hide();
    $('.modalAutorizado_view').on('click', evtbtnAutorizar);
    $('.modalRechazo_view').on('click', evtbtnRechazarModal);
    $('.accordion > dt').on('click', evtClickdt);
    $('.btnA.simplemodal-close').on('click', evtRechazarEvento);

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

function GeneraCadena(ObjCorreo, simluacion, Accion) {

    consultaServicioAE(urlEnvioCorreo +"ValidaCadenas/ValidaParametrosC", JSON.stringify(ObjCorreo), "POST", true, "application/json")
        .then(objJsonP => {
            switch (objJsonP.status) {
                case 200:
                    objJsonP.json().then(objFP => {
                        if (objFP.cadena != null) {

                            urlCadena = objFP.cadena;

                            armaPeticionAutoRecha(simluacion, Accion);

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

function EnvioCorreo(ObjAutoRecha) {

    consultaServicioAE(urlEnvioCorreo +"AutoRecha/SeguimientoFolioFront", JSON.stringify(ObjAutoRecha), "POST", true, "application/json")
        .then(objJsonP => {
            switch (objJsonP.status) {
                case 200:
                    objJsonP.json().then(objFP => {
                        if (objFP.mensaje != null) {

                            respuestaCorreo = objFP.mensaje;
                            console.log(respuestaCorreo);


                            if (objFP.error == false) {

                                if (ObjAutoRecha.Accion == 3) {

                                    ModalAutorizar.close();

                                    $('.tblModal').append(
                                        ' <a href="#"  class="simplemodal-close btnCerrar"><img src="/SimuladorAbonos/img/icoCerrar.svg"></a>'+
                                    '<tr><td class="txtModal" style="color: #000000; font-size:20px;"> <strong> Evento Procesado y Enviado Correctamente. </strong><br><br></tr>'
                                );

                                    $('#modalAutorizado').modal({
                                        focus: true,
                                        persist: true,
                                        onClose: () => {
                                            window.location.replace(hrefAutorizador);
                                        }
                                    });
                                }
                                else {
                                    $('.tblModal > tbody tr').remove();
                                    $('.tblModal').append(
                                        '<tr><td class="txtModal"> Evento Cancelado Correctamente. <br><br></tr>'
                                    );

                                    $('#modalAutorizado').modal({
                                        focus: true,
                                        persist: true,
                                        onClose: () => {
                                            window.location.replace(hrefAutorizador);
                                        }
                                    });
                                }

                            }



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

function evtRechazarEvento() {
  //  $("#btnCancelar").attr("href", pathProyecto);
    var Accion = 4
    var simluacion = JSONFirmasPendientes.find(simulacion => {
        return simulacion.fiSimulacion == fiSimulacionIdGlobal;
    });


    ObjCorreo = {
        Usuario: simluacion.fiEmpleado,
        Folio: simluacion.fiSimulacion.toString(),
        TipoEnvio: simluacion.infoSimulaciones.fcTipoEnvio,
        FechaInicio: simluacion.infoSimulaciones.fdFechaIni,
        FechaFin: simluacion.infoSimulaciones.fdFechaFin,
        Solicitud: simluacion.fiSolicitud,
    }

    GeneraCadena(ObjCorreo, simluacion, Accion);

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

    var Accion = 3;

    let fiSimulacionId = $(this).siblings('.infoSimulacion').children('.folioSimulacion').text();
    var simluacion = JSONFirmasPendientes.find(simulacion => {
        return simulacion.fiSimulacion == fiSimulacionId;
    });

    ObjCorreo = {
        Usuario: simluacion.fiEmpleado,
        Folio: simluacion.fiSimulacion.toString(),
        TipoEnvio: simluacion.infoSimulaciones.fcTipoEnvio,
        FechaInicio: simluacion.infoSimulaciones.fdFechaIni,
        FechaFin: simluacion.infoSimulaciones.fdFechaFin,
        Solicitud: simluacion.fiSolicitud,
    }

    GeneraCadena(ObjCorreo, simluacion, Accion);


    ModalAutorizar = $('#modalAutorizado').modal();
    $(this).parent().parent().addClass("autorizado");
    return false;
}

function armaPeticionAutoRecha(simluacion, Accion) {

    if (Accion == 3) {

        ObjAutoRecha = {
            Cadena: urlCadena,
            Descripcion: simluacion.fcDescripcion,
            SUCURSALES: simluacion.infoSimulaciones.fiSucursalId,
            MotivoRechazo: "",
            Accion: Accion,
            Usuario: simluacion.fiusuarioId,
        }
        console.log(ObjAutoRecha);

        if (perfil == 3) {                                        // USUARIO OPERACIONES (Solo Autoriza)
            $('.simplemodal-close.btnCerrar').hide();
            $('.tblModal').append(
                '<tr><td class="txtModal"> Evento Autorizado <br><br></tr>' +
                '<tr><td class="txtModal"> Proceso Envio a Central de Descargas esto podría demorar algunos minutos: <br><br></tr>' +
                '<tr><td class="txtModal"><img src="/SimuladorAbonos/img/cargando.gif"><br><br></tr>'
            );
        }
        else if (ObjAutoRecha.Accion == 3) {                                      //btnAutorizar                                               
            $('.tblModal').append(
                '<tr><td class="txtModal"> Evento Autorizado <br><br></tr>'
            );

        }

        EnvioCorreo(ObjAutoRecha);


    }
    else {

        PeticionJSON =
            {
                Cadena: urlCadena,
                Descripcion: simluacion.fcDescripcion,
                SUCURSALES: simluacion.infoSimulaciones.fiSucursalId,
                MotivoRechazo: valorMotvio,
                Accion: Accion,
                Usuario: simluacion.fiusuarioId,
            }


        if (PeticionJSON.MotivoRechazo == "") {

            alert('DEBES INGRESAR UN MOTIVO DEL RECHAZO');
            return false;

        }

        console.log(PeticionJSON);
        EnvioCorreo(PeticionJSON);


    }
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
                    console.log(data);
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










