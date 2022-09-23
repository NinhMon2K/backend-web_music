using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Core.Entities.Dictionary
{
    public class LoginInfo
    {
        public string UserID { get; set; } = Guid.NewGuid().ToString();
        public string UserCode { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string FullName { get; set; }
        public bool Gender { get; set; }
        public string Image { get; set; }
        public string CMT { get; set; }
        public DateTime Birthday { get; set; }
        public string OrganizationID { get; set; }
        public bool HasUser { get; set; }

    }
}
