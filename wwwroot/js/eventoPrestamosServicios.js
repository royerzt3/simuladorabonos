function servicesVariables(url, data, metodo, isJson) {
    return new Promise((resolve, reject) => {
        let request;
        switch (metodo) {
            case 'GET':
                request = new Request(url, {
                    method: metodo,
                    header: myHeaders,
                    signal: signal
                });
                break;
            case 'POST':
                request = new Request(url, {
                    method: metodo,
                    headers: undefined,
                    body: data,
                    signal: signal
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
                    reject(data);
                } else if (data.status >= 500) {
                    reject(data);
                } else {
                    resolve(data);
                }
            })
            .catch(error => {
                $("#cargando").hide();
                reject(error);
            });
    });
}
function callServiceTipoEven() {
    limpiarCombo("idTipoEnvio");

    var idEventTipo;
    var strDecEventoTipo;

    var data = servicesCallMethod(urlCatalogos + 'getMTiposEvento', null, POST, true).then(objJson => {
        objJson.json().then(objSM => {
            var select = document.getElementById("idTipoEnvio");

            var option = document.createElement("option");
            var varDescOpction = document.createTextNode("Selecciona Tipo de envío");
            option.appendChild(varDescOpction);
            option.setAttribute("value", -1);
            select.appendChild(option);

            $.each(objSM.respuesta, function (key, value) {

                
                idEventTipo = value.fiEventTipo;
                if (idEventTipo != 2) {
                    strDecEventoTipo = value.fcDecEventoTipo;

                    var option = document.createElement("option");
                    var varDescOpction = document.createTextNode(strDecEventoTipo);
                    option.appendChild(varDescOpction);
                    option.setAttribute("value", idEventTipo);
                    select.appendChild(option);
                }
                
                

            });
            if (ObjTipoEnvio != undefined) {
                ObjTipoEnvio.dispose();
            }
            ObjTipoEnvio = new Dropkick("#idTipoEnvio");
            ObjTipoEnvio.refresh();
        });
    });
}
function callServicePaises() {
    limpiarCombo("idCompPaises");

    var idPais;
    var strDescPais;

    var data = servicesCallMethod(urlCatalogos + 'getMPais', null, POST, true).then(objJson => {
        objJson.json().then(objSM => {
            var select = document.getElementById("idCompPaises");

            var option = document.createElement("option");
            var varDescOpction = document.createTextNode("Selecciona país");
            option.appendChild(varDescOpction);
            option.setAttribute("value", 0);
            select.appendChild(option);

            $.each(objSM.respuesta, function (key, value) {
                
                if (value.fiStatus == 1) {
                    idPais = value.fiPais;
                    strDescPais = value.fcDesLarga;

                    var option = document.createElement("option");
                    var varDescOpction = document.createTextNode(strDescPais);
                    option.appendChild(varDescOpction);
                    option.setAttribute("value", idPais);
                    select.appendChild(option);
                }
               
            });
            if (ObjPaises != undefined) {
                ObjPaises.dispose();
            }
            ObjPaises = new Dropkick("#idCompPaises");
            ObjPaises.refresh();
        });
    });
}

function callServiceTipoCliente( idPaisSelct) {
    limpiarCombo("idCompTipoDeCliente");
    var idTipoCliente;
    var strDescCliente;
    var peticion = {
        pais: parseInt(idPaisSelct),
        producto: 2
    }
    console.log(peticion)
    var data = servicesCallMethod(urlCatalogos + 'getMTipoCliente', JSON.stringify(peticion), POST, true).then(objJson => {
        objJson.json().then(objSM => {
            var select = document.getElementById("idCompTipoDeCliente");

            var option = document.createElement("option");
            var varDescOpction = document.createTextNode("Selecciona tipo de cliente");
            option.appendChild(varDescOpction);
            option.setAttribute("value", 0);
            select.appendChild(option);

            $.each(objSM.respuesta, function (key, value) {

                    idTipoCliente = value.fiTipoClienteId;
                    strDescCliente = value.fcDescCliente;

                    var option = document.createElement("option");
                    var varDescOpction = document.createTextNode(strDescCliente);
                    option.appendChild(varDescOpction);
                    option.setAttribute("value", idTipoCliente);
                    select.appendChild(option);
                

            });
            if (ObjTiposCl != undefined) {
                ObjTiposCl.dispose();
            }
            ObjTiposCl = new Dropkick("#idCompTipoDeCliente");
            ObjTiposCl.refresh();
        });
    });
}
function callServicePeriodos(idPaisSelct) {
    limpiarCombo("idCompPeriodo");
    var idSubProducto;
    var strDesSubProducto;
    var peticion = {
        pais: parseInt(idPaisSelct)
    }
    console.log(peticion)
    var data = servicesCallMethod(urlCatalogos + 'getMPeriodos', JSON.stringify(peticion), POST, true).then(objJson => {
        objJson.json().then(objSM => {
            var select = document.getElementById("idCompPeriodo");

            var option = document.createElement("option");
            var varDescOpction = document.createTextNode("Selecciona perido");
            option.appendChild(varDescOpction);
            option.setAttribute("value", 0);
            select.appendChild(option);

            $.each(objSM.respuesta, function (key, value) {

                idSubProducto = value.fiPeriodo;
                strDesSubProducto = value.fcPeriodoDesc;

                var option = document.createElement("option");
                var varDescOpction = document.createTextNode(strDesSubProducto);
                option.appendChild(varDescOpction);
                option.setAttribute("value", idSubProducto);
                select.appendChild(option);


            });
            if (objPeridos != undefined) {
                objPeridos.dispose();
            }
            objPeridos = new Dropkick("#idCompPeriodo");
            objPeridos.refresh();
        });
    });
}


