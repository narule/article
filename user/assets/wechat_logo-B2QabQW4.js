import{p as e,m as t,j as l,A as n,g as s,aN as a,l as o,e as r,a as u,bi as i,a$ as c,n as f,bj as d}from"./index-DlrOOw1b.js";const g=e({fluid:{type:Boolean,default:!1},...t(),...l(),...n()},"VContainer"),p=s()({name:"VContainer",props:g(),setup(e,t){let{slots:l}=t;const{rtlClasses:n}=a(),{dimensionStyles:s}=o(e);return r((()=>u(e.tag,{class:["v-container",{"v-container--fluid":e.fluid},n.value,e.class],style:[s.value,e.style]},l))),{}}}),y=i.reduce(((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e)),{}),v=i.reduce(((e,t)=>(e["offset"+c(t)]={type:[String,Number],default:null},e)),{}),b=i.reduce(((e,t)=>(e["order"+c(t)]={type:[String,Number],default:null},e)),{}),j={col:Object.keys(y),offset:Object.keys(v),order:Object.keys(b)};function S(e,t,l){let n=e;if(null!=l&&!1!==l)return t&&(n+=`-${t.replace(e,"")}`),"col"===e&&(n="v-"+n),"col"!==e||""!==l&&!0!==l?(n+=`-${l}`,n.toLowerCase()):n.toLowerCase()}const C=["auto","start","end","center","baseline","stretch"],m=e({cols:{type:[Boolean,String,Number],default:!1},...y,offset:{type:[String,Number],default:null},...v,order:{type:[String,Number],default:null},...b,alignSelf:{type:String,default:null,validator:e=>C.includes(e)},...t(),...n()},"VCol"),$=s()({name:"VCol",props:m(),setup(e,t){let{slots:l}=t;const n=f((()=>{const t=[];let l;for(l in j)j[l].forEach((n=>{const s=e[n],a=S(l,n,s);a&&t.push(a)}));const n=t.some((e=>e.startsWith("v-col-")));return t.push({"v-col":!n||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),t}));return()=>{var t;return d(e.tag,{class:[n.value,e.class],style:e.style},null==(t=l.default)?void 0:t.call(l))}}}),h=["start","end","center"],w=["space-between","space-around","space-evenly"];function N(e,t){return i.reduce(((l,n)=>(l[e+c(n)]=t(),l)),{})}const O=[...h,"baseline","stretch"],V=e=>O.includes(e),k=N("align",(()=>({type:String,default:null,validator:V}))),B=[...h,...w],L=e=>B.includes(e),R=N("justify",(()=>({type:String,default:null,validator:L}))),x=[...h,...w,"stretch"],E=e=>x.includes(e),G=N("alignContent",(()=>({type:String,default:null,validator:E}))),_={align:Object.keys(k),justify:Object.keys(R),alignContent:Object.keys(G)},q={align:"align",justify:"justify",alignContent:"align-content"};function A(e,t,l){let n=q[e];if(null!=l)return t&&(n+=`-${t.replace(e,"")}`),n+=`-${l}`,n.toLowerCase()}const D=e({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:V},...k,justify:{type:String,default:null,validator:L},...R,alignContent:{type:String,default:null,validator:E},...G,...t(),...n()},"VRow"),M=s()({name:"VRow",props:D(),setup(e,t){let{slots:l}=t;const n=f((()=>{const t=[];let l;for(l in _)_[l].forEach((n=>{const s=e[n],a=A(l,n,s);a&&t.push(a)}));return t.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),t}));return()=>{var t;return d(e.tag,{class:["v-row",n.value,e.class],style:e.style},null==(t=l.default)?void 0:t.call(l))}}}),W="/user/assets/alipay_logo-Dlp62uqs.png",z="/user/assets/wechat_logo-CRBrM8Oe.png";export{M as V,$ as a,p as b,W as c,z as w};