let strValorPropuesto = null;
let strInput;
const POST = "POST";
const GET = "GET";
const strMercadeoAbono = "3";
const strMercadeoTasa = "2";
const strIdPrestamosProd = "4";
let strfiUsusarioId = "FiUsuarioId";
let strIdConsumoProd = "1";
let strDescfamiliaConsumo = "C";
const intPaisID = 2;
const strVigencia = "0";
let strIdUsuario;
let blnConfirmacion;
let regex = /^[0-9,$]*$/;
let objFamiliaId;
let LstObjProductoFamilia;
let strCadenaSkus;
let ProductoID;
let $canfocus;
let indexFocusGeneral;
let intObjTemporalOnFocus;
let modalMsje;
let LstMsjExcepcion;
let intIdTipoProducto;
let intIdCanal;
let strIdTipoCliente;
let intIdTipoMercadeo;
//SecCión 4 Enviar Evento
let strRutaImgJustificacion = "";
let strIdCanal;
let strTipoTienda;
let lstSucursales;
let strIntersectsucursales;
let strExceptSucursales;
let strTipoCargaSucursal;
let strSucursales;
let blnCargaCorrecta;
let requestSM;
let listaSku = [];

let _strDescProducto;
let objProductoASimular = [];
let objIdProductoASimular = [];
let _intPrimerProducto = 0;
let _intIdCanal;
let _intIdTipoTienda;
let _intTipoMercadeo = 0;
let _strIdFamilia;
let _intIdPeriodo;

let ObjCliente = undefined;
var ObjSelectProducto = undefined;
var ObjSelect = undefined;
var ObjProducto = undefined;


var objSimulacion = [];
var GrupoCanal = null;
var _strIdProducto = null;
var idAleatorioFamilia = null;


//Nuevos Datos 
var ObjPaises = undefined;
var ObjTiposCl = undefined;
var objPeridos = undefined;
var objPromos = undefined;
var ObjTipoEnvio = undefined;
var _strIdPaises = null;
var _strIdTipoCliente = null;
var _strIdPeriodo = null;
var _strIdPromocion = null;

var _strTitulo = null;
var _strFechaInicio = null;
var _strFechaFin = null;
var _strIdTipoEnvio = null;
var _strIdListaSuc = null;
var _jsonDatosExcel = null;
//End Nuevos Datos 




jQuery.extend(jQuery.expr[':'], {
    focusable: function (el, index, selector) {
        return $(el).is('input[tabindex]');
    }
});