function callServicePromociones(idPaisSelct) {
    limpiarCombo("idCompPromocion");
    var idSubProducto;
    var strDesSubProducto;
    var peticion = {
        pais: parseInt(idPaisSelct),
        producto: 4
    }
    console.log(peticion)
    var data = servicesCallMethod(urlCatalogos + 'getMPromocionesConsumo', JSON.stringify(peticion), POST, true).then(objJson => {
        objJson.json().then(objSM => {
            var select = document.getElementById("idCompPromocion");

            var option = document.createElement("option");
            var varDescOpction = document.createTextNode("Selecciona promoción");
            option.appendChild(varDescOpction);
            option.setAttribute("value", 0);
            select.appendChild(option);

            $.each(objSM.respuesta, function (key, value) {

                    idSubProducto = value.fiSubProducto;
                strDesSubProducto = value.fiDesSubProducto;

                    var option = document.createElement("option");
                    var varDescOpction = document.createTextNode(strDesSubProducto);
                    option.appendChild(varDescOpction);
                    option.setAttribute("value", idSubProducto);
                    select.appendChild(option);
                

            });
            if (objPromos != undefined) {
                objPromos.dispose();
            }
            objPromos = new Dropkick("#idCompPromocion");
            objPromos.refresh();
        });
    });
}



async function callServiceFamiliaProducto(idProd) {

    limpiarCombo("idCompFamiliaProd");

    var peticion = {
        fiTipoProductoId: idProd.toString()
    }

    var stridFamilia;
    var strDescFamilia;
    var strDescCorta;
    objProductoSap = [];
    var idProducto;
    var objFamiliaProd;
    var opcID;
    var x = 1;
    
    var data = servicesCallMethod(urlCatalogos +"getLineaProducto", JSON.stringify(peticion), POST, true).then(objJson => {
        objJson.json().then(objSM => {

            var select = document.getElementById("idCompFamiliaProd");

            $.each(objSM.respuesta.lstRespuestaLineaProducto, function (key, value) {

                stridFamilia = value.fiFamiliaId;
          
                strDescFamilia = value.fcDescripcion;
                strDescCorta = value.fcDescCorta;
                $.each(LstObjProductoFamilia, function (key, value) {

                    idProducto = value.TipoProducto;
                    objFamiliaProd = value.TipoFamilia;
                    if (idProducto == idProd) {

                        $.each(objFamiliaProd, function (key, value) {

                            var stridFamiliaObj = value;

                            if (stridFamiliaObj == stridFamilia) {
                                
                                var option = document.createElement("option");
                                var varDescOpction = document.createTextNode(strDescFamilia);
                                option.appendChild(varDescOpction);
                                option.setAttribute("value", stridFamiliaObj);
                                select.appendChild(option);

                                let ProductoSap = {
                                    IdFamilia: stridFamilia,
                                    DescCorta: strDescCorta
                                }
                                objProductoSap.push(ProductoSap);

                                if (x == 1) {
                                    opcID = stridFamilia;
                                    x = 0;
                                }
                            }
                        })
                    }
                })
            })

            callSelectPlazos(idProd, opcID);
            console.log("Arreglo Descripcion Corta Familia :.  " + JSON.stringify(objProductoSap));

            if (ObjSelect != undefined) {
                ObjSelect.dispose();
            }

            ObjSelect = new Dropkick("#idCompFamiliaProd");
            ObjSelect.refresh();

        });

    });

    var strIdFamilia = $('#idCompFamiliaProd option:selected').attr('value');

    console.log("Id Familia Publish :. " + strIdFamilia);
}


