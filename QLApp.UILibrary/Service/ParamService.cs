using QLApp.Core.Entities.UIItem;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.UILibrary.Service
{
    public static class ParamService
    {

        public static UIModel GetUIModel(UIParam param)
        {
            UIModel pr = new UIModel();

            if (!param.Layout)
            {
                pr.Layout = "_Layout";
            }

            return pr;
        } 

    }
}