function eventoPrestPrincipal() {


    console.log("Prestamos personales")
    //Mios
    $('#idBtnDatosComplem').hide();
    $('#idGuardarEvent').hide();
    $('#archivoTasas').hide();
    //
    $('#divRadioBtnCategoria').hide();
    $('#idTextAreaCargaSucursales').hide();
    $('#idSelectTerritorio').hide();
    $('#idTextAreaViewTerritorioSucursales').hide();
    $('#rdSeleccionTerritorio').prop("disabled", true);
    //$('#idOpcionesCargaSucursal').hide();
    $.datetimepicker.setLocale('es');

    $("#filter-date, #filter-date1").datetimepicker({
        timepicker: false,
        minDate: "-0D"
    });

    $("#filter-date1").on('change', function () {
        validaFechasMenoresMayores();
    });

    $(".pane-hScroll-Skus").scroll(function () {
        $(".pane-vScroll-Skus").width($(".pane-hScroll-Skus").width() + $(".pane-hScroll-Skus").scrollLeft());
    });

    $(".pane-hScroll-SM").scroll(function () {
        $(".pane-vScroll-SM").width($(".pane-hScroll-SM").width() + $(".pane-hScroll-SM").scrollLeft());
    });


    $("#idBtnSalir").click(function () {

        window.location.replace(hrefTasa);
    })


    var objUsuario = JSON.parse(localStorage.getItem('objectUsr'));
    var usuarioInfo = JSON.parse(objUsuario);
    console.log(usuarioInfo);

    var objTipoProducto = [];
    var lstFamiliaId = usuarioInfo.LstUsuarioFamilia;

    $.each(usuarioInfo.InformacionUsuario, function (key, value) {
        if (key == strfiUsusarioId) {
            strIdUsuario = value;
        }
    });


    $.each(lstFamiliaId, function (key, value) {
        objTipoProducto.push(value.fiTipoProductoId);
        GrupoCanal = value.fiGrupoCanalId;
    });

    ProductoID = [];
    objFamiliaId = [];
    var objAgrupador = [];
    objTipoProducto.map(id => {
        if (!(id in objAgrupador)) {
            objAgrupador[id] = true
            ProductoID.push(id)
        }
    })

    LstObjProductoFamilia = [];
    var tempID;
    var idTipoProducto;
    var familiaID;
    $.each(lstFamiliaId, function (key, value) {
        idTipoProducto = value.fiTipoProductoId;
        familiaID = value.fiFamiliaId;
        $.each(ProductoID, function (key, value) {
            if (idTipoProducto == value) {
                if (tempID == idTipoProducto) {
                    var indexProd = LstObjProductoFamilia.find(x => x.TipoProducto === idTipoProducto);
                    LstObjProductoFamilia[LstObjProductoFamilia.indexOf(indexProd)].TipoFamilia.push(familiaID);
                } else {
                    objFamiliaId = {
                        TipoProducto: idTipoProducto,
                        TipoFamilia: []
                    }
                    objFamiliaId.TipoFamilia.push(familiaID);
                    LstObjProductoFamilia.push(objFamiliaId);
                    tempID = value;
                }
            }
        })
    })

    console.log(JSON.stringify(LstObjProductoFamilia));
    console.log("ProductoId : " + ProductoID + " GrupoCanal: " + GrupoCanal);

    if (ProductoID.length >= 1) {
        _strIdProducto = ProductoID[0];
        callServicePaises();
        callServiceTipoEven();
        iniciarSelec();
    } else {
        mostrarModalMensaje(1, "La información del Usuario no se cargo correctamente");
    }


    $("#modalNotificaciones").hover(function () {
        this.focus();
    }, function () {
        this.blur();
    }).keydown(function (e) {
    });

    //Obtiene el valor del combo TipoProducto para llenar el select de Familia
    $("#idCompPaises").change(function () {
        _strIdPaises = $('#idCompPaises option:selected').attr('value');
        console.log("_strIdPaises : ", _strIdPaises);
        if (_strIdPaises != 0) {
            callServiceTipoCliente(_strIdPaises);
            callServicePeriodos(_strIdPaises);
            callServicePromociones(_strIdPaises);

        } else {

            iniciarSelec();



        }


    });

    function iniciarSelec() {
        limpiarCombo("idCompTipoDeCliente");
        var select = document.getElementById("idCompTipoDeCliente");

        var option = document.createElement("option");
        var varDescOpction = document.createTextNode("Selecciona tipo de cliente");
        option.appendChild(varDescOpction);
        option.setAttribute("value", 0);
        select.appendChild(option);
        if (ObjTiposCl != undefined) {
            ObjTiposCl.dispose();
        }
        ObjTiposCl = new Dropkick("#idCompTipoDeCliente");
        ObjTiposCl.refresh();


        limpiarCombo("idCompPeriodo");
        var select = document.getElementById("idCompPeriodo");

        var option = document.createElement("option");
        var varDescOpction = document.createTextNode("Selecciona perido");
        option.appendChild(varDescOpction);
        option.setAttribute("value", 0);
        select.appendChild(option);
        if (objPeridos != undefined) {
            objPeridos.dispose();
        }
        objPeridos = new Dropkick("#idCompPeriodo");
        objPeridos.refresh();

        limpiarCombo("idCompPromocion");
        var select = document.getElementById("idCompPromocion");

        var option = document.createElement("option");
        var varDescOpction = document.createTextNode("Selecciona promoción");
        option.appendChild(varDescOpction);
        option.setAttribute("value", 0);
        select.appendChild(option);

        if (objPromos != undefined) {
            objPromos.dispose();
        }
        objPromos = new Dropkick("#idCompPromocion");
        objPromos.refresh();

    }
    //Obtiene el valor del combo TipoProducto para llenar el select de Familia
    $("#idCompTipoProd").change(function () {
        _strIdProducto = $('#idCompTipoProd option:selected').attr('value');
        $("#tBSkus").empty();
        $("#checktodos").removeAttr("checked");
        callSelectTipoClte(parseInt(_strIdProducto));

    });
    $("#idBtnValidarDatosG").click(function () {
        _strIdPaises = $('#idCompPaises option:selected').attr('value');
        _strIdTipoCliente = $('#idCompTipoDeCliente option:selected').attr('value');
        _strIdPeriodo = $('#idCompPeriodo option:selected').attr('value');
        _strIdPromocion = $('#idCompPromocion option:selected').attr('value');
        if (_strIdPaises == 0)
            mostrarModalMensaje(1, "Es necesario seleccionar un país");
        else if (_strIdTipoCliente == 0)
            mostrarModalMensaje(1, "Es necesario seleccionar un tipo de cliente");
        else if (_strIdPeriodo == 0)
            mostrarModalMensaje(1, "Es necesario seleccionar un periodo");
        else if (_strIdPromocion == 0)
            mostrarModalMensaje(1, "Es necesario seleccionar una promocion");
        else {
            irAcordeon(6);
            $('#idBtnDatosComplem').show();
        }

    });
    $("#idBtnDatosComplem").click(function () {

        _strTitulo = $('#idTituloEvent').val();
        _strFechaInicio = $('#filter-date').val();
        _strFechaFin = $('#filter-date1').val();
        _strIdTipoEnvio = $('#idTipoEnvio option:selected').attr('value');
        _strIdListaSuc = $('#idPreviewSucursales').val();
        var _strIdListaSuc1 = $('#idCargaMSucursales').val();

        var _dtoSplit = _strIdListaSuc1.split(",");
        var _pocisi = 0;
        var _dtoSplit1 = _dtoSplit.filter(onlyUnique);
        _dtoSplit = _dtoSplit1;
        var _nCadenaSuc = "";
        if (_strIdListaSuc1 != "") {
            for (var i = 0; i < _dtoSplit.length; i++) {
                if (parseInt(_dtoSplit[i])) {
                    if (_dtoSplit[i].length >= 3) {
                        _nCadenaSuc += _dtoSplit[i];
                        _nCadenaSuc += ","
                    }

                }
            }
        }
        if (_nCadenaSuc.length > 0) {
            _nCadenaSuc = _nCadenaSuc.substring(0, _nCadenaSuc.length - 1)
        }
        $('#idCargaMSucursales').val(_nCadenaSuc)

        _strIdListaSuc1 = _nCadenaSuc;
        if (_strTitulo == "")
            mostrarModalMensaje(1, "Es necesario ingresar Titulo");
        else if (_strFechaInicio == "")
            mostrarModalMensaje(1, "Es necesario seleccionar una fecha inicio");
        else if (_strFechaFin == 0)
            mostrarModalMensaje(1, "Es necesario seleccionar una fecha final");
        else if (_strIdTipoEnvio == -1)
            mostrarModalMensaje(1, "Es necesario seleccionar un tipo de envio ");
        else if (((_strIdListaSuc == "" && _strIdListaSuc1 == "") || (_strIdListaSuc == undefined && _strIdListaSuc1 == undefined)) && _strIdTipoEnvio == 0)
            mostrarModalMensaje(1, "Es necesario ingresar sucursales");
        else {
            irAcordeon(7);
            $('#archivoTasas').show();
            //  $('#idGuardarEvent').show();
        }




    });
    //Elimina registro de la tabla Cotizacion
    $("table").on("click", ".eliminarF", function (event) {
        $(this).parents("tr").remove();
    });

    $("table").on("click", ".eliminarSku", function (event) {
        $(this).parents("tr").remove();
        $("#checktodos").removeAttr("checked");
    });



    $("#rdCargaArchivo, #rdSeleccionManual, #rdSeleccionTerritorio").change(function () {
        if ($("#rdCargaArchivo").is(":checked")) {
            $('#idTextAreaCargaSucursales').hide();
            $('#idSelectTerritorio').hide();
            $('#idTextAreaViewTerritorioSucursales').hide();
            $('#idTipoTiendas').parent().show();
            $("#idDivCargaSucursales").show();
            $("#idTextAreaViewSucursales").show();
            $('#idCargaMSucursales').val('');
        }
        else if ($("#rdSeleccionManual").is(":checked")) {
            $('#idTextAreaCargaSucursales').show();
            $('#idTipoTiendas').parent().show();
            $("#idDivCargaSucursales").hide();
            $('#idSelectTerritorio').hide();
            $('#idTextAreaViewTerritorioSucursales').hide();
            $("#idTextAreaViewSucursales").hide();

        }
        else if ($('#rdSeleccionTerritorio').is(":checked")) {
            $('#idTipoTiendas').parent().hide();
            $("#idDivCargaSucursales").hide();
            $("#idTextAreaViewSucursales").hide();
            $('#idTextAreaCargaSucursales').hide();
            $("#idSelectTerritorio").show();
            $('#idTextAreaViewTerritorioSucursales').show();
        }

    });
    //Regla de tipo de Envio
    $('#idTipoEnvio').change(function (e) {

        var _intIdTipoEnvio;
        _intIdTipoEnvio = $('#idTipoEnvio option:selected').attr('value');

        if (_intIdTipoEnvio == "1") {

            $('#idTipoTiendas').parent().hide();
            $("#idDivCargaSucursales").hide();
            $("#idTextAreaViewSucursales").hide();
            $('#idOpcionesCargaSucursal').hide();
            $('#idTextAreaCargaSucursales').hide();
            $('#idSelectTerritorio').hide();
            $('#idTextAreaViewTerritorioSucursales').hide();

        } else {

            $('#rdCargaArchivo').prop("checked", true);
            $('#idTipoTiendas').parent().show();
            $("#idDivCargaSucursales").show();
            $("#idTextAreaViewSucursales").show();
            $('#idOpcionesCargaSucursal').show();

        }
    });

    //Carga Archivo de Sucursales
    $('#carga02').change(function (e) {

        let urlSucursales = urlSimulador + "sucursalesPrestamos";

        var strFormData = $("#carga02").prop("files")[0];
        strIdCanal = $('#idCompCanales option:selected').attr('value');
        strTipoTienda = $('#idTipoTiendas option:selected').attr('value');
        var strIdPais = $('#idCompPaises option:selected').attr('value');
        strIdCanal = "1";
        strTipoTienda = "0";
        console.log("CanalId:. " + strIdCanal + " IdTipoTienda:. " + strTipoTienda, "strIdPais:. " + strIdPais)

        lstSucursales;
        let lstSucursalesExcept;

        let objCargaArchivo = [];
        objCargaArchivo.push(strFormData);

        objCargaArchivo.push(parseInt(strIdCanal));
        objCargaArchivo.push(parseInt(strTipoTienda));
        objCargaArchivo.push(parseInt(strIdPais));

        console.log(strFormData);

        servicesCargaArchivo(urlSucursales, objCargaArchivo, POST, true).then(objJson => {
            objJson.json().then(objSM => {
                console.log(objSM)

                lstSucursales = objSM.respuesta.listaIntersecion;
                if (lstSucursales == "") {
                    listaSku = [];
                    mostrarModalMensaje(1, "Las sucursales cargadas no corresponden al tipo de canal seleccionado", "Carga un nuevo archivo");

                } else {
                    listaSku = [];
                    //$('#idTextAreaViewSucursales').show();
                    document.getElementById("idPreviewSucursales").innerHTML = lstSucursales;
                    lstSucursalesExcept = objSM.respuesta.listaExcept;
                    if (lstSucursalesExcept != "") {
                        mostrarModalMensaje(1, "Las siguientes sucursales no corresponden al tipo de canal seleccionado : ", lstSucursalesExcept);
                    }
                }

            });
        });

        $('#carga02').val('');
        $('#fileLabel').text("Examinar");

    });

    $('#idPreviewSucursales').prop('readonly', true);


    $("#idConfimacionBorrar").click(function e() {

        intIdTipoMercadeo = $('#idTipoMercadeo option:selected').attr('value');

        eliminaRegistrosVacios(intIdTipoMercadeo);

        blnConfirmacion = true;
    });

    $("#idBtnCancelar").click(function e() {

        blnConfirmacion = false;
    });


}

