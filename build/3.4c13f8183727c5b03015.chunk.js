webpackJsonp([3],{868:function(n,t,e){"use strict";function r(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=arguments[1];switch(t.type){case i.a:return n.withMutations(function(n){n.set("loading",!1).set("error",!1).set("places",e.i(u.fromJS)(t.payload))});case i.b:return n.withMutations(function(n){n.set("loading",!1).set("places",null).set("error",t.payload)});case i.c:return n.withMutations(function(n){n.set("loading",!0).set("places",null).set("error",null)});case i.e:return n.update("index",function(n){return n+1});case i.d:return n.update("index",function(n){return n-1});default:return n}}var u=e(89),i=(e.n(u),e(928)),a=e.i(u.fromJS)({places:null,index:0,loading:!1,error:!1});t["default"]=r},928:function(n,t,e){"use strict";e.d(t,"c",function(){return r}),e.d(t,"b",function(){return u}),e.d(t,"a",function(){return i}),e.d(t,"e",function(){return a}),e.d(t,"d",function(){return o});var r="PLACES_REQUEST",u="PLACES_ERROR",i="PLACES_SUCCESS",a="INCREMENT_INDEX",o="DECREMENT_INDEX"}});