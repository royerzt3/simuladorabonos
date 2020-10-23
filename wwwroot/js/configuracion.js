if ($("#urlLlave").val() != "") {
    localStorage.removeItem('urlLlave');
    localStorage.setItem('urlLlave', $("#urlLlave").val());
} 
if ($("#urlEventosP").val() != "") {
    localStorage.removeItem('urlEventosP');
    localStorage.setItem('urlEventosP', $("#urlEventosP").val());
} 
if ($("#urlR").val() != "") {
    localStorage.removeItem('urlR');
    localStorage.setItem('urlR', $("#urlR").val());
} 

if ($("#urlUsuarios").val() != "") {
    localStorage.removeItem('urlUsuarios');
    localStorage.setItem('urlUsuarios', $("#urlUsuarios").val());
}
if ($("#urlCatalogos").val() != "") {
    localStorage.removeItem('urlCatalogos');
    localStorage.setItem('urlCatalogos', $("#urlCatalogos").val());
} 
if ($("#urlFotos").val() != "") {
    localStorage.removeItem('urlFotos');
    localStorage.setItem('urlFotos', $("#urlFotos").val());
} 
if ($("#urlAutorizador").val() != "") {
    localStorage.removeItem('urlAutorizador');
    localStorage.setItem('urlAutorizador', $("#urlAutorizador").val());
} 
if ($("#urlCorreos").val() != "") {
    localStorage.removeItem('urlCorreos');
    localStorage.setItem('urlCorreos', $("#urlCorreos").val());
} 
if ($("#urlVariables").val() != "") {
    localStorage.removeItem('urlVariables');
    localStorage.setItem('urlVariables', $("#urlVariables").val());
} 
if ($("#urlSimulador").val() != "") {
    localStorage.removeItem('urlSimulador');
    localStorage.setItem('urlSimulador', $("#urlSimulador").val());
} 


const urlPortal = localStorage.getItem('urlR');
const urlLlaveM = localStorage.getItem('urlLlave');
const urlFoto = localStorage.getItem('urlFotos');
const urlCatalogos = localStorage.getItem('urlCatalogos');
const urlUsuarios = localStorage.getItem('urlUsuarios'); 
const urlAutorizacion = localStorage.getItem('urlAutorizador');
const urlEnvioCorreo = localStorage.getItem('urlCorreos');   
const urlVariables = localStorage.getItem('urlVariables');  
const urlSimulador = localStorage.getItem('urlSimulador');
const urlEventosP = localStorage.getItem('urlEventosP');

//Vistas
//const pathProyecto = '/SimuladorAbonos/Home/';
const pathProyecto = '/Home/';
let controllerLogin = new AbortController();
let signalLogin = controllerLogin.signal;
let originSimuladorLogin = window.location.origin;
let pathNameHomeCotizador = pathProyecto+'Cotizador/';
let pathNameHomeAutorizador = pathProyecto +'Autorizador/';
let pathNameHomeAdmin = pathProyecto +'Administrador/';
let pathNameHomeUsuarios = pathProyecto + 'Usuarios/';
let pathNameHomeParametros = pathProyecto + 'Parametros/';
let pathNameHomeTasa = pathProyecto + 'TasaBase/';
let pathNameHomeTasaP = pathProyecto + 'TasaBasep/';
let pathNameHomeTasaC = pathProyecto + 'TasaBaseC/';
let pathNameHomeLogout = pathProyecto + 'LogoutLlaveM/'
let pathNameHomeError = pathProyecto + 'ErrorUsuario/'
let pathNameHomeIndex = pathProyecto;


let hrefCotizador = `${originSimuladorLogin}${pathNameHomeCotizador}`;
let hrefAutorizador = `${originSimuladorLogin}${pathNameHomeAutorizador}`;
let hrefAdministrador = `${originSimuladorLogin}${pathNameHomeAdmin}`;
let hrefUsuarios = `${originSimuladorLogin}${pathNameHomeUsuarios}`;
let hrefParametros = `${originSimuladorLogin}${pathNameHomeParametros}`;
let hrefIndex = `${originSimuladorLogin}${pathNameHomeIndex}`;
let hrefTasa = `${originSimuladorLogin}${pathNameHomeTasa}`;
let hrefLogout = `${originSimuladorLogin}${pathNameHomeLogout}`;
let hrefError = `${originSimuladorLogin}${pathNameHomeError}`;

let hrefTasaC = `${originSimuladorLogin}${pathNameHomeTasaC}`;
let hrefTasaP = `${originSimuladorLogin}${pathNameHomeTasaP}`;