function callServiceCanales(canalId) {
    var idAleatorio = null;

    var data = servicesCallMethod(urlCatalogos +"getCanal?fiGrupoCanalId="  + canalId, null, GET, true).then(objJson => {
        objJson.json().then(objSM => {

            var select = document.getElementById("idCompCanales");

            $.each(objSM.respuesta, function (key, value) {

                var option = document.createElement("option");
                var varDescOpction = document.createTextNode(value.fcDescripcion);

                option.appendChild(varDescOpction);
                option.setAttribute("value", value.fiCanalId);
                idAleatorio = value.fiCanalId;
                select.appendChild(option);
            })

            $('#idCompCanales > option[value="1"]').attr("selected", true);

            $("#idCompCanales").dropkick({
                mobile: true
            });

        });
    });

}

function callSelectPlazos(productoId, familiaId) {

    limpiarCombo("idPlazos");
    console.log("Producto Plazos: " + productoId + ", Familia Plazos: " + familiaId);

    var peticion = {
        Producto: parseInt(productoId),
        Familia: [parseInt(familiaId)]
    }

    var data = servicesCallMethod(urlCatalogos +"getPlazosValidos", JSON.stringify(peticion), POST, true).then(objJson => {
        objJson.json().then(objSM => {

            let options = $("#idPlazos").find("option");
            if (options.length > 0) {
                $("#idPlazos").find("option").remove();
            }

            var select = document.getElementById("idPlazos");
            var option = document.createElement("option");
            option.value = -1;
            option.textContent = "Seleccionar todo";
            select.appendChild(option);
            $.each(objSM.respuesta, function (key, value) {

                option = document.createElement("option");
                varDescOpction = document.createTextNode(value.plazo);

                option.appendChild(varDescOpction);
                option.setAttribute("value", value.plazo);
                select.appendChild(option);
            });
            if ($selectPLazosValidos) {
                $selectPLazosValidos.select2('destroy');
            }
            $selectPLazosValidos = $('#idPlazos').select2({
                width: '100%',
                placeholder: 'Selecciona un plazo',
                language: "es",
            });
            $selectPLazosValidos.trigger("change");
            $selectPLazosValidos.on('change', evtChangeSelect2);
        });
    });
}

function callServiceSkus(strCadenaSkus) {

    var LstProductos = [];

    var strPeticion = {
        Sku: strCadenaSkus
    }

    var data = servicesCallMethod(urlCatalogos + "getProductos", JSON.stringify(strPeticion), POST, true).then(objJson => {
        objJson.json().then(objSM => {

            LstProductos = objSM.respuesta;

            if (LstProductos.length > 0) {

                console.log(JSON.stringify(LstProductos));
                generaTablaSku(LstProductos);

                $('#idSkus').val('');

            } else {
                mostrarModalMensaje(1,"Los Skus proporcionados no son validos");
            }
            
           

        });

    });
}

function callServicesTipoEnvio() {

    var data = servicesCallMethod(urlCatalogos + "getTipoDistribucion", null, GET, true).then(objJson => {
        objJson.json().then(objSM => {

            var select = document.getElementById("idTipoEnvio");

            $.each(objSM.respuesta, function (key, value) {

                var option = document.createElement("option");
                var varDescOpction = document.createTextNode(value.fcDescripcion);

                option.appendChild(varDescOpction);
                option.setAttribute("value", value.fiTipoDistribucionId);
                select.appendChild(option);
            });

            $('#idTipoEnvio > option[value="1"]').attr("selected", true);


            $("#idTipoEnvio").dropkick({

                mobile: true
            });
        });
    });
}

function callServicesTipoTienda() {

    var data = servicesCallMethod(urlCatalogos + "getTipoTienda", null, GET, true).then(objJson => {
        objJson.json().then(objSM => {

            var select = document.getElementById("idTipoTiendas");

            $.each(objSM.respuesta, function (key, value) {

                var option = document.createElement("option");
                var varDescOpction = document.createTextNode(value.fcDescripcion);

                option.appendChild(varDescOpction);
                option.setAttribute("value", value.fiTipoTiendasId);
                select.appendChild(option);
            });

            $('#idTipoTiendas > option[value="2"]').attr("selected", true);

            $("#idTipoTiendas").dropkick({

                mobile: true
            });
        });
    });
}

function callSelectTipoClte(idTipoProducto) {

    limpiarCombo("idComTipoClt");

    var data = servicesCallMethod(urlCatalogos + "getTipoCliente?piTipoProductoId="+idTipoProducto, null, GET, true).then(objJson => {
        objJson.json().then(objSM => {

            var select = document.getElementById("idComTipoClt");

            $.each(objSM.respuesta, function (key, value) {

                var option = document.createElement("option");
                var varDescOpction = document.createTextNode(value.fcDescripcion);

                option.appendChild(varDescOpction);
                
                option.setAttribute("value", value.fiTipoClienteId);                
                select.appendChild(option);
            });
                  
            if (ObjCliente != undefined) {
                ObjCliente.dispose();
            }

            ObjCliente = new Dropkick("#idComTipoClt");
            ObjCliente.refresh();
        });
    });
}


