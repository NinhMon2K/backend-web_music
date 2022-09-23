using QLApp.Core.Entities.Dictionary;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Library.Model
{
    public static class Login
    {
        public static User a;
        public static User user {
            get
            {
                return a;
            }

            set
            {
                a = value;
            }
        }
    }
}
