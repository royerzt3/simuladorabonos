var ObjLineaP = undefined;
var ObjProducto = undefined;
var optionDefault = document.createElement("option");
var descOptionDefault = document.createTextNode("Todos");
var ObjModUsuario = {};
var nombreUsr;
var numeroEmpleado;
var idProducto;
var idFamilia;
var correo;
var idPerfil;
var idMercadeo;
var idProductoMod;
var celular;
var URLFoto;
var idStatus;
var datos;
var empleadoLogin;
var empresaUsr;
var modalEditarUsuario;
var modalBajaUsuario;
var motivoActualizacion;
var modalBajaFolio;
var folioDataSec;

$(document).ready(function () {

    var lstInfo = $('#lstUsr').val();

    cargaUsuarios(lstInfo);
});


$("#comboProductoMod").change(function () {

    limpiarCombo("comboLineaPMod");
    idProducto = ObjProducto.value;
    catalogoLineaProducto("comboLineaPMod", idProducto);
    if (idProducto == 0) {
        limpiarCombo("comboProductoMod");
        catalogoProductos("comboProductoMod");
    }
  
});

$("#btnGuardaMod").click(function () {
    var UsrModInfo = $("#infoUsrMod").val();
    var UsrMod = JSON.parse(UsrModInfo);

    var idUsuario = UsrMod.respuesta.informacionUsuario.fiUsuarioId;
    numeroEmpleado = UsrMod.respuesta.informacionUsuario.fiEmpleado;
    idProducto = parseInt($("#comboProductoMod").val());
    correo = $("#correoEmpleadoMod").val();
    celular = $("#celularMod").val();
    idFamilia = parseInt(ObjLineaP.value); //parseInt($("#comboLineaPMod").val());
    idPerfil = parseInt($("#comboPerfilMod").val());
    idMercadeo = parseInt($("#comboMercadeoPMod").val());
    motivoActualizacion = $("#motivoMod").val();
    nombreUsr = $("#nombreUsuariorMod").val();
    var datosValidos = validaciones("modalUsrMod");

    if (datosValidos == true) {
        ObjModUsuario = {
            fiUsuarioId: idUsuario,
            fiEmpleado: numeroEmpleado,
            fcNombre: nombreUsr,
            fiPerfilId: idPerfil,
            fcCorreo: correo,
            fcCelular: celular,
            fiStatus: 1,
            fiUsuario: idUsrLogin,
            fcMotivo: motivoActualizacion,
            lstUsrFamilia: []
        };

        ObjModUsuario.lstUsrFamilia.push(
            {
                fiTipoProductoId: idProducto,
                fiFamiliaId: idFamilia,
                fiGrupoCanalId: idMercadeo,
                fiStatus: 0

            });


        console.log(ObjModUsuario);
        consultaServicio(urlUsuarios + "actualizarUsuario", JSON.stringify(ObjModUsuario), "POST", true, "application/json").then(objJson => {
            switch (objJson.status) {
                case 200:
                    modalEditarUsuario.close();

                    objJson.json().then(objSM => {
                        $("#msjModal").html('<strong> ' + objSM.respuesta + ' </strong>');
                        $('#modalGuardarUsr').modal({
                            focus: true,
                            persist: true,
                            onClose: () => {
                                window.location.replace(hrefUsuarios);
                            }
                        });
                    })
                    break;
                case 400:

                    modalEditarUsuario.close();
                    objJson.json().then(objSM => {
                        console.log(objSM);
                        $("#msjModal").html('<strong> ' + objSM.errorMessage.substring(83, 206) + ' </strong>');
                        $('#modalGuardarUsr').modal({
                            focus: true,
                            persist: true,
                            onClose: () => {
                                window.location.replace(hrefUsuarios);
                            }
                        });
                    })
                    break;
                case 500:

                    modalEditarUsuario.close();
                    objJson.json().then(objSM => {
                        $("#msjModal").html('<strong> ' + objSM.errorInfo + ' </strong>');
                        $('#modalGuardarUsr').modal({
                            focus: true,
                            persist: true,
                            onClose: () => {
                                window.location.replace(hrefUsuarios);
                            }
                        });
                    })
                    break;
                default:
                    break;
            }
        }).catch(error => {
            console.log(error);
            error.json()
                .then(objeto => {

                    console.log(objeto);
                    //let jsonObjeto = JSON.parse(objeto);
                    modalEditarUsuario.close();
                    $("#msjModal").html('<strong> ' + objeto.errorMessage + ' </strong>');
                    $('#modalGuardarUsr').modal({
                        focus: true,
                        persist: true,
                        onClose: () => {
                            window.location.replace(hrefUsuarios);
                        }
                    });
                })

        });
    }
});

