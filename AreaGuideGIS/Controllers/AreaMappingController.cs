using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AreaGuideGIS.Models;
using System.Configuration;

namespace AreaGuideGIS.Controllers
{
    public class AreaMappingController : Controller
    {
        // GET: Mapping
        public ActionResult Index()
        {
            return PartialView();
        }

        public ActionResult Map()
        {
            return PartialView();
        }

        // GET: AreaGuides/Edit/5
        [Authorize]
        public ActionResult Edit(int? id)
        {
            return PartialView();
        }

        [Authorize]
        public ActionResult Create(string areaid)
        {
            return PartialView();
        }

        [Authorize]
        public ActionResult Delete(int? id)
        {
            return PartialView();
        }
    }
}