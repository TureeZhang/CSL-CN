using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HanJie.CSLCN.Services
{
    public class StorageService : IStorageService
    {
        public StorageService()
        {

        }

        public List<string> Save(params UploadFile[] files)
        {
            Ensure.ArrayNotEmpty<UploadFile>(files, nameof(files));

            List<string> results = new List<string>();

            string storageDirectoryPath = GetStorageFullPath();
            if (!Directory.Exists(storageDirectoryPath))
                Directory.CreateDirectory(storageDirectoryPath);

            foreach (UploadFile item in files)
            {
                string fileSaveName = $"{Guid.NewGuid().ToString("n")}{Path.GetExtension(item.FileName)}";
                string fileSaveFullPath = Path.Combine(storageDirectoryPath, fileSaveName).Replace("\\", "/");
                results.Add(fileSaveName);
                FileStream fs = null;

                using (fs = new FileStream(fileSaveFullPath, FileMode.OpenOrCreate))
                {
                    item.FileStream.Position = 0;
                    long length = 1024;
                    while (item.FileStream.Position < item.FileStream.Length)
                    {
                        byte[] bytes = new byte[length];
                        item.FileStream.Read(bytes, 0, Convert.ToInt32(length));
                        fs.Write(bytes, 0, Convert.ToInt32(length));

                        if (item.FileStream.Position < item.FileStream.Length && item.FileStream.Length - item.FileStream.Position < length)
                        {
                            length = item.FileStream.Length - item.FileStream.Position;
                        }
                    }
                }

            }

            return results;

        }

        private void SaveTo(string path, FileStream fileStream)
        {

        }

        private string GetStorageFullPath()
        {
            Ensure.NotNull(GlobalConfigs.AppSettings.LocalUploadFilePath, nameof(GlobalConfigs.AppSettings.LocalUploadFilePath));

            string basePath = AppDomain.CurrentDomain.BaseDirectory;
            string relativePath = GlobalConfigs.AppSettings.LocalUploadFilePath;
            if (relativePath.StartsWith("/") || relativePath.StartsWith("\\"))
                relativePath = relativePath.Substring(1);

            string result = Path.Combine(basePath, relativePath);
            return result;
        }
    }
}
