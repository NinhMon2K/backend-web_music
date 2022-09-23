using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Core.Entities.Dictionary
{
    public class SellParam
    {
        public string OrganizationID { get; set; }

        public DateTime StartDay { get; set; }
        public string StartDayVal { get; set; }
        public DateTime ToDay { get; set; }
        public string ToDayVal { get; set; }


    }
}
