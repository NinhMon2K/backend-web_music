using QLApp.Library.Service.Interface;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using System.Reflection;

namespace QLApp.Library.Service.Implementtion
{
    public class StorageService : IStorageService
    {

        private readonly string _userContentFolder;
        private const string USER_CONTENT_FOLDER_NAME = "saveimage";


        #region Constuctor 

        #endregion

        public StorageService()
        {
            _userContentFolder = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            var index = _userContentFolder.IndexOf("API");
            var str = _userContentFolder.Substring(0, index);
            _userContentFolder = str + "UI\\wwwroot\\" + USER_CONTENT_FOLDER_NAME;
        }

        public string GetFileUrl(string fileName)
        {
            return $"/{USER_CONTENT_FOLDER_NAME}/{fileName}";
        }

        public async Task<string> SaveFileAsync(Stream mediaBinaryStream, string fileName)
        {
            if (!Directory.Exists(_userContentFolder))
                Directory.CreateDirectory(_userContentFolder);

            var filePath = Path.Combine(_userContentFolder, fileName);
            using var output = new FileStream(filePath, FileMode.Create);
            await mediaBinaryStream.CopyToAsync(output);
            return filePath;
        }

        public async Task DeleteFileAsync(string fileName)
        {
            var filePath = Path.Combine(_userContentFolder, fileName);
            if (File.Exists(filePath))
            {
                await Task.Run(() => File.Delete(filePath));
            }
        }
    }
}
