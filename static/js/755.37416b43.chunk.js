"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[755],{755:function(e,r,t){t.r(r),t.d(r,{default:function(){return f}});var a=t(439),n=t(791),i=t(689),c=t(264),o=t(559),s=t(839),l={Reviews:"MovieReviews_Reviews__AcZXp",author:"MovieReviews_author__kSBQA"},u=t(184);function f(){var e=(0,i.UO)().movieId,r=(0,n.useState)([]),t=(0,a.Z)(r,2),f=t[0],h=t[1],v=(0,n.useState)(!1),p=(0,a.Z)(v,2),d=p[0],m=p[1],w="movie/"+e+"/reviews";return(0,n.useEffect)((function(){m(!0),(0,o.Z)(w).then((function(e){var r=e.results;h(r)})).catch((function(e){c.Notify.info("Remote data unavailable. ".concat(e.message,". Please try again later."))})).finally((function(){m(!1)}))}),[w]),(0,u.jsx)(u.Fragment,{children:d?(0,u.jsx)(s.Z,{}):(null===f||void 0===f?void 0:f.length)>0?(0,u.jsx)("ul",{className:l.Reviews,children:f.map((function(e){var r=e.id,t=e.author,a=e.content;return(0,u.jsxs)("li",{children:[(0,u.jsxs)("p",{className:l.author,children:["Author: ",t]}),(0,u.jsx)("p",{children:a})]},r)}))}):(0,u.jsx)("p",{children:"No reviews received"})})}},839:function(e,r,t){t.d(r,{Z:function(){return s}});var a=t(343),n=t(164),i={Overlay:"SplashScreen_Overlay__griNT"},c=t(184),o=document.querySelector("#modal-root");function s(){return(0,n.createPortal)((0,c.jsx)("div",{className:i.Overlay,children:(0,c.jsx)(a.Z1,{height:"160",width:"160",color:"#ffffff",wrapperStyle:{},wrapperClass:"",visible:!0,ariaLabel:"three-circles-rotating",outerCircleColor:"",innerCircleColor:"",middleCircleColor:""})}),o)}},559:function(e,r,t){t.d(r,{Z:function(){return s}});var a=t(165),n=t(683),i=t(861),c=t(243),o={baseURL:"https://api.themoviedb.org/3/",params:{api_key:"b0574b4adcec6022cde1a05e31ff0812"}};function s(){return l.apply(this,arguments)}function l(){return l=(0,i.Z)((0,a.Z)().mark((function e(){var r,t,i,s,l=arguments;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=l.length>0&&void 0!==l[0]?l[0]:"",t=l.length>1&&void 0!==l[1]?l[1]:{},o.params=(0,n.Z)((0,n.Z)({},o.params),t),e.prev=3,e.next=6,c.Z.get(r,o);case 6:return i=e.sent,s=i.data,e.abrupt("return",s);case 11:throw e.prev=11,e.t0=e.catch(3),e.t0;case 14:case"end":return e.stop()}}),e,null,[[3,11]])}))),l.apply(this,arguments)}}}]);
//# sourceMappingURL=755.37416b43.chunk.js.map