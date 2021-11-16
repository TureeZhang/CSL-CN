using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using ToolGood.Words;

namespace HanJie.CSLCN.Common
{
    public class SensitiveWordHelper : BaseHelper, ISensitiveWordHelper
    {
        private static List<string> _sensitiveWords { get; set; }
        private static StringSearchEx _stringSearcher { get; set; }

        public bool IsContainsSensitiveWord(string testWord)
        {

            if (SensitiveWordHelper._sensitiveWords == null)
                LoadSensitiveWords();

            if (SensitiveWordHelper._stringSearcher == null)
            {
                SensitiveWordHelper._stringSearcher = new StringSearchEx();
                SensitiveWordHelper._stringSearcher.SetKeywords(SensitiveWordHelper._sensitiveWords);
            }

            bool isContainsSensitiveWords = true;
            try
            {
                isContainsSensitiveWords = SensitiveWordHelper._stringSearcher.ContainsAny(testWord);
            }
            catch (Exception ex)
            {
                Console.WriteLine("敏感词检测服务失败：" + ex);
            }

            return isContainsSensitiveWords;
        }

        private void LoadSensitiveWords()
        {
            string fileDirectoryPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Assets/sensitive-words");
            List<string> sensitiveWords = new List<string>();
            foreach (string item in Directory.GetFiles(fileDirectoryPath))
            {
                string[] words = File.ReadAllText(item, Encoding.UTF8).Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                words = words.Select(item => item.Remove("\r").Remove("\n")).ToArray();
                sensitiveWords.AddRange(words);
            }
            SensitiveWordHelper._sensitiveWords = sensitiveWords;
        }
    }
}
