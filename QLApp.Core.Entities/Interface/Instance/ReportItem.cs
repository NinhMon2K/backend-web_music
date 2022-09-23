using QLApp.Core.Entities.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace QLApp.Core.Entities.Interface.Instance
{
    public class ReportItem : IReportItem
    {
        DataSet IReportItem.GetDataSource(PrintParam printParam)
        {
            throw new NotImplementedException();
        }

        string IReportItem.GetReportFile()
        {
            throw new NotImplementedException();
        }
    }
}