$("#btnNoBaja").click(function () {
    modalBajaUsuario.close();
});


$("#btnCancelarBaja").click(function () {
    modalBajaFolio.close();
});

$("#bajaUsr").click(function () {
    modalBajaUsuario.close();
    modalBajaFolio = $('#modalFolioDataSec').modal();

});

$("#btnBaja").click(function () {
    folioDataSec = $("#folioBaja").val();

    if (numeroEmpleado != idEmpleadoLogin) {

        var validacion = validaBaja();

        if (validacion == true) {

            consultaServicio(urlUsuarios + "getEstatusFolio?FolioDataSec=" + folioDataSec, null, "GET", true, "application/json").then(objJson => {
                switch (objJson.status) {
                    case 200:
                        objJson.json().then(objSM => {
                            if (objSM.respuesta == "APROBADA") {
                                ejecutaBaja();
                            } else {
                                modalBajaFolio.close();

                                $("#msjModal").html('<strong>Nos se puede dar de Baja el usuario porque el folio aún no está procesado</strong>');
                                $('#modalGuardarUsr').modal({
                                    focus: true,
                                    persist: true,
                                    onClose: () => {
                                        window.location.replace(hrefUsuarios);
                                    }
                                });
                            }
                        })
                        break;
                    case 400:
                        modalBajaFolio.close();
                        objJson.json().then(objSM => {
                            console.log(objSM);
                            $("#msjModal").html('<strong> ' + objSM.errorMessage.substring(83, 206) + ' </strong>');
                            $('#modalGuardarUsr').modal({
                                focus: true,
                                persist: true,
                                onClose: () => {
                                    window.location.replace(hrefUsuarios);
                                }
                            });
                        })
                        break;
                    case 500:
                        modalBajaFolio.close();
                        objJson.json().then(objSM => {
                            $("#msjModal").html('<strong> ' + objSM.errorInfo + ' </strong>');
                            $('#modalGuardarUsr').modal({
                                focus: true,
                                persist: true,
                                onClose: () => {
                                    window.location.replace(hrefUsuarios);
                                }
                            });
                        })
                        break;
                    default:
                        break;
                }
            }).catch(error => {
                error.text()
                    .then(objeto => {
                        let jsonObjeto = JSON.parse(objeto);
                        $("#msjModal").html('<strong> ' + jsonObjeto.respuesta + ' </strong>');
                        $('#modalGuardarUsr').modal({
                            focus: true,
                            persist: true,
                            onClose: () => {
                                window.location.replace(hrefUsuarios);
                            }
                        });
                    })
            });
        }
    } else {
        modalBajaFolio.close();
        $("#msjModal").html('<strong> No se puede dar de Baja el usuario que se encuentra logeado</strong>');
        $('#modalGuardarUsr').modal({
            focus: true,
            persist: true,
            onClose: () => {
                window.location.replace(hrefUsuarios);
            }
        });
    }
});



