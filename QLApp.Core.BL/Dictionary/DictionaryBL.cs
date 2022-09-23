using QLApp.Core.BL.Base;
using QLApp.Core.Entities.Data;
using QLApp.Core.Entities.Dictionary;
using QLApp.Core.Entities.Dictionary.Data;
using QLApp.Core.Entities.Enum;
using QLApp.Library.Collection;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace QLApp.Core.BL.Dictionary
{
    public class DictionaryBL : BaseBL
    {

        public DictionaryBL(AppCollection service) : base(service)
        {
        }

        public async Task<bool> SaveTaiKhoan(SaveParam saveParam)
        {
            var obj = JsonSerializer.Deserialize<User>(saveParam.FormData.ToString());
            if (saveParam.Mode == Mode.Add)
            {
                return await _service.DataService.ExcuteSaveAsync("Proc_Save_TK", obj);
            }
            else
            {
                return await _service.DataService.ExcuteSaveAsync("Proc_Update_TK", obj);
            }

        }

    }
}
