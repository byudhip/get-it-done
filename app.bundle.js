(()=>{var e={56:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},72:e=>{"use strict";var t=[];function n(e){for(var n=-1,o=0;o<t.length;o++)if(t[o].identifier===e){n=o;break}return n}function o(e,o){for(var s={},a=[],i=0;i<e.length;i++){var c=e[i],l=o.base?c[0]+o.base:c[0],d=s[l]||0,u="".concat(l," ").concat(d);s[l]=d+1;var p=n(u),A={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)t[p].references++,t[p].updater(A);else{var g=r(A,o);o.byIndex=i,t.splice(i,0,{identifier:u,updater:g,references:1})}a.push(u)}return a}function r(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,r){var s=o(e=e||[],r=r||{});return function(e){e=e||[];for(var a=0;a<s.length;a++){var i=n(s[a]);t[i].references--}for(var c=o(e,r),l=0;l<s.length;l++){var d=n(s[l]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}s=c}}},113:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},219:(e,t,n)=>{"use strict";e.exports=n.p+"bc79595310b579b70be8.svg"},291:(e,t,n)=>{var o={"./getitdone-logo.svg":219};function r(e){var t=s(e);return n(t)}function s(e){if(!n.o(o,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return o[e]}r.keys=function(){return Object.keys(o)},r.resolve=s,e.exports=r,r.id=291},314:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",o=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),o&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),o&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,o,r,s){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(o)for(var i=0;i<this.length;i++){var c=this[i][0];null!=c&&(a[c]=!0)}for(var l=0;l<e.length;l++){var d=[].concat(e[l]);o&&a[d[0]]||(void 0!==s&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=s),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),t.push(d))}},t}},354:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),s="/*# ".concat(r," */");return[t].concat([s]).join("\n")}return[t].join("\n")}},365:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var o=n(354),r=n.n(o),s=n(314),a=n.n(s)()(r());a.push([e.id,"/* Reset */\n*,\n*::before,\n*::after {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: 100%;\n}\n\n/* Body Styles */\nbody {\n  font-family: Helvetica, Arial, system-ui;\n  height: 100vh;\n  line-height: 1.5;\n}\n\n#container {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  grid-template-rows: auto 1fr;\n  height: 100vh;\n}\n\n#header {\n  min-height: 10vh;\n  grid-column: 1/-1;\n  grid-row: 1/2;\n}\n\n#logo {\n  position: absolute;\n  top: 2%;\n  left: 2%;\n  width: 100px;\n  height: auto;\n}\n\n#left-sidebar {\n  margin: 10px;\n}\n\n#projects {\n  min-height: 80vh;\n  padding: 10px;\n}\n\n.project-button {\n  display: block;\n  border: none;\n  cursor: pointer;\n  width: 80%;\n  margin-bottom: 10px;\n  \n}\n\n.add-project-button {\n  width: 80%;\n}\n\n#tasks {\n  min-height: 80vh;\n  padding: 10px;\n}\n\n#right-sidebar {\n  margin: 10px;\n}\n\n#due-dates {\n  min-height: 80vh;\n  padding: 10px;\n}\n","",{version:3,sources:["webpack://./src/styles.css"],names:[],mappings:"AAAA,UAAU;AACV;;;EAGE,SAAS;EACT,UAAU;EACV,sBAAsB;AACxB;;AAEA;;;;EAIE,oBAAoB;EACpB,eAAe;AACjB;;AAEA,gBAAgB;AAChB;EACE,wCAAwC;EACxC,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,kCAAkC;EAClC,4BAA4B;EAC5B,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,OAAO;EACP,QAAQ;EACR,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE,cAAc;EACd,YAAY;EACZ,eAAe;EACf,UAAU;EACV,mBAAmB;;AAErB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,aAAa;AACf",sourcesContent:["/* Reset */\n*,\n*::before,\n*::after {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: 100%;\n}\n\n/* Body Styles */\nbody {\n  font-family: Helvetica, Arial, system-ui;\n  height: 100vh;\n  line-height: 1.5;\n}\n\n#container {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  grid-template-rows: auto 1fr;\n  height: 100vh;\n}\n\n#header {\n  min-height: 10vh;\n  grid-column: 1/-1;\n  grid-row: 1/2;\n}\n\n#logo {\n  position: absolute;\n  top: 2%;\n  left: 2%;\n  width: 100px;\n  height: auto;\n}\n\n#left-sidebar {\n  margin: 10px;\n}\n\n#projects {\n  min-height: 80vh;\n  padding: 10px;\n}\n\n.project-button {\n  display: block;\n  border: none;\n  cursor: pointer;\n  width: 80%;\n  margin-bottom: 10px;\n  \n}\n\n.add-project-button {\n  width: 80%;\n}\n\n#tasks {\n  min-height: 80vh;\n  padding: 10px;\n}\n\n#right-sidebar {\n  margin: 10px;\n}\n\n#due-dates {\n  min-height: 80vh;\n  padding: 10px;\n}\n"],sourceRoot:""}]);const i=a},540:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},659:e=>{"use strict";var t={};e.exports=function(e,n){var o=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}},825:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var o="";n.supports&&(o+="@supports (".concat(n.supports,") {")),n.media&&(o+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(o+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),o+=n.css,r&&(o+="}"),n.media&&(o+="}"),n.supports&&(o+="}");var s=n.sourceMap;s&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),t.styleTagTransform(o,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={id:o,exports:{}};return e[o](s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var o=t.getElementsByTagName("script");if(o.length)for(var r=o.length-1;r>-1&&(!e||!/^http(s?):/.test(e));)e=o[r--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/^blob:/,"").replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n.nc=void 0,(()=>{"use strict";var e=n(72),t=n.n(e),o=n(825),r=n.n(o),s=n(659),a=n.n(s),i=n(56),c=n.n(i),l=n(540),d=n.n(l),u=n(113),p=n.n(u),A=n(365),g={};g.styleTagTransform=p(),g.setAttributes=c(),g.insert=a().bind(null,"head"),g.domAPI=r(),g.insertStyleElement=d(),t()(A.A,g),A.A&&A.A.locals&&A.A.locals;const h=function(e,t,n={}){const o={...n};return{getName:()=>e,getColor:()=>t,getTasks:()=>o,setName:t=>{e=t},setColor:e=>{t=e},setTitle:(e,t)=>{if(console.log(`Changing [${e}] task title to [${t}]`),!o[e])return void console.log("No such task!");const n=o[e];delete o[e],n.title=t,o[t]=n},setDescription:(e,t)=>{o[e]?(o[e].description=t,console.log(`Task [${e}]'s description updated`)):console.log("No such task!")},setPriority:(e,t)=>{console.log(`Changing "${e}" priority to "${t}"`),o[e]?o[e].priority=t:console.log("No such task!")},setDueDate:(e,t)=>{o[e]?o[e].dueDate=t:console.log("No such task!")},addTask:e=>{console.log("Adding task: ",e),o[e.title]={...e},console.log("Current task: ",o)},removeTask:e=>{o[e]?(delete o[e],console.log(`Task "${e}" removed`)):console.log("No such task!")},taskDone:e=>{o[e]?o[e].status="done":console.log("No such task!")},toStr:()=>`Project: ${e}, Color: ${t}, Tasks:${JSON.stringify(o)}`}},f=(Math.pow(10,8),Symbol.for("constructDateFrom"));function m(e,t){return"function"==typeof e?e(t):e&&"object"==typeof e&&f in e?e[f](t):e instanceof Date?new e.constructor(t):new Date(t)}function v(e,t,n){const o=(r=e,s=n?.in,m(s||r,r));var r,s;return isNaN(t)?m(n?.in||e,NaN):t?(o.setDate(o.getDate()+t),o):o}const C=function(){const e="projects",t=(n=e,JSON.parse(localStorage.getItem(n))||[]).map((e=>e.name?h(e.name,e.color,e.tasks):e));var n;console.log("Projects after loading:",t);const o=()=>{const n=t.map((e=>({name:e.getName(),color:e.getColor(),tasks:e.getTasks()})));((e,t)=>{localStorage.setItem(e,JSON.stringify(t))})(e,n)},r=(e,n)=>{for(let n of t)if(n.getName()===e)return void console.log("project name exists!");const r=h(e,n);t.push(r),o()},s=e=>{const n=t.find((t=>t.getName()===e));if(n)return n;console.log("No such project!")},a=(e,...t)=>{s(e).addTask(...t),o()};return 0===t.length&&(r("Home","white"),a("Home",{title:"Welcome to Get it Done!",description:"We will help you manage your projects and their tasks!",dueDate:v(new Date,7),priority:"High",status:"pending"})),{saveProjects:o,addNewProject:r,renameProject:(e,t)=>{const n=s(e);n?(n.setName(t),o()):console.log("No such project!")},recolorProject:(e,t)=>{const n=s(e);n?(n.setColor(t),o()):console.log("No such project!")},getAllProjects:()=>t,getProject:s,deleteProject:e=>{const n=t.findIndex((t=>t.getName()===e));-1!==n?(t.splice(n,1),o()):console.log("No such project!")},newTask:a,removeTask:(e,t)=>{s(e).removeTask(t),o()},changeTaskTitle:(e,t,n)=>{s(e).setTitle(t,n),o()},changeTaskDescription:(e,t,n)=>{s(e).setDescription(t,n)},changeTaskDueDate:(e,t,n)=>{s(e).setDueDate(t,n)},changeTaskPriority:(e,t,n)=>{s(e).setPriority(t,n),o()},allProjectsStr:()=>t.map((e=>e.toStr())).join("\n")}};function b(e,t=null,n=null,o=null){const r=document.createElement(e);return t&&(r.id=t),n&&r.classList.add(n),o&&(r.textContent=o),r}const y=function(e){let t={};return e.keys().forEach((n=>{t[n.replace("./","")]=e(n)})),t}(n(291));(function(){let e="Home";const t=()=>"linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(40, 40, 40, 0.9))",n=()=>"rgba(245, 240, 230, 0.9)",o=()=>"filter: invert(92%) sepia(8%) saturate(142%) hue-rotate(18deg) brightness(97%) contrast(91%)";(()=>{const e=document.querySelector("body"),r=b("div","container");r.style.background=t(),e.appendChild(r);const s=b("div","header"),a=b("img","logo");a.src=y["getitdone-logo.svg"],a.setAttribute("style",o()),s.appendChild(a),r.appendChild(s);const i=b("div","left-sidebar");i.style.borderRight=`1px solid ${n()}`,r.appendChild(i);const c=b("div","projects"),l=b("h2",null,"section-headline","Projects");l.style.color=n(),i.appendChild(l),i.appendChild(c);const d=b("div","middle");d.style.borderRight=`1px solid ${n()}`,r.appendChild(d);const u=b("h2",null,"section-headline","Tasks"),p=b("div","tasks",null,"task here");u.style.color=n(),d.appendChild(u),d.appendChild(p);const A=b("div","right-sidebar");r.appendChild(A);const g=b("h2",null,"section-headline","Upcoming Due"),h=b("div","due-dates",null,"due date here");A.appendChild(g),A.appendChild(h)})(),(()=>{const t=document.querySelector("#projects");t.innerHTML="";const o=C().getProject(e);console.log("Projects: ",o),console.log("Project data:",o);const r=b("button",null,"project-button");r.classList.add("active-project"),r.style.backgroundColor="transparent",r.style.color=n(),r.textContent=o.getName(),t.appendChild(r);const s=b("button",null,"add-project-button","+");s.style.backgroundColor="transparent",s.style.color=n(),t.appendChild(s)})(),(()=>{const t=document.querySelector("#tasks");t.innerHTML="";const o=C().getProject(e).getTasks();Object.values(o).forEach((e=>{const o=b("div",null,"task"),r=b("h3",null,"task-headline",e.title),s=b("p",null,"task-description",e.description);r.style.color=n(),s.style.color=n(),o.appendChild(r),o.appendChild(s),t.appendChild(o)}))})()})(),C()})()})();
//# sourceMappingURL=app.bundle.js.map