let elementosSelectM;

//Genera la tabla productos
function validaSelects(idForm) {

    idForm.validate({
        rules: {
            idComTipoClt: {
                required: true,
                number: true

            }
        },
        messages: {
            idComTipoClt: {
                required: "Selecciona una opción valida",
                number: "Selecciona una opción valida"
            }
        },
    });

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
    }
}

function validaInputs() {

    jQuery.validator.setDefaults({
        rules: {
            nameTituloEvent: "required",
            fechaInicio: "required",
            fechaFin: "required"
        },
        messages: {
            nameTituloEvent: "Ingresa Título",
            fechaInicio: "Ingresa una fecha de Inicio del evento",
            fechaFin: "Ingresa una fecha de Fin del evento"
        }
    });
    var form = $("#idCotizador");
    form.validate();

    return form.valid();

}

function validaFechasMenoresMayores() {

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
        $('#filter-date1').val("")
        $("#idGuardarEvent").prop("disabled", true);

        return false;
    }

    return true;
}

function validaRegistrosVacios(intIdTipoMercadeo) {

    strInput = null;

    if (intIdTipoMercadeo == strMercadeoTasa) {

        $('#tblSM tbody tr').each(function () {

            strInput = $(this).find('td').eq(11).find('input[type="text"]').val();

            if (strInput == "") {

                return false;
            }
        });

        if (strInput == "") {
            mostrarModalMensaje(2, "Los registros que no tengan un Abono Puntual Propuesto serán eliminados de la Cotización");
        } else {
            blnConfirmacion = true;
        }

    } else if (intIdTipoMercadeo == strMercadeoAbono) {

        $('#tblSM tbody tr').each(function () {

            strInput = $(this).find('td').eq(6).find('input[type="text"]').val();

            if (strInput == "") {

                return false;
            }
        });

        if (strInput == "") {
            mostrarModalMensaje(2, "Los registros que no tengan un Abono Puntual Propuesto serán eliminados de la Cotización");
        } else {
            blnConfirmacion = true;
        }

    }
}