function ejecutaBaja() {

    consultaServicio(urlUsuarios + "bajaUsuario?&fiEmpleado=" + numeroEmpleado + "&fiUsuario=" + idUsrLogin, null, "GET", true, "application/json").then(objJson => {
        switch (objJson.status) {
            case 200:
                modalBajaUsuario.close();
                objJson.json().then(objSM => {
                    $("#msjModal").html('<strong> ' + objSM.respuesta + ' </strong>');
                    $('#modalGuardarUsr').modal({
                        focus: true,
                        persist: true,
                        onClose: () => {
                            window.location.replace(hrefUsuarios);
                        }

                    });
                })
                break;
            case 400:
                modalBajaUsuario.close();

                objJson.json().then(objSM => {
                    $("#msjModal").html('<strong> ' + objSM.errorMessage + ' </strong>');
                    $('#modalGuardarUsr').modal({
                        focus: true,
                        persist: true,
                        onClose: () => {
                            window.location.replace(hrefUsuarios);
                        }

                    });
                })
                break;
            case 500:
                modalBajaUsuario.close();

                objJson.json().then(objSM => {
                    $("#msjModal").html('<strong> ' + objSM.errorInfo + ' </strong>');
                    $('#modalGuardarUsr').modal({
                        focus: true,
                        persist: true,
                        onClose: () => {
                            window.location.replace(hrefUsuarios);
                        }

                    });
                })
                break;
            default:
                break;
        }
    }).catch(error => {
        console.log(error);
        error.text()
            .then(objeto => {
                let jsonObjeto = JSON.parse(objeto);

                $("#msjModal").html('<strong> ' + jsonObjeto.errorInfo + ' </strong>');
                $('#modalGuardarUsr').modal({
                    focus: true,
                    persist: true,
                    onClose: () => {
                        window.location.replace(hrefUsuarios);
                    }
                });
            })

    });

}


function cargaUsuarios(lstInfo) {

    var Usuarios = JSON.parse(lstInfo);
    $.each(Usuarios.LstInfoUsuarios, function (key, value) {

        $(".contUsus").append(
            '<div  class="usuario id' + key + '" id="usr' + key + '">' +
            '<div class="pic" ></div >' +
            '<div class="name1 divInfoUsr"><strong>' + value.FcNombre + '</strong> | <span class="txtCh spanIdEmpleado" id="idEmpleado-' + key + '">' +
            value.FiEmpleado + '</span > <br><span class="txtCh">' + value.FcCorreo + '</span></strong></div>' +
            '<div class="verSubmenu"  id="' + key + '"><img src="/SimuladorAbonos/img/dots-vertical.svg"></div>'
        );
        fotoUsr(value.FiEmpleado, "EKT", key);
    });

    $('.verSubmenu').on('click', function () {

        if ($(this).parent().children("#subMU").length > 0) {

            $("#subMU").remove('.jqcontextmenu');

        } else {

            $("#subMU").remove('.jqcontextmenu');

            $(".usuario.id" + $(this).attr('id')).append(
                '<div id="subMU" class="jqcontextmenu ver lp">' +
                '<a href="#" class="selOver modalEditar_view modUsuario">Modificar usuario</a>' +
                '<a href="#" class="selOver modalBaja_view bajaUsuario">Dar de baja</a>' +
                '</div >' +
                '</div>');

            $("#" + $(this).attr('id') + '.jqcontextmenu').css("visibility", "visible");

            $("#" + $(this).attr('id')).next().toggleClass("ver");


            $(".modalBaja_view").click(function () {
                numeroEmpleado = $(this).parent().siblings(".name1.divInfoUsr").children(".spanIdEmpleado").text();
                modalBajaUsuario = $('#modalBaja').modal();
            });

            $(".modalEditar_view").click(function () {
                numeroEmpleado = $(this).parent().siblings(".name1.divInfoUsr").children(".spanIdEmpleado").text();
                cargaUsuarioMod(numeroEmpleado);
                modalEditarUsuario = $('#modalEditar').modal();

                $("#celularMod").mask("(999) 999-9999");


            });
        }
    });

}

