using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Library
{
    public static class ExtensionMethod
    {

        public static object GetValueByPropertyName(this object source, string strPropertyPath)
        {
            var firstPath = strPropertyPath;
            var secondPath = "";

            if (strPropertyPath.Contains("."))
            {
                firstPath = strPropertyPath.Substring(0, strPropertyPath.IndexOf(".", StringComparison.Ordinal));
                secondPath = strPropertyPath.Substring(strPropertyPath.IndexOf(".", StringComparison.Ordinal) + 1);
            }

            var pi = source.GetType().GetProperty(firstPath);

            if (pi != null)
            {
                var value = pi.GetValue(source, null);
                if (secondPath != "" && value != null)
                {
                    return GetValueByPropertyName(value, secondPath);
                }
                else
                {
                    return value;
                }
            }

            return null;
        }

    }
}
