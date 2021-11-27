using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadController : BaseController
    {
        private IQiniuService _qiniuService;
        private IStorageService _storageService;

        public DownloadController(IQiniuService qiniuService,
            IUserStatuService userStatuService,
            IStorageService storageService) : base(userStatuService)
        {
            this._qiniuService = qiniuService;
            this._storageService = storageService;
        }

        [HttpGet()]
        [Route("/api/download")]
        public IActionResult LocalStorage(string fname)
        {
            string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot", fname.Substring(1));

            if (!System.IO.File.Exists(filePath))
                return NotFound();

            FileStream fs = new FileStream(filePath, FileMode.Open);
            string contentType = string.Empty;
            bool isSuccess = new FileExtensionContentTypeProvider().TryGetContentType(fname, out contentType);

            if (!isSuccess)
                contentType = "*";

            return File(fs, contentType);
        }
    }
}