
//Tooltip
(function () {

    function getOffset(elem) {
        var offsetLeft = 0,
            offsetTop = 0;
        do {
            if (!isNaN(elem.offsetLeft)) {
                offsetLeft += elem.offsetLeft;
                offsetTop += elem.offsetTop;
            }
        } while (elem = elem.offsetParent);
        return { left: offsetLeft, top: offsetTop };
    }

    var targets = document.querySelectorAll('[rel=tooltip]'),
        target = false,
        tooltip = false,
        title = false,
        tip = false;

    for (var i = 0; i < targets.length; i++) {
        targets[i].addEventListener("mouseenter", function () {
            target = this;
            tip = target.getAttribute("title");
            tooltip = document.createElement("div");
            tooltip.id = "tooltip";

            if (!tip || tip == "")
                return false;

            target.removeAttribute("title");
            tooltip.style.opacity = 0;
            tooltip.innerHTML = tip;
            document.body.appendChild(tooltip);

            var init_tooltip = function () {
                console.log(getOffset(target));
                // set width of tooltip to half of window width
                if (window.innerWidth < tooltip.offsetWidth * 1.5)
                    tooltip.style.maxWidth = window.innerWidth / 2;
                else
                    tooltip.style.maxWidth = 340;

                var pos_left = getOffset(target).left + (target.offsetWidth / 2) - (tooltip.offsetWidth / 2),
                    pos_top = getOffset(target).top - tooltip.offsetHeight - 10;
                console.log("top is", pos_top);
                if (pos_left < 0) {
                    pos_left = getOffset(target).left + target.offsetWidth / 2 - 20;
                    tooltip.classList.add("left");
                } else
                    tooltip.classList.remove("left");

                if (pos_left + tooltip.offsetWidth > window.innerWidth) {
                    pos_left = getOffset(target).left - tooltip.offsetWidth + target.offsetWidth / 2 + 20;
                    tooltip.classList.add("right");
                } else
                    tooltip.classList.remove("right");

                if (pos_top < 0) {
                    var pos_top = getOffset(target).top + target.offsetHeight + 15;
                    tooltip.classList.add("top");
                } else
                    tooltip.classList.remove("top");
                // adding "px" is very important
                tooltip.style.left = pos_left + "px";
                tooltip.style.top = pos_top + "px";
                tooltip.style.opacity = 1;
            };

            init_tooltip();
            window.addEventListener("resize", init_tooltip);

            var remove_tooltip = function () {
                tooltip.style.opacity = 0;
                document.querySelector("#tooltip") && document.body.removeChild(document.querySelector("#tooltip"));
                target.setAttribute("title", tip);
            };

            target.addEventListener("mouseleave", remove_tooltip);
            tooltip.addEventListener("click", remove_tooltip);
        });
    }

})();

