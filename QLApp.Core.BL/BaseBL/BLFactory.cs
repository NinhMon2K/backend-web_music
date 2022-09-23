using QLApp.Library.Collection;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Core.BL.Base
{
    public class BLFactory
    {
        public static T CreateAs<T>(AppCollection appCollection = null, string conn = "") where T : BaseBL
        {
            T oBaseBL;

            if (appCollection != null)
            {
                oBaseBL = (T)Activator.CreateInstance(typeof(T), appCollection);
            }
            else
            {
                oBaseBL = Activator.CreateInstance<T>();
            }

            if (!string.IsNullOrEmpty(conn))
            {
                oBaseBL.ConnectionString = conn;
            }

            return oBaseBL;
        }
    }
}
