﻿using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class EditorDevoteInfoDto
    {

        /// <summary>
        /// 用户信息
        /// </summary>
        public UserInfoDto UserInfo { get; set; }

        /// <summary>
        /// 作为主要编辑者的文档列表
        /// </summary>
        public List<WikiPassageDto> MainAuthPassages { get; set; }

        /// <summary>
        /// 作为合作编辑者的文档列表
        /// </summary>
        public List<WikiPassageDto> CooAuthPassages { get; set; }

        /// <summary>
        /// 提交次数计数
        /// </summary>
        public int CommitTimesCount { get; set; }

        /// <summary>
        /// 最后编辑文档的时间（最后活跃时间）
        /// </summary>
        public string LastCommitDateTime { get; set; }

    }
}