function obtenerFechaActual() {

    var fecha = new Date();
    var dd = fecha.getDate();
    var MM = fecha.getMonth() + 1;
    var yyyy = fecha.getFullYear();
    var hh = fecha.getHours();
    var mmm = fecha.getMinutes();
    var sss = fecha.getSeconds();

    var fechaActual = (yyyy + '-' + (('' + MM).length < 2 ? '0' : '') + MM + '-' + (('' + dd).length < 2 ? '0' : '') + dd + ' ' + fecha.getHours() + ':' + ('0' + (fecha.getMinutes())).slice(-2) + ':' + fecha.getSeconds())

    return fechaActual;
}

function ValidaSoloNumeros(e) {

    var keynum = window.event ? window.event.keyCode : e.which;
    var key = keynum ? e.which : e.keyCode;
    console.info("Evento Teclado :. " + key)
    return ((key >= 48 && key <= 57) || key == 46 || key == 37);
}

let blnVerificaEnvioSucursales;
async function validaTipodeEnvioSucursales() {

    if ($("#rdCargaArchivo").is(":checked")) {

        console.log("Validacion Carga por Archivo de Sucursales");
        strTipoCargaSucursal = "1";
        strSucursales = $('#idPreviewSucursales').val();
        lstSucursales = strSucursales;
        return true;
    }
    else if ($("#rdSeleccionManual").is(":checked")) {

        strTipoCargaSucursal = "2";
        strSucursales = $('#idCargaMSucursales').val();
        strIdCanal = $('#idCompCanales option:selected').attr('value');
        strTipoTienda = $('#idTipoTiendas option:selected').attr('value');

        if (strSucursales == undefined || strSucursales == "") {
            listaSku = [];;
            mostrarModalMensaje(1, "Tu solicitud no puede ser procesada, es necesario proporcionar las sucursales de destino");
            return false;
        } else {

            let varResult = await callCargaManualSucursales(strSucursales, strIdCanal, strTipoTienda, strTipoCargaSucursal);
            console.log("Llamadas asincronas");
            console.log(varResult);
            return true;
        }


    }
    else if ($('#rdSeleccionTerritorio').is(":checked")) {

    }

}

