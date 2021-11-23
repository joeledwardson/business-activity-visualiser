(this["webpackJsonpbusiness-activity-frontend"]=this["webpackJsonpbusiness-activity-frontend"]||[]).push([[0],{39:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){},83:function(e,t,n){},84:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),a=n(32),s=n.n(a),i=(n(38),n(39),n(15)),o=n(4),u=n.n(o),l=n(12),d=n(3),j=n(5),f=n.n(j),b=(n(58),n(59),n(0)),p=function(e){var t=e.areaLevel,n=e.setAreaLevel,r=e.updateGeoJsonData,c=e.industry,a=e.setIndustry,s=e.industryRef,i=[{name:"Country",value:4},{name:"Region",value:5},{name:"County",value:6},{name:"District",value:7}];return Object(b.jsxs)("div",{className:"sidebarStyle",children:[Object(b.jsx)("h2",{children:Object(b.jsx)("u",{children:"\ud83d\udcb5 UK Business Activity Visualiser"})}),Object(b.jsx)("p",{children:"Select an area to display information about its business enterprises"}),Object(b.jsxs)("div",{children:[Object(b.jsxs)("p",{children:["Select level"," ",Object(b.jsx)("select",{onChange:function(e){var t=Number(e.target.value);n(t),r(t)},children:i.map((function(e){return Object(b.jsx)("option",{value:e.value,children:e.name},e.value)}))})]}),Object(b.jsxs)("p",{children:["Current level:"," ",i.find((function(e){return e.value===t})).name]}),Object(b.jsxs)("p",{children:["Select industry"," ",Object(b.jsx)("select",{onChange:function(e){var t=e.target.value;a(t),s.current=t},children:["01-03 : Agriculture, forestry & fishing","05-39 : Production","41-43 : Construction","45 : Motor trades","46 : Wholesale","47 : Retail","49-53 : Transport & Storage (inc postal)","55-56 : Accommodation & food services","58-63 : Information & communication","64-66 : Finance & insurance","68 : Property","69-75 : Professional, scientific & technical","77-82 : Business administration & support services","84 : Public administration & defence","85 : Education","86-88 : Health","90-99 : Arts, entertainment, recreation & other services"].map((function(e,t){return Object(b.jsx)("option",{value:e,children:e},t)}))})]}),Object(b.jsxs)("p",{children:["Current industry: ",c]})]})]})},v=(n(61),function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}),O=function(e){var t=e.interpolations,n=[],r=[];return t.map((function(e,t){t%2===0?n.push(e):r.push(e)})),Object(b.jsx)("div",{id:"legend",children:n.map((function(e,t){return Object(b.jsxs)("div",{children:[Object(b.jsx)("span",{className:"legend-key",style:{backgroundColor:r[t]},children:" "}),Object(b.jsx)("span",{children:v(e)})]},t)}))})},h=(n(62),function(){return Object(b.jsx)("div",{className:"loader"})}),m=(n(63),function(e){var t=e.area,n=e.setSelectedArea,r=Object.keys(t.properties).filter((function(e){return"name"!==e&&"id"!==e}));return Object(b.jsxs)("div",{className:"area-details",children:[Object(b.jsxs)("h2",{children:[Object(b.jsxs)("u",{children:["\ud83d\udccd ",t.properties.name]}),Object(b.jsx)("button",{className:"close-button",onClick:function(){return n(null)},children:"X"})]}),Object(b.jsx)("table",{children:Object(b.jsx)("tbody",{children:r.map((function(e){return Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:e}),Object(b.jsx)("td",{children:v(t.properties[e])})]},e)}))})})]})}),x=n(33),y=n.n(x),g=function(){var e=Object(l.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.a.post("".concat("http://localhost:8000","/api/geocodes"),{level:t});case 2:return n=e.sent,e.abrupt("return",n.data.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S={getData:g};f.a.workerClass=n(82).default,f.a.accessToken="pk.eyJ1Ijoic3llZHRhcWk5NSIsImEiOiJja3Vqbm5icHYwbG96Mm9ydnk1cnJlaDZrIn0.qQV61Wku6oqtKMj_Oa-Lew";var k=function(){var e=Object(r.useRef)(null),t=Object(r.useRef)(null),n=Object(r.useRef)(null),c=Object(r.useState)(4),a=Object(d.a)(c,2),s=a[0],o=a[1],j=Object(r.useState)("01-03 : Agriculture, forestry & fishing"),x=Object(d.a)(j,2),y=x[0],g=x[1],k=Object(r.useRef)(y),C=Object(r.useState)(null),w=Object(d.a)(C,2),F=w[0],L=w[1],N=Object(r.useState)([500,"#4976b5",1e3,"#49a9bf",5e3,"#49c7ad",1e4,"#4ad07e",15e3,"#4dd74b",2e4,"#88df4d",25e3,"#c8e64f",1e5,"#eccd52",3e5,"#f29455",5e5,"#f75959"]),R=Object(d.a)(N,2),A=R[0],I=R[1],D=Object(r.useState)(!1),J=Object(d.a)(D,2),M=J[0],P=J[1],E=Object(r.useState)(null),q=Object(d.a)(E,2),B=q[0],H=q[1],T=function(){var e=Object(l.a)(u.a.mark((function e(t){var r,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return P(!0),e.next=3,S.getData(t);case 3:r=e.sent,L(r),n.current&&(c=n.current).getSource("countries-source")&&c.getSource("countries-source").setData(r),P(!1);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){if(F){var e=F.features.reduce((function(e,t){return e.properties[y]>t.properties[y]?e:t})).properties[y],t=100*Math.ceil(Math.round(e/9)/100),r=A.map((function(e,n){return n%2===0?n/2*t:e}));I(r),n.current.setPaintProperty("countries-layer","fill-color",["interpolate",["linear"],["get",y]].concat(Object(i.a)(r)))}}),[F,y]),Object(r.useEffect)((function(){var r=new f.a.Map({container:e.current,style:"mapbox://styles/mapbox/dark-v10",center:[-3.0803,55.7186],zoom:5});n.current=r,r.addControl(new f.a.NavigationControl,"top-right"),r.on("load",(function(){T(s),r.addSource("countries-source",{type:"geojson",data:F,generateId:!0}),r.addLayer({id:"countries-layer",type:"fill",source:"countries-source",layout:{},paint:{"fill-color":["interpolate",["linear"],["get",y]].concat(Object(i.a)(A)),"fill-outline-color":"#FFFFFF","fill-opacity":["case",["boolean",["feature-state","hover"],!1],.9,.5]}});var e=new f.a.Popup({closeButton:!1,closeOnClick:!1});r.on("mousemove","countries-layer",(function(c){if(c.features.length>0){t.current>-1&&r.setFeatureState({source:"countries-source",id:t.current},{hover:!1});var a=c.features[0].id;r.setFeatureState({source:"countries-source",id:a},{hover:!0}),t.current=a,r.getCanvas().style.cursor="pointer";var s=c.lngLat,i="\n          <strong>".concat(c.features[0].properties.name,"</strong><br>\n          <div>").concat(v(c.features[0].properties[k.current]),"</div>\n          ");e.setLngLat(s).setHTML(i).addTo(n.current)}})),r.on("mouseleave","countries-layer",(function(){t.current>-1&&r.setFeatureState({source:"countries-source",id:t.current},{hover:!1}),t.current=null,r.getCanvas().style.cursor="",e.remove()})),r.on("click","countries-layer",(function(e){return H(e.features[0])}))}))}),[]),Object(b.jsxs)("div",{children:[Object(b.jsx)(p,{areaLevel:s,setAreaLevel:o,updateGeoJsonData:T,industry:y,setIndustry:g,mapObjectRef:n,industryRef:k}),Object(b.jsx)(O,{interpolations:A}),M&&Object(b.jsx)(h,{}),B&&Object(b.jsx)(m,{area:B,setSelectedArea:H}),Object(b.jsx)("div",{className:"map-container",ref:e})]})},C=(n(83),function(){return Object(b.jsxs)("div",{className:"footer",children:["Developed by Joel Edwardson and Syed Taqi Haider, 2021. View the source on"," ",Object(b.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/syedtaqi95/business-activity-frontend",children:"Github"}),"."]})});var w=function(){return Object(b.jsxs)("div",{children:[Object(b.jsx)(k,{}),Object(b.jsx)(C,{})]})};s.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(w,{})}),document.getElementById("root"))}},[[84,1,2]]]);
//# sourceMappingURL=main.319ddd3e.chunk.js.map