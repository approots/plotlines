<!DOCTYPE html>
<html>
<head>
    <script>
        if(!window.jq||"function"!==typeof jq){var jq=function(g){function B(a,c,b){var d=h.createDocumentFragment();if(b){for(b=a.length-1;0<=b;b--)d.insertBefore(a[b],d.firstChild);c.insertBefore(d,c.firstChild)}else{for(b=0;b<a.length;b++)d.appendChild(a[b]);c.appendChild(d)}}function y(a){return a in z?z[a]:z[a]=RegExp("(^|\\s)"+a+"(\\s|$)")}function t(a){for(var c=0;c<a.length;c++)a.indexOf(a[c])!=c&&(a.splice(c,1),c--);return a}function C(a,c){var b=[];if(a==f)return b;for(;a;a=a.nextSibling)1==a.nodeType&&
            a!==c&&b.push(a);return b}function D(a,c){try{return c.querySelectorAll(a)}catch(b){return[]}}function u(a,c){if(a){if(a.nodeType)return c[c.length++]=a;for(var b=0,d=a.length;b<d;b++)c[c.length++]=a[b]}}function s(){}function E(a,c){a.os={};a.os.webkit=c.match(/WebKit\/([\d.]+)/)?!0:!1;a.os.android=c.match(/(Android)\s+([\d.]+)/)||c.match(/Silk-Accelerated/)?!0:!1;a.os.androidICS=a.os.android&&c.match(/(Android)\s4/)?!0:!1;a.os.ipad=c.match(/(iPad).*OS\s([\d_]+)/)?!0:!1;a.os.iphone=!a.os.ipad&&c.match(/(iPhone\sOS)\s([\d_]+)/)?
            !0:!1;a.os.webos=c.match(/(webOS|hpwOS)[\s\/]([\d.]+)/)?!0:!1;a.os.touchpad=a.os.webos&&c.match(/TouchPad/)?!0:!1;a.os.ios=a.os.ipad||a.os.iphone;a.os.playbook=c.match(/PlayBook/)?!0:!1;a.os.blackberry=a.os.playbook||c.match(/BlackBerry/)?!0:!1;a.os.blackberry10=a.os.blackberry&&c.match(/Safari\/536/)?!0:!1;a.os.chrome=c.match(/Chrome/)?!0:!1;a.os.opera=c.match(/Opera/)?!0:!1;a.os.fennec=c.match(/fennec/i)?!0:c.match(/Firefox/)?!0:!1;a.os.ie=c.match(/MSIE 10.0/i)?!0:!1;a.os.ieTouch=a.os.ie&&c.toLowerCase().match(/touch/i)?
            !0:!1;a.os.supportsTouch=g.DocumentTouch&&h instanceof g.DocumentTouch||"ontouchstart"in g;a.feat={};var b=h.documentElement.getElementsByTagName("head")[0];a.feat.nativeTouchScroll="undefined"!==typeof b.style["-webkit-overflow-scrolling"]&&a.os.ios;a.feat.cssPrefix=a.os.webkit?"Webkit":a.os.fennec?"Moz":a.os.ie?"ms":a.os.opera?"O":"";a.feat.cssTransformStart=!a.os.opera?"3d(":"(";a.feat.cssTransformEnd=!a.os.opera?",0)":")";a.os.android&&!a.os.webkit&&(a.os.android=!1)}function v(a){return a._jqmid||
            (a._jqmid=N++)}function O(a,c,b,d){c=F(c);if(c.ns)var e=RegExp("(?:^| )"+c.ns.replace(" "," .* ?")+"(?: |$)");return(k[v(a)]||[]).filter(function(a){return a&&(!c.e||a.e==c.e)&&(!c.ns||e.test(a.ns))&&(!b||a.fn==b||"function"===typeof a.fn&&"function"===typeof b&&""+a.fn===""+b)&&(!d||a.sel==d)})}function F(a){a=(""+a).split(".");return{e:a[0],ns:a.slice(1).sort().join(" ")}}function G(a,c,b){e.isObject(a)?e.each(a,b):a.split(/\s/).forEach(function(a){b(a,c)})}function w(a,c,b,d,l){var f=v(a),g=k[f]||
            (k[f]=[]);G(c,b,function(b,c){var f=l&&l(c,b),n=f||c,h=function(b){var c=n.apply(a,[b].concat(b.data));!1===c&&b.preventDefault();return c},f=e.extend(F(b),{fn:c,proxy:h,sel:d,del:f,i:g.length});g.push(f);a.addEventListener(f.e,h,!1)})}function x(a,c,b,d){var e=v(a);G(c||"",b,function(b,c){O(a,b,c,d).forEach(function(b){delete k[e][b.i];a.removeEventListener(b.e,b.proxy,!1)})})}function P(a){var c=e.extend({originalEvent:a},a);e.each(Q,function(b,d){c[b]=function(){this[d]=R;if("stopImmediatePropagation"==
            b||"stopPropagation"==b)if(a.cancelBubble=!0,!a[b])return;return a[b].apply(a,arguments)};c[d]=S});return c}function H(a,c){if(c&&a.dispatchEvent){var b=e.Event("destroy",{bubbles:!1});a.dispatchEvent(b)}if((b=v(a))&&k[b]){for(var d in k[b])a.removeEventListener(k[b][d].e,k[b][d].proxy,!1);delete k[b]}}function I(a,c){if(a){var b=a.childNodes;if(b&&0<b.length)for(var d in b)I(b[d],c);H(a,c)}}var f,h=g.document,q=[],J=q.slice,z={},T=1,U=/^\s*<(\w+)[^>]*>/,m={},r={},p=function(a,c){this.length=0;if(a){if(a instanceof
            p&&c==f)return a;if(e.isFunction(a))return e(h).ready(a);if(e.isArray(a)&&a.length!=f){for(var b=0;b<a.length;b++)this[this.length++]=a[b];return this}if(e.isObject(a)&&e.isObject(c)){if(a.length==f)a.parentNode==c&&(this[this.length++]=a);else for(b=0;b<a.length;b++)a[b].parentNode==c&&(this[this.length++]=a[b]);return this}if(e.isObject(a)&&c==f)return this[this.length++]=a,this;if(c!==f){if(c instanceof p)return c.find(a)}else c=h}else return this;return this.selector(a,c)},e=function(a,c){return new p(a,
            c)};e.is$=function(a){return a instanceof p};e.map=function(a,c){var b,d=[],l;if(e.isArray(a))for(l=0;l<a.length;l++)b=c(a[l],l),b!==f&&d.push(b);else if(e.isObject(a))for(l in a)a.hasOwnProperty(l)&&(b=c(a[l],l),b!==f&&d.push(b));return e([d])};e.each=function(a,c){var b;if(e.isArray(a))for(b=0;b<a.length&&!1!==c(b,a[b]);b++);else if(e.isObject(a))for(b in a)if(a.hasOwnProperty(b)&&!1===c(b,a[b]))break;return a};e.extend=function(a){a==f&&(a=this);if(1===arguments.length){for(var c in a)this[c]=
            a[c];return this}J.call(arguments,1).forEach(function(b){for(var c in b)a[c]=b[c]});return a};e.isArray=function(a){return a instanceof Array&&a.push!=f};e.isFunction=function(a){return"function"===typeof a&&!(a instanceof RegExp)};e.isObject=function(a){return"object"===typeof a};e.fn=p.prototype={constructor:p,forEach:q.forEach,reduce:q.reduce,push:q.push,indexOf:q.indexOf,concat:q.concat,selector:function(a,c){a=a.trim();if("#"===a[0]&&-1==a.indexOf(".")&&-1===a.indexOf(" ")&&-1===a.indexOf(">"))c==
            h?u(c.getElementById(a.replace("#","")),this):u(D(a,c),this);else if("<"===a[0]&&">"===a[a.length-1]){var b=h.createElement("div");b.innerHTML=a.trim();u(b.childNodes,this)}else u(D(a,c),this);return this},oldElement:f,slice:q.slice,setupOld:function(a){if(a==f)return e();a.oldElement=this;return a},map:function(a){var c,b=[],d;for(d=0;d<this.length;d++)c=a(d,this[d]),c!==f&&b.push(c);return e([b])},each:function(a){this.forEach(function(c,b){a.call(c,b,c)});return this},ready:function(a){"complete"===
            h.readyState||"loaded"===h.readyState||!e.os.ie&&"interactive"===h.readyState?a():h.addEventListener("DOMContentLoaded",a,!1);return this},find:function(a){if(0===this.length)return this;for(var c=[],b,d=0;d<this.length;d++){b=e(a,this[d]);for(var f=0;f<b.length;f++)c.push(b[f])}return e(t(c))},html:function(a,c){if(0===this.length)return this;if(a===f)return this[0].innerHTML;for(var b=0;b<this.length;b++)!1!==c&&e.cleanUpContent(this[b],!1,!0),this[b].innerHTML=a;return this},text:function(a){if(0===
            this.length)return this;if(a===f)return this[0].textContent;for(var c=0;c<this.length;c++)this[c].textContent=a;return this},css:function(a,c,b){b=b!=f?b:this[0];if(0===this.length)return this;if(c==f&&"string"===typeof a)return g.getComputedStyle(b),b.style[a]?b.style[a]:g.getComputedStyle(b)[a];for(b=0;b<this.length;b++)if(e.isObject(a))for(var d in a)this[b].style[d]=a[d];else this[b].style[a]=c;return this},vendorCss:function(a,c,b){return this.css(e.feat.cssPrefix+a,c,b)},empty:function(){for(var a=
            0;a<this.length;a++)e.cleanUpContent(this[a],!1,!0),this[a].innerHTML="";return this},hide:function(){if(0===this.length)return this;for(var a=0;a<this.length;a++)"none"!=this.css("display",null,this[a])&&(this[a].setAttribute("jqmOldStyle",this.css("display",null,this[a])),this[a].style.display="none");return this},show:function(){if(0===this.length)return this;for(var a=0;a<this.length;a++)"none"==this.css("display",null,this[a])&&(this[a].style.display=this[a].getAttribute("jqmOldStyle")?this[a].getAttribute("jqmOldStyle"):
            "block",this[a].removeAttribute("jqmOldStyle"));return this},toggle:function(a){for(var c=!0===a?!0:!1,b=0;b<this.length;b++)"none"!==g.getComputedStyle(this[b]).display||a!==f&&!1===c?(this[b].setAttribute("jqmOldStyle",this[b].style.display),this[b].style.display="none"):(this[b].style.display=this[b].getAttribute("jqmOldStyle")!=f?this[b].getAttribute("jqmOldStyle"):"block",this[b].removeAttribute("jqmOldStyle"));return this},val:function(a){if(0===this.length)return a===f?f:this;if(a==f)return this[0].value;
            for(var c=0;c<this.length;c++)this[c].value=a;return this},attr:function(a,c){if(0===this.length)return c===f?f:this;if(c===f&&!e.isObject(a))return this[0].jqmCacheId&&m[this[0].jqmCacheId][a]?this[0].jqmCacheId&&m[this[0].jqmCacheId][a]:this[0].getAttribute(a);for(var b=0;b<this.length;b++)if(e.isObject(a))for(var d in a)e(this[b]).attr(d,a[d]);else e.isArray(c)||e.isObject(c)||e.isFunction(c)?(this[b].jqmCacheId||(this[b].jqmCacheId=e.uuid()),m[this[b].jqmCacheId]||(m[this[b].jqmCacheId]={}),m[this[b].jqmCacheId][a]=
            c):null==c&&c!==f?(this[b].removeAttribute(a),this[b].jqmCacheId&&m[this[b].jqmCacheId][a]&&delete m[this[b].jqmCacheId][a]):this[b].setAttribute(a,c);return this},removeAttr:function(a){for(var c=this,b=0;b<this.length;b++)a.split(/\s+/g).forEach(function(d){c[b].removeAttribute(d);c[b].jqmCacheId&&m[c[b].jqmCacheId][a]&&delete m[c[b].jqmCacheId][a]});return this},prop:function(a,c){if(0===this.length)return c===f?f:this;if(c===f&&!e.isObject(a)){var b;return this[0].jqmCacheId&&r[this[0].jqmCacheId][a]?
            this[0].jqmCacheId&&r[this[0].jqmCacheId][a]:!(b=this[0][a])&&a in this[0]?this[0][a]:b}for(b=0;b<this.length;b++)if(e.isObject(a))for(var d in a)e(this[b]).prop(d,a[d]);else e.isArray(c)||e.isObject(c)||e.isFunction(c)?(this[b].jqmCacheId||(this[b].jqmCacheId=e.uuid()),r[this[b].jqmCacheId]||(r[this[b].jqmCacheId]={}),r[this[b].jqmCacheId][a]=c):null==c&&c!==f?e(this[b]).removeProp(a):this[b][a]=c;return this},removeProp:function(a){for(var c=this,b=0;b<this.length;b++)a.split(/\s+/g).forEach(function(d){c[b][d]&&
        delete c[b][d];c[b].jqmCacheId&&r[c[b].jqmCacheId][a]&&delete r[c[b].jqmCacheId][a]});return this},remove:function(a){a=e(this).filter(a);if(a==f)return this;for(var c=0;c<a.length;c++)e.cleanUpContent(a[c],!0,!0),a[c].parentNode.removeChild(a[c]);return this},addClass:function(a){for(var c=0;c<this.length;c++){var b=this[c].className,d=[],e=this;a.split(/\s+/g).forEach(function(a){e.hasClass(a,e[c])||d.push(a)});this[c].className+=(b?" ":"")+d.join(" ");this[c].className=this[c].className.trim()}return this},
            removeClass:function(a){for(var c=0;c<this.length;c++){if(a==f){this[c].className="";break}var b=this[c].className;a.split(/\s+/g).forEach(function(a){b=b.replace(y(a)," ")});this[c].className=0<b.length?b.trim():""}return this},replaceClass:function(a,c){for(var b=0;b<this.length;b++)if(a==f)this[b].className=c;else{var d=this[b].className;a.split(/\s+/g).concat(c.split(/\s+/g)).forEach(function(a){d=d.replace(y(a)," ")});d=d.trim();this[b].className=0<d.length?(d+" "+c).trim():c}return this},hasClass:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 c){if(0===this.length)return!1;c||(c=this[0]);return y(a).test(c.className)},append:function(a,c){if(a&&a.length!=f&&0===a.length)return this;if(e.isArray(a)||e.isObject(a))a=e(a);var b;for(b=0;b<this.length;b++)if(a.length&&"string"!=typeof a)a=e(a),B(a,this[b],c);else{var d=U.test(a)?e(a):f;if(d==f||0==d.length)d=h.createTextNode(a);d.nodeName!=f&&"script"==d.nodeName.toLowerCase()&&(!d.type||"text/javascript"===d.type.toLowerCase())?g.eval(d.innerHTML):d instanceof p?B(d,this[b],c):c!=f?this[b].insertBefore(d,
                this[b].firstChild):this[b].appendChild(d)}return this},appendTo:function(a,c){e(a).append(this);return this},prependTo:function(a){e(a).append(this,!0);return this},prepend:function(a){return this.append(a,1)},insertBefore:function(a,c){if(0==this.length)return this;a=e(a).get(0);if(!a)return this;for(var b=0;b<this.length;b++)c?a.parentNode.insertBefore(this[b],a.nextSibling):a.parentNode.insertBefore(this[b],a);return this},insertAfter:function(a){this.insertBefore(a,!0)},get:function(a){a=a==
                f?0:a;0>a&&(a+=this.length);return this[a]?this[a]:f},offset:function(){if(0===this.length)return this;if(this[0]==g)return{left:0,top:0,right:0,bottom:0,width:g.innerWidth,height:g.innerHeight};var a=this[0].getBoundingClientRect();return{left:a.left+g.pageXOffset,top:a.top+g.pageYOffset,right:a.right+g.pageXOffset,bottom:a.bottom+g.pageYOffset,width:a.right-a.left,height:a.bottom-a.top}},height:function(a){return 0===this.length?this:a!=f?this.css("height",a):this[0]==this[0].window?g.innerHeight:
                this[0].nodeType==this[0].DOCUMENT_NODE?this[0].documentElement.offsetheight:(a=this.css("height").replace("px",""))?a:this.offset().height},width:function(a){return 0===this.length?this:a!=f?this.css("width",a):this[0]==this[0].window?g.innerWidth:this[0].nodeType==this[0].DOCUMENT_NODE?this[0].documentElement.offsetwidth:(a=this.css("width").replace("px",""))?a:this.offset().width},parent:function(a,c){if(0==this.length)return this;for(var b=[],d=0;d<this.length;d++)for(var f=this[d];f.parentNode&&
                f.parentNode!=h&&!(b.push(f.parentNode),f.parentNode&&(f=f.parentNode),!c););return this.setupOld(e(t(b)).filter(a))},parents:function(a){return this.parent(a,!0)},children:function(a){if(0==this.length)return this;for(var c=[],b=0;b<this.length;b++)c=c.concat(C(this[b].firstChild));return this.setupOld(e(c).filter(a))},siblings:function(a){if(0==this.length)return this;for(var c=[],b=0;b<this.length;b++)this[b].parentNode&&(c=c.concat(C(this[b].parentNode.firstChild,this[b])));return this.setupOld(e(c).filter(a))},
            closest:function(a,c){if(0==this.length)return this;var b=this[0],d=e(a,c);if(0==d.length)return e();for(;b&&-1==d.indexOf(b);)b=b!==c&&b!==h&&b.parentNode;return e(b)},filter:function(a){if(0==this.length||a==f)return this;for(var c=[],b=0;b<this.length;b++){var d=this[b];d.parentNode&&0<=e(a,d.parentNode).indexOf(d)&&c.push(d)}return this.setupOld(e(t(c)))},not:function(a){if(0==this.length)return this;for(var c=[],b=0;b<this.length;b++){var d=this[b];d.parentNode&&-1==e(a,d.parentNode).indexOf(d)&&
            c.push(d)}return this.setupOld(e(t(c)))},data:function(a,c){return this.attr("data-"+a,c)},end:function(){return this.oldElement!=f?this.oldElement:e()},clone:function(a){a=!1===a?!1:!0;if(0==this.length)return this;for(var c=[],b=0;b<this.length;b++)c.push(this[b].cloneNode(a));return e(c)},size:function(){return this.length},serialize:function(){if(0==this.length)return"";for(var a=[],c=0;c<this.length;c++)this.slice.call(this[c].elements).forEach(function(b){var c=b.getAttribute("type");if("fieldset"!=
                b.nodeName.toLowerCase()&&(!b.disabled&&"submit"!=c&&"reset"!=c&&"button"!=c&&("radio"!=c&&"checkbox"!=c||b.checked))&&b.getAttribute("name"))if("select-multiple"==b.type)for(c=0;c<b.options.length;c++)b.options[c].selected&&a.push(b.getAttribute("name")+"="+encodeURIComponent(b.options[c].value));else a.push(b.getAttribute("name")+"="+encodeURIComponent(b.value))});return a.join("&")},eq:function(a){return e(this.get(a))},index:function(a){return a?this.indexOf(e(a)[0]):this.parent().children().indexOf(this[0])},
            is:function(a){return!!a&&0<this.filter(a).length}};e.ajaxSettings={type:"GET",beforeSend:s,success:s,error:s,complete:s,context:f,timeout:0,crossDomain:null};e.jsonP=function(a){var c="jsonp_callback"+ ++T,b="",d=h.createElement("script");g[c]=function(f){clearTimeout(b);e(d).remove();delete g[c];a.success.call(void 0,f)};d.src=a.url.replace(/=\?/,"="+c);a.error&&(d.onerror=function(){clearTimeout(b);a.error.call(void 0,"","error")});e("head").append(d);0<a.timeout&&(b=setTimeout(function(){a.error.call(void 0,
            "","timeout")},a.timeout));return{}};e.ajax=function(a){var c;try{var b=a||{},d;for(d in e.ajaxSettings)"undefined"==typeof b[d]&&(b[d]=e.ajaxSettings[d]);b.url||(b.url=g.location);b.contentType||(b.contentType="application/x-www-form-urlencoded");b.headers||(b.headers={});if(!("async"in b)||!1!==b.async)b.async=!0;if(b.dataType)switch(b.dataType){case "script":b.dataType="text/javascript, application/javascript";break;case "json":b.dataType="application/json";break;case "xml":b.dataType="application/xml, text/xml";
            break;case "html":b.dataType="text/html";break;case "text":b.dataType="text/plain";break;default:b.dataType="text/html";break;case "jsonp":return e.jsonP(a)}else b.dataType="text/html";e.isObject(b.data)&&(b.data=e.param(b.data));"get"===b.type.toLowerCase()&&b.data&&(-1===b.url.indexOf("?")?b.url+="?"+b.data:b.url+="&"+b.data);if(/=\?/.test(b.url))return e.jsonP(b);null===b.crossDomain&&(b.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(b.url)&&RegExp.$2!=g.location.host);b.crossDomain||(b.headers=e.extend({"X-Requested-With":"XMLHttpRequest"},
            b.headers));var f,n=b.context,h=/^([\w-]+:)\/\//.test(b.url)?RegExp.$1:g.location.protocol;c=new g.XMLHttpRequest;c.onreadystatechange=function(){var a=b.dataType;if(4===c.readyState){clearTimeout(f);var d,g=!1;if(200<=c.status&&300>c.status||0===c.status&&"file:"==h){if("application/json"===a&&!/^\s*$/.test(c.responseText))try{d=JSON.parse(c.responseText)}catch(k){g=k}else"application/xml, text/xml"===a?d=c.responseXML:"text/html"==a?(d=c.responseText,e.parseJS(d)):d=c.responseText;0===c.status&&
            0===d.length&&(g=!0);g?b.error.call(n,c,"parsererror",g):b.success.call(n,d,"success",c)}else g=!0,b.error.call(n,c,"error");b.complete.call(n,c,g?"error":"success")}};c.open(b.type,b.url,b.async);b.withCredentials&&(c.withCredentials=!0);b.contentType&&(b.headers["Content-Type"]=b.contentType);for(var k in b.headers)c.setRequestHeader(k,b.headers[k]);if(!1===b.beforeSend.call(n,c,b))return c.abort(),!1;0<b.timeout&&(f=setTimeout(function(){c.onreadystatechange=s;c.abort();b.error.call(n,c,"timeout")},
            b.timeout));c.send(b.data)}catch(m){console.log(m),b.error.call(n,c,"error",m)}return c};e.get=function(a,c){return this.ajax({url:a,success:c})};e.post=function(a,c,b,d){"function"===typeof c&&(b=c,c={});d===f&&(d="html");return this.ajax({url:a,type:"POST",data:c,dataType:d,success:b})};e.getJSON=function(a,c,b){"function"===typeof c&&(b=c,c={});return this.ajax({url:a,data:c,success:b,dataType:"json"})};e.param=function(a,c){var b=[];if(a instanceof p)a.each(function(){b.push((c?c+"[]":this.id)+
            "="+encodeURIComponent(this.value))});else for(var d in a){var f=c?c+"["+d+"]":d,g=a[d];b.push(e.isObject(g)?e.param(g,f):f+"="+encodeURIComponent(g))}return b.join("&")};e.parseJSON=function(a){return JSON.parse(a)};e.parseXML=function(a){return(new DOMParser).parseFromString(a,"text/xml")};E(e,navigator.userAgent);e.__detectUA=E;"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){this.replace(/(\r\n|\n|\r)/gm,"").replace(/^\s+|\s+$/,"");return this});e.uuid=function(){var a=
            function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()};e.getCssMatrix=function(a){if(a==f)return g.WebKitCSSMatrix||g.MSCSSMatrix||{a:0,b:0,c:0,d:0,e:0,f:0};try{if(g.WebKitCSSMatrix)return new WebKitCSSMatrix(g.getComputedStyle(a).webkitTransform);if(g.MSCSSMatrix)return new MSCSSMatrix(g.getComputedStyle(a).transform);var c=g.getComputedStyle(a)[e.feat.cssPrefix+"Transform"].replace(/[^0-9\-.,]/g,"").split(",");return{a:+c[0],
            b:+c[1],c:+c[2],d:+c[3],e:+c[4],f:+c[5]}}catch(b){return{a:0,b:0,c:0,d:0,e:0,f:0}}};var k={},N=1;e.event={add:w,remove:x};e.fn.bind=function(a,c){for(var b=0;b<this.length;b++)w(this[b],a,c);return this};e.fn.unbind=function(a,c){for(var b=0;b<this.length;b++)x(this[b],a,c);return this};e.fn.one=function(a,c){return this.each(function(b,d){w(this,a,c,null,function(a,b){return function(){var c=a.apply(d,arguments);x(d,b,a);return c}})})};var R=function(){return!0},S=function(){return!1},Q={preventDefault:"isDefaultPrevented",
            stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};e.fn.delegate=function(a,c,b){for(var d=0;d<this.length;d++){var f=this[d];w(f,c,b,a,function(b){return function(c){var d,g=e(c.target).closest(a,f).get(0);if(g)return d=e.extend(P(c),{currentTarget:g,liveFired:f}),b.apply(g,[d].concat([].slice.call(arguments,1)))}})}return this};e.fn.undelegate=function(a,c,b){for(var d=0;d<this.length;d++)x(this[d],c,b,a);return this};e.fn.on=function(a,c,b){return c===
            f||e.isFunction(c)?this.bind(a,c):this.delegate(c,a,b)};e.fn.off=function(a,c,b){return c===f||e.isFunction(c)?this.unbind(a,c):this.undelegate(c,a,b)};e.fn.trigger=function(a,c,b){"string"==typeof a&&(a=e.Event(a,b));a.data=c;for(c=0;c<this.length;c++)this[c].dispatchEvent(a);return this};e.Event=function(a,c){var b=h.createEvent("Events"),d=!0;if(c)for(var e in c)"bubbles"==e?d=!!c[e]:b[e]=c[e];b.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null);return b};e.bind=function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      c,b){a.__events||(a.__events={});e.isArray(c)||(c=[c]);for(var d=0;d<c.length;d++)a.__events[c[d]]||(a.__events[c[d]]=[]),a.__events[c[d]].push(b)};e.trigger=function(a,c,b){var d=!0;if(!a.__events)return d;e.isArray(c)||(c=[c]);e.isArray(b)||(b=[b]);for(var f=0;f<c.length;f++)if(a.__events[c[f]])for(var g=a.__events[c[f]],h=0;h<g.length;h++)e.isFunction(g[h])&&!1===g[h].apply(a,b)&&(d=!1);return d};e.unbind=function(a,c,b){if(a.__events){e.isArray(c)||(c=[c]);for(var d=0;d<c.length;d++)if(a.__events[c[d]])for(var g=
            a.__events[c[d]],h=0;h<g.length;h++)if(b==f&&delete g[h],g[h]==b){g.splice(h,1);break}}};e.proxy=function(a,c,b){return function(){return b?a.apply(c,b):a.apply(c,arguments)}};var V=function(a,c){for(var b=0;b<a.length;b++)I(a[b],c)};e.cleanUpContent=function(a,c,b){if(a){var d=a.childNodes;d&&0<d.length&&e.asap(V,{},[J.apply(d,[0]),b]);c&&H(a,b)}};var A=[],K=[],L=[];e.asap=function(a,c,b){if(!e.isFunction(a))throw"$.asap - argument is not a valid function";A.push(a);K.push(c?c:{});L.push(b?b:[]);
            g.postMessage("jqm-asap","*")};g.addEventListener("message",function(a){a.source==g&&"jqm-asap"==a.data&&(a.stopPropagation(),0<A.length&&A.shift().apply(K.shift(),L.shift()))},!0);var M={};e.parseJS=function(a){if(a){if("string"==typeof a){var c=h.createElement("div");c.innerHTML=a;a=c}a=a.getElementsByTagName("script");for(c=0;c<a.length;c++)if(0<a[c].src.length&&!M[a[c].src]){var b=h.createElement("script");b.type=a[c].type;b.src=a[c].src;h.getElementsByTagName("head")[0].appendChild(b);M[a[c].src]=
            1}else g.eval(a[c].innerHTML)}};"click keydown keyup keypress submit load resize change select error".split(" ").forEach(function(a){e.fn[a]=function(c){return c?this.bind(a,c):this.trigger(a)}});return e}(window);"$"in window||(window.$=jq);window.numOnly||(window.numOnly=function(g){if(void 0===g||""===g)return 0;if(isNaN(parseFloat(g)))if(g.replace)g=g.replace(/[^0-9.-]/,"");else return 0;return parseFloat(g)})};

        $(function() {
            console.log("ready!");

            // show the first passage
            //var id = <?=$story['start_passage_id'];?>;
            //$('#' + id).show();
/*
            $('a.link').click(function(e) {
                //e.preventDefault();
                // hide all passages - really could just hide current passage.
                $('.passage').hide();

                // show the link's destination passage
                var id = $(this).data('destination');
                $('#' + id).show();
            });
            */
/*
            $('a.back').click(function(){
                parent.history.back();
                return false;
            });
            */
            /*
            $(window).on('hashchange',function() {
                var id = window.location.hash;

                // check is it valid anchor
                if (id.match("#") != null || id.match("#undefined") != null) {


                    $(id).ready(function () {
                        $(id).trigger("click");
                    });
                }
            });
            */



            // NOTE: Some browsers call onpopstate on first page load and some don't.
            // Since Firefox doesn't, we need to show the first passage outside the onpopstate event.
            $('#' + <?=$story['start_passage_id'];?>).show();

            window.onpopstate = function() {
                var firstId = "<?=$story['start_passage_id'];?>";
                var lastId = firstId;

                return function(e) {
                    // Hide last viewable passage.
                    // A less efficient way would be to hide all passages with this: $('.passage').hide();
                    $('#' + lastId).hide();

                    // Get the id of the passage to show.
                    var newId = document.location.hash.substring(1);
                    if (newId) {
                        lastId = newId;
                        // Show the passage
                        $('#' + newId).show();
                    } else {
                        // No id so show the first passage
                        lastId = firstId;
                        $('#' + firstId).show();
                    }
                }
            }();
            /*
            window.onpopstate = function(event) {
                // hide all passages - really could just hide current passage.
                $('.passage').hide();

                var newId = document.location.hash.substring(1);
                if (newId) {
                    $('#' + newId).show();
                } else {
                    // show the first
                    $('#' + id).show();
                }
                //alert("location: " + document.location.hash.substring(1) + ", state: " + JSON.stringify(event.state));
                //console.log(document);
            };
            */
        });
    </script>
    <title><?=$story['title'];?></title>

</head>
<body>
<?php foreach ($passages as $passage) : ?>
    <div id="<?=$passage['id']?>" class="passage" style="display:none">
        <?= $passage['title'] ?><br/><br/>
        <?php if ($passage['body']) : ?>
            <?= $passage['body'] ?><br/><br/>
        <?php endif; ?>

        <?php if (isset($passage['links'])) : ?>
            <?php foreach ($passage['links'] as $link) : ?>
                <a href="#<?=$link['destination_id']?>" class="link"><?= $link['choice'] ?></a><br/>
             <?php endforeach; ?>
        <?php endif; ?>
    </div>
<?php endforeach; ?>

</body>
</html>