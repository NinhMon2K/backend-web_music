using QLApp.Core.Entities.Dictionary.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Core.Entities.Dictionary
{
    public class User : people
    {
        public string tentaikhoan { get; set; } 
        public string matkhau { get; set; }
        public int idnguoidung { get; set; }
        public int quyen { get; set; }
        public byte[] File { get; set; }
       
      
    }
}
