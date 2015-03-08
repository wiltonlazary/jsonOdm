"use strict";function JsonOdm(){var t=this;this.sources={},this.selectedSource={},this.addSource=function(n,e,r){"object"==typeof e&&("undefined"==typeof t.sources[n]&&(t.sources[n]=e),r&&(t.selectedSource=e))},this.selectSource=function(n){"undefined"!=typeof t.sources[n]&&(t.selectedSource=t.sources[n])}}window.jsonOdm||(window.jsonOdm=new JsonOdm),jsonOdm.util={isArray:function(t){return Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t)},objectKeys:Object.keys,branch:function(t,n){function e(){if(arguments&&arguments.length&&this){var t=this[arguments[0]];return t?e.apply(t,Array.prototype.slice.call(arguments,1)):!1}return this}return e.apply(t,n)}},Object.keys||(jsonOdm.util.objectKeys=function(){var t=Object.prototype.hasOwnProperty,n=!{toString:null}.propertyIsEnumerable("toString"),e=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],r=e.length;return function(o){if("object"!=typeof o&&("function"!=typeof o||null===o))throw new TypeError("Object.keys called on non-object");var u,c,s=[];for(u in o)t.call(o,u)&&s.push(u);if(n)for(c=0;r>c;c++)t.call(o,e[c])&&s.push(e[c]);return s}}()),jsonOdm.Collection=function(t){var n=Object.create(Array.prototype);return n=Array.apply(n,Array.prototype.slice.call(arguments,1))||n,"undefined"!=typeof t&&jsonOdm.selectedSource&&jsonOdm.selectedSource[t]&&(n=n.concat(jsonOdm.selectedSource[t])),jsonOdm.Collection.decorate(n),n.$branch=function(){var t=jsonOdm.util.branch(n,arguments);return jsonOdm.Collection.decorate(t),t},n},jsonOdm.Collection.decorate=function(t){var n=function(t){jsonOdm.util.isArray(t)&&(t.$hasMany=function(n,e,r,o){"string"==typeof r&&(o=o||r);var u=r;"string"==typeof r&&jsonOdm.selectedSource&&jsonOdm.selectedSource[r]&&(u=jsonOdm.selectedSource[r]);for(var c=0;c<t.length;c++){var s=n;if(t[c].hasOwnProperty(n)&&(s=t[c][n]),"undefined"==typeof t[c][o])for(var i=0;s.length&&i<s.length;i++){for(var l=null,a=0;a<u.length;a++)if(s[i]==u[a][e]){l=u[a];break}null!=l&&(t[c][o]||(t[c][o]=[]),t[c][o].push(l))}}},t.$hasOne=function(n,e,r,o){"string"==typeof r&&(o=o||r);var u=r;"string"==typeof r&&jsonOdm.selectedSource&&jsonOdm.selectedSource[r]&&(u=jsonOdm.selectedSource[r]);for(var c=0;c<t.length;c++)if(t[c].hasOwnProperty(n)&&(n=t[c][n]),"undefined"==typeof t[c][o]){for(var s=null,i=0;i<u.length;i++)if(n==u[i][e]){s=u[i];break}null!=s&&(t[c][o]=s)}},t.$query=function(){return new jsonOdm.Query(t)})};n(t)},jsonOdm.Query=function(t){this.$$commandQueue=[],this.$$collection=t,this.$all=function(n){if(this.$$commandQueue.length<1)return t;for(var e=new jsonOdm.Collection,r=0;r<t.length;r++){for(var o=!0,u=0;u<this.$$commandQueue.length&&(o=o&&this.$$commandQueue[u](t[r]));u++);if(o){if(n)return t[r];e.push(t[r])}}return e},this.$first=function(){return this.$all(!0)}},jsonOdm.Query.prototype.$testCollection=function(t,n){var e=this.$$commandQueue.pop(),r=function(){return function(r){if(!(e instanceof jsonOdm.Collection||"function"==typeof e)||"function"!=typeof n)return!1;var o=e instanceof jsonOdm.Collection?e:e(r);return n(o,t)}}();return this.$$commandQueue.push(r),this},jsonOdm.Query.prototype.$binaryOperator=function(t,n){var e=function(t,e){return function(r){if("function"!=typeof e)return!1;for(var o=[],u=0;u<t.length;u++)for(var c=0;c<t[u].$$commandQueue.length;c++)o.push(t[u].$$commandQueue[c](r));return n(o)}}(t,n),r=new jsonOdm.Query(this.$$collection);return r.$$commandQueue.push(e),r},jsonOdm.Query.prototype.$branch=function(){var t=function(t){return function(n){return jsonOdm.util.branch(n,t)}}(arguments),n=new jsonOdm.Query(this.$$collection);return n.$$commandQueue.push(t),n},jsonOdm.Query.prototype.$eq=function(){return this.$testCollection(arguments,function(t,n){return Array.prototype.indexOf.call(n,t)>-1})},jsonOdm.Query.prototype.$notEq=function(){return this.$testCollection(arguments,function(t,n){return-1==Array.prototype.indexOf.call(n,t)})},jsonOdm.Query.prototype.$gt=function(t){return this.$testCollection(t,function(t,n){return t>n})},jsonOdm.Query.prototype.$gte=function(t){return this.$testCollection(t,function(t,n){return t>=n})},jsonOdm.Query.prototype.$lt=function(t){return this.$testCollection(t,function(t,n){return n>t})},jsonOdm.Query.prototype.$lte=function(t){return this.$testCollection(t,function(t,n){return n>=t})},jsonOdm.Query.prototype.$and=function(){return this.$binaryOperator(arguments,function(t){for(var n=0;n<t.length;n++)if(!t[n])return!1;return!0})},jsonOdm.Query.prototype.$or=function(){return this.$binaryOperator(arguments,function(t){for(var n=0;n<t.length;n++)if(t[n])return!0;return!1})};