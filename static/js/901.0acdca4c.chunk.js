"use strict";(self.webpackChunkme_app_react=self.webpackChunkme_app_react||[]).push([[901],{7901:function(e,s,a){a.r(s),a.d(s,{default:function(){return M}});var t=a(4942),n=a(885),r=a(2791),i=a(5216),u=a(5705),c=a(8687),l=function(e){return e.messagePage.chatMessage},d=function(e){return e.messagePage.chatStatus},g=a(8207),o="ChatPage_MessagesList__13Qkv",m="ChatPage_text__gPtM1",h="ChatPage_textHost__6BwfX",v="ChatPage_message__UJ7GK",_="ChatPage_userName__5iPBE",f="ChatPage_avatar__wQs5c",x="ChatPage_newMessage__rI+26",j="ChatPage_newMessageForm__5SfXR",p=a(7689),N=a(1087),P=a(8427),b=a(1694),C=a.n(b),w=a(184),S=function(){var e=(0,c.v9)(l),s=(0,r.useRef)(null),a=(0,r.useState)(!0),t=(0,n.Z)(a,2),i=t[0],u=t[1];(0,r.useEffect)((function(){var e;i&&(null===(e=s.current)||void 0===e||e.scrollIntoView())}),[e]);return(0,w.jsxs)("div",{className:o,onScroll:function(e){var s=e.currentTarget;Math.abs(s.scrollHeight-s.scrollTop)-s.clientHeight<300?!i&&u(!0):i&&u(!1)},children:[e.map((function(e){return(0,w.jsx)(I,{avatar:e.photo,message:e.message,userName:e.userName,userId:e.userId},e.id)})),(0,w.jsx)("div",{ref:s})]})},k=function(){var e=(0,c.v9)(d),s=(0,c.I0)();return(0,w.jsx)(u.J9,{initialValues:{message:""},validateOnBlur:!0,onSubmit:function(e,a){var t=a.setSubmitting;e.message&&(s((0,g.A0)(e.message)),e.message=""),t(!1)},children:function(s){var a=s.values;return(0,w.jsx)(u.l0,{children:(0,w.jsxs)("div",{className:j,children:[(0,w.jsxs)("div",{className:x,children:[(0,w.jsx)(u.gN,{type:"text",name:"message",value:a.message,placeholder:"Enter your message"}),(0,w.jsx)("hr",{})]}),(0,w.jsx)("div",{children:(0,w.jsx)("button",{disabled:"pending"===e,className:"btn btn-dark",type:"submit",children:"Send"})})]})})}})},I=r.memo((function(e){var s=e.avatar,a=e.message,n=e.userName,r=e.userId,u=(0,c.v9)(P.Ob);return(0,w.jsxs)("div",{className:v,children:[(0,w.jsx)(N.OL,{to:"/profile/"+r,className:f,children:(0,w.jsx)(i.q,{avatar:s})}),(0,w.jsxs)("div",{className:C()(m,(0,t.Z)({},h,u.id===r)),children:[(0,w.jsx)("div",{className:_,children:n}),(0,w.jsx)("div",{children:a})]})]})})),M=function(){var e=(0,c.v9)(P.Od),s=(0,c.I0)();return(0,r.useEffect)((function(){return s((0,g.WE)()),function(){s((0,g.kw)()),s(g.Wq.SetMessageForChat([],!0))}}),[]),e?(0,w.jsxs)("div",{children:[(0,w.jsx)(S,{}),(0,w.jsx)(k,{})]}):(0,w.jsx)(p.Fg,{to:"/login"})}}}]);
//# sourceMappingURL=901.0acdca4c.chunk.js.map