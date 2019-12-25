using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;
using HanJie.CSLCN.WebApp.Attributes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class WikiPassagesController : BaseController
    {
        private WikiPassageService _wikiPassageService { get; set; }

        public WikiPassagesController(WikiPassageService wikiPassageService)
        {
            _wikiPassageService = wikiPassageService;
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<JsonResult> GetAsync(string id)
        {
            string routePath = id;
            WikiPassage wikiPassage = await this._wikiPassageService.GetByRoutePathAsync(id);
            WikiPassageDto wikiPassageDto = new WikiPassageDto().ConvertFromDataModel(wikiPassage);
            wikiPassageDto.AnchorTitles = await CollectAnchorTitlesAsync(wikiPassageDto.Content);

            return new JsonResult(wikiPassageDto);
        }
        // POST api/<controller>
        [HttpPost]
        [MyAuthorize]
        public async Task PostAsync([FromBody]WikiPassageDto dto)
        {
            await this._wikiPassageService.UpdateAsync(new WikiPassage().ConvertFromDtoModel(dto));
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [NonAction]
        public async Task<List<WikiPassageAnchorTitleDto>> CollectAnchorTitlesAsync(string content)
        {
            if (string.IsNullOrEmpty(content))
                throw new ArgumentNullException(nameof(content), "content is required.");

            List<WikiPassageAnchorTitleDto> result = new List<WikiPassageAnchorTitleDto>();
            StringReader stringReader = new StringReader(content);
            string line = await stringReader.ReadLineAsync();
            while (line != null)
            {
                if (line.StartsWith("## "))
                    result.Add(new WikiPassageAnchorTitleDto() { Title = line.Substring(3), Href = $"#{line.Substring(3).Replace(" ", "-").Replace("&", "")}" });
                if (line.StartsWith("### "))
                {
                    if (result.Last().Children == null)
                    {
                        result.Last().Children = new List<WikiPassageAnchorTitleDto>();
                    }
                    result.Last().Children.Add(new WikiPassageAnchorTitleDto() { Title = line.Substring(4), Href = $"#{line.Substring(4).Replace(" ", "-").Replace("&", "")}" });
                }

                line = await stringReader.ReadLineAsync();
            }

            return result;
        }

    }
}
