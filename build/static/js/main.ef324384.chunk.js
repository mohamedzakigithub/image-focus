(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{57:function(e,t,n){},74:function(e,t,n){e.exports=n(96)},87:function(e,t){},88:function(e,t){},89:function(e,t){},96:function(e,t,n){"use strict";n.r(t);var a,r=n(7),c=n(2),o=n.n(c),i=n(61),l=n.n(i),u=(n(57),n(30)),d=n(62),s=n(32),m=d.a.img(a||(a=Object(u.a)(["\n  transition: top 0.25s ease-in-out, left 0.25s ease-in-out;\n"]))),f=function(e){var t=e.imageSrc,n=e.x,a=e.y,r=Object(c.useRef)(null);return Object(c.useEffect)(function(){null!==r.current&&new s.b(r.current,{focus:{x:n,y:a}})},[n,a]),o.a.createElement(m,{alt:"Focused",ref:r,src:t})};f.defaultProps={x:0,y:0};var g=f,h=n(19),v=n.n(h),b=n(27),p=n(39),E=n.n(p),x=n(40),w=n.n(x),S={x:-2,y:-2},y=function(e){var t=e.debounceTime,n=void 0===t?300:t,a=e.imageSrc,i=e.onFocusChanged,l=Object(c.useRef)(null),u=Object(c.useState)(S),d=Object(r.a)(u,2),m=d[0],f=d[1];return console.log(m),Object(c.useEffect)(function(){console.log("imgElRef.current",l.current);var e=l.current,t=e.clientWidth,n=e.clientHeight;console.log("html image",e),function(){var a=Object(b.a)(v.a.mark(function a(){var r,c,o,i,l,u,d,s;return v.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,w.a.crop(e,{width:n,height:t,ruleOfThirds:!0,minScale:1});case 2:r=a.sent,console.log("crop",r.topCrop),c=r.topCrop,o=c.x,i=c.y,l=c.width,u=c.height,console.log(o),console.log(i),console.log(l),console.log(u),d=(o+l/2)/(t/2)-1,s=(i+u/2)/(n/2)-1,console.log(d),console.log(s),f({x:d,y:s});case 14:case"end":return a.stop()}},a)}));return function(){return a.apply(this,arguments)}}()()},[a]),Object(c.useEffect)(function(){if(null!==l.current){var e=E()(i,n);new s.a(l.current,{onChange:e,focus:m})}},[n,i,m]),o.a.createElement("img",{alt:"Focus picker",ref:l,src:a})};y.defaultProps={onFocusChanged:function(){}};var O=o.a.memo(y),j=n(18),C=n(14),F=n(20),N=n(118),M=n(117),W=n(119),k=function(e,t,n,a){e.fillStyle="#000000",e.beginPath(),e.arc(t,n,a,0,2*Math.PI),e.fill()},X=function(e,t,n,a,r,c,o){e.beginPath(),e.lineWidth=c,e.strokeStyle=o,e.rect(a,t,r-a,n-t),e.stroke()},Y=function(e,t,n,a,r,c){e.fillStyle=c,e.font="".concat(r,"px serif"),e.fillText(t,n,a)},R=function(e,t,n,a){e.drawImage(t,0,0,n,a)},D=function(e){var t,n,a,r,c=[],o=(null===e||void 0===e?void 0:null===(t=e[0])||void 0===t?void 0:null===(n=t.detection)||void 0===n?void 0:n.imageWidth)/2,i=(null===e||void 0===e?void 0:null===(a=e[0])||void 0===a?void 0:null===(r=a.detection)||void 0===r?void 0:r.imageHeight)/2;c=null===e||void 0===e?void 0:e.map(function(e){var t,n,a,r,c,l,u,d,s=((null===e||void 0===e?void 0:null===(t=e.detection)||void 0===t?void 0:null===(n=t.box)||void 0===n?void 0:n.left)+(null===e||void 0===e?void 0:null===(a=e.detection)||void 0===a?void 0:null===(r=a.box)||void 0===r?void 0:r.right))/2,m=((null===e||void 0===e?void 0:null===(c=e.detection)||void 0===c?void 0:null===(l=c.box)||void 0===l?void 0:l.top)+(null===e||void 0===e?void 0:null===(u=e.detection)||void 0===u?void 0:null===(d=u.box)||void 0===d?void 0:d.bottom))/2,f=(1-Math.abs(s-o)/o+(1-Math.abs(m-i)/i))/2;return{top:e.detection.box.top,bottom:e.detection.box.bottom,left:e.detection.box.left,right:e.detection.box.right,faceCenterX:s,faceCenterY:m,area:e.detection.box.area,scoreWeight:e.detection.classScore,distanceWeight:f}});var l=Math.max.apply(Math,Object(C.a)(c.map(function(e){return e.area}))),u=(c=c.map(function(e){return Object(j.a)(Object(j.a)({},e),{},{areaWeight:e.area/l})})).reduce(function(e,t){var n=(t.scoreWeight+t.distanceWeight+t.areaWeight)/3;return Object(j.a)(Object(j.a)({},e),{},{weightSum:e.weightSum+n,weightedXSum:e.weightedXSum+t.faceCenterX*n,weightedYSum:e.weightedYSum+t.faceCenterY*n})},{weightSum:0,weightedXSum:0,weightedYSum:0}),d=u.weightedXSum/u.weightSum,s=u.weightedYSum/u.weightSum,m=c.map(function(e){return Math.sqrt(Math.pow(d-e.faceCenterX,2)+Math.pow(s-e.faceCenterY,2))}),f=function(e){var t=e.length,n=e.reduce(function(e,t){return e+t})/t;return{mean:n,sd:Math.sqrt(e.map(function(e){return Math.pow(e-n,2)}).reduce(function(e,t){return e+t})/t)}}(m),g=f.mean,h=f.sd,v=m.map(function(e){return Math.abs((e-g)/h)}).map(function(e){return e>2?0:1}),b=c.reduce(function(e,t,n){return v[n]?Object(j.a)(Object(j.a)({},e),{},{top:e.top<t.top?e.top:t.top,bottom:e.bottom>t.bottom?e.bottom:t.bottom,left:e.left<t.left?e.left:t.left,right:(e.right,t.right,e.right)}):e});return{centerX:d,centerY:s,border:b,faceInfo:c}};var I=function(){var e=Object(c.useState)(null),t=Object(r.a)(e,2),n=t[0],a=t[1],i=Object(c.useRef)(null),l=Object(c.useRef)(null);Object(c.useEffect)(function(){console.log("Initialize"),i.current&&Promise.all([F.d.ssdMobilenetv1.loadFromUri("./models"),F.d.faceLandmark68Net.loadFromUri("./models")]).catch(function(e){return console.log(e)})},[]),Object(c.useEffect)(function(){console.log(i.current.src),i.current.src&&u()},[n]);var u=function(){var e=Object(b.a)(v.a.mark(function e(){var t,n,a,r,c;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={width:i.current.offsetWidth,height:i.current.offsetHeight},e.next=3,F.b(i.current).withFaceLandmarks();case 3:n=e.sent,console.log("Original:",n),l.current.innerHtml=F.a(i.current),console.log(l.current.innerHtml),F.c(l.current,t),a=F.e(n,t),console.log("RESIZED:",a),r=D(a),c=l.current.getContext("2d"),R(c,i.current,t.width,t.height),r.faceInfo.forEach(function(e){X(c,e.top,e.bottom,e.left,e.right,2,"red"),Y(c,Math.round(100*e.scoreWeight)/100,e.left,e.top,40,"white")}),k(c,r.centerX,r.centerY,20),X(c,r.border.top,r.border.bottom,r.border.left,r.border.right,8,"green");case 16:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return o.a.createElement(M.a,{maxWidth:"lg"},o.a.createElement(N.a,{sx:{m:4,display:"flex",flexDirection:"column"}},o.a.createElement(W.a,{variant:"h4",component:"h1"},"Facial Detection"),o.a.createElement("input",{type:"file",onChange:function(e){!function(e){console.log(e[0]);var t=new FileReader;t.onload=function(){var e=t.result;a(e)},t.readAsDataURL(e[0])}(e.target.files)}}),o.a.createElement("img",{ref:i,src:n}),i.current&&o.a.createElement("canvas",{ref:l,style:{border:"4px solid #000000"}})))},P={x:-2,y:-2},H=function(e){var t=e.debounceTime,n=void 0===t?300:t,a=e.imageSrc,i=e.onFocusChanged,l=e.focus,u=e.faceDetected,d=Object(c.useRef)(null),m=Object(c.useState)(P),f=Object(r.a)(m,2),g=f[0],h=f[1];return Object(c.useEffect)(function(){var e=d.current,t=e.clientWidth,n=e.clientHeight;(function(){var a=Object(b.a)(v.a.mark(function a(){var r,c,o,i,d,s,m,f,g,b;return v.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,w.a.crop(e,{width:n,height:t,ruleOfThirds:!0,minScale:1});case 2:r=a.sent,c=r.topCrop,o=c.x,i=c.y,d=c.width,s=c.height,m=(o+d/2)/(t/2)-1,f=(i+s/2)/(n/2)-1,console.log("focus"),console.log(l),u?(console.log(n),g=1-Math.abs(l.x-t)/(t/2),b=Math.abs(l.y-n)/(n/2)-1,console.log(g),console.log(b),h({x:g,y:b}),console.log("with Face detection")):(h({x:m,y:f}),console.log("without face detection"));case 9:case"end":return a.stop()}},a)}));return function(){return a.apply(this,arguments)}})()()},[a,u]),Object(c.useEffect)(function(){if(null!==d.current){var e=E()(i,n);new s.a(d.current,{onChange:e,focus:g})}},[i,g,u,l]),o.a.createElement("img",{alt:"Focus picker",ref:d,src:a})};H.defaultProps={onFocusChanged:function(){}};var L=o.a.memo(H),U=function(e){var t,n,a,r,c=[],o=(null===e||void 0===e?void 0:null===(t=e[0])||void 0===t?void 0:null===(n=t.detection)||void 0===n?void 0:n.imageWidth)/2,i=(null===e||void 0===e?void 0:null===(a=e[0])||void 0===a?void 0:null===(r=a.detection)||void 0===r?void 0:r.imageHeight)/2;c=null===e||void 0===e?void 0:e.map(function(e){var t,n,a,r,c,l,u,d,s=((null===e||void 0===e?void 0:null===(t=e.detection)||void 0===t?void 0:null===(n=t.box)||void 0===n?void 0:n.left)+(null===e||void 0===e?void 0:null===(a=e.detection)||void 0===a?void 0:null===(r=a.box)||void 0===r?void 0:r.right))/2,m=((null===e||void 0===e?void 0:null===(c=e.detection)||void 0===c?void 0:null===(l=c.box)||void 0===l?void 0:l.top)+(null===e||void 0===e?void 0:null===(u=e.detection)||void 0===u?void 0:null===(d=u.box)||void 0===d?void 0:d.bottom))/2,f=(1-Math.abs(s-o)/o+(1-Math.abs(m-i)/i))/2;return{top:e.detection.box.top,bottom:e.detection.box.bottom,left:e.detection.box.left,right:e.detection.box.right,faceCenterX:s,faceCenterY:m,area:e.detection.box.area,scoreWeight:e.detection.classScore,distanceWeight:f}});var l=Math.max.apply(Math,Object(C.a)(c.map(function(e){return e.area}))),u=(c=c.map(function(e){return Object(j.a)(Object(j.a)({},e),{},{areaWeight:e.area/l})})).reduce(function(e,t){var n=(t.scoreWeight+t.distanceWeight+t.areaWeight)/3;return Object(j.a)(Object(j.a)({},e),{},{weightSum:e.weightSum+n,weightedXSum:e.weightedXSum+t.faceCenterX*n,weightedYSum:e.weightedYSum+t.faceCenterY*n})},{weightSum:0,weightedXSum:0,weightedYSum:0}),d=u.weightedXSum/u.weightSum,s=u.weightedYSum/u.weightSum,m=c.map(function(e){return Math.sqrt(Math.pow(d-e.faceCenterX,2)+Math.pow(s-e.faceCenterY,2))}),f=function(e){var t=e.length,n=e.reduce(function(e,t){return e+t})/t;return{mean:n,sd:Math.sqrt(e.map(function(e){return Math.pow(e-n,2)}).reduce(function(e,t){return e+t})/t)}}(m),g=f.mean,h=f.sd,v=m.map(function(e){return Math.abs((e-g)/h)}).map(function(e){return e>2?0:1}),b=c.reduce(function(e,t,n){return v[n]?Object(j.a)(Object(j.a)({},e),{},{top:e.top<t.top?e.top:t.top,bottom:e.bottom>t.bottom?e.bottom:t.bottom,left:e.left<t.left?e.left:t.left,right:(e.right,t.right,e.right)}):e});return{centerX:d,centerY:s,border:b,faceInfo:c}},A=function(){var e=o.a.useState(null),t=Object(r.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)({x:0,y:0}),l=Object(r.a)(i,2),u=l[0],d=l[1],s=Object(c.useState)(null),m=Object(r.a)(s,2),f=m[0],h=m[1],p=Object(c.useRef)(null);Object(c.useEffect)(function(){console.log("Initialize"),p.current&&Promise.all([F.d.ssdMobilenetv1.loadFromUri("./models"),F.d.faceLandmark68Net.loadFromUri("./models")]).catch(function(e){return console.log(e)})},[]),Object(c.useEffect)(function(){p.current.src&&E()},[n]);var E=function(){var e=Object(b.a)(v.a.mark(function e(){var t,n;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return p.current.offsetWidth,p.current.offsetHeight,e.next=3,F.b(p.current).withFaceLandmarks();case 3:(t=e.sent).length>0?(n=U(t),d({x:n.centerX,y:n.centerY}),h(!0)):(console.log("No face Detected"),h(!1));case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return o.a.createElement("div",{className:"app"},o.a.createElement("h1",null,"Combined Focal Point Detection Algorithm"),o.a.createElement("h2",null,n?f?"Face/s Detected":"No Face/s Detected":null),o.a.createElement("input",{type:"file",onChange:function(e){!function(e){h(null);var t=new FileReader;t.onload=function(){var e=t.result;a(null),a(e)},t.readAsDataURL(e[0])}(e.target.files)}}),o.a.createElement("br",null),o.a.createElement("br",null),n&&o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"focus-picker-container"},null!==f&&o.a.createElement(L,{imageSrc:n,onFocusChanged:d,focus:u,faceDetected:f})),o.a.createElement("hr",{className:"spacer"}),o.a.createElement("div",{className:"grid-container"},o.a.createElement("div",{className:"grid"},o.a.createElement("div",{className:"top-left"},o.a.createElement(g,{imageSrc:n,x:u.x,y:u.y})),o.a.createElement("div",{className:"top-center"},o.a.createElement(g,{imageSrc:n,x:u.x,y:u.y})),o.a.createElement("div",{className:"top-right"},o.a.createElement(g,{imageSrc:n,x:u.x,y:u.y})),o.a.createElement("div",{className:"center-left"},o.a.createElement(g,{imageSrc:n,x:u.x,y:u.y})),o.a.createElement("div",{className:"center-center"},o.a.createElement(g,{imageSrc:n,x:u.x,y:u.y})),o.a.createElement("div",{className:"center-right"},o.a.createElement(g,{imageSrc:n,x:u.x,y:u.y}))))),o.a.createElement("img",{ref:p,src:n}))},z=n(115),T=function(){var e=o.a.useState(null),t=Object(r.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)({x:0,y:0}),l=Object(r.a)(i,2),u=l[0],d=l[1],s=Object(c.useState)(!1),m=Object(r.a)(s,2),f=m[0],h=m[1],v=function(){return o.a.createElement(M.a,{sx:{height:"100vh",display:"flex",alignItems:"center",justifyContent:"space-around"}},o.a.createElement(z.a,{variant:"contained",size:"large",onClick:function(){return h("standard")}},"Standard Focus Detection Algorithm"),o.a.createElement(z.a,{variant:"contained",size:"large",onClick:function(){return h("face")}},"Facial Recognition Focus Detection"),o.a.createElement(z.a,{variant:"contained",size:"large",onClick:function(){return h("combined")}},"Combined Algorithm"))};return o.a.createElement(o.a.Fragment,null,!f&&o.a.createElement(v,null),"face"==f&&o.a.createElement(I,null),"combined"===f&&o.a.createElement(A,null),"standard"===f&&o.a.createElement("div",{className:"app"},o.a.createElement("h1",null,"Focused Image Picker"),o.a.createElement("input",{type:"file",onChange:function(e){!function(e){var t=new FileReader;t.onload=function(){var e=t.result;a(null),a(e)},t.readAsDataURL(e[0])}(e.target.files)}}),o.a.createElement("br",null),o.a.createElement("br",null),n&&o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"focus-picker-container"},o.a.createElement(O,{imageSrc:n,onFocusChanged:d})),o.a.createElement("hr",{className:"spacer"}),o.a.createElement("div",{className:"grid-container"},o.a.createElement("div",{className:"grid"},o.a.createElement("div",{className:"top-left"},o.a.createElement(g,{imageSrc:n,x:u.x,y:u.y})),o.a.createElement("div",{className:"top-center"},o.a.createElement(g,{imageSrc:n,x:u.x,y:u.y})),o.a.createElement("div",{className:"top-right"},o.a.createElement(g,{imageSrc:n,x:u.x,y:u.y})),o.a.createElement("div",{className:"center-left"},o.a.createElement(g,{imageSrc:n,x:u.x,y:u.y})),o.a.createElement("div",{className:"center-center"},o.a.createElement(g,{imageSrc:n,x:u.x,y:u.y})),o.a.createElement("div",{className:"center-right"},o.a.createElement(g,{imageSrc:n,x:u.x,y:u.y})))))))},q=document.getElementById("root");l.a.render(o.a.createElement(T,null),q)}},[[74,1,2]]]);
//# sourceMappingURL=main.ef324384.chunk.js.map