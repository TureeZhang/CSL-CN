using System;
using System.Collections.Generic;
using System.IO;
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
                StringSearchEx stringSearcher = new StringSearchEx();
                stringSearcher.SetKeywords(SensitiveWordHelper._sensitiveWords);
                SensitiveWordHelper._stringSearcher = stringSearcher;
            }

            return SensitiveWordHelper._stringSearcher.ContainsAny(testWord);
        }

        private void LoadSensitiveWords()
        {
            string fileDirectoryPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Assets/sensitive-words");
            List<string> sensitiveWords = new List<string>();
            foreach (string item in Directory.GetFiles(fileDirectoryPath))
            {
                sensitiveWords.AddRange(File.ReadAllLines(item, Encoding.UTF8));
            }
            SensitiveWordHelper._sensitiveWords = sensitiveWords;
        }
    }
}
