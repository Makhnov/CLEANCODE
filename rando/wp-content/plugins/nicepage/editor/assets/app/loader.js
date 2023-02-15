!function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:false,exports:{}};return e[i].call(s.exports,s,s.exports,t),s.l=true,s.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,i){if(!t.o(e,n))Object.defineProperty(e,n,{configurable:false,enumerable:true,get:i})},t.n=function(e){var n=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/Content/BundledScripts/",t(t.s=9495)}({9495:function(e,t,n){"use strict";n(9496)},9496:function(e,t,n){"use strict";function i(){if(console.log("ServiceWorker: Starting..."),loader.createLoadingMessage(),!loader.showIncompatibleBrowserMessage()){var e=document.getElementById("loader-script");if(!e)return console.log("ServiceWorker: Cannot find loader script!"),loader.loadApp(),void 0;loader.initTimeouts();var t=e.dataset.swurl,n=e.dataset.assets;t=loader.applyParam(t,"assetsPath="+encodeURIComponent(n)),loader.setServiceWorker(t)}}if(n(9497),"complete"===document.readyState||document.body)i();else document.addEventListener("DOMContentLoaded",i)},9497:function(e,t,n){"use strict";function i(url){if(P())return console.log("ServiceWorker: No ServiceWorker for localhost."),loader.startApp(),void 0;if("serviceWorker"in navigator)console.log("ServiceWorker: ServiceWorker Supported"),window.addEventListener("load",(function(){navigator.serviceWorker.register(url).then((function(e){if(console.log("ServiceWorker: Registered"),e.installing)return s(e.installing,"reg.installing"),void 0;if(e.waiting)return s(e.waiting,"reg.waiting"),void 0;if(e.active){if(console.log("ServiceWorker: reg.active:",e.active.state),"activated"===e.active.state)return console.log("ServiceWorker: Check For Updates"),e.update().then((function(t){if(!t)return s(e.active,"The regUpdate object is undefined."),void 0;var n=t.installing||t.waiting;if(n)s(n,"Updates Found!");else s(t.active,"No Updates")})),void 0;s(e.active,"Unsupported Flow")}})).catch((function(e){console.log("ServiceWorker: Failed to Register.",e),loader.startApp()}))}));else console.log("ServiceWorker: ServiceWorker is not Supported."),loader.startApp()}function s(e,t){switch(console.log("ServiceWorker:",t,e.state),e.state){case"installing":if(l())loader.setUpdatingStatus();e.onstatechange=function(t){if(console.log("ServiceWorker: statechange: ",t.target.state),"installed"===t.target.state)o(e);if("activated"===t.target.state)loader.startApp();if("redundant"===t.target.state)loader.startApp()};break;case"installed":o(e),e.onstatechange=function(e){if(console.log("ServiceWorker: statechange: ",e.target.state),"activated"===e.target.state)loader.startApp();if("redundant"===e.target.state)loader.startApp()};break;case"activating":e.onstatechange=function(e){if(console.log("ServiceWorker: statechange: ",e.target.state),"activated"===e.target.state)loader.startApp();if("redundant"===e.target.state)loader.startApp()};break;case"activated":loader.startApp();break;case"redundant":loader.startApp();break;default:console.log("ServiceWorker: Unknown State!");break}}function o(e){if(p())return console.log("ServiceWorker: skipWaiting Already Started!"),void 0;j=true,k(),console.log("ServiceWorker: skipWaiting"),e.postMessage({action:"SKIP_WAITING"})}function a(e){var t=document.createElement("script");t.type="text/javascript",t.src=e,t.crossOrigin="anonymous",document.getElementsByTagName("head")[0].appendChild(t)}function u(e){var t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.media="all",t.href=e,document.getElementsByTagName("head")[0].appendChild(t)}function c(url,e){var t;if(-1===url.lastIndexOf("?"))url+="?";else url+="&";return url+=e}function f(){for(var e=document.getElementsByTagName("script"),t=0;t<e.length;t++){var n=e[t];if(n&&n.src&&-1!==n.src.indexOf("/loader.js"))return{cdnPath:n.src.replace(/loader.js.*$/g,""),hasVersion:-1!==n.src.indexOf("ver=")}}return{cdnPath:"",hasVersion:false}}function l(){return!!navigator.serviceWorker.controller}function p(){return N}function v(){console.log("ServiceWorker: loadApp");var e=f(),t=e.cdnPath;window.cdnPath=t;var n=t+"app.css",i=t+"app.js";if(P())n=c(n,"v="+(new Date).getTime()),i=c(i,"v="+(new Date).getTime());else if(e.hasVersion)n=c(n,"ver="+"5.3.6"),i=c(i,"ver="+"5.3.6");window.loadAppHook=window.loadAppHook||function(e){e()},loader.addStyle(n),window.loadAppHook((function(){loader.addScript(i)}))}function g(){if(p())return console.log("ServiceWorker: startApp Already Started!"),void 0;N=true,j=false,console.log("ServiceWorker: startApp"),clearTimeout(C),clearTimeout(L),loader.hideSlowInternetMessage(),loader.setLoadingStatus(),loader.loadApp()}function h(){var e=document.getElementById("loading-screen");if(e)e.parentElement.removeChild(e)}function m(){loader.cleanupForLoadingMessage();var e="Loading...",t="Updating...",n="Activating...",i="We are sorry, your browser is not supported.<br/>"+"To use Nicepage editor please download Chrome(v61+), Firefox (66+) or Safari(v11.1.2+).<br/>"+"Please note that this warning applies only to the editor issues.<br/>"+"Generated pages are opened in any browser.",s="<div><strong>It looks like you have a slow internet connection.</strong></div><br><div>Please wait, this may take a few minutes</div>",o=document.createElement("div");o.id="loading-screen",o.setAttribute("style","display:flex;position:fixed;left:0px;top:0px;height:100%;width:100%;flex-flow:column;"),o.innerHTML="<style>.horizontal-box{display:flex;flex-flow:row}.spacer{flex:auto}.centered-element{flex:none}"+".message-block{margin:10px;font-family:Tahoma;font-size:16px}"+".button{background-color:#4c637f;border:none;color:white;padding:10px 30px;text-align:center;text-decoration:none;display:inline-block;margin-top:10px}"+".hidden{display:none;}</style>"+'<div class="spacer"></div>'+'<div class="horizontal-box">'+'    <div class="spacer"></div>'+'    <div class="centered-element message-block">'+'        <span id="loadingApp" class="status-message"><strong>'+e+"</strong></span>"+'        <span id="updatingApp" class="status-message hidden"><strong>'+t+"</strong></span>"+'        <span id="activatingApp" class="status-message hidden"><strong>'+n+"</strong></span>"+'        <span id="incompatibleBrowser" class="status-message hidden"><strong>'+i+"</strong></span>"+"    </div>"+'    <div class="spacer"></div>'+"</div>"+'<div class="horizontal-box">'+'    <div class="spacer"></div>'+'    <div class="centered-element message-block" >'+'        <div id="slow-connection-warning" class="hidden">'+s+"</div>"+"    </div>"+'    <div class="spacer"></div>'+"</div>"+'<div class="spacer"></div>';var a=document.getElementsByTagName("body");if(a)a=a[0];if(a){var u=a.children&&a.children[0];a.insertBefore(o,u)}}function b(){for(var e=document.getElementsByClassName("status-message"),t=0;t<e.length;t++)e[t].classList.add("hidden")}function y(){b();var e=document.getElementById("updatingApp");if(e)e.classList.remove("hidden")}function w(){b();var e=document.getElementById("loadingApp");if(e)e.classList.remove("hidden")}function k(){b();var e=document.getElementById("activatingApp");if(e)e.classList.remove("hidden")}function M(){b();var e=document.getElementById("incompatibleBrowser");if(e)e.classList.remove("hidden")}function S(){if(console.log("ServiceWorker: onSmallTimeout, isUpdating: ",l()),j)return console.log("ServiceWorker: onSmallTimeout, Cannot activate. startApp"),window.serviceWorkerWaitActivate=true,loader.startApp(),void 0;clearTimeout(C),loader.showSlowInternetMessage()}function F(){console.log("ServiceWorker: onTotalTimeout"),clearTimeout(L),loader.startApp()}function _(){C=setTimeout(loader.onSmallTimeout,E),L=setTimeout(loader.onTotalTimeout,W)}function x(){var e=document.getElementById("slow-connection-warning");if(e)e.classList.add("hidden")}function A(){var e=document.getElementById("slow-connection-warning");if(e)e.classList.remove("hidden")}function B(){try{var e=bowser.getParser(window.navigator.userAgent);return!e.isPlatform("mobile")&&e.satisfies(T)}catch(e){return false}}function O(){if(!B())return M(),true;else return false}function P(){return"boolean"==typeof __WEBPACK_IS_LOCAL__?__WEBPACK_IS_LOCAL__:false}try{n(9498)}catch(e){}var T={chrome:">61",chromium:">61",safari:">11.1.1",firefox:">62"},W=3e4,E=1e4,N=false,j=false,L=null,C=null,loader={addScript:a,addStyle:u,applyParam:c,loadApp:v,startApp:g,showIncompatibleBrowserMessage:O,cleanupForLoadingMessage:h,createLoadingMessage:m,setUpdatingStatus:y,setLoadingStatus:w,onSmallTimeout:S,onTotalTimeout:F,initTimeouts:_,hideSlowInternetMessage:x,showSlowInternetMessage:A,setServiceWorker:i};window.loader=loader},9498:function(e,t){var t=void 0,e=void 0;(function(){!function n(i,factory){if("object"==typeof t&&"object"==typeof e)e.exports=factory();else if("function"==typeof define&&define.amd)define([],factory);else if("object"==typeof t)t["bowser"]=factory();else i["bowser"]=factory()}(this,(function(){return function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:false,exports:{}};return e[i].call(s.exports,s,s.exports,t),s.l=true,s.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,i){if(!t.o(e,n))Object.defineProperty(e,n,{enumerable:true,get:i})},t.r=function(e){if("undefined"!=typeof Symbol&&Symbol.toStringTag)Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});Object.defineProperty(e,"__esModule",{value:true})},t.t=function(e,n){if(1&n)e=t(e);if(8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:true,value:e}),2&n&&"string"!=typeof e)for(var s in e)t.d(i,s,function(t){return e[t]}.bind(null,s));return i},t.n=function(e){var n=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=328)}({328:function(e,t,n){var i,s,o;!function(a,factory){if(true)s=[t,n(329)],!(void 0!==(o="function"==typeof(i=factory)?i.apply(t,s):i)&&(e.exports=o));else var u}(this,(function(t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function s(instance,e){if(!(instance instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:true});var o=i(n),a=function(){function e(e,props){for(var t=0;t<props.length;t++){var n=props[t];if(n.enumerable=n.enumerable||false,n.configurable=true,"value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}return function(t,n,i){if(n)e(t.prototype,n);if(i)e(t,i);return t}}(),Bowser=function(){function Bowser(){s(this,Bowser)}return a(Bowser,null,[{key:"getParser",value:function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:false;if("string"!=typeof t)throw new Error("UserAgent should be a string");return new o["default"](t,n)}},{key:"parse",value:function parse(e){return new o["default"](e).getResult()}}]),Bowser}();t["default"]=Bowser,e.exports=t["default"]}))},329:function(e,t,n){var i,s,o;!function(a,factory){if(true)s=[t,n(330),n(332),n(333),n(334),n(331)],!(void 0!==(o="function"==typeof(i=factory)?i.apply(t,s):i)&&(e.exports=o));else var u}(this,(function(t,n,i,s,o,a){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}function c(instance,e){if(!(instance instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:true});var f=u(n),l=u(i),p=u(s),v=u(o),g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h=function(){function e(e,props){for(var t=0;t<props.length;t++){var n=props[t];if(n.enumerable=n.enumerable||false,n.configurable=true,"value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}return function(t,n,i){if(n)e(t.prototype,n);if(i)e(t,i);return t}}(),m=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:false;if(c(this,e),null==t||""===t)throw new Error("UserAgent parameter can't be empty");if(this._ua=t,this.parsedResult={},true!==n)this.parse()}return h(e,[{key:"getUA",value:function e(){return this._ua}},{key:"test",value:function e(t){return t.test(this._ua)}},{key:"parseBrowser",value:function e(){var t=this;this.parsedResult.browser={};var n=f["default"].find((function(e){if("function"==typeof e.test)return e.test(t);if(e.test instanceof Array)return e.test.some((function(e){return t.test(e)}));throw new Error("Browser's test function is not valid")}));if(n)this.parsedResult.browser=n.describe(this.getUA());return this.parsedResult.browser}},{key:"getBrowser",value:function e(){if(this.parsedResult.browser)return this.parsedResult.browser;else return this.parseBrowser()}},{key:"getBrowserName",value:function e(t){if(t)return String(this.getBrowser().name).toLowerCase()||"";else return this.getBrowser().name||""}},{key:"getBrowserVersion",value:function e(){return this.getBrowser().version}},{key:"getOS",value:function e(){if(this.parsedResult.os)return this.parsedResult.os;else return this.parseOS()}},{key:"parseOS",value:function e(){var t=this;this.parsedResult.os={};var n=l["default"].find((function(e){if("function"==typeof e.test)return e.test(t);if(e.test instanceof Array)return e.test.some((function(e){return t.test(e)}));throw new Error("Browser's test function is not valid")}));if(n)this.parsedResult.os=n.describe(this.getUA());return this.parsedResult.os}},{key:"getOSName",value:function e(t){var n,i=this.getOS().name;if(t)return String(i).toLowerCase()||"";else return i||""}},{key:"getOSVersion",value:function e(){return this.getOS().version}},{key:"getPlatform",value:function e(){if(this.parsedResult.platform)return this.parsedResult.platform;else return this.parsePlatform()}},{key:"getPlatformType",value:function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:false,n=this.getPlatform(),type=n.type;if(t)return String(type).toLowerCase()||"";else return type||""}},{key:"parsePlatform",value:function e(){var t=this;this.parsedResult.platform={};var n=p["default"].find((function(e){if("function"==typeof e.test)return e.test(t);if(e.test instanceof Array)return e.test.some((function(e){return t.test(e)}));throw new Error("Browser's test function is not valid")}));if(n)this.parsedResult.platform=n.describe(this.getUA());return this.parsedResult.platform}},{key:"getEngine",value:function e(){if(this.parsedResult.engine)return this.parsedResult.engine;else return this.parseEngine()}},{key:"parseEngine",value:function e(){var t=this;this.parsedResult.engine={};var n=v["default"].find((function(e){if("function"==typeof e.test)return e.test(t);if(e.test instanceof Array)return e.test.some((function(e){return t.test(e)}));throw new Error("Browser's test function is not valid")}));if(n)this.parsedResult.engine=n.describe(this.getUA());return this.parsedResult.engine}},{key:"parse",value:function parse(){return this.parseBrowser(),this.parseOS(),this.parsePlatform(),this.parseEngine(),this}},{key:"getResult",value:function e(){return this.parsedResult}},{key:"satisfies",value:function e(t){var n=this,i={},s=0,o={},a=0,u;if(Object.keys(t).forEach((function(e){var n=t[e];if("string"==typeof n)o[e]=n,a+=1;else if("object"===(void 0===n?"undefined":g(n)))i[e]=n,s+=1})),s>0){var c=Object.keys(i),f=c.find((function(e){return n.isOS(e)}));if(f){var l=this.satisfies(i[f]);if(void 0!==l)return l}var p=c.find((function(e){return n.isPlatform(e)}));if(p){var v=this.satisfies(i[p]);if(void 0!==v)return v}}if(a>0){var h,m=Object.keys(o).find((function(e){return n.isBrowser(e)}));if(void 0!==m)return this.compareVersion(o[m])}}},{key:"isBrowser",value:function e(t){return this.getBrowserName(true)===String(t).toLowerCase()}},{key:"compareVersion",value:function e(t){var n=0,i=t,s=false;if(">"===t[0])n=1,i=t.substr(1);else if("<"===t[0])n=-1,i=t.substr(1);else if("="===t[0])i=t.substr(1);else if("~"===t[0])s=true,i=t.substr(1);return(0,a.compareVersions)(this.getBrowserVersion(),i,s)===n}},{key:"isOS",value:function e(t){return this.getOSName(true)===String(t).toLowerCase()}},{key:"isPlatform",value:function e(t){return this.getPlatformType(true)===String(t).toLowerCase()}},{key:"is",value:function e(t){return this.isBrowser(t)||this.isOS(t)||this.isPlatform(t)}},{key:"some",value:function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return n.some((function(e){return t.is(e)}))}}]),e}();t["default"]=m,e.exports=t["default"]}))},330:function(e,t,n){var i,s,o;!function(a,factory){if(true)s=[t,n(331)],!(void 0!==(o="function"==typeof(i=factory)?i.apply(t,s):i)&&(e.exports=o));else var u}(this,(function(t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var i=/version\/(\d+(\.?_?\d+)+)/i,s=[{test:[/opera/i],describe:function e(t){var s={name:"Opera"},o=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i,t);if(o)s.version=o;return s}},{test:[/opr|opios/i],describe:function e(t){var s={name:"Opera"},o=(0,n.getFirstMatch)(/(?:opr|opios)[\s/](\S+)/i,t)||(0,n.getFirstMatch)(i,t);if(o)s.version=o;return s}},{test:[/SamsungBrowser/i],describe:function e(t){var s={name:"Samsung Internet for Android"},o=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i,t);if(o)s.version=o;return s}},{test:[/Whale/i],describe:function e(t){var s={name:"NAVER Whale Browser"},o=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:whale)[\s/](\d+(?:\.\d+)+)/i,t);if(o)s.version=o;return s}},{test:[/MZBrowser/i],describe:function e(t){var s={name:"MZ Browser"},o=(0,n.getFirstMatch)(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i,t)||(0,n.getFirstMatch)(i,t);if(o)s.version=o;return s}},{test:[/focus/i],describe:function e(t){var s={name:"Focus"},o=(0,n.getFirstMatch)(/(?:focus)[\s/](\d+(?:\.\d+)+)/i,t)||(0,n.getFirstMatch)(i,t);if(o)s.version=o;return s}},{test:[/coast/i],describe:function e(t){var s={name:"Opera Coast"},o=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i,t);if(o)s.version=o;return s}},{test:[/yabrowser/i],describe:function e(t){var s={name:"Yandex Browser"},o=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i,t);if(o)s.version=o;return s}},{test:[/ucbrowser/i],describe:function e(t){var s={name:"UC Browser"},o=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i,t);if(o)s.version=o;return s}},{test:[/mxios/i],describe:function e(t){var s={name:"Maxthon"},o=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:mxios)[\s/](\d+(\.?_?\d+)+)/i,t);if(o)s.version=o;return s}},{test:[/epiphany/i],describe:function e(t){var s={name:"Epiphany"},o=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i,t);if(o)s.version=o;return s}},{test:[/puffin/i],describe:function e(t){var s={name:"Puffin"},o=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i,t);if(o)s.version=o;return s}},{test:[/sleipnir/i],describe:function e(t){var s={name:"Sleipnir"},o=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i,t);if(o)s.version=o;return s}},{test:[/k-meleon/i],describe:function e(t){var s={name:"K-Meleon"},o=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i,t);if(o)s.version=o;return s}},{test:[/msie|trident/i],describe:function e(t){var i={name:"Internet Explorer"},s=(0,n.getFirstMatch)(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}},{test:[/edg([ea]|ios)/i],describe:function e(t){var i={name:"Microsoft Edge"},s=(0,n.getSecondMatch)(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}},{test:[/vivaldi/i],describe:function e(t){var i={name:"Vivaldi"},s=(0,n.getFirstMatch)(/vivaldi\/(\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}},{test:[/seamonkey/i],describe:function e(t){var i={name:"SeaMonkey"},s=(0,n.getFirstMatch)(/seamonkey\/(\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}},{test:[/sailfish/i],describe:function e(t){var i={name:"Sailfish"},s=(0,n.getFirstMatch)(/sailfish\s?browser\/(\d+(\.\d+)?)/i,t);if(s)i.version=s;return i}},{test:[/silk/i],describe:function e(t){var i={name:"Amazon Silk"},s=(0,n.getFirstMatch)(/silk\/(\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}},{test:[/phantom/i],describe:function e(t){var i={name:"PhantomJS"},s=(0,n.getFirstMatch)(/phantomjs\/(\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}},{test:[/slimerjs/i],describe:function e(t){var i={name:"SlimerJS"},s=(0,n.getFirstMatch)(/slimerjs\/(\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function e(t){var s={name:"BlackBerry"},o=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,t);if(o)s.version=o;return s}},{test:[/(web|hpw)[o0]s/i],describe:function e(t){var s={name:"WebOS Browser"},o=(0,n.getFirstMatch)(i,t)||(0,n.getFirstMatch)(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,t);if(o)s.version=o;return s}},{test:[/bada/i],describe:function e(t){var i={name:"Bada"},s=(0,n.getFirstMatch)(/dolfin\/(\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}},{test:[/tizen/i],describe:function e(t){var s={name:"Tizen"},o=(0,n.getFirstMatch)(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,t)||(0,n.getFirstMatch)(i,t);if(o)s.version=o;return s}},{test:[/qupzilla/i],describe:function e(t){var s={name:"QupZilla"},o=(0,n.getFirstMatch)(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i,t)||(0,n.getFirstMatch)(i,t);if(o)s.version=o;return s}},{test:[/firefox|iceweasel|fxios/i],describe:function e(t){var i={name:"Firefox"},s=(0,n.getFirstMatch)(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}},{test:[/chromium/i],describe:function e(t){var s={name:"Chromium"},o=(0,n.getFirstMatch)(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i,t)||(0,n.getFirstMatch)(i,t);if(o)s.version=o;return s}},{test:[/chrome|crios|crmo/i],describe:function e(t){var i={name:"Chrome"},s=(0,n.getFirstMatch)(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}},{test:function e(t){var n=!t.test(/like android/i),i=t.test(/android/i);return n&&i},describe:function e(t){var s={name:"Android Browser"},o=(0,n.getFirstMatch)(i,t);if(o)s.version=o;return s}},{test:[/safari|applewebkit/i],describe:function e(t){var s={name:"Safari"},o=(0,n.getFirstMatch)(i,t);if(o)s.version=o;return s}},{test:[/googlebot/i],describe:function e(t){var s={name:"Googlebot"},o=(0,n.getFirstMatch)(/googlebot\/(\d+(\.\d+))/i,t)||(0,n.getFirstMatch)(i,t);if(o)s.version=o;return s}},{test:[/.*/i],describe:function e(t){return{name:(0,n.getFirstMatch)(/^(.*)\/(.*) /,t),version:(0,n.getSecondMatch)(/^(.*)\/(.*) /,t)}}}];t["default"]=s,e.exports=t["default"]}))},331:function(e,t,n){var i,s,o;!function(n,factory){if(true)s=[e],!(void 0!==(o="function"==typeof(i=factory)?i.apply(t,s):i)&&(e.exports=o));else var a}(this,(function(e){"use strict";function t(instance,e){if(!(instance instanceof e))throw new TypeError("Cannot call a class as a function")}var n=function(){function e(e,props){for(var t=0;t<props.length;t++){var n=props[t];if(n.enumerable=n.enumerable||false,n.configurable=true,"value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}return function(t,n,i){if(n)e(t.prototype,n);if(i)e(t,i);return t}}(),Utils=function(){function Utils(){t(this,Utils)}return n(Utils,null,[{key:"getFirstMatch",value:function e(t,n){var i=n.match(t);return i&&i.length>0&&i[1]||""}},{key:"getSecondMatch",value:function e(t,n){var i=n.match(t);return i&&i.length>1&&i[2]||""}},{key:"matchAndReturnConst",value:function e(t,n,i){if(t.test(n))return i}},{key:"getWindowsVersionName",value:function e(t){switch(t){case"NT":return"NT";case"XP":return"XP";case"NT 5.0":return"2000";case"NT 5.1":return"XP";case"NT 5.2":return"2003";case"NT 6.0":return"Vista";case"NT 6.1":return"7";case"NT 6.2":return"8";case"NT 6.3":return"8.1";case"NT 10.0":return"10";default:return}}},{key:"getVersionPrecision",value:function e(t){return t.split(".").length}},{key:"compareVersions",value:function e(t,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:false,s=Utils.getVersionPrecision(t),o=Utils.getVersionPrecision(n),a=Math.max(s,o),u=0,c=Utils.map([t,n],(function(e){var t=a-Utils.getVersionPrecision(e),n=e+new Array(t+1).join(".0");return Utils.map(n.split("."),(function(e){return new Array(20-e.length).join("0")+e})).reverse()}));if(i)u=a-Math.min(s,o);for(a-=1;a>=u;){if(c[0][a]>c[1][a])return 1;else if(c[0][a]===c[1][a]){if(a===u)return 0}else return-1;a-=1}}},{key:"map",value:function map(e,t){var n=[],i=void 0;if(Array.prototype.map)return Array.prototype.map.call(e,t);for(i=0;i<e.length;i+=1)n.push(t(e[i]));return n}}]),Utils}();e.exports=Utils}))},332:function(e,t,n){var i,s,o;!function(a,factory){if(true)s=[t,n(331)],!(void 0!==(o="function"==typeof(i=factory)?i.apply(t,s):i)&&(e.exports=o));else var u}(this,(function(t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true}),t["default"]=[{test:[/windows phone/i],describe:function e(t){var i;return{name:"Windows Phone",version:(0,n.getFirstMatch)(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i,t)}}},{test:[/windows/i],describe:function e(t){var i=(0,n.getFirstMatch)(/Windows ((NT|XP)( \d\d?.\d)?)/i,t),s;return{name:"Windows",version:i,versionName:(0,n.getWindowsVersionName)(i)}}},{test:[/macintosh/i],describe:function e(t){var i;return{name:"macOS",version:(0,n.getFirstMatch)(/mac os x (\d+(\.?_?\d+)+)/i,t).replace(/[_\s]/g,".")}}},{test:[/(ipod|iphone|ipad)/i],describe:function e(t){var i;return{name:"iOS",version:(0,n.getFirstMatch)(/os (\d+([_\s]\d+)*) like mac os x/i,t).replace(/[_\s]/g,".")}}},{test:function e(t){var n=!t.test(/like android/i),i=t.test(/android/i);return n&&i},describe:function e(t){var i;return{name:"Android",version:(0,n.getFirstMatch)(/android[\s/-](\d+(\.\d+)*)/i,t)}}},{test:[/(web|hpw)[o0]s/i],describe:function e(t){var i=(0,n.getFirstMatch)(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,t),s={name:"WebOS"};if(i&&i.length)s.version=i;return s}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function e(t){var i;return{name:"BlackBerry",version:(0,n.getFirstMatch)(/rim\stablet\sos\s(\d+(\.\d+)*)/i,t)||(0,n.getFirstMatch)(/blackberry\d+\/(\d+([_\s]\d+)*)/i,t)||(0,n.getFirstMatch)(/\bbb(\d+)/i,t)}}},{test:[/bada/i],describe:function e(t){var i;return{name:"Bada",version:(0,n.getFirstMatch)(/bada\/(\d+(\.\d+)*)/i,t)}}},{test:[/tizen/i],describe:function e(t){var i;return{name:"Tizen",version:(0,n.getFirstMatch)(/tizen[/\s](\d+(\.\d+)*)/i,t)}}},{test:[/linux/i],describe:function e(){return{name:"Linux"}}}],e.exports=t["default"]}))},333:function(e,t,n){var i,s,o;!function(a,factory){if(true)s=[t,n(331)],!(void 0!==(o="function"==typeof(i=factory)?i.apply(t,s):i)&&(e.exports=o));else var u}(this,(function(t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var i="tablet",s="mobile",o="desktop";t["default"]=[{test:[/nexus\s*(?:7|8|9|10).*/i],describe:function e(){return{type:i,vendor:"Nexus"}}},{test:[/ipad/i],describe:function e(){return{type:i,vendor:"Apple",model:"iPad"}}},{test:[/kftt build/i],describe:function e(){return{type:i,vendor:"Amazon",model:"Kindle Fire HD 7"}}},{test:[/silk/i],describe:function e(){return{type:i,vendor:"Amazon"}}},{test:[/tablet/i],describe:function e(){return{type:i}}},{test:function e(t){var n=t.test(/ipod|iphone/i),i=t.test(/like (ipod|iphone)/i);return n&&!i},describe:function e(t){var model=(0,n.getFirstMatch)(/(ipod|iphone)/i,t);return{type:s,vendor:"Apple",model:model}}},{test:[/nexus\s*[0-6].*/i,/galaxy nexus/i],describe:function e(){return{type:s,vendor:"Nexus"}}},{test:[/[^-]mobi/i],describe:function e(){return{type:s}}},{test:function e(t){return"blackberry"===t.getBrowserName(true)},describe:function e(){return{type:s,vendor:"BlackBerry"}}},{test:function e(t){return"bada"===t.getBrowserName(true)},describe:function e(){return{type:s}}},{test:function e(t){return"windows phone"===t.getBrowserName()},describe:function e(){return{type:s,vendor:"Microsoft"}}},{test:function e(t){var n=Number(String(t.getOSVersion()).split(".")[0]);return"android"===t.getOSName(true)&&n>=3},describe:function e(){return{type:i}}},{test:function e(t){return"android"===t.getOSName(true)},describe:function e(){return{type:s}}},{test:function e(t){return"macos"===t.getOSName(true)},describe:function e(){return{type:o,vendor:"Apple"}}},{test:function e(t){return"windows"===t.getOSName(true)},describe:function e(){return{type:o}}},{test:function e(t){return"linux"===t.getOSName(true)},describe:function e(){return{type:o}}}],e.exports=t["default"]}))},334:function(e,t,n){var i,s,o;!function(a,factory){if(true)s=[t,n(331)],!(void 0!==(o="function"==typeof(i=factory)?i.apply(t,s):i)&&(e.exports=o));else var u}(this,(function(t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true}),t["default"]=[{test:function e(t){return"microsoft edge"===t.getBrowserName(true)},describe:function e(t){var i;return{name:"EdgeHTML",version:(0,n.getFirstMatch)(/edge\/(\d+(\.?_?\d+)+)/i,t)}}},{test:[/trident/i],describe:function e(t){var i={name:"Trident"},s=(0,n.getFirstMatch)(/trident\/(\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}},{test:function e(t){return t.test(/presto/i)},describe:function e(t){var i={name:"Presto"},s=(0,n.getFirstMatch)(/presto\/(\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}},{test:function e(t){var n=t.test(/gecko/i),i=t.test(/like gecko/i);return n&&!i},describe:function e(t){var i={name:"Gecko"},s=(0,n.getFirstMatch)(/gecko\/(\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}},{test:[/(apple)?webkit\/537\.36/i],describe:function e(){return{name:"Blink"}}},{test:[/(apple)?webkit/i],describe:function e(t){var i={name:"WebKit"},s=(0,n.getFirstMatch)(/webkit\/(\d+(\.?_?\d+)+)/i,t);if(s)i.version=s;return i}}],e.exports=t["default"]}))}})}))}).call(window)}});