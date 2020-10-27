let strValorPropuesto = null;
let _strIdInputThis;
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
let intEngancheValor = 10;
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

let $selectPLazosValidos;
let intIdTipoProducto;
let intIdFamilia;
let strDescFamilia;
let intIdCanal;
let strIdTipoCliente;
let intIdPeriodicidad;
let strPlazosValidos;
let intIdPromociones;
let dblApoyoEkt;
let intIdTipoMercadeo;

//Tabla Cotizacion por tipo Mercadeo
let strSku;
let dblPrecioD;
let dblPrecioA;
let dblEnganche;
let strIdInput;
let intErrorEnTasa;
let intErrorEnTasaMin;
let LstSimulacionBase;
let objValoresTbl = [];
let objIdValoresTbl = [];
let resCotizacion = [];

//SecCión 4 Enviar Evento
let strTituloEvento;
let strJustificacionEvt;
let strRutaImgJustificacion = "";
let dtmFechaInicioEvt;
let dtmFechaFinalizacionEvt;
let dtmFechaSimulacion;
let dtmFechaActual;
let strIdCanal;
let strTipoEnvio;
let strTipoTienda;
let strDescCanal;
let lstSucursales;
let strIntersectsucursales;
let strExceptSucursales; 
//let blnConfirmarEnvioSucursal;
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
//let dblApoyoEkt = 0;
let _strIdFamilia;
let _intIdPeriodo;

let ObjCliente = undefined;
var ObjSelectProducto = undefined;
var ObjSelect = undefined;
var ObjProducto = undefined;


//var ObjCliente = undefined;
var _strPrecioA = null;
var objSimulacion = [];
var GrupoCanal = null;
var _strIdProducto = null;
var idAleatorioFamilia = null;


//Nuevos Datos 
var ObjPaises = undefined;
var ObjTiposCl = undefined;
var objPeridos = undefined;
var objPromos = undefined;
var ObjTipoEnvio  = undefined;
var _strIdPaises = null;
var _strIdTipoCliente = null;
var _strIdPeriodo = null;
var _strIdPromocion = null;

var _strTitulo = null;
var _strFechaInicio = null;
var _strFechaFin = null;
var _strIdTipoEnvio = null;
var _strIdListaSuc = null;

//End Nuevos Datos 
var _strRutaImg;
var valJustificacion;

var valtitulo;
var objSendSimulacion = [];
var _strMensajeModal;
let objProductoSap = [];

let strDescCortaProd;;


function sendCallServiceSap(event) {

    var code = (event.keyCode ? event.keyCode : event.which);

    if (code == '13') {

        $("#checktodos").removeAttr("checked");
        strCadenaSkus = $('#idSkus').val();

        if (strCadenaSkus != "") {
            console.log(strCadenaSkus);
            callServiceSkus(strCadenaSkus);

        } else {
            mostrarModalMensaje(1, "Es necesario proporcionar un SKU para realizar la búsqueda");
        }
    }
}

jQuery.extend(jQuery.expr[':'], {
    focusable: function (el, index, selector) {
        return $(el).is('input[tabindex]');
    }
});

function sendCotizacion(event) {

    var code = (event.keyCode ? event.keyCode : event.which);
    intIdTipoMercadeo = $('#idTipoMercadeo option:selected').attr('value');

    if (code == '13') {
        event.preventDefault();
        strIdInput = event.target.id;
        strValorPropuesto = $('#' + strIdInput + '').val();
        console.log(strIdInput);

        if (intIdTipoMercadeo == strMercadeoAbono) {

            if (!regex.exec(strValorPropuesto)) {
                mostrarModalMensaje(1, "Solo números");
                $('#' + strIdInput + '').val("");
                return false;
            }
        }
        

        objIdProductoASimular = [];
        objProductoASimular = [];

        $(event.target).parents("tr").find("td:not(:last-child)").each(function () {

            objIdProductoASimular.push($(this).attr('id'));
            objProductoASimular.push($(this).html());

        });

        //intIdTipoMercadeo = $('#idTipoMercadeo option:selected').attr('value');
        if (strValorPropuesto !== "") {

            objProductoASimular.push(strValorPropuesto);

            callFunction(intIdTipoMercadeo, objProductoASimular, objIdProductoASimular);

        } else {

            if (intIdTipoMercadeo == strMercadeoAbono) {
                mostrarModalMensaje(1, "Es necesario proporcionar un abono");
            } else {
                mostrarModalMensaje(1, "Es necesario proporcionar una tasa");
            }

        }

        // Get all focusable elements on the page
        $canfocus = $(':focusable');
        indexFocusGeneral = $canfocus.index(document.activeElement) + 1;
        if (indexFocusGeneral >= $canfocus.length) indexFocusGeneral = 1;
    }
}


