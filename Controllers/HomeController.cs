using BibliotecaSimulador.AutentificacionSimulador;
using BibliotecaSimulador.Pojos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SimuladorAbonos.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net;

namespace SimuladorAbonos.Controllers
{

    public class HomeController : Controller
    {
        private IConfiguration Config { get; set; }
        readonly DatosUsario usuarioDao = new DatosUsario();
        readonly ValidaDatos validaDtos = new ValidaDatos();
        private readonly Credito.Core.Log.Logger _log;
        const string SessionToken = "_token";
        const string SessionUsuario = "_Usuario";
        const string SessionEmpresa = "_Empresa";
        readonly string enviromentName = "Desarrollo";
        readonly string sectionName = "Configuracion";
        readonly string paramName = "urlRedirect";
        readonly string UrlRedirect;

        public HomeController([FromServices] IConfiguration config)
        {
            this._log = new Credito.Core.Log.Logger(typeof(HomeController), config.GetValue<string>("Config:NombreLogUsr"));
           // this._log = new BibliotecaSimulador.Logs.Logg(config.GetValue<string>("Config:NombreLogUsr"));
            this.Config = config;
            this.UrlRedirect = this.Config[$"{sectionName}:{enviromentName}:{paramName}"].ToString();
            
        }

        public async System.Threading.Tasks.Task<IActionResult> ValidaUsuarioAsync([FromQuery(Name = "fcAccessToken")]string Testigo)
        {
            DtoUsuario dtoSesion;
            bool validaDatos;
            bool respuesta;
            InfoUsuario dtoUsuario;
            string Usuario;
            string Empresa;
            try
            {
                string token = Testigo is null ? string.Empty : System.Web.HttpUtility.HtmlEncode(Testigo);
                this._log.WriteInfo(@$"SimuladorAbonos: ValidaUsuario. Obtiene Token Llave M. { token }");
                if (Testigo != null)
                {
                  
                    HttpContext.Session.SetString(SessionToken, token);
                    dtoSesion = await usuarioDao.ValidaTokenAsync(token);
                    this._log.WriteInfo("ObjUsr LlaveMaestra : " + JsonConvert.SerializeObject(dtoSesion));
                    //BibliotecaSimulador.Logs.PintarLog.PintaInformacion("ObjUsr LlaveMaestra : " + JsonConvert.SerializeObject(dtoSesion), _log);
                    if (dtoSesion != null)
                    {
                        validaDatos = validaDtos.ValidaDatosUsuario(dtoSesion, this.Config);
                        if (validaDatos)
                        {
                            Usuario = Convert.ToString(dtoSesion.InformacionUsuario.FiEmpleado, CultureInfo.CurrentCulture);
                            Empresa = Convert.ToString(dtoSesion.InformacionUsuario.FcEmpresa, CultureInfo.CurrentCulture);

                            this._log.WriteInfo("Usuario: " + Usuario + " Empresa: " + Empresa);

                            dtoUsuario = await usuarioDao.ValidaUsuarioAsync(Usuario, Empresa);///validr
                            if (dtoUsuario != null)
                            {
                                respuesta = usuarioDao.GeneraObjUsuarioAlta(dtoSesion);
                                if (respuesta)
                                {
                                    HttpContext.Session.SetString(SessionUsuario, Usuario);
                                    HttpContext.Session.SetString(SessionEmpresa, Empresa);
                                    string StrSessionToken = HttpContext.Session.GetString(SessionToken);
                                    this._log.WriteInfo("Token : " + StrSessionToken);

                                    if (Usuario != null && Empresa != null)
                                    {
                                        IPAddress[] localIPs = Dns.GetHostAddresses(Dns.GetHostName());
                                        String IP = Convert.ToString(localIPs[1]);
                                        CookieOptions option = new CookieOptions();
                                        option.Expires = DateTime.Now.AddDays(1);
                                        HttpContext.Response.Cookies.Append("clientIP", IP, option);
                                        return RedirectToAction("Index");
                                    }
                                    else
                                    {
                                        return RedirectToAction($"ErrorUsuario");
                                    }
                                }
                                else
                                {
                                    return RedirectToAction($"ErrorUsuario");
                                }
                            }
                            else
                            {
                                respuesta = usuarioDao.GeneraObjUsuarioAlta(dtoSesion);
                                if (respuesta)
                                {
                                    HttpContext.Session.SetString(SessionUsuario, Usuario);
                                    HttpContext.Session.SetString(SessionEmpresa, Empresa);
                                    string StrSessionToken = HttpContext.Session.GetString(SessionToken);
                                    this._log.WriteInfo("Token : " + StrSessionToken);

                                    if (Usuario != null && Empresa != null)
                                    {
                                        IPAddress[] localIPs = Dns.GetHostAddresses(Dns.GetHostName());
                                        String IP = Convert.ToString(localIPs[1]);
                                        CookieOptions option = new CookieOptions();
                                        option.Expires = DateTime.Now.AddDays(1);
                                        HttpContext.Response.Cookies.Append("clientIP", IP, option);
                                        return RedirectToAction("Index");
                                    }
                                    else
                                    {
                                        return RedirectToAction($"ErrorUsuario");
                                    }
                                }
                                else
                                {
                                    return RedirectToAction($"ErrorUsuario");
                                }
                            }
                        }
                        else
                        {
                            return RedirectToAction($"ErrorUsuario");
                        }
                    }
                    else
                    {
                        return RedirectToAction($"ErrorUsuario");
                    }
                }
                else
                {
                    IPAddress[] localIPs = Dns.GetHostAddresses(Dns.GetHostName());
                    String IP = Convert.ToString(localIPs[1]);
                    CookieOptions option = new CookieOptions();
                    option.Expires = DateTime.Now.AddDays(1);
                    HttpContext.Response.Cookies.Append("clientIP", IP, option);
                    this._log.WriteInfo($@"Token parámetro nulo. Obtiene Token de Sesión: {HttpContext.Session.GetString(SessionToken)}");
                    return RedirectToAction("Index");
                }
            }
            catch (Exception e)
            {
                this._log.WriteError(e);
                return RedirectToAction($"ErrorUsuario");
            }

        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public async System.Threading.Tasks.Task<IActionResult> IndexAsync([FromServices] IConfiguration config)
        {
            InfoUsuario dtoUsuario;
            var dto = HttpContext.Session.GetString(SessionToken);
            var dtoEmpleado = HttpContext.Session.GetString(SessionUsuario);
            var dtoEmpresa = HttpContext.Session.GetString(SessionEmpresa);
            ConfigServicios configuracion = new ConfigServicios(config);
            List<KeyValuePair<string, string>> urls;

            try
            {
                this._log.WriteInfo($"Método: Index. Obtiene variable de sesión: {Environment.NewLine} Empleado: {dtoEmpleado} Empresa: {dtoEmpresa}");
                if (dto != null)
                {
                    dtoUsuario = await usuarioDao.ValidaUsuarioAsync(dtoEmpleado, dtoEmpresa);
                    this._log.WriteInfo($"Obtiene info Usuario: {Environment.NewLine}" + JsonConvert.SerializeObject(dtoUsuario));
                    if (dtoUsuario != null)
                    {
                        ViewData["InfoUsuario"] = JsonConvert.SerializeObject(dtoUsuario);
                        urls = configuracion.ObtieneUrl(enviromentName);

                        foreach (var valor in urls)
                        {
                            switch (valor.Key)
                            {
                                case "urlRedirect":
                                    ViewData["urlRedirect"] = valor.Value;
                                    break;
                                case "urlLlave":
                                    ViewData["urlLlave"] = valor.Value;
                                    break;
                                case "urlCatalogos":
                                    ViewData["urlCatalogos"] = valor.Value;
                                    break;
                                case "urlUsuarios":
                                    ViewData["urlUsuarios"] = valor.Value;
                                    break;
                                case "urlFotos":
                                    ViewData["urlFotos"] = valor.Value;
                                    break;
                                case "urlSimulador":
                                    ViewData["urlSimulador"] = valor.Value;
                                    break;
                                case "urlCorreos":
                                    ViewData["urlCorreos"] = valor.Value;
                                    break;
                                case "urlAutorizador":
                                    ViewData["urlAutorizador"] = valor.Value;
                                    break;
                                case "urlVariables":
                                    ViewData["urlVariables"] = valor.Value;
                                    break;
                                case "urlEventosP":
                                    ViewData["urlEventosP"] = valor.Value;
                                    break;
                                case "urlEventosC":
                                    ViewData["urlEventosC"] = valor.Value;
                                    break;
                                case "urlAutorizaP":
                                    ViewData["urlAutorizaP"] = valor.Value;
                                    break;
                                default:
                                    break;
                            }
                        }

                    }
                    else
                    {
                        this._log.WriteInfo("No se obtuvo el usuario:  " + JsonConvert.SerializeObject(dtoUsuario));
                        return RedirectToAction("ErrorUsuario");
                    }
                }
                else
                {
                    return RedirectToAction("Logout");
                }
                return View();
            }
            catch (Exception e)
            {
                this._log.WriteError(e);
                return RedirectToAction("Error");
            }
        }
        public IActionResult Administrador()
        {
            var dto = HttpContext.Session.GetString(SessionToken);
            try
            {
                this._log.WriteInfo("Método: Administrador.");
                if (dto == null)
                {
                    return RedirectToAction("Logout");
                }
                else
                {
                    string StrEtiquetaTituloInicio = this.Config.GetValue<string>("Etiquetas:Vistas:0:General:TituloInicio");
                    string StrEtiquetaTituloAdmin = this.Config.GetValue<string>("Etiquetas:Vistas:0:General:TituloAdministrador");
                    string StrEtiquetaTituloUsuario = this.Config.GetValue<string>("Etiquetas:Vistas:1:Administrador:TituloUsuarios");
                    string StrEtiquetaTituloParametros = this.Config.GetValue<string>("Etiquetas:Vistas:1:Administrador:TituloParametros");
                    ViewData["TituloInicio"] = StrEtiquetaTituloInicio;
                    ViewData["TituloAdministrador"] = StrEtiquetaTituloAdmin;
                    ViewData["TituloUsuarios"] = StrEtiquetaTituloUsuario;
                    ViewData["TituloParametros"] = StrEtiquetaTituloParametros;
                    return View();
                }
            }

            catch (Exception e)
            {
                this._log.WriteError(e);
                return RedirectToAction("Error");
            }
        }
   


        public IActionResult Cotizador()
        {
            var dtoUsuario = HttpContext.Session.GetString(SessionToken);

            try
            {
                this._log.WriteInfo("Método: Administrador.");
                if (dtoUsuario == null)
                {
                    return RedirectToAction("Logout");
                }
                else
                {
                    return View();
                }
            }
            catch (Exception e)
            {
                this._log.WriteError(e);
                return RedirectToAction("Error");
            }
        }

        public IActionResult ParametrosAsync()
        {
            var dtoUsr = HttpContext.Session.GetString(SessionToken);
            try
            {
                this._log.WriteInfo("Método: Parametros");
                if (dtoUsr == null)
                {
                    return RedirectToAction("Logout");
                }
                else
                {
                    return View();
                }
            }
            catch (Exception e)
            {
                this._log.WriteError(e);
                return RedirectToAction("Error");
            }
        }

        public IActionResult Autorizador()
        {
            var dtoUsrS = HttpContext.Session.GetString(SessionToken);
            try
            {
                this._log.WriteInfo("Método: Autorizador.");
                if (dtoUsrS == null)
                {
                    return RedirectToAction("Logout");
                }
                else
                {
                    string StrEtiquetaTituloAutorizador = this.Config.GetValue<string>("Etiquetas:Vistas:0:General:TituloAutorizador");
                    ViewData["TituloAutorizador"] = StrEtiquetaTituloAutorizador;
                    return View();
                }
            }
            catch (Exception e)
            {
                this._log.WriteError(e);
                return RedirectToAction("Error");
            }
        }
        public IActionResult AutorizaP()
        {
            var dtoUsrS = HttpContext.Session.GetString(SessionToken);
            try
            {
                this._log.WriteInfo("Método: Autorizador Prestamos.");
                if (dtoUsrS == null)
                {
                    return RedirectToAction("Logout");
                }
                else
                {
                    string StrEtiquetaTituloAutorizaP = this.Config.GetValue<string>("Etiquetas:Vistas:0:General:TituloAutorizaP");
                    ViewData["TituloAutorizaP"] = StrEtiquetaTituloAutorizaP;
                    return View();
                }
            }
            catch (Exception e)
            {
                this._log.WriteError(e);
                return RedirectToAction("Error");
            }
        }
        public IActionResult Usuarios()
        {
            Usuarios lstUsuario;
            var dto = HttpContext.Session.GetString(SessionToken);
            try
            {
                this._log.WriteInfo("SimuladorAbonos: Usuarios.");
                if (dto != null)
                {
                    this._log.WriteInfo("Sesión Activa");
                    lstUsuario = usuarioDao.GetUsuarios();
                    ViewData["lstUsuarios"] = JsonConvert.SerializeObject(lstUsuario);
                    return View();
                }
                else
                {
                    return RedirectToAction("Logout");
                }
            }
            catch (Exception e)
            {
                this._log.WriteError(e);
                return RedirectToAction("Error");
            }
        }
        public IActionResult ErrorUsuario()
        {

            try
            {
                HttpContext.Session.Clear();
                this._log.WriteInfo($"SimuladorAbonos. ErrorUsuario. {Environment.NewLine}{Environment.NewLine} Limpia Sesion. Empleado: " + HttpContext.Session.GetString(SessionUsuario) +
               "Empresa: " + HttpContext.Session.GetString(SessionEmpresa));
                ViewData["tituloPag"] = "ERROR DE USUARIO EN EL SISTEMA";
                ViewData["msjSesion"] = "¡El Usuario No Se Encuentra Registrado o No se Obtuvieron Los Datos Completos!";
                ViewData["msjSesion2"] = "Favor De Comunicarse Con El Administrador Del Sistema.";
                ViewData["url"] = UrlRedirect; 
                return View();

            }
            catch (NullReferenceException e)
            {
                this._log.WriteError(e);
                return View();
            }
            catch (Exception e)
            {
                this._log.WriteError(e);
                return View();
            }
        }
        public IActionResult Logout()
        {
            try
            {
                HttpContext.Session.Clear();



                this._log.WriteInfo("SimuladorAbonos Logout. Limpia Sesion:  Empleado: " + HttpContext.Session.GetString(SessionUsuario) +
               "Empresa: " + HttpContext.Session.GetString(SessionEmpresa));
                ViewData["tituloPag"] = "FIN DE SESIÓN";
                ViewData["msjSesion"] = "¡Estimado Usuario Su Sesión Ha Caducado!";
                ViewData["url"] = UrlRedirect;
                return View();
            }
            catch (NullReferenceException e)
            {
                this._log.WriteError(e);
                return View();
            }
            catch (Exception e)
            {
                this._log.WriteError(e);
                return View();
            }
        }

        public IActionResult LogoutLlaveM()
        {
            try
            {
                HttpContext.Session.Clear();
                this._log.WriteInfo("SimuladorAbonos. LogoutLlaveMaestra. Limpia Sesion:  Empleado: " + HttpContext.Session.GetString(SessionUsuario) +
               "Empresa: " + HttpContext.Session.GetString(SessionEmpresa));
                ViewData["tituloPag"] = "SESIÓN DEL SISTEMA FINALIZADA";
                ViewData["msjSesion"] = "¡Su Sesión Ha Finalizado Con Éxito!";
                ViewData["url"] = UrlRedirect;
                return View();
            }
            catch (NullReferenceException e)
            {
                this._log.WriteError(e);
                return View();
            }
            catch (Exception e)
            {
                this._log.WriteError(e);
                return View();
            }
        }

        public IActionResult TasaBase()
        {
            var dto = HttpContext.Session.GetString(SessionToken);
            try
            {
                this._log.WriteInfo("Método: TasaBase.");
                if (dto == null)
                {
                    return RedirectToAction("Logout");
                }
                else
                {
                    string StrEtiquetaTituloInicio = this.Config.GetValue<string>("Etiquetas:Vistas:0:General:TituloInicio");
                    string StrEtiquetaTituloAdmin = this.Config.GetValue<string>("Etiquetas:Vistas:0:General:TituloAdministrador");
                    string StrEtiquetaTituloTasaBasePrestamos  = this.Config.GetValue<string>("Etiquetas:Vistas:1:TasaBase:TituloTasaBasePrestamos");
                    string StrEtiquetaTituloTasaBaseConsumo = this.Config.GetValue<string>("Etiquetas:Vistas:1:TasaBase:TituloTasaBaseConsumo");
                    ViewData["TituloInicio"] = StrEtiquetaTituloInicio;
                    ViewData["TituloAdministrador"] = StrEtiquetaTituloAdmin;
                    ViewData["TituloTasaBasePrestamos"] = StrEtiquetaTituloTasaBasePrestamos;
                    ViewData["TituloTasaBaseConsumo"] = StrEtiquetaTituloTasaBaseConsumo;
                    return View();
                }
            }

            catch (Exception e)
            {
                this._log.WriteError(e);
                return RedirectToAction("Error");
            }
        }

        public IActionResult TasaBasep()
        {
            var dtoUsuario = HttpContext.Session.GetString(SessionToken);

            try
            {
                this._log.WriteInfo("Método: TasaBaseP.");
                if (dtoUsuario == null)
                {
                    return RedirectToAction("Logout");
                }
                else
                {
                    return View();
                }
            }
            catch (Exception e)
            {
                this._log.WriteError(e);
                return RedirectToAction("Error");
            }
        }
        public IActionResult TasaBasec()
        {
            var dtoUsuario = HttpContext.Session.GetString(SessionToken);

            try
            {
                this._log.WriteInfo("Método: TasaBaseC.");
                if (dtoUsuario == null)
                {
                    return RedirectToAction("Logout");
                }
                else
                {
                    return View();
                }
            }
            catch (Exception e)
            {
                this._log.WriteError(e);
                return RedirectToAction("Error");
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            try
            {
                HttpContext.Session.Clear();
                this._log.WriteInfo("SimuladorAbonos. ErrorSistema. Limpia Sesion:  Empleado: " + HttpContext.Session.GetString(SessionUsuario) +
               "Empresa: " + HttpContext.Session.GetString(SessionEmpresa));
                ViewData["tituloPag"] = "SESIÓN DEL SISTEMA FINALIZADA";
                ViewData["msj"] = "¡Ocurrió un error en el sistema. Favor de intentarlo de nuevo!";
                ViewData["url"] = UrlRedirect;
                return View();
            }
            catch (NullReferenceException e)
            {
                this._log.WriteError(e);
                return View();
            }
            catch (Exception e)
            {
                this._log.WriteError(e);
                return View();
            }
        }
    }
}
