using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlueGrass.PeopleDirectory.UI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BlueGrass.PeopleDirectory.UI.Contracts;
using BlueGrass.PeopleDirectory.UI.Contracts.Admin;
using BlueGrass.PeopleDirectory.UI.Utilities;
using System.Net.Http;

namespace BlueGrass.PeopleDirectory.UI.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }


        [HttpGet("[action]")]
        public async Task<ActionResult<ResponseModel>> GetCountries()
        {
            IList<GetCountryModel> result = await _adminService.GetCountries();
            return ResponseUtility.CreateResponse(result);
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<ResponseModel>> GetPersonDetails()
        {
            IList<GetPersonsModel> result = await _adminService.GetPeopleDetails();
            return ResponseUtility.CreateResponse(result);
        }


        [HttpPost("[action]")]
        public async Task<ActionResult<ResponseModel>> AddPerson([FromBody]AddPersonModel model)
        {
            var result = await _adminService.AddPerson(model);
            return ResponseUtility.CreateResponse(result);
        }


        [HttpPost("[action]")]
        public async Task<ActionResult<ResponseModel>> UpdatePerson([FromBody]UpdatePersonModel model)
        {
            var result = await _adminService.UpdatePerson(model);
            return ResponseUtility.CreateResponse(result);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ResponseModel>> DeletePerson([FromBody]DeletePersonModel model)
        {
            var result = await _adminService.DeletePerson(model);
            return ResponseUtility.CreateResponse(result);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ResponseModel>> GetCities([FromBody]GetCitiesByCountryIdModel model)
        {
            var result = await _adminService.GetCities(model);
            return ResponseUtility.CreateResponse(result);
        }


        [HttpPost("[action]")]
        public ActionResult<ResponseModel> SendEmail([FromBody]EmailModel model)
        {
            var result = _adminService.SendEmail(model);
            return ResponseUtility.CreateResponse(result);
        }

    }
}