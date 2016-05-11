using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Net;
using System.Diagnostics;
using System.IO;

namespace BreweryApplication.Controllers
{
    public class MyObject {
        public string name { get; set; }
        public string description { get; set; }
        public string yearOpened { get; set; }
        public string locality { get; set; }
        public string region { get; set; }
        public string website { get; set; }
    }
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetBrewery() {
            string result;
            WebRequest webRequest = WebRequest.Create("http://api.brewerydb.com/v2/locations?key=<key>&locality=Chicago");
            WebResponse webResp = webRequest.GetResponse();
            using (var reader = new StreamReader(webResp.GetResponseStream())) {
                result = reader.ReadToEnd();
            }
            //string json = @result;
            //MyObject brewery = JsonConvert.DeserializeObject<MyObject>(json);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}