using QLApp.Core.Entities.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Core.Entities.Data
{
    public class SaveParam
    {
        public Mode Mode { set; get; } = Mode.Add;

        public object FormData { set; get; }
    }
}
