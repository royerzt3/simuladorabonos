using BibliotecaSimulador.AutentificacionSimulador;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Text.RegularExpressions;

namespace SimuladorAbonos.Models
{
    public  class ValidaDatos
    {
        const string expValidaEmail = "\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*"; 
        const string expValidaCelular = "^\\+?(\\d[\\d-. ]+)?(\\([\\d-. ]+\\))?[\\d-. ]+\\d$";
 
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dtoSesion"></param>
        /// <returns></returns>
        public  bool ValidaDatosUsuario(DtoUsuario dtoSesion, [FromServices] IConfiguration config)
        {
            string expValidaletras = config.GetValue<string>("EpxReg:Letras");
            if (dtoSesion.InformacionUsuario.FcNombre != null && dtoSesion.InformacionUsuario.FcCelular != null && dtoSesion.InformacionUsuario.FcCorreo != null
                && dtoSesion.InformacionUsuario.FcEmpresa != null)
            {
                if (dtoSesion.InformacionUsuario.FiEmpleado > 0 && dtoSesion.InformacionUsuario.FiPerfilId >= 0 && dtoSesion.InformacionUsuario.FcNombre != string.Empty
                && dtoSesion.InformacionUsuario.FcCorreo != string.Empty && dtoSesion.InformacionUsuario.FcCelular != string.Empty && dtoSesion.InformacionUsuario.FcCelular != null
                    && dtoSesion.InformacionUsuario.FcEmpresa != string.Empty && dtoSesion.FcFamilias != string.Empty && dtoSesion.FcProductos != string.Empty && dtoSesion.FiMercadeo >= 0)
                {
                    if (Convert.ToString(dtoSesion.InformacionUsuario.FiEmpleado).Length <= 8 && dtoSesion.InformacionUsuario.FcNombre.Length <= 200)
                    {
                        if (Regex.IsMatch(dtoSesion.InformacionUsuario.FcNombre.Trim(), expValidaletras) && Regex.IsMatch(dtoSesion.InformacionUsuario.FcCorreo, expValidaEmail)
                            && Regex.IsMatch(dtoSesion.InformacionUsuario.FcCelular, expValidaCelular))
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }

                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }

            }
            else
            {
                return false;
            }
        }

    }
}
