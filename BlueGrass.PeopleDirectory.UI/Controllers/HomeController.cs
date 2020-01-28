using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BlueGrass.PeopleDirectory.UI.Models;
using BlueGrass.PeopleDirectory.UI.Contracts;
using Microsoft.Extensions.Logging;

namespace BlueGrass.PeopleDirectory.UI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IPeopleDirectoryService _peopledirectoryservice;
        private readonly ILogger<HomeController> _logger;

        public HomeController(IPeopleDirectoryService peopledirectoryservice, ILogger<HomeController> logger)
        {
            _peopledirectoryservice = peopledirectoryservice;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public async Task<ActionResult> GetPeopleDetails()
        {
            IList<PeopleDetailsModel> result = await _peopledirectoryservice.GetPeopleDetails();
            return Json(new { success = true, response = result });
        }

        [HttpPost]
        public async Task<ActionResult> AddPeopleDetails([FromBody]PeopleDetailsModel model)
        {
            var result = await _peopledirectoryservice.AddPeopleDetails(model);
            return Json(new { success = true, response = result });
        }


        [HttpPost]
        public async Task<ActionResult> UpdatePeopleDetails([FromBody]PeopleDetailsModel model)
        {
            var result = await _peopledirectoryservice.UpdatePeopleDetails(model);
            return Json(new { success = true, response = result });
        }

        [HttpPost]
        public async Task<ActionResult> DeletePeopleDetails([FromBody]PeopleDetailsByIdModel model)
        {
            var result = await _peopledirectoryservice.DeletePeopleDetails(model);
            return Json(new { success = true, response = result });
        }

    }
}
