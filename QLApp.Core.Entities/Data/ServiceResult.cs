using QLApp.Core.Entities.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Core.Entities.Data
{
    public class ServiceResult
    {
        public ServiceResultType Status { get; set; } = ServiceResultType.Success;

        public object Data { get; set; }

        public string Message { get; set; }

        public string Code { get; set; }

    }
}
