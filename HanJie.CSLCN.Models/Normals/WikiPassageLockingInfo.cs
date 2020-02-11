using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos.Normals
{
    public class WikiPassageLockingInfo
    {
        public int UserId { get; set; }
        public DateTime LastLockingConfirmDateTime { get; set; }
    }
}
