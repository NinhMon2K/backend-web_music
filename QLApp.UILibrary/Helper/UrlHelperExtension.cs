using Microsoft.AspNetCore.Mvc;
using QLApp.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.UILibrary.Helper
{
    public static class UrlHelperExtension
    {


        public static string AppAction(this IUrlHelper url, MicroService type, string action, string controller = "")
        {
            var urls = new List<string>();
            var host = "";

            if (type == MicroService.Core)
            {
                host = "https://localhost:44336/api";
            }

            urls.Add(host);
            if (!string.IsNullOrEmpty(controller))
            {
                urls.Add(controller);
            }
            urls.Add(action);

            return string.Join("/", urls).ToLower();
        }

    }
}
