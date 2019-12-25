using HanJie.CSLCN.Services;
using HanJie.CSLCN.WebApp.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace HanJie.CSLCN.Tests
{
    public class TestMenusController : IClassFixture<WebApplicationFactory<CSLCN.WebApp.Startup>>
    {
        private readonly WebApplicationFactory<WebApp.Startup> _factory;

        public TestMenusController(WebApplicationFactory<WebApp.Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task TestGet_ShouldReturnMenus()
        {
            HttpClient client = _factory.CreateClient();
            HttpResponseMessage response = (await client.GetAsync("http://localhost:61520/api/menus"));

            Assert.True(!string.IsNullOrEmpty(response.Content.ReadAsStringAsync().Result));
        }
    }
}
