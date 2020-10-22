let controller = new AbortController();
let signal = controller.signal;
let $fileInput = $("#cargaArchivo");
let protocoloSimulador = window.location.protocolo;

const POST = "POST";
const GET = "GET";
let objetoExcel = [];

function cargarArchivo(objetoInputFile) {
    var metodo = "extraerVariables/usuario";
    let files = objetoInputFile.files;
    let uriVariablesId = "";
    if (files.length > 0) {
        uriVariablesId = `${urlVariables}/${metodo}/${idUsrLogin}`;
        const formVariables = new FormData();
        formVariables.append("file", files[0]);
        servicesVariables(uriVariablesId, formVariables, POST, true)
            .then(respuesta => {
                switch (respuesta.status) {
                    case 200:
                        respuesta.json().then(objetoJson => {
                            objetoExcel = objetoJson;
                            if (objetoJson.respuesta.productosFamilias.length > 0) {
                                $('.divDato').show();
                                pintarTabla(objetoJson.respuesta.productosFamilias, false);
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
    deshabilitarBotonGuardar();
    validarYGuardarDatos(objetoExcel.respuesta.productosFamilias);
}

function validarYGuardarDatos(familiasEnviar) {
    var metodo = "guardarVariablesTodo/usuario";
    let uriVariablesGuardarLocal = `${urlVariables}/${metodo}/${idUsrLogin}`;
    servicesVariablesGuardar(uriVariablesGuardarLocal, JSON.stringify(familiasEnviar), POST, true)
        .then(respuesta => {
            switch (respuesta.status) {
                case 200:
                    respuesta.json().then(objetoJson => {
                        if (objetoJson.respuesta.validacion) {
                            if (objetoJson.respuesta.valoresOK === false && objetoJson.respuesta.variablesOK === false) {
                                $('#modalGuardarParam').find(".txtModal").html("").html("Se guardo correctamente la información <br>de variables<br><br></br>");
                                $('#modalGuardarParam').modal({
                                    focus: true,
                                    persist: true,
                                    onClose: () => {
                                        window.location.replace(hrefAdministrador);
                                    }
                                });
                            } else {
                                $('#modalGuardarParam').find(".txtModal").html("").html('<div>No se guardaron correctamente las variables, intente a cargar el archivo nuevamente</div>');

                                $('#modalGuardarParam').modal({
                                    focus: true,
                                    persist: true,
                                    onClose: () => {
                                        window.location.replace(hrefParametros);
                                    }
                                });
                            }
                        } else {
                            limpiar();
                            pintarTabla(objetoJson.respuesta.objeto, true);
                        }
                    });
                    break;
                default:
                    break;
            }
        }).catch(error => {
            error.text()
                .then(objeto => {
                    if (objeto.length > 0) {
                        let jsonObjeto = JSON.parse(objeto);

                        $('#modalGuardarParam').find(".txtModal").html("").html('<div>No se guardaron correctamente las variables, intente a cargar el archivo nuevamente</div>');

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

function evtCancelar(evt) {
    $('#modalCancelarParam').modal({
        onShow: () => {
            $(".btnA.simplemodal-close.modalBtnAceptar").on("click", () => {
                window.location.replace(hrefAdministrador);
            });
        }
    });
}

function deshabilitarBotonGuardar() {
    $('.btnA.guardar').unbind('click').css('cursor', 'not-allowed');
}

function habilitarBotonGuardar() {
    $('.btnA.guardar').on('click', evtClickGuardarYEnviarVariables).css('cursor', 'pointer');
}

function limpiar() {
    $(".menuTabs").html("");
    $(".contTab").remove();
}

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

function servicesVariablesGuardar(url, data, metodo, isJson) {
    let valorContentType = "application/json";
    return new Promise((resolve, reject) => {
        let header = new Headers();
        header.append("Content-Type", valorContentType);
        let request;
        switch (metodo) {
            case 'GET':
                request = new Request(url, {
                    method: metodo,
                    header: header,
                    signal: signal
                });
                break;
            case 'POST':
                request = new Request(url, {
                    method: metodo,
                    headers: header,
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
                habilitarBotonGuardar();
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
                habilitarBotonGuardar();
                reject(error);
            });
    });
}

function pintarTabla(objetoJson, verValidacion) {
    let divTabsClass = document.getElementsByClassName('menuTabs');
    let divsContenidoTable = [];
    objetoJson.forEach((element, index) => {
        index++;
        let divTabs = document.createElement('div');
        divTabs.setAttribute('class', `tabs ${index === 1 ? '' : 'active'} ${element.fiFamiliaId === 0 ? 'familiaNoValida' : ''}`);
        divTabs.setAttribute('tabs', index);
        divTabs.setAttribute('style', 'cursor: pointer;');
        let contenidoTextoDiv = document.createElement('div');
        divTabs.appendChild(contenidoTextoDiv);
        let contenidoDivTabs = document.createTextNode(element.fcDescripcionFamilia);
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
        let thPlazo = document.createElement('th');
        let textoTdPlazo = document.createTextNode("Plazo");
        thPlazo.appendChild(textoTdPlazo);
        trCabecera.appendChild(thPlazo);
        let plazos;
        plazos = element.variablesCabeceras.map((value, index, array) => {
            let thVariables = document.createElement('th');
            let textoTdVariables = document.createTextNode(value.fcDescripcion);
            if (parseInt(value.fiVariableId) === 0) {
                thVariables.setAttribute("class", "advertenciaVariable");
            }
            thVariables.appendChild(textoTdVariables);
            trCabecera.appendChild(thVariables);
            return value.variables.map((value, index, array) => value.plazo);
        });
        table.appendChild(tbody);
        plazos = plazos.reduce((previus, current) => previus.concat(current));
        plazosNoRepetidos = new Set(plazos);
        plazosNoRepetidos.forEach((ele, n, obj) => {
            let trPlazo = document.createElement('tr');
            let tdPLazo = document.createElement('td');
            let textoTdPlazo = document.createTextNode(ele);
            tdPLazo.appendChild(textoTdPlazo);
            trPlazo.appendChild(tdPLazo);
            variables = element.variablesCabeceras.map(function (task, index, array) {
                return task.variables.filter((task) => task.plazo == ele);
            });
            variables.map((value, index, arra) => {
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
            tbody.append(trPlazo);
        });
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