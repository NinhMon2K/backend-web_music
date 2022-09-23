using QLApp.Core.Entities.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Core.Entities.Data
{
    public class ReportCache
    {

        public PrintParam PrintParam { get; set; }

        public IReportItem IReportItem { get; set; }

        public StimulInfo StimulInfo { get; set; }

        public ReportCache()
        {
            StimulInfo = new StimulInfo();
        }
    }
}
