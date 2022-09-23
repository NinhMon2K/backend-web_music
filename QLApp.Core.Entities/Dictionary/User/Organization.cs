using QLApp.Core.Entities.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Core.Entities.Dictionary
{
    public class Organization
    {
        public string OrganizationID { get; set; } = Guid.NewGuid().ToString();
        public string OrganizationName { get; set; }
        public string Address { get; set; }
        public bool IsLastAccess { get; set; }
        public int SortOrder { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public RollType Roll { get; set; }
        public string UserID { get; set; }
    }
}
