using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AreaGuideGIS.Models;
using AreaGuideGIS.Filters;

namespace AreaGuideGIS.Controllers
{
    
    public class AreaGuidesAPIController : ApiController
    {
        private DBEntitiesAreaGuide db = new DBEntitiesAreaGuide();

        // GET: api/AreaGuidesAPI
        //[HMACAuthentication]
        public IEnumerable<AreaGuide> GetAreaGuides()
        {
            return db.AreaGuides;
        }

        // GET: api/AreaGuidesAPI/5
        [ResponseType(typeof(AreaGuide))]
        public IHttpActionResult GetAreaGuide(int? id)
        {
            AreaGuide areaGuide = db.AreaGuides.Find(id);
            if (areaGuide == null)
            {
                return NotFound();
            }

            return Ok(areaGuide);
        }

        //[Authorize]
        [HttpGet]
        [ResponseType(typeof(AreaGuide))]
        public IHttpActionResult GetByAreaID(string areaID)
        {
            AreaGuide areaGuide = db.AreaGuides.FirstOrDefault<AreaGuide>(a => a.AreaID == areaID);
            if (areaGuide == null)
            {
                //return NotFound();
            }

            return Ok(areaGuide);
        }

        // PUT: api/AreaGuidesAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAreaGuide(int id, AreaGuide areaGuide)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != areaGuide.ID)
            {
                return BadRequest();
            }

            db.Entry(areaGuide).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AreaGuideExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/AreaGuidesAPI
        [ResponseType(typeof(AreaGuide))]
        public IHttpActionResult PostAreaGuide(AreaGuide areaGuide)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AreaGuides.Add(areaGuide);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = areaGuide.ID }, areaGuide);
        }

        // DELETE: api/AreaGuidesAPI/5
        [ResponseType(typeof(AreaGuide))]
        public IHttpActionResult DeleteAreaGuide(int id)
        {
            AreaGuide areaGuide = db.AreaGuides.Find(id);
            if (areaGuide == null)
            {
                return NotFound();
            }

            db.AreaGuides.Remove(areaGuide);
            db.SaveChanges();

            return Ok(areaGuide);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AreaGuideExists(int id)
        {
            return db.AreaGuides.Count(e => e.ID == id) > 0;
        }
    }
}