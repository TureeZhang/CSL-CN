using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class MenuDto : BaseDtoModel<MenuDto, Menu>
    {
        public string Title { get; set; }

        public string IconType { get; set; }

        public string Path { get; set; }

        public List<MenuItemDto> MenuItems { get; set; }
    }
}
