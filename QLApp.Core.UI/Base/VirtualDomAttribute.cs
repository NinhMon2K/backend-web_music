using HtmlAgilityPack;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QLApp.Core.UI.Base
{
    public class VirtualDomAttribute : ResultFilterAttribute
    {

        Stream newStream;
        Stream oldStream;

        bool isSSR;

        public override void OnResultExecuting(ResultExecutingContext context)
        {
            base.OnResultExecuting(context);
            var accept = context.HttpContext.Request.Headers["accept"];
            this.isSSR = !accept.Any(s => s.Contains("application/json"));
            oldStream = context.HttpContext.Response.Body;
            newStream = new MemoryStream();
            context.HttpContext.Response.Body = newStream;
        }

        public override void OnResultExecuted(ResultExecutedContext context)
        {
            newStream.Seek(0, SeekOrigin.Begin);
            using (var streamReader = new StreamReader(newStream, Encoding.UTF8, true, 512, true))
            {
                var cap = streamReader.ReadToEnd();
                var vdom = cap;
                if (!this.isSSR)
                {
                    var doc = new HtmlDocument();
                    doc.LoadHtml(cap);
                    var root = doc.DocumentNode;
                    vdom = RemoveWhite(Convert(root).ToString(Formatting.None));
                }

                context.HttpContext.Response.Body = oldStream;
                context.HttpContext.Response.WriteAsync(vdom);
            }

        }

        string RemoveWhite(string s)
        {
            return s.Replace("\\r", "").Replace("\\n", "").Trim(); ;
        }

        public JObject Convert(HtmlNode node)
        {
            if (node.Name == "#comment")
            {
                return null;
            }

            if (node.Name == "#document")
            {
                node.Name = "div";
            }

            var docuuments = new JArray();
            var assets = new JArray();
            var childRemoves = new List<HtmlNode>();

            void render(HtmlNode nodes)
            {
                var childs = nodes.ChildNodes;

                foreach (var child in childs)
                {
                    if (child.Name.Equals("script") || child.Name.Equals("link"))
                    {
                        var tag = child.Name.Equals("script") ? "script" : "link";
                        var html = child.InnerText;

                        var type = "text";
                        if (child.Attributes.Count > 0 && child.Attributes.FirstOrDefault(x => x.Name.Equals("href") || x.Name.Equals("src")) != null)
                        {
                            html = child.Attributes.FirstOrDefault(x => x.Name.Equals("href") || x.Name.Equals("src"))?.Value;
                            type = "file";
                        }

                        if (!string.IsNullOrEmpty(RemoveWhite(html)))
                        {
                            assets.Add(JObject.FromObject(new { value = new JValue(html), tag = tag, type = type }));
                        }

                        childRemoves.Add(child);
                    }
                    else
                    {
                        if (!child.Name.Equals("#text"))
                        {
                            render(child);
                        }
                    }
                }
            }

            render(node);

            var html = node.InnerHtml;
            foreach (var item in childRemoves)
            {
                html = html.Replace(item.OuterHtml, "");
            }

            var dom = JObject.FromObject(new
            {
                id = node.Id,
                documents = RemoveWhite(html),
                assets = assets
            });

            return dom;
        }

    }
}
