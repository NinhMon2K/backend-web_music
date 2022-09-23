using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Text;

namespace QLApp.Library.Extension
{
    public static class ExtensionMethod
    {
        public static DataTable ToDataTable<T>(this IList<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);

            PropertyInfo[] props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            foreach (var prop in props)
            {
                var type = (prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>)) ? Nullable.GetUnderlyingType(prop.PropertyType) : prop.PropertyType;
                dataTable.Columns.Add(prop.Name, type);
            }

            foreach (T item in items)
            {
                var value = new object[props.Length];

                for (int i = 0; i < props.Length; i++)
                {
                    value[i] = props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(value);
            }

            return dataTable;
        }

    }
}
