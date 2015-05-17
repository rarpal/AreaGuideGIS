using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AreaGuideGIS.Models
{
    public class MappingAreaGuide
    {
        public string AreaID { get; set; }
        public string Type { get; set; }
        public decimal AvgPrice { get; set; }
        public byte Rating { get; set; }
        public string Notes { get; set; }
    }
}