function cargaUsuarioMod(idEmpleado) {

    limpiarCombo("comboProductoMod");
    limpiarCombo("comboLineaPMod");
    limpiarCombo("comboPerfilMod");
    limpiarCombo("comboMercadeoPMod");

    consultaServicio(urlUsuarios + "validaUsuario?&fcEmpleado=" + idEmpleado + "&fcEmpresa=EKT", null, "GET", true, "application/json").then(objJson => {
        switch (objJson.status) {
            case 200:
                objJson.json().then(objSM => {
                    $("#infoUsrMod").val(JSON.stringify(objSM));
                    idPerfil = objSM.respuesta.informacionUsuario.fiPerfilId;

                    cargaComboProductosMod(objSM.respuesta.lstUsuarioFamilia);
                    cargaComboPerfilMod(idPerfil);

                    cargaComboMercadeoMod(objSM.respuesta.lstUsuarioFamilia[0].fiGrupoCanalId);


                    console.log(objSM.respuesta.informacionUsuario)
                    $("#nombreUsuariorMod").val(objSM.respuesta.informacionUsuario.fcNombre);
                    $("#idEmpleadoMod").val(objSM.respuesta.informacionUsuario.fiEmpleado);
                    $("#correoEmpleadoMod").val(objSM.respuesta.informacionUsuario.fcCorreo);
                    $("#celularMod").val(objSM.respuesta.informacionUsuario.fcCelular);
                    $('#modalEditar').modal();
                    $('.verSubmenu').next().addClass('ver');
                })
                break;
            default:
                break;
        }
    }).catch(error => {
        error.text()
            .then(objeto => {
                let jsonObjeto = JSON.parse(objeto);
                $("#msjModal").val(objSM.respuesta);
                $('#modalGuardarUsr').modal({
                    focus: true,
                    persist: true,
                    onClose: () => {
                        window.location.replace(hrefAdministrador);
                    }
                });
            })

    });
}

function catalogoProductos(idElemento) {


    consultaServicio(urlCatalogos + "getTipoProducto", null, "GET", true, "application/json").then(objJson => {
        objJson.json().then(objSM => {

            var select = document.getElementById(idElemento);

            optionDefault.appendChild(descOptionDefault);
            optionDefault.setAttribute("value", 0);
            select.appendChild(optionDefault);

            $.each(objSM.respuesta.lstRespuestaTipoProducto, function (key, value) {

                var option = document.createElement("option");
                var descOption = document.createTextNode(value.fcDescripcion);

                option.appendChild(descOption);
                option.setAttribute("value", value.fiTipoProductoId);
                select.appendChild(option);
            });

            if (ObjProducto != undefined) {
                ObjProducto.dispose();

            }

            ObjProducto = new Dropkick("#" + idElemento);
            ObjProducto.refresh();


        })
    });

}

function catalogoLineaProducto(idElemento, idProducto) {
    var select = document.getElementById(idElemento);

    if (idProducto == 0) {

        optionDefault.appendChild(descOptionDefault);
        optionDefault.setAttribute("value", 0);
        select.appendChild(optionDefault);

        if (ObjLineaP != undefined) {
            ObjLineaP.dispose();

        }

        ObjLineaP = new Dropkick("#" + idElemento);
        ObjLineaP.refresh();
        ObjLineaP.disable();

        cargaComboPerfilMod();
        cargaComboMercadeoMod();
    } else {

        var productos = {
            fiTipoProductoId: idProducto
        }
        consultaServicio(urlCatalogos + "getLineaProducto", JSON.stringify(productos), "POST", true, "application/json").then(objJson => {

            objJson.json().then(objSM => {

                $.each(objSM.respuesta.lstRespuestaLineaProducto, function (key, value) {

                    var option = document.createElement("option");
                    var descOption = document.createTextNode(value.fcDescripcion);

                    option.appendChild(descOption);
                    option.setAttribute("value", value.fiFamiliaId);
                    select.appendChild(option);

                });
                if (ObjLineaP != undefined) {
                    ObjLineaP.dispose();

                }

                ObjLineaP = new Dropkick("#" + idElemento);
                ObjLineaP.refresh();


            })
        });
    }


}

