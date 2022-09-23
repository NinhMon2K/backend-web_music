using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using QLApp.Library.Collection;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Core.BL.Base
{
    public class BaseBL
    {
        protected readonly AppCollection _service;
        public virtual string ConnectionString { set; get; }


        public BaseBL(AppCollection service)
        {
            _service = service;
        }
    }
}
