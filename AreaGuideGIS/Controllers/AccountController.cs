using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using AreaGuideGIS.Models;
using System.Security.Cryptography;
using System.Text;

namespace AreaGuideGIS.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login(User model, string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/") && !returnUrl.StartsWith("//") & !returnUrl.StartsWith("/\\"))
            {
                returnUrl = "/#!" + returnUrl;
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }

            if (ModelState.IsValid)
            {
                using (DBEntitiesAreaGuide entities = new DBEntitiesAreaGuide())
                {
                    var loginUser = entities.Users.Where(user => user.UserName == model.UserName).Select(user => new {username = user.UserName, password = user.Password, salt = user.salt});
                    string pwhash = loginUser.First().password;
                    string salt = loginUser.First().salt;
                    PasswordManager pwdMan = new PasswordManager();

                    bool userValid = pwdMan.IsPasswordMatch(model.Password, salt, pwhash);
                    if (userValid)
                    {
                        FormsAuthentication.SetAuthCookie(model.UserName, false);
                    }
                    else
                    {
                        ViewBag.Msg = "Invalid Login !";
                    }
                }

                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
             }
        }

        [AllowAnonymous]
        public ActionResult Register(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Register(User model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                using (DBEntitiesAreaGuide entities = new DBEntitiesAreaGuide())
                {
                    bool userExists = entities.Users.Any(user => user.UserName == model.UserName);
 
                    if (!userExists)
                    {
                        PasswordManager pwdMan = new PasswordManager();
                        string salt = null;
                        string pwHash = pwdMan.GeneratePasswordHash(model.Password, out salt);

                        model.Password = pwHash;
                        model.salt = salt;
                        model.APPId = Guid.NewGuid().ToString();
                        model.APIKey = APIKeyGenerator.GetAPIKey();

                        entities.Users.Add(model);
                        entities.SaveChanges();
                        ViewBag.Msg = "Login created";
                        ViewBag.Returnurl = returnUrl;
                    }
                    else
                    {
                        ViewBag.Msg = "Login exists !";
                        ViewBag.Returnurl = returnUrl;
                    }
                }
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
            
            return View();
        }

        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("Index", "Home");
        }
    }

    public static class SaltGenerator
    {
        private static RNGCryptoServiceProvider m_cryptoServiceProvider = null;
        private const int SALT_SIZE = 24;

        static SaltGenerator()
        {
            m_cryptoServiceProvider = new RNGCryptoServiceProvider();
        }

        public static string GetSaltString()
        {
            // Lets create a byte array to store the salt bytes
            byte[] saltBytes = new byte[SALT_SIZE];

            // lets generate the salt in the byte array
            m_cryptoServiceProvider.GetNonZeroBytes(saltBytes);

            // Let us get some string representation for this salt
            string saltString = Encoding.Default.GetString(saltBytes);

            // Now we have our salt string ready lets return it to the caller
            return saltString;
        }
    }

    public static class APIKeyGenerator
    {
        private static RNGCryptoServiceProvider m_cryptoServiceProvider = null;
        private const int APIKEY_SIZE = 32;

        static APIKeyGenerator()
        {
            m_cryptoServiceProvider = new RNGCryptoServiceProvider();
        }

        public static string GetAPIKey()
        {
            byte[] secretKeyBytes = new byte[APIKEY_SIZE];
            m_cryptoServiceProvider.GetBytes(secretKeyBytes);
            string APIKey = Convert.ToBase64String(secretKeyBytes);
            m_cryptoServiceProvider.Dispose();
            
            return APIKey;
        }
    }

    public class HashComputer
    {
        public string GetPasswordHashAndSalt(string message)
        {
            // Let us use SHA256 algorithm to 
            // generate the hash from this salted password
            SHA256 sha = new SHA256CryptoServiceProvider();
            byte[] dataBytes = Encoding.Default.GetBytes(message);
            byte[] resultBytes = sha.ComputeHash(dataBytes);

            // return the hash string to the caller
            return Encoding.Default.GetString(resultBytes);
        }
    }

    public class PasswordManager
    {
        HashComputer m_hashComputer = new HashComputer();

        public string GeneratePasswordHash(string plainTextPassword, out string salt)
        {
            salt = SaltGenerator.GetSaltString();

            string finalString = plainTextPassword + salt;

            return m_hashComputer.GetPasswordHashAndSalt(finalString);
        }

        public bool IsPasswordMatch(string password, string salt, string hash)
        {
            string finalString = password + salt;
            return hash == m_hashComputer.GetPasswordHashAndSalt(finalString);
        }
    }
}