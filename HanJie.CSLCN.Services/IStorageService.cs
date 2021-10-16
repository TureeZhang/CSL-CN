using System.Collections.Generic;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public interface IStorageService
    {
        List<string> Save(params UploadFile[] files);
    }
}