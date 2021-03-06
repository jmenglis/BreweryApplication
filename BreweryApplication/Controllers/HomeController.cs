﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Net;
using System.Diagnostics;
using System.IO;
using System.Configuration;

namespace BreweryApplication.Controllers {
    public class MyObject {
        public string name { get; set; }
        public string description { get; set; }
        public string yearOpened { get; set; }
        public string locality { get; set; }
        public string region { get; set; }
        public string website { get; set; }
    }
    public class MyRequest {
        public string city { get; set; }
        public string theState { get; set; }
    }
    public class HomeController : Controller {
        // GET: Home
        public ActionResult Index() {
            return View();
        }
        public ActionResult About() {
            return View();
        }
        [HttpPost]
        public JsonResult GetBrewery() {
            // Gather params type data from Front End
            System.IO.Stream body = Request.InputStream;
            System.Text.Encoding encoding = Request.ContentEncoding;
            System.IO.StreamReader reads = new System.IO.StreamReader(body, encoding);
            string jsonReq = reads.ReadToEnd();
            MyRequest m = JsonConvert.DeserializeObject<MyRequest>(jsonReq);
            string locality = m.city;
            string state = m.theState;

            // Send http request to BreweryDB API
            string result;
            WebRequest webRequest = WebRequest.Create("http://api.brewerydb.com/v2/locations?key=" + ConfigurationManager.AppSettings["APIKey"] + "&locality=" + locality + "&region=" + state);
            WebResponse webResp = webRequest.GetResponse();
            using (var reader = new StreamReader(webResp.GetResponseStream())) {
                result = reader.ReadToEnd();
            }
            //string json = @result;
            //MyObject brewery = JsonConvert.DeserializeObject<MyObject>(json);

            // Return the results back to the Front End
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}