async function invocaCargaSucursalesManual() {


    if (strExceptSucursales != "") {
        listaSku = [];
        var strMsjeMSucursal = "Las siguientes sucursales no corresponden al canal o tipo tienda seleccionados, es necesario modificar su petición";
        mostrarModalMensaje(3, strExceptSucursales, strMsjeMSucursal);
    } else if (strExceptSucursales == undefined) {
        listaSku = [];
        blnCargaCorrecta = false;
        console.log(" Hay sucursales fuera de la validación " + blnCargaCorrecta)

    } else {
        strSucursales = strIntersectsucursales;
        lstSucursales = strSucursales;
        blnCargaCorrecta = true;
        console.log("La carga de sucursales fue correcta, sin excepciones " + blnCargaCorrecta);
        guardarSimulacion(requestSM, listaSku);
    }

    return blnCargaCorrecta;
}

//Nueva implementacion qui 

function cargarArchivo(objetoInputFile) {
    var metodo = "extraerVariablesM/evento";
    let files = objetoInputFile.files;
    let uriVariablesId = "";
    if (files.length > 0) {
        uriVariablesId = `${urlEventosP}/${metodo}/${idUsrLogin}/${_strIdPromocion}`;
        const formVariables = new FormData();
        formVariables.append("file", files[0]);
        servicesVariables(uriVariablesId, formVariables, POST, true)
            .then(respuesta => {
                switch (respuesta.status) {
                    case 200:
                        respuesta.json().then(objetoJson => {
                            objetoExcel = objetoJson;
                            try {
                                if (objetoJson.respuesta.archivo.length > 0) {
                                    $('.divDato').show();
                                    $('#idBtnSalir').hide();
                                    pintarTabla(objetoJson.respuesta.archivo, false);
                                    _jsonDatosExcel = objetoJson.respuesta.archivo;
                                    var cadenModal = "";

                                    if (objetoJson.respuesta.datosencero[0].contador > 0 || objetoJson.respuesta.datosencero[1].contador > 0) {
                                        cadenModal += "<div><h4>Alguna tasas son menores o iguales a 0, por favor de validar.</h4></div><br>";

                                    }
                                    if (objetoJson.respuesta.valAbonos[0].cadena.length > 0 || objetoJson.respuesta.valAbonos[1].cadena.length > 0) {
                                        var texos = "";
                                        cadenModal += "<div style='    max-height: 200px;overflow: auto; '><h4>Las siguientes tasas el ultimo abono es diferente a al Abono normal </h4>";
                                        if (objetoJson.respuesta.valAbonos[0].cadena.length > 0) {
                                            for (var i = 0; i < objetoJson.respuesta.valAbonos[0].cadena.length; i++) {
                                                cadenModal += objetoJson.respuesta.valAbonos[0].cadena[i];
                                                cadenModal += "<br>"
                                            }
                                        }
                                        if (objetoJson.respuesta.valAbonos[1].cadena.length > 0) {
                                            for (var i = 0; i < objetoJson.respuesta.valAbonos[1].cadena.length; i++) {
                                                cadenModal += objetoJson.respuesta.valAbonos[1].cadena[i];
                                                cadenModal += "<br>"
                                            }
                                        }

                                        cadenModal += "</div>";
                                    }
                                    if (objetoJson.respuesta.mamen.length > 0) {

                                        for (var i = 0; i < objetoJson.respuesta.mamen.length; i++) {
                                            cadenModal += "<div style='    max-height: 200px;overflow: auto; '><h4>" + objetoJson.respuesta.mamen[i] + " </h4></div>";
                                            cadenModal += "<br>"
                                        }
                                    }

                                    if (cadenModal != "") {
                                        $('#modalGuardarParam').find(".txtModal").html("").html(cadenModal);
                                        $('#modalGuardarParam').modal({
                                            focus: true,
                                            persist: true,
                                        })
                                    }

                                }
                            } catch (e) {
                                _jsonDatosExcel = null;
                                if (objetoJson.respuesta.mensaje == "Existen productos repetidos dentro de la misma tasa.") {
                                    var cadenaRepetidos = "<div style='    max-height: 200px;overflow: auto; '><h4>Existen SKU repetidos.</h4>";
                                    objetoJson.respuesta.datosRepetidos.forEach((element, index) => {
                                        cadenaRepetidos +=   "<h4> PESTAÑA: " + element.valPestaña + ", SKU:" + element.valRepetido + ", Numero: " + element.vecRepetido+"</h4>"
                                        console.log(JSON.stringify(element));
                                    });
                                    cadenaRepetidos += "</div>";
                                    $('#modalGuardarParam').find(".txtModal").html("").html(cadenaRepetidos);
                                    $('#modalGuardarParam').modal({
                                        focus: true,
                                        persist: true,
                                    });
                                
                                    // cadenaRepetidos += objetoJson.respuesta.valAbonos[0].cadena[i];
                                    //cadenaRepetidos += "<br>"

                                } else {
                                    $('#modalGuardarParam').find(".txtModal").html("").html("<div>El archivo no tiene el formato requerido. Favor de revisarlo</div>");
                                    $('#modalGuardarParam').modal({
                                        focus: true,
                                        persist: true,
                                    });
                                }

                            }



                        });
                        break;
                    default:
                        respuesta.text().then(objetoJson => {
                            _jsonDatosExcel = null;
                            $('#modalGuardarParam').find(".txtModal").html("").html('<div>Estatus error:' + error.status + ' ' + error.statusText + ' Recurso no encontrado: ' + error.url + '</div>');
                            $('#modalGuardarParam').modal({
                                focus: true,
                                persist: true,
                                onClose: () => {
                                    window.location.replace(hrefTasaP);
                                }
                            });
                        });
                        break;
                }
            })
            .catch(error => {
                error.text()
                    .then(objeto => {
                        if (objeto.length > 0) {
                            _jsonDatosExcel = null;
                            let jsonObjeto = JSON.parse(objeto);
                            $('#modalGuardarParam').find(".txtModal").html("").html('<div>Estatus error:' + error.status + ' ' + jsonObjeto.errorMessage + '</div>');
                            $('#modalGuardarParam').modal({
                                focus: true,
                                persist: true,
                                onClose: () => {
                                    window.location.replace(hrefTasaP);
                                }
                            });
                        } else {
                            _jsonDatosExcel = null;
                            $('#modalGuardarParam').find(".txtModal").html("").html('<div>Estatus error:' + error.status + ' ' + error.statusText + ' Recurso no encontrado: ' + error.url + '</div>');

                            $('#modalGuardarParam').modal({
                                focus: true,
                                persist: true,
                                onClose: () => {
                                    window.location.replace(hrefTasaP);
                                }
                            });
                        }
                    });
            });
    }
}

