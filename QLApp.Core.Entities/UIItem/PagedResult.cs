using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Core.Entities.UIItem
{
   public class PagedResult<T>
    {
        public List<T> Items { get; set; }
        public int TotalRecoed { get; set; }
    }
}
