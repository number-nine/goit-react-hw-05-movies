"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[506],{839:function(e,t,i){i.d(t,{Z:function(){return l}});var a=i(343),r=i(164),o={Overlay:"SplashScreen_Overlay__griNT"},n=i(184),s=document.querySelector("#modal-root");function l(){return(0,r.createPortal)((0,n.jsx)("div",{className:o.Overlay,children:(0,n.jsx)(a.Z1,{height:"160",width:"160",color:"#ffffff",wrapperStyle:{},wrapperClass:"",visible:!0,ariaLabel:"three-circles-rotating",outerCircleColor:"",innerCircleColor:"",middleCircleColor:""})}),s)}},559:function(e,t,i){i.d(t,{Z:function(){return l}});var a=i(165),r=i(683),o=i(861),n=i(243),s={baseURL:"https://api.themoviedb.org/3/",params:{api_key:"b0574b4adcec6022cde1a05e31ff0812"}};function l(){return c.apply(this,arguments)}function c(){return c=(0,o.Z)((0,a.Z)().mark((function e(){var t,i,o,l,c=arguments;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=c.length>0&&void 0!==c[0]?c[0]:"",i=c.length>1&&void 0!==c[1]?c[1]:{},s.params=(0,r.Z)((0,r.Z)({},s.params),i),e.prev=3,e.next=6,n.Z.get(t,s);case 6:return o=e.sent,l=o.data,e.abrupt("return",l);case 11:throw e.prev=11,e.t0=e.catch(3),e.t0;case 14:case"end":return e.stop()}}),e,null,[[3,11]])}))),c.apply(this,arguments)}},506:function(e,t,i){i.r(t),i.d(t,{default:function(){return u}});var a=i(439),r=i(791),o=i(689),n=i(87),s=i(264),l=i(559),c=i(839),v={movieInfo:"MovieDetails_movieInfo__4EKMk",movieTitle:"MovieDetails_movieTitle__0CAOT",moviePoster:"MovieDetails_moviePoster__V6U6u",movieOverview:"MovieDetails_movieOverview__acHno",movieHomepage:"MovieDetails_movieHomepage__0GZTs",movieRating:"MovieDetails_movieRating__1QxX4",submenu:"MovieDetails_submenu__Ksw6v"},m=i(184);function u(){var e,t,i,u=(0,o.UO)().movieId,d=(0,r.useState)({}),h=(0,a.Z)(d,2),f=h[0],p=h[1],_=(0,r.useState)(!0),g=(0,a.Z)(_,2),x=g[0],j=g[1],b=(0,o.TH)(),w=(0,r.useRef)(null!==(e=null===(t=b.state)||void 0===t?void 0:t.from)&&void 0!==e?e:"/movies"),Z="movie/"+u;return(0,r.useEffect)((function(){j(!0),(0,l.Z)(Z).then((function(e){p(e)})).catch((function(e){s.Notify.info("Remote data unavailable. ".concat(e.message,". Please try again later."))})).finally((function(){j(!1)}))}),[Z]),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(n.rU,{to:w.current,children:"Back to movies"}),x?(0,m.jsx)(c.Z,{}):(0,m.jsxs)("section",{className:v.movieInfo,children:[(0,m.jsx)("img",{className:v.moviePoster,src:"https://image.tmdb.org/t/p/w300_and_h450_bestv2".concat(f.backdrop_path),alt:f.title}),(0,m.jsx)("h1",{className:v.movieTitle,children:f.title}),(0,m.jsx)("p",{className:v.movieOverview,children:f.overview}),(0,m.jsxs)("p",{className:v.movieRating,children:["Rating: ",f.vote_average]}),(0,m.jsxs)("p",{className:v.movieHomepage,children:["Homepage:"," ",(0,m.jsx)("a",{href:null!==(i=f.homepage)&&void 0!==i?i:"#",alt:f.title,target:"_blank",rel:"noreferrer",children:f.homepage})]})]}),(0,m.jsxs)("section",{children:[(0,m.jsx)("h2",{children:"Additional information"}),(0,m.jsxs)("ul",{className:v.submenu,children:[(0,m.jsx)("li",{children:(0,m.jsx)(n.rU,{to:"cast",children:"Cast"})}),(0,m.jsx)("li",{children:(0,m.jsx)(n.rU,{to:"reviews",children:"Reviews"})})]})]}),(0,m.jsx)(r.Suspense,{fallback:(0,m.jsx)("div",{children:"Loading subcomponent..."}),children:(0,m.jsx)(o.j3,{})}),x&&(0,m.jsx)(c.Z,{})]})}}}]);
//# sourceMappingURL=506.b1441aee.chunk.js.map