function pintarTabla(objetoJson, verValidacion) {
    let divTabsClass = document.getElementsByClassName('menuTabs');
    let divsContenidoTable = [];
    objetoJson.forEach((element, index) => {
        index++;
        let divTabs = document.createElement('div');
        divTabs.setAttribute('class', `tabs ${index === 1 ? '' : 'active'} ${element.idPestaña === 0 ? 'familiaNoValida' : ''}`);
        divTabs.setAttribute('tabs', index);
        divTabs.setAttribute('style', 'cursor: pointer;');
        let contenidoTextoDiv = document.createElement('div');
        divTabs.appendChild(contenidoTextoDiv);
        let contenidoDivTabs = document.createTextNode(element.pestañaD);
        contenidoTextoDiv.appendChild(contenidoDivTabs);
        divTabsClass[0].appendChild(divTabs);
        let divTabContenidoTable = document.createElement('div');
        let divTabScroll = document.createElement('div');
        divTabScroll.setAttribute('class', 'scroll');
        divTabContenidoTable.appendChild(divTabScroll);
        divTabContenidoTable.setAttribute('class', 'contTab');
        divTabContenidoTable.setAttribute('contTab', index);
        if (!verValidacion) {
            let divButtonCenter = document.createElement('div');
            divButtonCenter.setAttribute('class', 'btnCenter');
            let aBtnCancelar = document.createElement('a');
            aBtnCancelar.setAttribute('class', 'btnA btnB modalCancelarParam_view');
            aBtnCancelar.setAttribute('tab', index);
            let divSolo = document.createElement('div');
            let textBtnCancelar = document.createTextNode('Cancelar');
            aBtnCancelar.appendChild(divSolo);
            aBtnCancelar.appendChild(textBtnCancelar);
            divButtonCenter.appendChild(aBtnCancelar);
            let aBtnGuardar = document.createElement('a');
            aBtnGuardar.setAttribute('class', 'btnA guardar modalGuardarParam_view');
            aBtnGuardar.setAttribute('tab', index);
            let txtBtnGuardar = document.createTextNode('Guardar');
            aBtnGuardar.appendChild(divSolo);
            aBtnGuardar.appendChild(txtBtnGuardar);
            divButtonCenter.appendChild(aBtnGuardar);
            divTabContenidoTable.appendChild(divButtonCenter);
        }
        divsContenidoTable.push(divTabContenidoTable);
        let table = document.createElement('table');
        table.setAttribute('class', 'tblGeneral');
        let thead = document.createElement('thead');
        table.appendChild(thead);
        let tbody = document.createElement('tbody');
        let trCabecera = document.createElement('tr');
        thead.appendChild(trCabecera);

        let plazos;
        plazos = element.variablesCabeceras.map((value, index, array) => {
            let thVariables = document.createElement('th');
            let textoTdVariables = document.createTextNode(value.cDescripcion);

            thVariables.appendChild(textoTdVariables);
            trCabecera.appendChild(thVariables);


            return value.variablesV.map((value, index, array) => value.valor);
        });
        table.appendChild(tbody);
        plazos = plazos.reduce((previus, current) => previus.concat(current));
        plazosNoRepetidos = new Set(plazos);
        var valorInial = element.variablesCabeceras.length;
        var valorFinal = element.variablesCabeceras[0].variablesV.length;
        var contador = 0;
        for (var a1 = 0; a1 < valorFinal; a1++) {
            let trPlazo = document.createElement('tr');
            contador = 0;
            element.variablesCabeceras.forEach((value, index, array) => {
                let tdVariable = document.createElement('td');
                if (value.variablesV[a1].valor == 0) {
                    tdVariable.style.background = "red";
                }
                if (contador > 1) {
                    var tassss = value.variablesV[a1].valor.toString();
                    for (var a = tassss.length; a < 8; a++) {
                        tassss = tassss.concat("0");
                    }
                    console.log("Tasa => ", tassss);
                    let textTdVariable = document.createTextNode(tassss);
                    tdVariable.appendChild(textTdVariable);
                    trPlazo.appendChild(tdVariable);
                } else {
                    let textTdVariable = document.createTextNode(value.variablesV[a1].valor);
                    tdVariable.appendChild(textTdVariable);
                    trPlazo.appendChild(tdVariable);
                }
                contador++;
               
            });
            tbody.append(trPlazo);

        }



        divTabScroll.appendChild(table);
    });
    divsContenidoTable.map((value, index) => {
        $('.blanco.divDato').append(value)
        $(value).hide();
        if (index === 0) {
            $(value).show();
        }
    });
    $('.tabs').on('click', evtMenuTabs);
    $('.btnA.guardar').on('click', evtClickGuardarYEnviarVariables);
    $('a.btnA.btnB').on('click', evtCancelar);
}

