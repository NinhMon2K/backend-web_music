using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Core.Entities
{
    public class Menu
    {
        public string Code { set; get; }
        public string Name { set; get; }
        public string Link { set; get; }
        public IList<Menu> Childs { set; get; }
    }
}
