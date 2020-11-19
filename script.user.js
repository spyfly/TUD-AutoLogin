// ==UserScript==
// @name         TUD AutoLogin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Stop wasting your time entering login credentials or pressing useless buttons!
// @source       spyfly
// @website      https://github.com/spyfly/TUD-AutoLogin
// @match        https://bildungsportal.sachsen.de/*
// @match        https://idp2.tu-dresden.de/*
// @updateURL    https://raw.githubusercontent.com/spyfly/TUD-AutoLogin/master/script.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Enter your login creds here
    const tud = {
      username: "",
      password: ""
    }

    // Code starts here
    var isOpalLoginPage = (document.getElementsByName("shibLogin").length >= 1);
    var isTudLoginPage = (window.location.host == "idp2.tu-dresden.de")

    if (isOpalLoginPage) {
      //Select TUD if it hasn't been selected yet
      if (document.getElementsByName("wayfselection")[0].selectedIndex == 0) {
        document.getElementsByName("wayfselection")[0].selectedIndex = 19;
      }

      //Press Login Button on OPAL Page
      document.getElementsByName("shibLogin")[0].click();
    } else if (isTudLoginPage) {
      // We are on the TUD I2DP Page
      var hasLoginField = (document.getElementById("username") != undefined);

      if (hasLoginField) {
        // Try to fill in credentials
        document.getElementById("username").value = tud.username;
        document.getElementById("password").value = tud.password;
        if (tud.username.length > 0 && tud.password.length > 0) {
          document.getElementsByName("_eventId_proceed")[0].click();
        }
      } else {
        // Just press the continue button
        document.getElementsByName("_eventId_proceed")[0].click();
      }
    }
})();
