﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using AreaGuideGIS.Models;

namespace AreaGuideGIS.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login(User model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                using (DBEntitiesAreaGuide entities = new DBEntitiesAreaGuide())
                {
                    string username = model.UserName;
                    string password = model.Password;

                    bool userValid = entities.Users.Any(user => user.UserName == username && user.Password == password);

                    if (userValid)
                    {
                        FormsAuthentication.SetAuthCookie(username, false);
                        if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/") && !returnUrl.StartsWith("//") & !returnUrl.StartsWith("/\\"))
                        {
                            return Redirect(returnUrl);
                            //return RedirectToAction("Create", "AreaMapping");
                        }
                        else
	                    {
                            return RedirectToAction("Index", "Home");
	                    }
                    }
                    else
	                {
                        ModelState.AddModelError("", "The user name or password is incorrect!");
                    }
                }
            }

            return View(model);
        }

        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("Index", "Home");
        }
    }
}