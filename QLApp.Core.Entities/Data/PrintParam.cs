using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Core.Entities.Data
{
    public class PrintParam
    {

        public string ReportID { get; set; }

        public string OrganizationID { get; set; }
        public string OrganizationName { get; set; }
        public string ReportName { get; set; }
        public string ReportFile { get; set; }
        public string PhoneNumber { get; set; }
        public string ReadAmount { get; set; }
        public string Address { get; set; }
        public string UserName { get; set; }
        public int BookID { get; set; }
        public DateTime CreatedDate { get; set; }
        public Dictionary<string, object> ReportParamValues { get; set; }
    }
}
