using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace Simulador
{
    public class Startup
    {
        private const string KeyXFrameOptions = "X-Frame-Options";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
              services.AddSession(options => {
                  options.IdleTimeout = TimeSpan.FromMinutes(20);
                  
            });
            services.AddCors();

        }
           
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();
            }

            app.UseCookiePolicy(new CookiePolicyOptions { HttpOnly= Microsoft.AspNetCore.CookiePolicy.HttpOnlyPolicy.Always });
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();
            app.UseSession();

            app.UseCors();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=ValidaUsuario}/{id?}");
            });
            
            app.Use(async (context, next) =>
            {
                context.Response.Headers.Add(KeyXFrameOptions, "SAMEORIGIN");
                context.Response.Headers.Add("Content-Security-Policy", "Content-Security-Policy");
                await next();
            });
        }
    }
}
