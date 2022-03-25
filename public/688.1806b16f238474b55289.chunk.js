"use strict";(this.webpackChunktweb=this.webpackChunktweb||[]).push([[688,465,810],{9638:(e,t,n)=>{n.d(t,{Z:()=>g});var a=n(3910),o=n(2738),i=n(4541),r=n(4727),s=n(9518),d=n(3512),l=n(4494),c=n(6858);let u,p=!1;function g(e){p||(u||(u=s.Z.getConfig().then((e=>e.suggested_lang_code!==r.default.lastRequestedLangCode?Promise.all([e,r.default.getStrings(e.suggested_lang_code,["Login.ContinueOnLanguage"]),r.default.getCacheLangPack()]):[])))).then((([t,n])=>{if(!t)return;const s=[];n.forEach((e=>{const t=r.default.strings.get(e.key);t&&(s.push(t),r.default.strings.set(e.key,e))}));const u=(0,l.Z)("btn-primary btn-secondary btn-primary-transparent primary",{text:"Login.ContinueOnLanguage"});u.lastElementChild.classList.remove("i18n"),(0,i.Z)().then((()=>{window.requestAnimationFrame((()=>{e.append(u)}))})),d.default.addEventListener("language_change",(()=>{u.remove()}),{once:!0}),s.forEach((e=>{r.default.strings.set(e.key,e)})),(0,o.fc)(u,(e=>{(0,a.d)(e),p=!0,u.disabled=!0,(0,c.y7)(u),r.default.getLangPack(t.suggested_lang_code)}))}))}},4484:(e,t,n)=>{function a(e,t){const n=e.length;if(n!==t.length)return!1;for(let a=0;a<n;++a)if(e[a]!==t[a])return!1;return!0}n.d(t,{Z:()=>a})},8079:(e,t,n)=>{function a(e,t){return t?e.replace(/\+/g,"-").replace(/\//g,"_").replace(/\=+$/,""):e.replace(/-/g,"+").replace(/_/g,"/")}n.d(t,{Z:()=>a})},8045:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(410),o=n(7487),i=n(9518);const r=new class{constructor(){this.serverTimeOffset=0,o.Z.get("server_time_offset").then((e=>{e&&(this.serverTimeOffset=e)})),i.Z.addTaskListener("applyServerTimeOffset",(e=>{this.serverTimeOffset=e.payload}))}};a.GO&&(a.GO.serverTimeManager=r);const s=r},810:(e,t,n)=>{n.r(t),n.d(t,{default:()=>M});var a=n(6858),o=n(8805),i=n(4687),r=n(9518),s=n(8598),d=n(4874),l=n(503),c=n(9807),u=n(4494),p=n(4789),g=n(5432),h=n(4159),m=n(4727),f=n(2897),v=n(1405),y=n(4668),L=n(8497),E=n(144),_=n(6947),w=n(8576),Z=n(4465),b=n(9638),S=n(3910),k=n(2738),T=n(5565),x=n(1656),P=n(7487),C=n(2398),O=n(671),R=n(6669),A=n(7922),N=n(3512),D=n(709),I=n(9976);let q,Q=null;const H=new d.Z("page-sign",!0,(()=>{const e=()=>{t=m.default.countriesList.filter((e=>{var t;return!(null===(t=e.pFlags)||void 0===t?void 0:t.hidden)})).sort(((e,t)=>(e.name||e.default_name).localeCompare(t.name||t.default_name)))};let t;e(),N.default.addEventListener("language_change",(()=>{e()}));const d=new Map;let v,M;const $=document.createElement("div");$.classList.add("input-wrapper");const B=new l.Z({label:"Login.CountrySelectorLabel",name:(0,E.a)()});B.container.classList.add("input-select");const F=B.input,U=document.createElement("div");U.classList.add("select-wrapper","z-depth-3","hide");const V=document.createElement("span");V.classList.add("arrow","arrow-down"),B.container.append(V);const W=document.createElement("ul");U.appendChild(W),new o.ZP(U);let j=()=>{j=null,t.forEach((e=>{const t=(0,O.Ml)(e.iso2),n=[];e.country_codes.forEach((a=>{const o=document.createElement("li");let i=s.o.wrapEmojiText(t);if(I.Z){const e=document.createElement("span");e.innerHTML=i,o.append(e)}else o.innerHTML=i;const r=(0,m.i18n)(e.default_name);r.dataset.defaultName=e.default_name,o.append(r);const d=document.createElement("span");d.classList.add("phone-code"),d.innerText="+"+a.country_code,o.appendChild(d),n.push(o),W.append(o)})),d.set(e.iso2,n)})),W.addEventListener("mousedown",(e=>{if(0!==e.button)return;const t=(0,y.Z)(e.target,"LI");z(t)})),B.container.appendChild(U)};const z=e=>{const n=e.childNodes[1].dataset.defaultName,a=e.querySelector(".phone-code").innerText,o=a.replace(/\D/g,"");(0,T.Z)(F,(0,m.i18n)(n)),(0,R.Z)(F,"input"),v=t.find((e=>e.default_name===n)),M=v.country_codes.find((e=>e.country_code===o)),Y.value=Y.lastValue=a,X(),setTimeout((()=>{ee.focus(),(0,C.Z)(ee,!0)}),0)};let G;j(),F.addEventListener("focus",(function(e){j?j():t.forEach((e=>{d.get(e.iso2).forEach((e=>e.style.display=""))})),clearTimeout(G),G=void 0,U.classList.remove("hide"),U.offsetWidth,U.classList.add("active"),B.select(),(0,p.Z)({container:H.pageEl.parentElement.parentElement,element:F,position:"start",margin:4}),setTimeout((()=>{K||(document.addEventListener("mousedown",J,{capture:!0}),K=!0)}),0)}));let K=!1;const J=e=>{(0,L.Z)(e.target,"input-select")||e.target!==F&&(X(),document.removeEventListener("mousedown",J,{capture:!0}),K=!1)},X=()=>{void 0===G&&(U.classList.remove("active"),G=window.setTimeout((()=>{U.classList.add("hide"),G=void 0}),200))};F.addEventListener("keyup",(e=>{const n=e.key;if(e.ctrlKey||"Control"===n)return!1;let a=B.value.toLowerCase(),o=[];t.forEach((e=>{const t=[e.name,e.default_name,e.iso2];t.filter(Boolean).forEach((e=>{const n=e.split(" ").filter((e=>/\w/.test(e))).map((e=>e[0])).join("");n.length>1&&t.push(n)}));let n=!!t.filter(Boolean).find((e=>-1!==e.toLowerCase().indexOf(a)));d.get(e.iso2).forEach((e=>e.style.display=n?"":"none")),n&&o.push(e)})),0===o.length?t.forEach((e=>{d.get(e.iso2).forEach((e=>e.style.display=""))})):1===o.length&&"Enter"===n&&z(d.get(o[0].iso2)[0])})),V.addEventListener("mousedown",(function(e){e.cancelBubble=!0,e.preventDefault(),F.matches(":focus")?F.blur():F.focus()}));const Y=new D.Z({onInput:e=>{f.Z.loadLottieWorkers();const{country:t,code:n}=e||{};let a=t?t.name||t.default_name:"";a===B.value||v&&t&&n&&(v===t||M.country_code===n.country_code)||((0,T.Z)(F,t?(0,m.i18n)(t.default_name):a),v=t,M=n),t||Y.value.length-1>1?Q.style.visibility="":Q.style.visibility="hidden"}}),ee=Y.input;ee.addEventListener("keypress",(e=>{if(!Q.style.visibility&&"Enter"===e.key)return ne()}));const te=new c.Z({text:"Login.KeepSigned",name:"keepSession",withRipple:!0,checked:!0});te.input.addEventListener("change",(()=>{const e=te.checked;i.default.pushToState("keepSigned",e),_.Z.toggleStorage(e),w.Z.toggleStorage(e),r.Z.toggleStorage(e),P.Z.toggleStorage(e)})),i.default.getState().then((e=>{i.default.storage.isAvailable()?te.checked=e.keepSigned:(te.checked=!1,te.label.classList.add("checkbox-disabled"))})),Q=(0,u.Z)("btn-primary btn-color-primary",{text:"Login.Next"}),Q.style.visibility="hidden";const ne=e=>{e&&(0,S.d)(e);const t=(0,x.Z)([Q,q],!0);(0,T.Z)(Q,(0,m.i18n)("PleaseWait")),(0,a.y7)(Q);let o=Y.value;r.Z.invokeApi("auth.sendCode",{phone_number:o,api_id:h.Z.id,api_hash:h.Z.hash,settings:{_:"codeSettings"}}).then((e=>{n.e(392).then(n.bind(n,6392)).then((t=>t.default.mount(Object.assign(e,{phone_number:o}))))})).catch((e=>{t(),"PHONE_NUMBER_INVALID"===e.type?(Y.setError(),(0,T.Z)(Y.label,(0,m.i18n)("Login.PhoneLabelInvalid")),ee.classList.add("error"),(0,T.Z)(Q,(0,m.i18n)("Login.Next"))):(console.error("auth.sendCode error:",e),Q.innerText=e.type)}))};(0,k.fc)(Q,ne),q=(0,u.Z)("btn-primary btn-secondary btn-primary-transparent primary",{text:"Login.QR.Login"}),q.addEventListener("click",(()=>{Z.default.mount()})),$.append(B.container,Y.container,te.label,Q,q);const ae=document.createElement("h4");ae.classList.add("text-center"),(0,m._i18n)(ae,"Login.Title");const oe=document.createElement("div");oe.classList.add("subtitle","text-center"),(0,m._i18n)(oe,"Login.StartText"),H.pageEl.querySelector(".container").append(ae,oe,$),g.IS_TOUCH_SUPPORTED||setTimeout((()=>{ee.focus()}),0),(0,b.Z)($),r.Z.invokeApi("help.getNearestDc").then((e=>{var t;const n=A.Z.getFromCache("langPack");n&&!(null===(t=n.countries)||void 0===t?void 0:t.hash)&&m.default.getLangPack(n.lang_code).then((()=>{(0,R.Z)(ee,"input")}));const a=new Set([1,2,3,4,5]),o=[e.this_dc];let i;return e.nearest_dc!==e.this_dc&&(i=r.Z.getNetworker(e.nearest_dc).then((()=>{o.push(e.nearest_dc)}))),(i||Promise.resolve()).then((()=>{o.forEach((e=>{a.delete(e)}));const e=[...a],t=()=>{return n=void 0,a=void 0,i=function*(){const n=e.shift();if(!n)return;const a=`dc${n}_auth_key`;if(yield P.Z.get(a))return t();setTimeout((()=>{r.Z.getNetworker(n).finally(t)}),3e3)},new((o=void 0)||(o=Promise))((function(e,t){function r(e){try{d(i.next(e))}catch(e){t(e)}}function s(e){try{d(i.throw(e))}catch(e){t(e)}}function d(t){var n;t.done?e(t.value):(n=t.value,n instanceof o?n:new o((function(e){e(n)}))).then(r,s)}d((i=i.apply(n,a||[])).next())}));var n,a,o,i};t()})),e})).then((e=>{B.value.length||Y.value.length||z(d.get(e.country)[0])}))}),(()=>{Q&&((0,T.Z)(Q,(0,m.i18n)("Login.Next")),(0,v.ripple)(Q,void 0,void 0,!0),Q.removeAttribute("disabled")),q&&q.removeAttribute("disabled"),i.default.pushToState("authState",{_:"authStateSignIn"})})),M=H},4465:(e,t,n)=>{n.r(t),n.d(t,{default:()=>E});var a=n(9518),o=n(4874),i=n(8045),r=n(4159),s=n(4494),d=n(4727),l=n(4687),c=n(3512),u=n(6858),p=n(9638),g=n(5418),h=n(8079),m=n(4484);function f(e){return e<26?e+65:e<52?e+71:e<62?e-4:62===e?43:63===e?47:65}var v=function(e,t,n,a){return new(n||(n=Promise))((function(o,i){function r(e){try{d(a.next(e))}catch(e){i(e)}}function s(e){try{d(a.throw(e))}catch(e){i(e)}}function d(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,s)}d((a=a.apply(e,t||[])).next())}))};let y;const L=new o.Z("page-signQR",!0,(()=>y),(()=>{y||(y=v(void 0,void 0,void 0,(function*(){const e=L.pageEl.querySelector(".auth-image");let t=(0,u.y7)(e,!0);const o=document.createElement("div");o.classList.add("input-wrapper");const l=(0,s.Z)("btn-primary btn-secondary btn-primary-transparent primary",{text:"Login.QR.Cancel"});o.append(l),(0,p.Z)(o);const E=e.parentElement,_=document.createElement("h4");(0,d._i18n)(_,"Login.QR.Title");const w=document.createElement("ol");w.classList.add("qr-description"),["Login.QR.Help1","Login.QR.Help2","Login.QR.Help3"].forEach((e=>{const t=document.createElement("li");t.append((0,d.i18n)(e)),w.append(t)})),E.append(_,w,o),l.addEventListener("click",(()=>{Promise.all([n.e(458),n.e(325),n.e(810)]).then(n.bind(n,810)).then((e=>e.default.mount())),b=!0}));const Z=(yield Promise.all([n.e(630).then(n.t.bind(n,1915,23))]))[0].default;let b=!1;c.default.addEventListener("user_auth",(()=>{b=!0,y=null}),{once:!0});let S,k={ignoreErrors:!0};const T=o=>v(void 0,void 0,void 0,(function*(){try{let s=yield a.Z.invokeApi("auth.exportLoginToken",{api_id:r.Z.id,api_hash:r.Z.hash,except_ids:[]},{ignoreErrors:!0});if("auth.loginTokenMigrateTo"===s._&&(k.dcId||(k.dcId=s.dc_id,a.Z.setBaseDcId(s.dc_id)),s=yield a.Z.invokeApi("auth.importLoginToken",{token:s.token},k)),"auth.loginTokenSuccess"===s._){const e=s.authorization;return a.Z.setUser(e.user),n.e(781).then(n.bind(n,5436)).then((e=>e.default.mount())),!0}if(!S||!(0,m.Z)(S,s.token)){S=s.token;let n=function(e){let t,n="";for(let a=e.length,o=0,i=0;i<a;++i)t=i%3,o|=e[i]<<(16>>>t&24),2!==t&&a-i!=1||(n+=String.fromCharCode(f(o>>>18&63),f(o>>>12&63),f(o>>>6&63),f(63&o)),o=0);return n.replace(/A(?=A$|$)/g,"=")}(s.token),a="tg://login?token="+(0,h.Z)(n,!0);const o=window.getComputedStyle(document.documentElement),i=o.getPropertyValue("--surface-color").trim(),r=o.getPropertyValue("--primary-text-color").trim(),d=o.getPropertyValue("--primary-color").trim(),l=yield fetch("assets/img/logo_padded.svg").then((e=>e.text())).then((e=>{e=e.replace(/(fill:).+?(;)/,`$1${d}$2`);const t=new Blob([e],{type:"image/svg+xml;charset=utf-8"});return new Promise((e=>{const n=new FileReader;n.onload=t=>{e(t.target.result)},n.readAsDataURL(t)}))})),c=new Z({width:240*window.devicePixelRatio,height:240*window.devicePixelRatio,data:a,image:l,dotsOptions:{color:r,type:"rounded"},cornersSquareOptions:{type:"extra-rounded"},imageOptions:{imageSize:1,margin:0},backgroundOptions:{color:i},qrOptions:{errorCorrectionLevel:"L"}});let u;c.append(e),e.lastChild.classList.add("qr-canvas"),u=c._drawingPromise?c._drawingPromise:Promise.race([(0,g.w)(1e3),new Promise((e=>{c._canvas._image.addEventListener("load",(()=>{window.requestAnimationFrame((()=>e()))}),{once:!0})}))]),yield u.then((()=>{if(t){t.style.animation="hide-icon .4s forwards";const n=e.children[1];n.style.display="none",n.style.animation="grow-icon .4s forwards",setTimeout((()=>{n.style.display=""}),150),setTimeout((()=>{n.style.animation=""}),500),t=void 0}else Array.from(e.children).slice(0,-1).forEach((e=>{e.remove()}))}))}if(o){let e=Date.now()/1e3,t=s.expires-e-i.Z.serverTimeOffset;yield(0,g.w)(t>3?3e3:1e3*t|0)}}catch(e){return"SESSION_PASSWORD_NEEDED"===e.type?(console.warn("pageSignQR: SESSION_PASSWORD_NEEDED"),e.handled=!0,Promise.all([n.e(458),n.e(442)]).then(n.bind(n,9437)).then((e=>e.default.mount())),b=!0,y=null):(console.error("pageSignQR: default error:",e),b=!0),!0}return!1}));return()=>v(void 0,void 0,void 0,(function*(){for(b=!1;!b&&!(yield T(!0)););}))}))),y.then((e=>{e()})),l.default.pushToState("authState",{_:"authStateSignQr"})})),E=L}}]);
//# sourceMappingURL=688.1806b16f238474b55289.chunk.js.map