using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlueGrass.PeopleDirectory.UI.Controllers.MVC
{
    public class AdminController : Controller
    {
        const string SessionName = "_Name";
        public IActionResult Admin()
        {
            ViewBag.Name = HttpContext.Session.GetString(SessionName);
            return View();
        }

        [HttpPost]
        public IActionResult Logout(string button)
        {
            HttpContext.Session.Remove(SessionName);
            return RedirectToAction("Index", "Home");
        }
    }
}