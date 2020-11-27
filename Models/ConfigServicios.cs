using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace SimuladorAbonos.Models
{
    public class ConfigServicios
    {
        private readonly Credito.Core.Log.Logger _log;
        private IConfiguration Config { get; set; }
        public ConfigServicios([FromServices] IConfiguration config)
        {
            this._log = new Credito.Core.Log.Logger(typeof(ConfigServicios), config.GetValue<string>("Config:NombreLogUsr"));
            //this._log = new BibliotecaSimulador.Logs.Logg(config.GetValue<string>("Config:NombreLogUsr"));
            this.Config = config;
        }

        public List<KeyValuePair<string, string>> ObtieneUrl(string ambiente)
        {
            string[] urls = new string[] { "urlLlaveM", "urlRedirect", "urlUsrInfo", "urlCatalogos", "urlUsuarios", "urlFotos", "urlSimulador", "urlCorreos", "urlAutorizador", "urlVariables", "urlEventosP", "urlEventosC", "urlAutorizaP" };
            string sectionName = "Configuracion";
            List<KeyValuePair<string, string>> lstUrl = new List<KeyValuePair<string, string>>();
            try
            {
                foreach (string parametro in urls)
                {
                    var uri = this.Config[$"{sectionName}:{ambiente}:{parametro}"];

                    lstUrl.Add(new KeyValuePair<string, string>(parametro, uri));
                }


            }
            catch (Exception e)
            {
                this._log.WriteInfo("No se pudo obtener URL");
            }

            return lstUrl;
        }

    }
}