function callSelectPeriodicidad() {
    var data = servicesCallMethod(urlCatalogos +"getPeriocidad", null, GET, true).then(objJson => {
        objJson.json().then(objSM => {

            var select = document.getElementById("idComPeriodicidad");

            $.each(objSM.respuesta, function (key, value) {

                var option = document.createElement("option");
                var varDescOpction = document.createTextNode(value.fcDescripcion);

                option.appendChild(varDescOpction);
                option.setAttribute("value", value.fiPeriodoId);
                select.appendChild(option);
            });
            $('#idComPeriodicidad > option[value="1"]').attr("selected", true);

            $("#idComPeriodicidad").dropkick({

                mobile: true
            });

        });
    });
}


//Funcion que invoca Simulacion por Tasa Base
function obtieneSimulacionBase(intIdTipoMercadeo, objPeticionSimulacion) {

    var data = servicesCallMethod(urlSimulador + "getSimulacionTasaBase", JSON.stringify(objPeticionSimulacion), POST, true).then(objJson => {
        objJson.json().then(objSM => {
            console.log(objSM);
            
            generaTablaCotizacion(intIdTipoMercadeo, objSM);
        })
    });

}

function callSelectPromociones(_productoID) {

    var data = servicesCallMethod(urlCatalogos + "getPromociones?fiTipoProductoId=" +_productoID, null, GET, true).then(objJson => {
        objJson.json().then(objSM => {

            var select = document.getElementById("idPromociones");

            $.each(objSM.respuesta, function (key, value) {

                var option = document.createElement("option");
                var varDescOpction = document.createTextNode(value.fcDescripcion);

                option.appendChild(varDescOpction);
                option.setAttribute("value", value.fiTipoPromocionId);
                select.appendChild(option);
            });

            $("#idPromociones").dropkick({

                mobile: true
            });
        });
    });


}

function callServiceProductos(objProducto) {

    var productoIdd = 0;
    var opc;
    var idProducto;
    var strDescProducto;

    var data = servicesCallMethod(urlCatalogos + 'getTipoProducto', null, GET, true).then(objJson => {
        objJson.json().then(objSM => {
            var select = document.getElementById("idCompTipoProd");
            $.each(objSM.respuesta.lstRespuestaTipoProducto, function (key, value) {
                idProducto = value.fiTipoProductoId;
                strDescProducto = value.fcDescripcion;
                $.each(objProducto, function (key, value) {
                    if (value == idProducto) {
                        var option = document.createElement("option");
                        var varDescOpction = document.createTextNode(strDescProducto);
                        option.appendChild(varDescOpction);
                        option.setAttribute("value", idProducto);
                        select.appendChild(option);
                    }
                })
            });
            if (ObjSelectProducto != undefined) {
                ObjSelectProducto.dispose();
            }
            ObjSelectProducto = new Dropkick("#idCompTipoProd");
            ObjSelectProducto.refresh();
        });
    });
}

function callSelectTipoMercadeo() {
    var data = servicesCallMethod(urlCatalogos + "getTipoMercadeo?fiVariableId=23", null, GET, true).then(objJson => {
        objJson.json().then(objSM => {

            var select = document.getElementById("idTipoMercadeo");

            $.each(objSM.respuesta, function (key, value) {

                var option = document.createElement("option");
                var varDescOpction = document.createTextNode(value.fcDescripcion);

                option.appendChild(varDescOpction);
                option.setAttribute("value", value.fcValor);
                select.appendChild(option);
            });
            $('#idTipoMercadeo > option[value="3"]').attr("selected", true);

            $("#idTipoMercadeo").dropkick({
                mobile: true
            });
        });
    });
}

 async function callCargaManualSucursales(strSucursalesM, intCanal, intTipotienda) {

    var objSucursalesM = {
        Sucursales: strSucursalesM,
        IdCanal: parseInt(intCanal),
        idTipoTienda: parseInt(intTipotienda)
    }

     var data = await servicesCallMethod(urlSimulador + "getCargaManualSucursales", JSON.stringify(objSucursalesM), POST, true).then(objJson => {
        switch (objJson.status) {
            case 200:
                objJson.json().then(objSM => {

                    strIntersectsucursales = objSM.respuesta.intersectSucursales;
                    strExceptSucursales = objSM.respuesta.exceptSucursales;
                    invocaCargaSucursalesManual();
                })
                break;
            case 500:
                objJson.json().then(objSM => {
                    var strmensajeError = objSM.mensaje;
                    mostrarModalMensaje(1, strmensajeError, ". La simulacion no se puede generar.");
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
                mostrarModalMensaje(1, strmensajeError);
            })
        });
}