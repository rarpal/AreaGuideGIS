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

        // GET: AreaGuides/Edit/5
        public ActionResult Edit(int? id)
        {
            return PartialView();
        }

        public ActionResult Create(string areaid)
        {
            return PartialView();
        }

        public ActionResult Delete(int? id)
        {
            return PartialView();
        }
    }
}