using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Razor.Infrastructure;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Mvc.Routing;

namespace QLApp.UILibrary.Helper
{
    [HtmlTargetElement("AppScript")]
    public class AppScriptTagHelper : ScriptTagHelper
    {
        public AppScriptTagHelper(IHostingEnvironment webHostEnvironment,
            TagHelperMemoryCacheProvider cacheProvider,
            IFileVersionProvider fileVersionProvider,
            HtmlEncoder htmlEncoder,
            JavaScriptEncoder javaScriptEncoder,
            IUrlHelperFactory urlHelperFactory) : base(webHostEnvironment, cacheProvider, fileVersionProvider, htmlEncoder, javaScriptEncoder, urlHelperFactory)
        {

        }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            base.Process(context, output);
            output.TagName = "script";
        }

    }
}
