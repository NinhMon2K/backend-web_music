using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Core.Entities.UIItem
{
    public class TabItem
    {
        public string TabId { set; get; }
        public string ClassName { set; get; }
        public string TabContentID { set; get; }
        public string TabName { set; get; }
        public string PartialViewName { set; get; }
        public string PartialViewAction { set; get; }
        public string ControllerName { set; get; }
        public string ViewName { set; get; }
        public string Icon { set; get; }
        public string JsName { set; get; }

    }
}
