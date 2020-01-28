using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlueGrass.PeopleDirectory.UI.Contracts.Admin;
using BlueGrass.PeopleDirectory.UI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BlueGrass.PeopleDirectory.UI.Controllers.MVC
{
    public class AdminLoginController : Controller
    {

        const string SessionName = "_Name";

        private readonly IAdminService _adminService;

        public AdminLoginController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        public IActionResult AdminLogin()
        {
            return View();
        }

        public IActionResult AdminError()
        {
            return View("~");
        }

        [HttpPost]
        public async Task<IActionResult> AdminLogin(AdminModel model)
        {
            if (ModelState.IsValid)
            {
                var isAdmin = await _adminService.IsAdmin(model);
                if (isAdmin)
                {
                    HttpContext.Session.SetString(SessionName, model.AdminName);
                    return RedirectToAction("Admin", "Admin");
                }
                else
                {
                    return View("Error", new ErrorViewModel
                    {
                        ErrorMessage = "You dont have access to view this page"
                    });
                }
            }
            else
            {
                return View();
            }

        }

    }
}