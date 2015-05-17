using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AreaGuideGIS.Startup))]
namespace AreaGuideGIS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