function cargaComboProductosMod(datosUsr) {
    var idProductoMod;

    consultaServicio(urlCatalogos + "getTipoProducto", null, "GET", true, "application/json").then(objJsonP => {
        objJsonP.json().then(objP => {

            var select = document.getElementById("comboProductoMod");
            var descOption;
            var productos = [];
            $.each(datosUsr, function (key, valueFam) {

                productos.push(valueFam.fiTipoProductoId);
            });

            if (productos.length > 1) {
                optionDefault.appendChild(descOptionDefault);
                optionDefault.setAttribute("value", 0);
                idProductoMod = optionDefault.value;
                select.appendChild(optionDefault);

                $.each(objP.respuesta.lstRespuestaTipoProducto, function (key, valueProd) {

                    var option = document.createElement("option");
                    descOption = document.createTextNode(valueProd.fcDescripcion);
                    option.appendChild(descOption);
                    option.setAttribute("value", valueProd.fiTipoProductoId);
                    select.appendChild(option);
                });

                if (ObjProducto != undefined) {
                    ObjProducto.dispose();

                }

                ObjProducto = new Dropkick("#comboProductoMod");
                ObjProducto.refresh();

            } else {
                optionDefault.appendChild(descOptionDefault);
                optionDefault.setAttribute("value", 0);
                select.appendChild(optionDefault);

                $.each(objP.respuesta.lstRespuestaTipoProducto, function (key, valueProd) {
                    $.each(productos, function (key, value) {

                        var option = document.createElement("option");

                        descOption = document.createTextNode(valueProd.fcDescripcion);
                        option.appendChild(descOption);
                        option.setAttribute("value", valueProd.fiTipoProductoId);
                        select.appendChild(option);

                        if (value == option.value) {
                            idProductoMod = option.value;
                            option.className += " dk-option-highlight";
                            option.defaultSelected = true;
                        }

                    });
                });

                if (ObjProducto != undefined) {
                    ObjProducto.dispose();

                }

                ObjProducto = new Dropkick("#comboProductoMod");
                ObjProducto.refresh();

            }
            cargarComboLineaPMod(idProductoMod, datosUsr);
            if (idProductoMod == 0) {
                limpiarCombo("comboProductoMod");
                catalogoProductos("comboProductoMod");
            }
        })
    });
}

function cargarComboLineaPMod(idProductoMod, lstFamiliaP) {

    var select = document.getElementById("comboLineaPMod");
    if (idProductoMod == 0) {

        optionDefault.appendChild(descOptionDefault);
        optionDefault.setAttribute("value", 0);
        select.appendChild(optionDefault);

        if (ObjLineaP != undefined) {
            ObjLineaP.dispose();
        }

        ObjLineaP = new Dropkick("#comboLineaPMod");
        ObjLineaP.refresh();
        ObjLineaP.disable();

    } else {

        var productos = {
            fiTipoProductoId: idProductoMod
        }

        consultaServicio(urlCatalogos + "getLineaProducto", JSON.stringify(productos), "POST", true, "application/json").then(objJsonLP => {
            objJsonLP.json().then(objLP => {

                var select = document.getElementById("comboLineaPMod");
                $.each(lstFamiliaP, function (key, value) {

                    $.each(objLP.respuesta.lstRespuestaLineaProducto, function (key, valueLP) {

                        var option = document.createElement("option");
                        var descOption = document.createTextNode(valueLP.fcDescripcion);

                        descOption = document.createTextNode(valueLP.fcDescripcion);
                        option.appendChild(descOption);
                        option.setAttribute("value", valueLP.fiFamiliaId);
                        select.appendChild(option);

                        if (value.fiFamiliaId == option.value) {
                            option.className += " dk-option-highlight";
                            option.defaultSelected = true;
                        }
                    });

                });
                if (ObjLineaP != undefined) {
                    ObjLineaP.dispose();

                }

                ObjLineaP = new Dropkick("#comboLineaPMod");
                ObjLineaP.refresh();

            })
        });
    }
}