function eventoPrestPrincipal() {


    console.log("Prestamos personales")
    //Mios
    $('#idBtnDatosComplem').hide();
    $('#idGuardarEvent').hide();
    
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
       // callServiceProductos(ProductoID);
        //callServiceFamiliaProducto(_strIdProducto, LstObjProductoFamilia);
        //callServicePeriodos(ProductoID);
        //callServicesUsuarioProducto(GrupoCanal);
        //callServicesCondicionesCotizar(_strIdProducto);
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
     
        //$("#tBSkus").empty();
       // $("#checktodos").removeAttr("checked");
       // callServiceFamiliaProducto(_strIdProducto);
       // callSelectTipoClte(parseInt(_strIdProducto));

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
        //callServiceFamiliaProducto(_strIdProducto);
        callSelectTipoClte(parseInt(_strIdProducto));

    });


    
    $("#idCompFamiliaProd").change(function () {
        _strIdProducto = $('#idCompTipoProd option:selected').attr('value');
        $("#tBSkus").empty();
        $("#checktodos").removeAttr("checked");
        var _strIdFamilia = $('#idCompFamiliaProd option:selected').attr('value');
        callSelectPlazos(_strIdProducto, _strIdFamilia);

    });

    $("#radioSKU, #radioCategoria").change(function () {
        if ($("#radioSKU").is(":checked")) {
            var strCadenaSkus = $('#idSkus').val();
            console.log(strCadenaSkus);
        }
        else if ($("#radioCategoria").is(":checked")) {
            $('#div2').show();
        }

    });

    $("#idBuscarSkus").click(function () {

        var strCadenaSkus = $('#idSkus').val();
        $("#checktodos").removeAttr("checked");

        if (strCadenaSkus != "") {
            console.log(strCadenaSkus);
            callServiceSkus(strCadenaSkus);
         
        } else {
            mostrarModalMensaje(1, "Es necesario proporcionar un SKU para realizar la búsqueda"); 
        }
        
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
           

     /*   var LstSkusBase = [];
        LstSkusBase = obtieneSkusSimulacionBase();
        console.log("Listas Sku");
        console.log(JSON.stringify(LstSkusBase));*/

        //mostrarModalMensaje(1, "Es necesario seleccionar un producto");

    });
    $("#idBtnDatosComplem").click(function () {
        
        _strTitulo = $('#idTituloEvent').val();
        _strFechaInicio = $('#filter-date').val();
        _strFechaFin = $('#filter-date1').val();
        _strIdTipoEnvio = $('#idTipoEnvio option:selected').attr('value');
        _strIdListaSuc = $('#idPreviewSucursales').val();
        var _strIdListaSuc1 = $('#idCargaMSucursales').val();
      
        if (_strTitulo == "")
            mostrarModalMensaje(1, "Es necesario ingresar Titulo");
        else if (_strFechaInicio == "")
            mostrarModalMensaje(1, "Es necesario seleccionar una fecha inicio");
        else if (_strFechaFin == 0)
            mostrarModalMensaje(1, "Es necesario seleccionar una fecha final");
        else if (_strIdTipoEnvio == -1)
            mostrarModalMensaje(1, "Es necesario seleccionar un tipo de envio ");
        else if (_strIdListaSuc == "" && _strIdListaSuc1=="")
            mostrarModalMensaje(1, "Es necesario ingresar sucursales");
        else {
            irAcordeon(7);
          //  $('#idGuardarEvent').show();
        }


        /*   var LstSkusBase = [];
           LstSkusBase = obtieneSkusSimulacionBase();
           console.log("Listas Sku");
           console.log(JSON.stringify(LstSkusBase));*/

        //mostrarModalMensaje(1, "Es necesario seleccionar un producto");

    });
    //Elimina registro de la tabla Cotizacion
    $("table").on("click", ".eliminarF", function (event) {
        $(this).parents("tr").remove();
    });

    $("table").on("click", ".eliminarSku", function (event) {
        $(this).parents("tr").remove();
        $("#checktodos").removeAttr("checked");
    });


    $('#idGuardarEvent').click(function (e) {

        fnObtieneSimulacion();

    });

    //Carga de la Imagen de Justificacion
    $('#carga01').change(function (e) {

        //$("#carga01").val('');

        var urlCargaImg = urlSimulador +"anexo/usuario/" + idUsrLogin;
        var formImg = $("#carga01").prop("files")[0];

        servicesCargaArchivoImg(urlCargaImg, formImg, POST, true).then(objJson => {
            objJson.json().then(objSM => {
                console.log(objSM)
                strRutaImgJustificacion = objSM.respuesta.ruta;

            });
        })

        console.log(strRutaImgJustificacion);
    });


    $("#rdCargaArchivo, #rdSeleccionManual, #rdSeleccionTerritorio").change(function () {
        if ($("#rdCargaArchivo").is(":checked")) {
            $('#idTextAreaCargaSucursales').hide();
            $('#idSelectTerritorio').hide();
            $('#idTextAreaViewTerritorioSucursales').hide();
            $('#idTipoTiendas').parent().show();
            $("#idDivCargaSucursales").show();
            $("#idTextAreaViewSucursales").show();
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

    //$("#idConfimacionEnvio").click(function e() {

    //    console.log("Cadena de Sucursales Validas despues del servicio " + strIntersectsucursales);
    //    if (strIntersectsucursales != "") {
    //        blnConfirmarEnvioSucursal = true;
    //    } else {
    //        blnConfirmarEnvioSucursal = false;
    //    }
        
    //});

    //$("#idBtnCancelarEnvio").click(function e() {

    //    blnConfirmarEnvioSucursal = false;
    //});

}

/* Seleccionar Checkbox*/
$("#checktodos").change(function () {
    $("input:checkbox.checkM").prop('checked', $(this).prop("checked"));
});

//1.- Datos a Cotizar
async function callServicesUsuarioProducto(canalId) {

    try {

        callServiceCanales(canalId);
        callServicesTipoEnvio();
        callServicesTipoTienda();

    } catch (e) {
        return console.log(e.message);
    }

}

//2.- Condiciones a cotizar
async function callServicesCondicionesCotizar(objResultServices) {



        try {
            callSelectTipoClte(objResultServices);
            callSelectPeriodicidad();
            callSelectPromociones(objResultServices);
            callSelectTipoMercadeo();

        } catch (e) {

        }
    
}


let elementosSelectM;

function evtChangeSelect2(e) {
    elementosSelectM = $('#idPlazos').select2("val");
    if (elementosSelectM) {
        var indiceValorBuscado = elementosSelectM.findIndex((e) => e === '-1' || e === '-2');
        if (indiceValorBuscado >= 0) {
            let valorVariable = elementosSelectM[indiceValorBuscado];
            if (valorVariable === '-1') {
                $('#idPlazos').find('option').prop('selected', true);
                $('#idPlazos').find('option[value="-1"]').removeAttr("selected");
                $('#idPlazos').find('option[value="-1"]').text("Quitar todo").val("-2");
                $('#idPlazos').select2('destroy');
                $('#idPlazos').select2({
                    width: '115%',
                    placeholder: 'Selecciona un plazo',
                    language: "es",
                });
                $('#idPlazos').trigger("change");
                console.log(indiceValorBuscado);
            } else if (valorVariable === '-2') {
                $('#idPlazos').find('option').removeAttr("selected");
                $('#idPlazos').find('option[value="-2"]').text("Seleccionar Todo").val("-1");
                $('#idPlazos').val(null);
                $('#idPlazos').select2('destroy');
                $('#idPlazos').select2({
                    width: '115%',                    
                    placeholder: 'Selecciona un plazo',
                    language: "es",
                });
                $('#idPlazos').trigger('change');
            }
        }
    }
}






//TipoCotizacion 
function generaSimulacionTipoMercadeo(objSimulacionBasexSku) {

    
    strPlazosValidos = $('#idPlazos').select2("val");

    if (strPlazosValidos == null ) {
        mostrarModalMensaje(1,"Es necesario proporcionar un plazo para generar una simulación");
    } else {   
        
        var ObjPlazos = strPlazosValidos.toString().split(',')        
        console.log("Arreglo plazos " + ObjPlazos);

        intIdTipoProducto = $('#idCompTipoProd option:selected').attr('value');
        intIdTipoMercadeo = $('#idTipoMercadeo option:selected').attr('value');        
        strIdTipoCliente = $('#idComTipoClt option:selected').attr('value');
        intIdPeriodicidad = parseInt($('#idComPeriodicidad option:selected').attr('value'));
        dblApoyoEkt = $("#IdApoyoEkt").val();

        if (dblApoyoEkt == "") {
            dblApoyoEkt = 0;
        }

        intIdFamilia = $('#idCompFamiliaProd option:selected').attr('value');


        $.each(objProductoSap, function (key, value) {

            if (intIdFamilia == value.IdFamilia) {

                strDescFamilia = value.DescCorta;
            }
        });

        if (intIdTipoProducto == strIdConsumoProd) {

            strDescFamilia = strDescfamiliaConsumo;
        }

        let objPeticionSimulacionBase = {
            IdProducto: parseInt(intIdTipoProducto),
            DescProducto: strDescFamilia,
            IdTipoCliente: strIdTipoCliente,
            IdPeriodicidad: intIdPeriodicidad,
            IdFamilia: parseInt(intIdFamilia),
            ApoyoEkt: parseFloat(dblApoyoEkt),
            LstSimulacionTasaBase: [],
            LstPlazos: []
        }

        objPeticionSimulacionBase.LstSimulacionTasaBase = objSimulacionBasexSku;
        objPeticionSimulacionBase.LstPlazos = ObjPlazos;
        console.log(JSON.stringify(objPeticionSimulacionBase));
        obtieneSimulacionBase(intIdTipoMercadeo, objPeticionSimulacionBase);

    }
}

//Genera la tabla productos
function generaTablaSku(LstSkus) {

    var dataTable;
    var i = 1;

    $("#tBSkus").empty();

    intIdTipoProducto = $('#idCompTipoProd option:selected').attr('value');

    if (intIdTipoProducto == strIdPrestamosProd) {

        intEngancheValor = 0;
    } else {
        intEngancheValor = 10;
    }

    $.each(LstSkus, function (key, value) {

        dataTable += '<tr class="valorTblSku">' +
            '<td id="tdChk' + i + '" style="width:2%;">' + '<input type="checkbox" name="grupo1" id="chkSku' + i + '" class="alone checkM" /><label for="chkSku' + i +'">&nbsp;</label>' + '</td>' +
            '<td id="tdSku' + i + '">' + value.sku + '</td>' +
            '<td id="tdDesc' + i + '" style="text-align:left;">' + value.descripcion + '</td>' +
            '<td id="tdPrecioD' + i + '">' + value.precioDe + '</td>' +           
            '<td id="tdPrecioA' + i + '" contenteditable="true"> ' + '<input type="text" id="idPrecioA" value ="' + value.precioA + '" style="text-align:center"  onkeypress="return ValidaSoloNumeros(event)">' + ' </td>' +
            '<td id="tdEnganche' + i + '" contenteditable="true"> ' + '<input type="text" id="idEnganche" value ="' + intEngancheValor + '" style="text-align:center"  onkeypress="return ValidaSoloNumeros(event)">' + ' </td>' +
            '<td>' + '<a class="eliminarSku"><img src="/SimuladorAbonos/img/delete.svg"></a>' + '</td>' +
            '</tr>';
        ++i;
    })

    $("#tBSkus").append(dataTable);
}

//Llena Seccion 3 - Cotizacion por Tipo Mercadeo
function generaTablaCotizacion(intIdTipoMercadeo, objSM) {

    $("#tBCotizar").empty();

    var dataTable = "";
    var idVal;
    var primerRecorrido = 0;
    var i = 1;
    resCotizacion = objSM.respuesta;
    //Tipo Abono Puntual
    if (intIdTipoMercadeo == strMercadeoAbono) {

        $("#thTasaAct").addClass("theadTasaPuntual");
        $.each(objSM.respuesta, function (key, value) {

            strSku = value.sku;
            dblPrecioD = value.precioDe;
            dblPrecioA = value.precioA;
            dblEnganche = value.enganche;

            if (value.lstSimulacionsku.length > 0) {

                $.each(value.lstSimulacionsku, function (key, value) {
                    idVal = "iValorProp" + i;
                    if (primerRecorrido == key) {

                        dataTable += '<tr class="valorSM">' +
                            '<td id="tdSku' + i + '">' + strSku + '</td>' +
                            '<td id="tdPrecD' + i + '">' + dblPrecioD + '</td>' +
                            '<td id="tdPrecA' + i + '">' + dblPrecioA + '</td>' +
                            '<td id="tdEngch' + i + '">' + dblEnganche + '</td>' +
                            '<td id="tdPlazo' + i + '">' + value.plazo + '</td>' +
                            '<td id="tdAboPA' + i + '">' + value.abonoPuntual + '</td>' +
                            '<td id="tdAboPP' + i + '">' + '<input type="text" id="' + idVal + '" class="simulaD"  onkeydown="sendCotizacion(event)" tabindex="' + i + '">' + '</td > ' +
                            '<td id="tdAboN' + i + '">' + value.abonoNormal + '</td>' +
                            '<td id="tdUltmA' + i + '">' + value.ultimoAbono + '</td>' +
                            '<td id="tdDescT' + i + '">' + value.descuentoTasa + '</td>' +
                            '<td id="tdTasaP' + i + '" class="">' + value.tasaPuntual + '</td>' +
                            '<td id="tdTiR' + i + '">' + value.tir + '</td>' +
                            '<td id="tdVpN' + i + '">' + value.vpn + '</td>' +
                            '<td>' + '<a class="eliminarF"><img src="/SimuladorAbonos/img/delete.svg"></a>' + '</td>' +
                            '</tr>';

                    } else {

                        dataTable += '<tr class="valorSM">' +
                            '<td id="tdSku' + i + '">' + strSku + '</td>' +
                            '<td id="tdPrecD' + i + '">' + dblPrecioD + '</td>' +
                            '<td id="tdPrecA' + i + '">' + dblPrecioA + '</td>' +
                            '<td id="tdEngch' + i + '">' + dblEnganche + '</td>' +
                            '<td id="tdPlazo' + i + '">' + value.plazo + '</td>' +
                            '<td id="tdAboPA' + i + '">' + value.abonoPuntual + '</td>' +
                            '<td id="tdAboPP' + i + '">' + '<input type="text" id="' + idVal + '" class="simulaD"  onkeydown="sendCotizacion(event)" tabindex="' + i + '">' + '</td > ' +
                            '<td id="tdAboN' + i + '">' + value.abonoNormal + '</td>' +
                            '<td id="tdUltmA' + i + '">' + value.ultimoAbono + '</td>' +
                            '<td id="tdDescT' + i + '">' + value.descuentoTasa + '</td>' +
                            '<td id="tdTasaP' + i + '" class="">' + value.tasaPuntual + '</td>' +
                            '<td id="tdTiR' + i + '">' + value.tir + '</td>' +
                            '<td id="tdVpN' + i + '">' + value.vpn + '</td>' +
                            '<td>' + '<a class="eliminarF"><img src="/SimuladorAbonos/img/delete.svg"></a>' + '</td>' +
                            '</tr>';
                    }

                    ++i;
                })
            }
            if (value.lstMensajesdeExcepcion.length > 0) {

                var strAdvertencias = "";
                value.lstMensajesdeExcepcion.forEach(element => strAdvertencias += "*" + element + "<br>");
                mostrarModalMensaje(1, strAdvertencias);
            }
        })

    } else if (intIdTipoMercadeo == strMercadeoTasa) {
        //Tasa Puntual 
        $("#thTasaAct").removeClass("theadTasaPuntual");
        $('.thTasaProp').html(" ");
        $('.thTasaProp').html("Tasa puntual propuesta %");
        $.each(objSM.respuesta, function (key, value) {

            strSku = value.sku;
            dblPrecioD = value.precioDe;
            dblPrecioA = value.precioA;
            dblEnganche = value.enganche;

            if (value.lstSimulacionsku.length > 0) {

                $.each(value.lstSimulacionsku, function (key, value) {
                    idVal = "iValorProp" + i;
     
                   
                    if (primerRecorrido == key) {

                        dataTable += '<tr class="valorSM">' +
                            '<td id="tdSku' + i + '">' + strSku + '</td>' +
                            '<td id="tdPrecD' + i + '">' + dblPrecioD + '</td>' +
                            '<td id="tdPrecA' + i + '">' + dblPrecioA + '</td>' +
                            '<td id="tdEngch' + i + '">' + dblEnganche + '</td>' +
                            '<td id="tdPlazo' + i + '">' + value.plazo + '</td>' +
                            '<td id="tdAboPA' + i + '">' + value.abonoPuntual + '</td>' +
                            '<td id="tdAboPP' + i + '">' + value.abonoPuntual + '</td>' +
                            '<td id="tdAboN' + i + '">' + value.abonoNormal + '</td>' +
                            '<td id="tdUltmA' + i + '">' + value.ultimoAbono + '</td>' +
                            '<td id="tdDescT' + i + '">' + value.descuentoTasa + '</td>' +
                            '<td id="tdTasaAct' + i + '">' + value.tasaPuntual + '</td>' +
                            '<td id="tdTasaP' + i + '">' + '<input type="text"  id="' + idVal + '" class="simulaD"  onkeydown="sendCotizacion(event)" tabindex="' + i + '">' + '</td>' +
                            '<td id="tdTiR' + i + '">' + value.tir + '</td>' +
                            '<td id="tdVpN' + i + '">' + value.vpn + '</td>' +
                            '<td>' + '<a class="eliminarF"><img src="/SimuladorAbonos/img/delete.svg"></a>' + '</td>' +
                            '</tr>';

                    } else {

                      
                        dataTable += '<tr class="valorSM">' +
                            '<td id="tdSku' + i + '">' + strSku + '</td>' +
                            '<td id="tdPrecD' + i + '">' + dblPrecioD + '</td>' +
                            '<td id="tdPrecA' + i + '">' + dblPrecioA + '</td>' +
                            '<td id="tdEngch' + i + '">' + dblEnganche + '</td>' +
                            '<td id="tdPlazo' + i + '">' + value.plazo + '</td>' +
                            '<td id="tdAboPA' + i + '">' + value.abonoPuntual + '</td>' +
                            '<td id="tdAboPP' + i + '">' + value.abonoPuntual + '</td>' +
                            '<td id="tdAboN' + i + '">' + value.abonoNormal + '</td>' +
                            '<td id="tdUltmA' + i + '">' + value.ultimoAbono + '</td>' +
                            '<td id="tdDescT' + i + '">' + value.descuentoTasa + '</td>' +
                            '<td id="tdTasaAct' + i + '">' + value.tasaPuntual  + '</td>' +
                            '<td id="tdTasaP' + i + '">' + '<input type="text"  id="' + idVal + '" class="simulaD"  onkeydown="sendCotizacion(event)" tabindex="' + i + '">' + '</td>' +
                            '<td id="tdTiR' + i + '">' + value.tir + '</td>' +
                            '<td id="tdVpN' + i + '">' + value.vpn + '</td>' +
                            '<td>' + '<a class="eliminarF"><img src="/SimuladorAbonos/img/delete.svg"></a>' + '</td>' +
                            '</tr>';
                    }
                    ++i;
                })
            }
            if (value.lstMensajesdeExcepcion.length > 0) {

                var strAdvertencias = "";
                value.lstMensajesdeExcepcion.forEach(element => strAdvertencias += "*" + element + "<br>");
                mostrarModalMensaje(1, strAdvertencias);
            }
        })
    }

    $("#tBCotizar").append(dataTable);
}


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


async function fnObtieneSimulacion(opc) {

    console.log("TipoMercadeo: " + intIdTipoMercadeo);
    var LstSimulacionMercadeo = [];
    var tempSku = "";
    var sku;
    var precioDe = "";
    var precioA = "";
    var enganche = "";
    var plazo = "";
    var abonoPuntualActual = "";
    var abonoPropuesto = "";
    var tasaPuntual = "";
    var abononormal = "";
    var ultimoabono = "";
    var descTasas = "";
    var tir = "";
    var vpn = "";

    intIdTipoProducto = $('#idCompTipoProd option:selected').attr('value');
    //intIdFamilia = $('#idCompFamiliaProd option:selected').attr('value');

    var blnValidaCarga = validaTipodeEnvioSucursales();

    $.each(objProductoSap, function (key, value) {

        if (intIdFamilia == value.IdFamilia) {
            strDescFamilia = value.DescCorta;
        }

    });

    if (intIdTipoProducto == strIdConsumoProd) {
        strDescFamilia = strDescfamiliaConsumo;
    }

    console.log("DescripcionCorta Familia :. " + strDescFamilia);

    strIdTipoCliente = $('#idComTipoClt option:selected').attr('value');
    intIdPeriodicidad = parseInt($('#idComPeriodicidad option:selected').attr('value'));
    dblApoyoEkt = $("#IdApoyoEkt").val();

    if (dblApoyoEkt == "") {

        dblApoyoEkt = 0;
    }

    $('#tblSM tbody tr').each(function () {

        sku = $(this).find('td').eq(0).text();

        if (tempSku == "") {
            precioDe = $(this).find('td').eq(1).text();
            precioA = $(this).find('td').eq(2).text();
            enganche = $(this).find('td').eq(3).text();
            plazo = $(this).find('td').eq(4).text();
            abonoPuntualActual = $(this).find('td').eq(5).text();

            if (intIdTipoMercadeo == "3") {

                abonoPropuesto = $(this).find('td').eq(6).find('input[type="text"]').val();
                tasaPuntual = $(this).find('td').eq(10).text();
            }
            else {

                tasaPuntual = $(this).find('td').eq(11).find('input[type="text"]').val();
                abonoPropuesto = $(this).find('td').eq(6).text();
            }
           
            abononormal = $(this).find('td').eq(7).text();
            ultimoabono = $(this).find('td').eq(8).text();
            descTasas = $(this).find('td').eq(9).text();
            tir = $(this).find('td').eq(11).text();
            vpn = $(this).find('td').eq(12).text();


            tempSku = sku;
            var filaAbonoPuntual = {
                Sku: sku,
                PrecioD: parseFloat(precioDe),
                PrecioA: parseFloat(precioA),
                Descuento: 0,
                Enganche: parseFloat(enganche),
                IdProducto: parseInt(intIdTipoProducto),
                DescFamilia: strDescFamilia,                
                IdTipoCliente: strIdTipoCliente,
                IdPeriodicidad: intIdPeriodicidad,                
                IdFamilia: intIdFamilia,
                ApoyoEkt: parseFloat(dblApoyoEkt),
                LstPlazosAbonos: [],
                LstPlazosTasa: []
            };

            var filaSimulacion = {
                sku: sku,
                precioDe: parseFloat(precioDe),
                precioA: parseFloat(precioA),
                enganche: parseFloat(enganche),
                plazosTasas: []
            };

            filaSimulacion.plazosTasas.push({
                plazo: plazo,
                abonoPuntualActual: parseFloat(abonoPuntualActual),
                abonoPuntualPropuesto: parseFloat(abonoPropuesto),
                abonoNormal: parseFloat(abononormal),
                ultimoAbono: parseFloat(ultimoabono),
                descuentoTasa: parseFloat(descTasas),
                tasaPuntal: parseFloat(tasaPuntual),
                tir: parseFloat(tir),
                vpn: parseFloat(vpn)
            });


            if (intIdTipoMercadeo == strMercadeoAbono) {

                filaAbonoPuntual.LstPlazosAbonos.push({ AbonoPuntual: parseFloat(abonoPropuesto), Plazo: parseFloat(plazo) });

            }
            else {
                filaAbonoPuntual.LstPlazosTasa.push({ TasaPropuesta: parseFloat(tasaPuntual), Plazo: parseFloat(plazo) });
            }

            LstSimulacionMercadeo.push(filaAbonoPuntual);
            listaSku.push(filaSimulacion);

        } else {

            if (tempSku == sku) {

                tempSku = sku;

                if (intIdTipoMercadeo == strMercadeoAbono) {

                    enganche = $(this).find('td').eq(3).text();
                    plazo = $(this).find('td').eq(4).text();
                    abonoPuntualActual = $(this).find('td').eq(5).text();
                    abonoPropuesto = $(this).find('td').eq(6).find('input[type="text"]').val();
                    abononormal = $(this).find('td').eq(7).text();
                    ultimoabono = $(this).find('td').eq(8).text();
                    descTasas = $(this).find('td').eq(9).text();
                    tasaPuntual = $(this).find('td').eq(10).text();
                    tir = $(this).find('td').eq(11).text();
                    vpn = $(this).find('td').eq(12).text();
                }
                else {

                    enganche = $(this).find('td').eq(3).text();
                    plazo = $(this).find('td').eq(4).text();
                    abonoPuntualActual = $(this).find('td').eq(5).text();
                    
                    abonoPropuesto = $(this).find('td').eq(6).text();
                    abononormal = $(this).find('td').eq(7).text();
                    ultimoabono = $(this).find('td').eq(8).text();
                    descTasas = $(this).find('td').eq(9).text();
                    tasaPuntual = $(this).find('td').eq(10).find('input[type="text"]').val();
                    tir = $(this).find('td').eq(11).text();
                    vpn = $(this).find('td').eq(12).text();
                }wq

                var index = LstSimulacionMercadeo.find(x => x.Sku === sku);
                var indexPlazosTasas = listaSku.find(x => x.sku === sku);

                console.log("Index:. " + index);

                console.log("IndexPlazosTaas:. " + indexPlazosTasas);

                listaSku[listaSku.indexOf(indexPlazosTasas)].plazosTasas.push({
                    plazo: plazo,
                    abonoPuntualActual: parseFloat(abonoPuntualActual),
                    abonoPuntualPropuesto: parseFloat(abonoPropuesto),
                    abonoNormal: parseFloat(abononormal),
                    ultimoAbono: parseFloat(ultimoabono),
                    descuentoTasa: parseFloat(descTasas),
                    tasaPuntal: parseFloat(tasaPuntual),
                    tir: parseFloat(tir),
                    vpn: parseFloat(vpn)
                });


                if (intIdTipoMercadeo == strMercadeoAbono) {

                    LstSimulacionMercadeo[LstSimulacionMercadeo.indexOf(index)].LstPlazosAbonos.push({ AbonoPuntual: parseFloat(abonoPropuesto), Plazo: parseFloat(plazo) });
                }
                else {

                    LstSimulacionMercadeo[LstSimulacionMercadeo.indexOf(index)].LstPlazosTasa.push({ TasaPropuesta: parseFloat(tasaPuntual), Plazo: parseFloat(plazo) });
                }

            } else {

                precioDe = $(this).find('td').eq(1).text();
                precioA = $(this).find('td').eq(2).text();
                enganche = $(this).find('td').eq(3).text();
                plazo = $(this).find('td').eq(4).text();

                if (intIdTipoMercadeo == strMercadeoAbono) {

                    abonoPropuesto = $(this).find('td').find('input[type="text"]').val();
                    tasaPuntual = $(this).find('td').eq(10).text();
                }
                else {
                    tasaPuntual = $(this).find('td').eq(11).find('input[type="text"]').val();
                    abonoPropuesto = $(this).find('td').eq(6).text();
                }


                abonoPuntualActual = $(this).find('td').eq(5).text();
                abononormal = $(this).find('td').eq(7).text();
                ultimoabono = $(this).find('td').eq(8).text();
                descTasas = $(this).find('td').eq(9).text();
                tir = $(this).find('td').eq(11).text();
                vpn = $(this).find('td').eq(12).text();

                filaSimulacion = {
                    sku: sku,
                    precioDe: parseFloat(precioDe),
                    precioA: parseFloat(precioA),
                    enganche: parseFloat(enganche),
                    plazosTasas: []
                };

                tempSku = sku;
                filaAbonoPuntual = {
                    Sku: sku,
                    PrecioD: parseFloat(precioDe),
                    PrecioA: parseFloat(precioA),
                    Descuento: 0,
                    Enganche: parseFloat(enganche),
                    IdProducto: parseInt(_strIdProducto),
                    DescFamilia: strDescFamilia,                   
                    IdTipoCliente: strIdTipoCliente,
                    IdPeriodicidad: intIdPeriodicidad,
                    IdFamilia: intIdFamilia,
                    ApoyoEkt: parseFloat(dblApoyoEkt),
                    LstPlazosAbonos: [],
                    LstPlazosTasa: []
                };

                filaSimulacion.plazosTasas.push({
                    plazo: plazo,
                    abonoPuntualActual: parseFloat(abonoPuntualActual),
                    abonoPuntualPropuesto: parseFloat(abonoPropuesto),
                    abonoNormal: parseFloat(abononormal),
                    ultimoAbono: parseFloat(ultimoabono),
                    descuentoTasa: parseFloat(descTasas),
                    tasaPuntal: parseFloat(tasaPuntual),
                    tir: parseFloat(tir),
                    vpn: parseFloat(vpn)
                });

                if (intIdTipoMercadeo == strMercadeoAbono) {

                    filaAbonoPuntual.LstPlazosAbonos.push({ AbonoPuntual: parseFloat(abonoPropuesto), Plazo: parseFloat(plazo) });
                }
                else {
                    filaAbonoPuntual.LstPlazosTasa.push({ TasaPropuesta: parseFloat(tasaPuntual), Plazo: parseFloat(plazo) });
                }

                LstSimulacionMercadeo.push(filaAbonoPuntual);
                listaSku.push(filaSimulacion);
            }
        }

    });

    console.log(JSON.stringify(requestSM));

    console.log('Lista Skus: ' + JSON.stringify(listaSku));

    var validaDatosRequeridos = validaInputs();

    if (validaDatosRequeridos == true) {

        strTituloEvento = $('#idTituloEvent').val();
        strJustificacionEvt = $('#idJistificacionEvent').val();
        dtmFechaInicioEvt = $('#filter-date').val();
        dtmFechaFinalizacionEvt = $('#filter-date1').val();
        strTipoEnvio = $('#idTipoEnvio option:selected').attr('value');
        strTipoTienda = $('#idTipoTiendas option:selected').attr('value');
        intIdCanal = $('#idCompCanales').val();
        intIdPromociones = $('#idPromociones').val();        
        dtmFechaActual = obtenerFechaActual();

        var blnFechasValidas = validaFechasMenoresMayores();

        console.log("UsuarioId :. " + strIdUsuario);

        if (blnFechasValidas == true) {

            var simulacion = {
                ProductoId: parseInt(intIdTipoProducto),
                TipoDistribucion: parseInt(strTipoEnvio),
                PaisId: intPaisID,
                CanalId: parseInt(intIdCanal),
                TipoTiendasId: parseInt(strTipoTienda),
                Descripcion: strTituloEvento,
                FechaIni: dtmFechaInicioEvt,
                FechaFin: dtmFechaFinalizacionEvt,
                Usuario: strIdUsuario.toString(),
                Fecha: dtmFechaActual
            }

            if (strRutaImgJustificacion == undefined) {
                listaSku = [];
                mostrarModalMensaje(1, "La imagen no pudo cargarse");
                strRutaImgJustificacion = " ";
            } 

            if (LstSimulacionMercadeo == "") {
                listaSku = [];
                mostrarModalMensaje(1, "Tu solicitud no puede ser procesada, es necesario generar una cotización");
            } 
 
                if (strTipoEnvio == "1") {

                    console.log(JSON.stringify(requestSM));

                    requestSM = {
                        TipoMercadeo: parseInt(intIdTipoMercadeo),
                        IdTipoPromocion: intIdPromociones,
                        Anexo: strRutaImgJustificacion,
                        Observaciones: strJustificacionEvt,
                        Simulacion: simulacion,
                        Sucursales: strSucursales,
                        LstSimulacionMercadeo: LstSimulacionMercadeo
                    }

                    if (strTipoCargaSucursal == "1") {

                        if (lstSucursales == undefined || lstSucursales == "") {
                            listaSku = [];
                            mostrarModalMensaje(1, "Tu solicitud no puede ser procesada, es necesario cargar el archivo de sucursales");
                            blnCargaCorrecta = false;

                        } else {
                            lstSucursales = strSucursales;
                            guardarSimulacion(requestSM, listaSku);
                          
                        }


                    }

                } else {

                    lstSucursales = "0";
                    requestSM = {
                        TipoMercadeo: parseInt(intIdTipoMercadeo),
                        IdTipoPromocion: intIdPromociones,
                        Anexo: strRutaImgJustificacion,
                        Observaciones: strJustificacionEvt,
                        Simulacion: simulacion,
                        Sucursales: strSucursales,
                        LstSimulacionMercadeo: LstSimulacionMercadeo
                    }

                    guardarSimulacion(requestSM, listaSku);

                }

        } else {
            listaSku = [];
            mostrarModalMensaje(1, "La fecha inicio no puede ser mayor a la fecha final");
        }
             
    } else {
        listaSku = [];
        mostrarModalMensaje(1, "Tu solicitud no puede ser procesada, es necesario llenar los campos obligatorios")
    }
}



function callFunction(intIdTipoMercadeo, objProductoASimular, objIdProductoASimular) {

    intIdTipoProducto = $('#idCompTipoProd option:selected').attr('value');
    intIdFamilia = $('#idCompFamiliaProd option:selected').attr('value');
    strIdTipoCliente = $('#idComTipoClt option:selected').attr('value');
    intIdPeriodicidad = parseInt($('#idComPeriodicidad option:selected').attr('value'));
    dblApoyoEkt = $("#IdApoyoEkt").val();

    if (dblApoyoEkt == "") {
        dblApoyoEkt = 0;
    }

    $.each(objProductoSap, function (key, value) {
        if (intIdFamilia == value.IdFamilia) {
            strDescFamilia = value.DescCorta;
        }
    });

    if (intIdTipoProducto == strIdConsumoProd) {

        strDescFamilia = strDescfamiliaConsumo;
    }

    var objCondicionesCotizar = [];
    objCondicionesCotizar.push(intIdTipoProducto);
    objCondicionesCotizar.push(intIdFamilia);
    objCondicionesCotizar.push(strIdTipoCliente);
    objCondicionesCotizar.push(intIdPeriodicidad);
    objCondicionesCotizar.push(dblApoyoEkt);
    objCondicionesCotizar.push(strDescFamilia);


    switch (intIdTipoMercadeo) {

        case strMercadeoAbono:
            calculaCotizacionAbono(objCondicionesCotizar,objProductoASimular, objIdProductoASimular);
            break;
        case strMercadeoTasa:
            calculaCotizacionTasa(objCondicionesCotizar,objProductoASimular, objIdProductoASimular);
            break;
    }
}

function calculaCotizacionAbono(objCondicionesCotizar,objProductoASimular, objIdCampos) {

    var objJson = {
        PrecioA: parseFloat(objProductoASimular[2]),
        Enganche: parseFloat(objProductoASimular[3]),
        Descuento: 0,
        IdProducto: parseInt(objCondicionesCotizar[0]),
        DescProducto: objCondicionesCotizar[5],
        idTipoCliente: objCondicionesCotizar[2],
        IdPeriodicidad: parseInt(objCondicionesCotizar[3]),
        AbonoPuntual: parseFloat(objProductoASimular[13]),
        Plazo: parseInt(objProductoASimular[4]),
        TasaPuntualP: parseFloat(objProductoASimular[10]),
        ApoyoEkt: parseFloat(objCondicionesCotizar[4]),
        IdFamilia: parseInt(objCondicionesCotizar[1])
    }
    
    console.log("Valores de obJSON :. " + (JSON.stringify(objJson)));

    var data = servicesCallMethod(urlSimulador +"getSimulacionAbono", JSON.stringify(objJson), POST, true).then(objJson => {
        objJson.json().then(objSM => {
            console.log(objSM) 

            intErrorEnTasa = objSM.respuesta.tasaValida;    

            if (intErrorEnTasa == 1) {

                $('#' + objIdCampos[10] + '').addClass("validaTasa");
                
            } else {

                $('#' + objIdCampos[10] + '').removeClass("validaTasa");
            }            

            $('#' + objIdCampos[7] + '').text(objSM.respuesta.abonoNormal);
            $('#' + objIdCampos[8] + '').text(objSM.respuesta.ultimoAbono);
            $('#' + objIdCampos[9] + '').text(parseFloat(objSM.respuesta.descuentoTasa));
            $('#' + objIdCampos[10] + '').text(objSM.respuesta.tasaPuntual);
            $('#' + objIdCampos[11] + '').text(parseFloat(objSM.respuesta.tir));
            $('#' + objIdCampos[12] + '').text(parseFloat(objSM.respuesta.vpn));

            if (objSM.respuesta.lstMensajesdeValidacion.length > 0) {
                var strAdvertencias = "";
                objSM.respuesta.lstMensajesdeValidacion.forEach(element => strAdvertencias += "*" + element + ". <br>");
                intObjTemporalOnFocus = indexFocusGeneral;
                mostrarModalMensaje(1,strAdvertencias);
            }
            $canfocus.eq(indexFocusGeneral).focus();                         
        })
    })
        .catch(objJson => {
            objJson.json().then(json => {
                window.console.log(json);
                $('#' + objIdCampos[6] + '').find('input[type="text"]').val('');
                mostrarModalMensaje(1, json.errorMessage)
            })
        });

    objProductoASimular = [];
    objIdProductoASimular = [];
}

function calculaCotizacionTasa(objCondicionesCotizar, objProductoASimular, objIdCampos) {

    console.log("Valores de Arreglo :. " + objProductoASimular);

    var objJson = {
        PrecioA: parseFloat(objProductoASimular[2]),
        Enganche: parseFloat(objProductoASimular[3]),
        Descuento: 0,
        IdProducto: parseInt(objCondicionesCotizar[0]),
        DescProducto: objCondicionesCotizar[5],
        idTipoCliente: objCondicionesCotizar[2],
        IdPeriodicidad: parseInt(objCondicionesCotizar[3]),
        AbonoPuntual: parseFloat(objProductoASimular[5]),
        Plazo: parseInt(objProductoASimular[4]),
        TasaPuntualP: parseFloat(objProductoASimular[14]),
        ApoyoEkt: parseFloat(objCondicionesCotizar[4]),
        IdFamilia: parseInt(objCondicionesCotizar[1])
    }
    console.log("Valores de obJSON :. " + (JSON.stringify(objJson)));

    var data = servicesCallMethod(urlSimulador +"getSimulacionTasa", JSON.stringify(objJson), POST, true).then(objJson => {
        objJson.json().then(objSM => {
            console.log(objSM)

            intErrorEnTasa = objSM.respuesta.tasaValida;

            if (intErrorEnTasa == 1) {

                $('#' + objIdCampos[11] + '').addClass("validaTasa");
                $('#' + objIdCampos[11] + '').find('input[type="text"]').addClass("validaTasa");
                intErrorEnTasaMin = 1;
            } else {

                $('#' + objIdCampos[11] + '').removeClass("validaTasa");
                $('#' + objIdCampos[11] + '').find('input[type="text"]').removeClass("validaTasa");
            }

            $('#' + objIdCampos[6] + '').text(objSM.respuesta.abonoPuntual);
            $('#' + objIdCampos[7] + '').text(objSM.respuesta.abonoNormal);
            $('#' + objIdCampos[8] + '').text(objSM.respuesta.ultimoAbono);
            $('#' + objIdCampos[9] + '').text(parseFloat(objSM.respuesta.descuentoTasa));
            $('#' + objIdCampos[12] + '').text(parseFloat(objSM.respuesta.tir));
            $('#' + objIdCampos[13] + '').text(parseFloat(objSM.respuesta.vpn));

            if (objSM.respuesta.lstMensajesdeValidacion.length > 0) {
                var strAdvertencias="";
                objSM.respuesta.lstMensajesdeValidacion.forEach(element => strAdvertencias += element + "<br>");     
                intObjTemporalOnFocus = indexFocusGeneral;
                mostrarModalMensaje(1,strAdvertencias);
            }
            $canfocus.eq(indexFocusGeneral).focus();            
        })
    })
        .catch(objJson => {
            objJson.json().then(json => {
                window.console.log(json);
                $('#' + objIdCampos[11] + '').find('input[type="text"]').val('');
                mostrarModalMensaje(1, json.errorMessage)
            })
        });

    objProductoASimular = [];
    objIdProductoASimular = [];
}


function guardarSimulacion(requestSimulacion, lstSimulacion) {

    var data = servicesCallMethod(urlSimulador + 'EnviarSimulacion', JSON.stringify(requestSimulacion), POST, true).then(objJson => {
        switch (objJson.status) {
            case 200:
                objJson.json().then(objSM => {

                    var intFolioSimulacion = objSM.respuesta.folioSimulacion;
                    var intNumeroDeSolicitud = objSM.respuesta.numSolicitud;
                    if (objSM.respuesta.lstMensajesExcepcion.length > 0) {
                        LstMsjExcepcion = objSM.respuesta.lstMensajesExcepcion;
                    } else {
                        LstMsjExcepcion = [];
                    }                   
                    mostrarModalMensaje(4, "Tu solicitud con el folio", intFolioSimulacion, "ha sido enviada para autorización.", "Te avisaremos cuando su estatus cambie.");
                    EnviaCorreoCadena(intFolioSimulacion, intNumeroDeSolicitud, lstSimulacion, LstMsjExcepcion);
                })
                break;
            case 500:
                objJson.json().then(objSM => {
                    var strmensajeError = objSM.mensaje;
                    mostrarModalMensaje(1, strmensajeError, "La simulación no se puede generar");
                })
                break;
            default:
                break;
        }
    })
        .catch(objJson => {
            objJson.json().then(json => {
                window.console.log(json);
                var strmensajeError = json.mensaje;
                mostrarModalMensaje(1, strmensajeError, "La simulación no se puede generar");
            })
        });
}

function EnviaCorreoCadena(intFolioSimulacion, intNumeroDeSolicitud, lstSimulacion,LstMsjExcepcion) {


    strTipoEnvio = $('#idTipoEnvio option:selected').text();
    strDescCanal = $('#idCompCanales option:selected').text();
    dtmFechaInicioEvt = $('#filter-date').val();
    dtmFechaFinalizacionEvt = $('#filter-date1').val();

    var objJson = {
        Usuario: strIdUsuario.toString(),
        Folio: intFolioSimulacion.toString(),
        Vigencia: strVigencia,
        Producto: intIdTipoProducto,
        TipoEnvio: strTipoEnvio,
        Canal: strDescCanal,
        FechaInicio: dtmFechaInicioEvt,
        FechaFin: dtmFechaFinalizacionEvt,
        Solicitud: intNumeroDeSolicitud.toString()
    }
    console.log(JSON.stringify(objJson));
    var data = servicesCallMethod(urlEnvioCorreo + "ValidaCadenas/ValidaParametrosC/", JSON.stringify(objJson), POST, true).then(objJson => {
        objJson.json().then(objSM => {
            console.log(objSM);
            envioCorreos(objSM, lstSimulacion, LstMsjExcepcion);
        })
    });
}

function envioCorreos(objetoCadena, lstSimulacion, LstMsjExcepcion) {
    console.log(objetoCadena)

    strTituloEvento = $('#idTituloEvent').val();
    let objetoPeticion = {
        Cadena: objetoCadena.cadena,
        Descripcion: strTituloEvento,
        Sucursales: lstSucursales,
        listaSku: lstSimulacion,
        LstMensajesExcepcion: LstMsjExcepcion
    }
    console.log(JSON.stringify(objetoPeticion));

    var data = servicesCallMethod(urlEnvioCorreo + "EnvioMail/EnviarCorreo/", JSON.stringify(objetoPeticion), POST, true).then(objJson => {
        objJson.json().then(objSM => {
            console.log("Envio de Correos - Ok")
            console.log(objSM);
        })
    });
}

function obtieneSkusSimulacionBase() {

    var strSku;
    var dblPreciode;
    var dblPrecioa;
    var dblEnganche;

    LstSimulacionBase = [];

    $('#tblSkus tbody tr').each(function () {
       
        if ($(this).find('td').eq(0).find("input:checkbox.checkM").prop('checked')) {

            strSku = $(this).find('td').eq(1).text();
            dblPreciode = $(this).find('td').eq(3).text();
            dblPrecioa = $(this).find('td').eq(4).find('input[type="text"]').val();
            dblEnganche = $(this).find('td').eq(5).find('input[type="text"]').val();

            var filaSku = {
                Sku: strSku,
                PrecioDe: parseFloat(dblPreciode),
                PrecioA: parseFloat(dblPrecioa),
                Enganche: parseFloat(dblEnganche)
            }
            LstSimulacionBase.push(filaSku);
        } 
    });

   
    console.log("Valores para generar peticion base");
    console.log(JSON.stringify(LstSimulacionBase));

    return LstSimulacionBase;

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


function validaSeleccionPlazos() {

    strPlazosValidos = $('#idPlazos').select2("val");

    if (strPlazosValidos == null) {

        mostrarModalMensaje(1, "Es necesario proporcionar un plazo para generar una simulación");

        return false;

    } else {

        return true;
    }

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

function eliminaRegistrosVacios(intIdTipoMercadeo) {

    strInput = " ";

    switch (intIdTipoMercadeo) {

        case strMercadeoTasa:

            $('#tblSM tbody tr').each(function () {
                strInput = $(this).find('td').eq(11).find('input[type="text"]').val();
                if (strInput == "") {
                    $(this).closest('tr').remove();
                    blnConfirmacion = true;
                }
            });
            break;

        case strMercadeoAbono:

            $('#tblSM tbody tr').each(function () {
                strInput = $(this).find('td').eq(6).find('input[type="text"]').val();
                if (strInput == "") {
                    $(this).closest('tr').remove();
                    blnConfirmacion = true;
                }
            });
            break;
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


function generaSimulacionPropuesta(strValorPropuesto, objValoresTbl, objIdValoresTbl) {


    if (strValorPropuesto == undefined) {

        objProductoASimular = objValoresTbl;
        objIdProductoASimular = objIdValoresTbl;
        _intPrimerProducto = 1;
        strValorPropuesto = "";
    }
    if (_intPrimerProducto == 1) {

        if (strValorPropuesto != "" && strValorPropuesto != undefined) {
            objProductoASimular.push(strValorPropuesto);
            callFunction(intIdTipoMercadeo);
            _intPrimerProducto = 0;
        }
        console.log("Simular: " + objProductoASimular);
        console.log("Ids :. " + objIdProductoASimular);
        objProductoASimular = objValoresTbl;
        objIdProductoASimular = objIdValoresTbl;

    } else {

        if (strValorPropuesto != "" && strValorPropuesto != null) {
            objProductoASimular.push(strValorPropuesto);

            callFunction(intIdTipoMercadeo);
            _intPrimerProducto = 0;
        }

        objProductoASimular = objValoresTbl;
        objIdProductoASimular = objIdValoresTbl;
        console.log("Productos :. " + objProductoASimular);
        console.log("Ids :. " + objIdProductoASimular);
    }

}

function ValidaSoloNumeros(e) {

    var keynum = window.event ? window.event.keyCode : e.which;
    var key = keynum ? e.which : e.keyCode;
    console.info("Evento Teclado :. " + key)
    return ((key >= 48 && key <= 57) || key == 46 || key == 37);
}

let blnVerificaEnvioSucursales;
async function validaTipodeEnvioSucursales(){
   
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

        //if (blnConfirmarEnvioSucursal) {
        //    console.log("Confirmar envio modal de advertencia" + blnConfirmarEnvioSucursal);
        //    strSucursales = strIntersectsucursales;
        //    blnCargaCorrecta = true;
        //    console.log("Validacion Proceso de carga correcto: " + blnCargaCorrecta)
        //} else {
        //    listaSku = [];
        //    mostrarModalMensaje(1, "Tu solicitud no puede ser procesada, es necesario proporcionar las sucursales de destino");
        //    blnCargaCorrecta = false;
        //    console.log("Validacion Proceso de carga incorrecto: " + blnCargaCorrecta)
        //}
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
        uriVariablesId = `${urlEventosP}/${metodo}/${idUsrLogin}`;
        const formVariables = new FormData();
        formVariables.append("file", files[0]);
        servicesVariables(uriVariablesId, formVariables, POST, true)
            .then(respuesta => {
                switch (respuesta.status) {
                    case 200:
                        respuesta.json().then(objetoJson => {
                            objetoExcel = objetoJson;
                            if (objetoJson.respuesta.tipoTasaM.length > 0) {
                                $('.divDato').show();
                                pintarTabla(objetoJson.respuesta.tipoTasaM, false);
                                if (objetoJson.respuesta.esValido == false) {
                                    $('.btnA.guardar').unbind('click').css('cursor', 'not-allowed');
                                    $('#modalGuardarParam').find(".txtModal").html("").html("<div><h4>Alguna o algunas familias no se encontraron en la base de datos, por favor de validar las familias con sistemas</h4></div>");
                                    $('#modalGuardarParam').modal({
                                        focus: true,
                                        persist: true,
                                    });
                                }
                            } else {
                                $('#modalGuardarParam').find(".txtModal").html("").html("<div>El archivo no tiene el formato requerido. Favor de revisarlo</div>");
                                $('#modalGuardarParam').modal({
                                    focus: true,
                                    persist: true,
                                    onClose: () => {
                                        window.location.replace(hrefParametros);
                                    }
                                });

                            }
                        });
                        break;
                    default:
                        respuesta.text().then(objetoJson => {

                            $('#modalGuardarParam').find(".txtModal").html("").html('<div>Estatus error:'+ error.status+ ' ' +error.statusText + ' Recurso no encontrado: '+ error.url +'</div>');
                            $('#modalGuardarParam').modal({
                                focus: true,
                                persist: true,
                                onClose: () => {
                                    window.location.replace(hrefParametros);
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
                            let jsonObjeto = JSON.parse(objeto);
                            $('#modalGuardarParam').find(".txtModal").html("").html('<div>Estatus error:' + error.status + ' ' + jsonObjeto.errorMessage + '</div>');
                            $('#modalGuardarParam').modal({
                                focus: true,
                                persist: true,
                                onClose: () => {
                                    window.location.replace(hrefParametros);
                                }
                            });
                        } else {
                            $('#modalGuardarParam').find(".txtModal").html("").html('<div>Estatus error:' + error.status + ' ' + error.statusText + ' Recurso no encontrado: ' + error.url + '</div>');

                            $('#modalGuardarParam').modal({
                                focus: true,
                                persist: true,
                                onClose: () => {
                                    window.location.replace(hrefParametros);
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
        /*let thPlazo = document.createElement('th');
        let textoTdPlazo = document.createTextNode("Sku");
        thPlazo.appendChild(textoTdPlazo);
        trCabecera.appendChild(thPlazo);*/
        let plazos;
        plazos = element.variablesCabeceras.map((value, index, array) => {
            let thVariables = document.createElement('th');
            let textoTdVariables = document.createTextNode(value.cDescripcion);
            /*if (parseInt(value.fiVariableId) === 0) {
                thVariables.setAttribute("class", "advertenciaVariable");
            }*/
            thVariables.appendChild(textoTdVariables);
            trCabecera.appendChild(thVariables);

          /*  value.variablesV.forEach((ele, n, obj) => {
                console.log(ele)
            }
            )*/
            return value.variablesV.map((value, index, array) => value.valor);
        });
        table.appendChild(tbody);
        plazos = plazos.reduce((previus, current) => previus.concat(current));
        plazosNoRepetidos = new Set(plazos);
        var valorInial = element.variablesCabeceras.length;
        var valorFinal = element.variablesCabeceras[0].variablesV.length;

        //var nuevoArre [valorInial][valorFinal] = null;
        for (var a1 = 0; a1 < valorFinal; a1++) {
            let trPlazo = document.createElement('tr');
            element.variablesCabeceras.forEach((value, index, array) => {
                let tdVariable = document.createElement('td');
                let textTdVariable = document.createTextNode(value.variablesV[a1].valor);
                    tdVariable.appendChild(textTdVariable);
                    trPlazo.appendChild(tdVariable);
            });
            tbody.append(trPlazo);

        }
       
       /* element.variablesCabeceras.map((value, index, array) => {
            
            if (index == 0) {
                value.variablesV.forEach((ele, n, obj) => {
                    if (n == 0) {
                        let trPlazo = document.createElement('tr');
                    }
                    let tdPLazo = document.createElement('td');
                    let textoTdPlazo = document.createTextNode(ele)
                    tdPLazo.appendChild(textoTdPlazo);
                    trPlazo.appendChild(tdPLazo);
                    //console.log(ele)
                }
                )
            }
           
         //   return value.variablesV.map((value, index, array) => value.valor);
        });*/



      /*  plazosNoRepetidos.forEach((ele, n, obj) => {
            let trPlazo = document.createElement('tr');
            let tdPLazo = document.createElement('td');
            let textoTdPlazo = document.createTextNode(ele);
            tdPLazo.appendChild(textoTdPlazo);
            trPlazo.appendChild(tdPLazo);

            variables = element.variablesCabeceras.map(function (task, index, array) {
               // return task.variables.filter((task) => task.plazo == ele);
            });
          /*  variables.map((value, index, arra) => {
                let tdVariable = document.createElement('td');
                let textTdVariable = document.createTextNode(value[0].valor + (value[0].esPorcentaje ? "%" : ""));
                if (verValidacion) {
                    if (value[0].encontrado) {
                        if (!value[0].esValido) {
                            tdVariable.className = "variableNoValida";
                        }
                    } else {
                        tdVariable.className = "variableNoEncontrada";
                    }
                }
                tdVariable.appendChild(textTdVariable);
                trPlazo.appendChild(tdVariable);
            });

            */
         //   tbody.append(trPlazo);
        //});




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
