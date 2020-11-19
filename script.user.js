// ==UserScript==
// @name         TUD AutoLogin
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  Stop wasting your time entering login credentials or pressing useless buttons!
// @source       spyfly
// @website      https://github.com/spyfly/TUD-AutoLogin
// @match        https://bildungsportal.sachsen.de/*
// @match        https://idp2.tu-dresden.de/*
// @match        https://jexam.inf.tu-dresden.de/*
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
  const isOpalLoginPage = (window.location.host == "bildungsportal.sachsen.de");
  const isTudLoginPage = (window.location.host == "idp2.tu-dresden.de")
  const isJExam = (window.location.host == "jexam.inf.tu-dresden.de")

  const credentialsAvailable = (tud.username.length > 0 && tud.password.length > 0);

  if (isOpalLoginPage) {
    //Click Login Button on mainpage
    if (document.getElementsByName("shibLogin").length >= 1) {
      //Select TUD if it hasn't been selected yet
      if (document.getElementsByName("wayfselection")[0].selectedIndex == 0) {
        document.getElementsByName("wayfselection")[0].selectedIndex = 19;
      }

      //Press Login Button on OPAL Page
      document.getElementsByName("shibLogin")[0].click();
    } else if (document.getElementsByClassName("login")[0] != undefined) {
      document.getElementsByClassName("login")[0].parentElement.click();
      setTimeout(function(){
        document.getElementsByName("content:container:login:shibAuthForm:shibLogin")[0].click();
      }, 500);
    }
  } else if (isTudLoginPage) {
    // We are on the TUD I2DP Page
    const hasLoginField = (document.getElementById("username") != undefined);

    if (hasLoginField) {
      // Try to fill in credentials
      document.getElementById("username").value = tud.username;
      document.getElementById("password").value = tud.password;
      if (credentialsAvailable) {
        document.getElementsByName("_eventId_proceed")[0].click();
      }
    } else {
      // Just press the continue button
      document.getElementsByName("_eventId_proceed")[0].click();
    }
  } else if (isJExam) {
    // AutoLogin for JExam 5
    if (window.location.pathname == "/") {
      window.location = "https://jexam.inf.tu-dresden.de/de.jexam.web.v5/"
    } else if (window.location.pathname == "/de.jexam.web.v5/spring/welcome") {
      // Try to fill in credentials
      document.getElementById("username").value = tud.username;
      document.getElementById("password").value = tud.password;
      if (credentialsAvailable) {
        document.getElementsByClassName("submit")[0].click();
      }
    }
  }
})();