function cargaComboPerfilMod(idPerfil) {
    consultaServicio(urlCatalogos + "getPerfil", null, "GET", true, "application/json").then(objJsonPerfil => {
        objJsonPerfil.json().then(objPerfilU => {

            var select = document.getElementById("comboPerfilMod");

            $.each(objPerfilU.respuesta.lstRespuestaPerfil, function (key, valueP) {


                var option = document.createElement("option");
                var descOption = document.createTextNode(valueP.fcDescripcion);

                option.appendChild(descOption);
                option.setAttribute("value", valueP.fiPerfilId);
                select.appendChild(option);

                if (idPerfil == valueP.fiPerfilId) {
                    option.className += " dk-option-highlight";
                    option.defaultSelected = true;
                    //option.style.backgroundColor = "#006341";
                }

            });
            $("#comboPerfilMod").dropkick({
                mobile: true
            });

        })
    });

}

function cargaComboMercadeoMod(idGrupoCanal) {
    consultaServicio(urlCatalogos + "getGrupoCanal", null, "GET", true, "application/json").then(objJsonGCanal => {
        objJsonGCanal.json().then(objGC => {

            var select = document.getElementById("comboMercadeoPMod");

            $.each(objGC.respuesta.lstRespuestaGrupoCanal, function (key, valueGC) {

                var option = document.createElement("option");
                var descOption = document.createTextNode(valueGC.fcDescripcion);

                option.appendChild(descOption);
                option.setAttribute("value", valueGC.fiGrupoCanalId);
                select.appendChild(option);

                if (idGrupoCanal == valueGC.fiGrupoCanalId) {
                    option.className += " dk-option-highlight";
                    option.defaultSelected = true;
                    //option.style.backgroundColor = "#006341";
                }
            });
            $("#comboMercadeoPMod").dropkick({
                mobile: true
            });

        })
    });

}

function validaciones(idElemento) {

    jQuery.validator.setDefaults({
        rules: {
            nombreUsr: {
                required: true,
                maxlength: 200
            },
            numeroUsr: {
                required: true,
                number: true,
                maxlength: 8
            },
            comboLineaP: {
                required: true,
                number: true
            },
            correoUsr: {
                required: true,
                email: true
            },
            celular: "required",
            motivoMod: {
                required: true,
                maxlength: 500
            },
        },
        messages: {
            nombreUsur: "Ingresa un nombre",
            numeroUsr: {
                required: "Ingresa el # de Empleado",
                number: "No puedes ingresar letras",
                maxlength: "El # no puede ser mayor a 8 dígitos"
            },
            comboLineaP: {
                required: "Ingresa una Línea de Producto",
                number: "Ingresa una Línea de Producto"
            },
            correoUsr: {
                required: "Ingresa un correo",
                email: "El formato es incorrecto"
            },
            celular: "Es necesario agregar un número de teléfono",
            motivoMod: {
                required: "Ingresa un motivo de Actualización",
                maxlength: "El motivo no puede ser mayor a 500 caracteres"
            }
        },
    });

    var form = $("#" + idElemento);
    form.validate();

    return form.valid();

}

function validaBaja() {

    jQuery.validator.setDefaults({
        rules: {
            folioBaja: {
                required: true,
                number: true
            }
        },
        messages: {
            folioBaja: {
                required: "Ingresa el Folio de Baja de DataSec",
                number: "No puedes ingresar letras",
            }
        },
    });

    var form = $("#bajaForm");
    form.validate();

    return form.valid();

}

function fotoUsr(fcEmpleado, fcEmpresa, key) {

    $("#cargando").show();
    consultaServicio(urlUsuarios + "getFoto?fcEmpleado=" + fcEmpleado + "&fcEmpresa=" + fcEmpresa, null, "GET", true, "application/json")
        .then(objJson => {
            objJson.json().then(objFoto => {
                URLFoto = objFoto.respuesta;
                $('.usuario.id' + key).children('.pic').css('background-image', 'url("' + URLFoto + '")');
            })


        });
    $("#cargando").hide();
}