function limpiar() {
    $(".menuTabs").html("");
    $(".contTab").remove();
}

function evtMenuTabs(evt) {
    let tab = $(this);
    $('.tabs').addClass('active');
    tab.removeClass('active');
    $('.contTab').hide();
    $(".contTab[contTab='" + tab.attr('tabs') + "']").show();
}

function evtClickGuardarYEnviarVariables(evt) {
    let btnGuardar = $(this);
    btnGuardar.prop('disabled', true);
    guardarEvento()
}

function evtCancelar(evt) {
    $('#modalCancelarParam').modal({
        onShow: () => {
            $(".btnA.simplemodal-close.modalBtnAceptar").on("click", () => {
                window.location.replace(hrefTasaP);
            });
        }
    });
}

function guardarEvento() {
    _strIdPaises = $('#idCompPaises option:selected').attr('value');
    _strIdTipoCliente = $('#idCompTipoDeCliente option:selected').attr('value');
    _strIdPeriodo = $('#idCompPeriodo option:selected').attr('value');
    _strIdPromocion = $('#idCompPromocion option:selected').attr('value');
    _strTitulo = $('#idTituloEvent').val();
    _strFechaInicio = $('#filter-date').val();
    _strFechaFin = $('#filter-date1').val();
    _strIdTipoEnvio = $('#idTipoEnvio option:selected').attr('value');
    _strIdListaSuc = $('#idPreviewSucursales').val();
    var _strIdListaSuc1 = $('#idCargaMSucursales').val();


    if (_strIdPaises == 0)
        mostrarModalMensaje(1, "Es necesario seleccionar un país");
    else if (_strIdTipoCliente == 0)
        mostrarModalMensaje(1, "Es necesario seleccionar un tipo de cliente");
    else if (_strIdPeriodo == 0)
        mostrarModalMensaje(1, "Es necesario seleccionar un periodo");
    else if (_strIdPromocion == 0)
        mostrarModalMensaje(1, "Es necesario seleccionar una promocion");
    else if (_strTitulo == "")
        mostrarModalMensaje(1, "Es necesario ingresar Titulo");
    else if (_strFechaInicio == "")
        mostrarModalMensaje(1, "Es necesario seleccionar una fecha inicio");
    else if (_strFechaFin == 0)
        mostrarModalMensaje(1, "Es necesario seleccionar una fecha final");
    else if (_strIdTipoEnvio == -1)
        mostrarModalMensaje(1, "Es necesario seleccionar un tipo de envio ");
    else if (((_strIdListaSuc == "" && _strIdListaSuc1 == "") || (_strIdListaSuc == undefined && _strIdListaSuc1 == undefined)) && _strIdTipoEnvio == 0)
        mostrarModalMensaje(1, "Es necesario ingresar sucursales");
    else {
        let uriVariablesId = "";
        var metodo = "guardaEvento";
        uriVariablesId = `${urlEventosP}/${metodo}`;
        var _jsonPeticion =
        {
            idPais: parseInt(_strIdPaises),
            TipoTasaM: JSON.stringify(_jsonDatosExcel),
            listasSuc: (_strIdListaSuc == "") ? _strIdListaSuc1 : _strIdListaSuc,
            idTEvento: 0,
            idUsuario: idEmpleadoLogin,
            NomEvento: _strTitulo,
            FInicio: _strFechaInicio,
            FFin: _strFechaFin,
            TCliente: _strIdTipoCliente,
            idPromocion: parseInt(_strIdPromocion),
            idPeriodo: parseInt(_strIdPeriodo),
            idTipoDeEnvio: parseInt(_strIdTipoEnvio),
        }
        //var data = servicesCallMethod(urlCatalogos + "getProductos", JSON.stringify(strPeticion), POST, true).then(objJson => {
        var data = servicesCallMethod(uriVariablesId, JSON.stringify(_jsonPeticion), POST, true).then(objJson => {
            objJson.json().then(objSM => {

                LstProductos = objSM.respuesta;

                if (LstProductos.length > 0) {

                    console.log(JSON.stringify(LstProductos));
                    generaTablaSku(LstProductos);

                    $('#idSkus').val('');

                } else {
                    mostrarModalMensaje(1, "Los Skus proporcionados no son validos");
                }



            });

        });
        console.log("Json Peticion => ", _jsonPeticion)
    }

}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
