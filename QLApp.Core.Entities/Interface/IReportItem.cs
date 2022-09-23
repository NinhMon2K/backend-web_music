using QLApp.Core.Entities.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace QLApp.Core.Entities.Interface
{
    public interface IReportItem
    {

        DataSet GetDataSource(PrintParam printParam);

        string GetReportFile();


    }
}