$(document).ready(function () {
    //$('#filter-date, #filter-date1').datetimepicker();
    //Modal resolución
    $('.divCategoria, .divDato').hide();

    $('#radioSKU').on("change", function () {
        $('.divCategoria').hide();
        return false;
    });

    $('#radioCategoria').on("change", function () {
        $('.divCategoria').show();
        return false;
    });
    $('#cargaArchivo').change(function () {
        let cantidadHijosDivMenuTabs = $(".menuTabs").children().length;
        if (cantidadHijosDivMenuTabs > 0) {
            limpiar();
        }
        if ($(this).val() == '') {
            $('.divDato').hide();
            $(".borderBoton").css("border-bottom-right-radius", "5px");
            $(".borderBoton").css("border-bottom-left-radius", "5px");
        } else {
            let nombreArchivoRaw = $(this).val().split('\\');
            $("#nombreArchivoExcel").text(nombreArchivoRaw[nombreArchivoRaw.length - 1])
            cargarArchivo(this);
            $(".borderBoton").css("border-bottom-right-radius", "0px");
            $(".borderBoton").css("border-bottom-left-radius", "0px");
        }
    });
    $('.switch').click(function () {
        $(this).toggleClass("switchOn");
    });

    // Menu hambuergesa
    $("#effect").toggle(false);
    $("#hamburger").click(function (event) {
        event.stopPropagation();
        $("#effect").toggle("slide");
    });

    $(document).click(function () {
        $("#effect").toggle(false);
    });
    $("#effect").click(function (event) {
        event.stopPropagation();
    });

    /*Menu User*/
    $(".MenuUser, .MenuUser1").hide();
    $('.imgShowMenuUser').click(function () {
        $(".MenuUser, .MenuUser1").toggle("ver");
    });

    /////********Para selects*******************/
    //$("select").dropkick({
    //    mobile: true
    //});


    //Modal
    $('.modalGuardar_view').click(function (e) {
        $('#modalGuardar').modal();

        return false;
    })

    $('.modalRechazo_view').click(function (e) {
        $('#modalRechazo').modal();
        $(this).parent().parent().addClass("rechazado");
        $('.verSubmenu').next().addClass('ver');
        return false;
    })



    $('.modalBaja_view').click(function (e) {
        $('#modalBaja').modal();
        $('.verSubmenu').next().addClass('ver');

        return false;
    })

    $('.modalAutorizado_view').click(function (e) {
        $('#modalAutorizado').modal();
        $(this).parent().parent().addClass("autorizado");
        return false;
    })
    //parametros
    $('.modalCancelarParam_view').click(function (e) {
        $('#modalCancelarParam').modal();
        return false;
    })

    $('.modalGuardarParam_view').click(function (e) {
        $('#modalGuardarParam').modal();
        return false;
    })


    //Tabs
    $(".contTab").hide();

    $(".tabs[tabs='1']").removeClass('active');

    $(".contTab[contTab='1']").show();

    $(".tabs").click(function () {
        let tabs = $(this);

        $(".tabs").addClass('active');
        tabs.removeClass('active');
        $(".contTab").hide();
        $(".contTab[contTab='" + tabs.attr('tabs') + "']").show();

    });
    $("#imgCargarArchivoExcel").on('click', function (params) {
        window.location.replace(hrefParametros);
    });
});
/*Valida buscador del menu de hamburgesa*/
function valida(f) {
    if (f.busca.value == "") {
        alert("Es necesario que introduzca un valor");
    } else {
        return false;
    }
}
/*Detecta resolucion de pantalla*/
if (matchMedia) {
    const mq = window.matchMedia("(min-width: 780px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
}

function WidthChange(mq) {
    if (mq.matches) {
        $("#menu ul").addClass("normal");
        $("#menu ul li").removeClass("in");
        $('ul.nivel1 >li > ul').slideUp();
        $('ul.nivel2 >li > ul').slideUp();
        $('ul.nivel1>li').off("click");
        $('ul.nivel2>li').off("click");
    } else {
        $("#menu ul").removeClass("normal");

        $('ul.nivel1>li').on('click', function (event) {
            event.stopPropagation();

            $target = $(this).children();

            if ($(this).hasClass("in")) {
                $('ul.nivel2').slideUp();

                $(this).removeClass("in");
                $('.flecha').removeClass("rotar");
            } else {
                $('ul.nivel1 > li').removeClass("in");
                $('ul.nivel2').slideUp();
                $('ul.nivel3').slideUp();
                $('ul.nivel2>li').removeClass("in");
                $(this).addClass("in");
                $target.slideDown();
                $('ul.nivel1 > li > a .flecha').addClass("rotar");

            }
        });
        $('ul.nivel2>li').on('click', function (event) {
            event.stopPropagation();

            $target = $(this).children();

            if ($(this).hasClass("in")) {
                $('ul.nivel3').slideUp();
                $(this).removeClass("in");
                $('ul.nivel2 > li > a .flecha').removeClass("rotar");
            } else {
                $('ul.nivel2 > li').removeClass("in");
                $('ul.nivel3').slideUp();
                $(this).addClass("in");
                $target.slideDown();
                $('ul.nivel2 > li > a .flecha').addClass("rotar");
            }
        });
        $('ul.nivel3>li').on('click', function (event) {
            event.stopPropagation();
        });
    }
}


//var allPanels = $('.accordion > dd').hide();


jQuery('.accordion > dt').on('click', function () {
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
});

/*jQuery('.irAcordeon2').on('click', function() {
    $this = $(".dt2");
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
        $(".subSeccion").show();console.log("1");

      jQuery('.accordion > dd').slideUp();
      $target.slideDown();
      $('.accordion > dd').css("border-botton","#ff0000");
    }
});*/



/* Seleccionar Checkbox*/
$("#checktodos").change(function () { $("input:checkbox.checkM").prop('checked', $(this).prop("checked")); });

$(document).ready(function () {
    $('#owl-carousel3').owlCarousel({
        margin: 10,
        nav: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
});
function irAcordeon(f) {

    let objSkusfromTbl;

    if (f == undefined) {
        targetAcordeon();
    } else {

        switch (f) {
            case 2:

                objSkusfromTbl = obtieneSkusSimulacionBase();

                if (objSkusfromTbl.length == 0) {

                    mostrarModalMensaje(1, "Es necesario seleccionar un producto");

                } else {

                    targetAcordeon(f);
                }

                break;
            case 3:
                var blnSeleccionPlazos = validaSeleccionPlazos();

                if (blnSeleccionPlazos == true) {

                    objSkusfromTbl = obtieneSkusSimulacionBase();
                    generaSimulacionTipoMercadeo(objSkusfromTbl);
                    targetAcordeon(f);
                }

                break;
            case 4:

                blnConfirmacion = false;
                intIdTipoMercadeo = $('#idTipoMercadeo option:selected').attr('value');

                validaRegistrosVacios(intIdTipoMercadeo);

                if (blnConfirmacion) {

                    targetAcordeon(f);
                }
                break;
        }
    }
}




$('.verSubmenu').click(function (e) {

    $(this).next().toggleClass("ver");
});

$(document).click(function () {
    $('.verSubmenu').removeClass('ver');

    $(document).unbind("click");
})


function consultaServicio(url, data, metodo, isJson, valorContentType) {
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
                    resolve(data);
                } else if (data.status >= 500) {
                    resolve(data);
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

function limpiarCombo(idElemento) {
    var cell = document.getElementById(idElemento);
    for (var i = cell.childNodes.length - 1; i >= 0; --i) {
        cell.removeChild(cell.childNodes[i]);
    }
}

//function handleBackButton() {

//    if (history.forward(-1)) {
//        location.replace(history.forward(-1));
//    }

//}

function cargaSubMenu(lstMenuSubMenu) {
    $.each(lstMenuSubMenu, function (key, value) {
        var Menu = value.fiMenuId;
        var subMenu = value.fiSubMenuId;
        var vista = $("a[class='Vista_" + Menu + subMenu + "']");

        switch (vista.text()) {
            case 'Usuarios':
                $(".Vista_" + Menu + subMenu).attr("href", hrefUsuarios);
                break;
            case 'Parámetros de evaluación':
                $(".Vista_" + Menu + subMenu).attr("href", hrefParametros);
                break;
        }

    });

}

function cargaMenu(lstMenuSubMenu) {

    $.each(lstMenuSubMenu, function (key, value) {
        var Menu = value.fiMenuId;
        var vista = $("a[class='Vista_" + Menu + "']");

        console.log(vista.text());
        switch (vista.text()) {

            case 'Cotizador de Tasas':
                $(".Vista_" + Menu).attr("href", hrefCotizador);
                break;
            case 'Generador de Tasas Base':
                $(".Vista_" + Menu).attr("href", "#");
                break;
            case 'Autorizador de eventos':
                $(".Vista_" + Menu).attr("href", hrefAutorizador);
                break;
            case 'Consultas':
                $(".Vista_" + Menu).attr("href", "#");
                break;
            case 'Analítica':
                $(".Vista_" + Menu).attr("href", "#");
                break;
            case 'Administrador':
                $(".Vista_" + Menu).attr("href", hrefAdministrador);
                $("#menu ul.nivel1 li ul").addClass("nivel2");
                break;

        }

    });
    cargaSubMenu(lstMenuSubMenu);
}

function targetAcordeon(f) {
    $this = $(".dt" + f);
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
}


function validaMenu() {
    var object = JSON.parse(localStorage.getItem('objectUsr'));
    var datos = JSON.parse(object);

    $.each(datos.LstPerfilMenu, function (key, value) {
        var Menu = value.fiMenuId;
        var subMenu = value.fiSubMenuId;

        console.log($("#rutaSimulador").text());

        if ($("#rutaSimulador").text() == 'Usuarios' || $("#rutaSimulador").text() == 'Parametros') {
            if ($("#tituloVista").hasClass("Vista_" + Menu + subMenu) == true) {
                $(".Vista_" + Menu + subMenu).addClass("valida");
            }
        } else {

            if ($("#tituloVista").hasClass("Vista_" + Menu) == true) {
                $(".Vista_" + Menu).addClass("valida");
            }
        }

    });

    if ($("#tituloVista").hasClass("valida") == false) {
        $('#modalErrorMenu').modal({
            focus: true,
            persist: true,
            onClose: () => {
                window.location.replace(hrefIndex);
            }
        });
    }
}


