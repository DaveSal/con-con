!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(a,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(a)),e(t)}:e(window.jQuery)}(function(e){if(e.extend(e.FE.DEFAULTS,{imageManagerLoadURL:"https://i.froala.com/load-files",imageManagerLoadMethod:"get",imageManagerLoadParams:{},imageManagerPreloader:"",imageManagerDeleteURL:"",imageManagerDeleteMethod:"post",imageManagerDeleteParams:{},imageManagerPageSize:12,imageManagerScrollOffset:20,imageManagerToggleTags:!0}),e.FE.PLUGINS.imageManager=function(a){function t(){if(!I){var e='<div class="fr-modal-head-line"><i class="fa fa-bars fr-modal-more fr-not-available" id="fr-modal-more-'+a.sid+'" title="'+a.language.translate("Tags")+'"></i><h4 data-text="true">'+a.language.translate("Manage Images")+"</h4></div>";e+='<div class="fr-modal-tags" id="fr-modal-tags"></div>';var t='<img class="fr-preloader" id="fr-preloader" alt="'+a.language.translate("Loading")+'.." src="'+a.opts.imageManagerPreloader+'" style="display: none;">';t+='<div class="fr-image-list" id="fr-image-list"></div>';var r=a.modals.create(j,e,t);I=r.$modal,x=r.$head,P=r.$body}I.data("current-image",a.image.get()),a.modals.show(j),E||y(),o()}function r(){a.modals.hide(j)}function i(){var a=e(window).outerWidth();return a<768?2:a<1200?3:4}function n(){T.empty();for(var e=0;e<H;e++)T.append('<div class="fr-list-column"></div>')}function o(){E.show(),T.find(".fr-list-column").empty(),a.opts.imageManagerLoadURL?e.ajax({url:a.opts.imageManagerLoadURL,method:a.opts.imageManagerLoadMethod,data:a.opts.imageManagerLoadParams,dataType:"json",crossDomain:a.opts.requestWithCORS,xhrFields:{withCredentials:a.opts.requestWithCredentials},headers:a.opts.requestHeaders}).done(function(e,t,r){a.events.trigger("imageManager.imagesLoaded",[e]),s(e,r.response),E.hide()}).fail(function(){var e=this.xhr();M(O,e.response||e.responseText)}):M(z)}function s(e,a){try{T.find(".fr-list-column").empty(),R=0,U=0,F=0,S=e,g()}catch(e){M(_,a)}}function g(){if(U<S.length&&(T.outerHeight()<=P.outerHeight()+a.opts.imageManagerScrollOffset||P.scrollTop()+a.opts.imageManagerScrollOffset>T.outerHeight()-P.outerHeight())){R++;for(var e=a.opts.imageManagerPageSize*(R-1);e<Math.min(S.length,a.opts.imageManagerPageSize*R);e++)l(S[e])}}function l(t){var r=new Image,i=e('<div class="fr-image-container fr-empty fr-image-'+F+++'" data-loading="'+a.language.translate("Loading")+'.." data-deleting="'+a.language.translate("Deleting")+'..">');u(!1),r.onload=function(){i.height(Math.floor(i.width()/r.width*r.height));var n=e("<img/>");if(t.thumb)n.attr("src",t.thumb);else{if(M(A,t),!t.url)return M(N,t),!1;n.attr("src",t.url)}if(t.url&&n.attr("data-url",t.url),t.tag)if(x.find(".fr-modal-more.fr-not-available").removeClass("fr-not-available"),x.find(".fr-modal-tags").show(),t.tag.indexOf(",")>=0){for(var o=t.tag.split(","),s=0;s<o.length;s++)o[s]=o[s].trim(),0===q.find('a[title="'+o[s]+'"]').length&&q.append('<a role="button" title="'+o[s]+'">'+o[s]+"</a>");n.attr("data-tag",o.join())}else 0===q.find('a[title="'+t.tag.trim()+'"]').length&&q.append('<a role="button" title="'+t.tag.trim()+'">'+t.tag.trim()+"</a>"),n.attr("data-tag",t.tag.trim());t.name&&n.attr("alt",t.name);for(var l in t)t.hasOwnProperty(l)&&"thumb"!=l&&"url"!=l&&"tag"!=l&&n.attr("data-"+l,t[l]);i.append(n).append(e(a.icon.create("imageManagerDelete")).addClass("fr-delete-img").attr("title",a.language.translate("Delete"))).append(e(a.icon.create("imageManagerInsert")).addClass("fr-insert-img").attr("title",a.language.translate("Insert"))),q.find(".fr-selected-tag").each(function(e,a){L(n,a.text)||i.hide()}),n.on("load",function(){i.removeClass("fr-empty"),i.height("auto"),U++,f(m(parseInt(n.parent().attr("class").match(/fr-image-(\d+)/)[1],10)+1)),u(!1),U%a.opts.imageManagerPageSize==0&&g()}),a.events.trigger("imageManager.imageLoaded",[n])},r.onerror=function(){U++,i.remove(),f(m(parseInt(i.attr("class").match(/fr-image-(\d+)/)[1],10)+1)),M(k,t),U%a.opts.imageManagerPageSize==0&&g()},r.src=t.thumb||t.url,d().append(i)}function d(){var a,t;return T.find(".fr-list-column").each(function(r,i){var n=e(i);0===r?(t=n.outerHeight(),a=n):n.outerHeight()<t&&(t=n.outerHeight(),a=n)}),a}function m(a){void 0===a&&(a=0);for(var t=[],r=F-1;r>=a;r--){var i=T.find(".fr-image-"+r);i.length&&(t.push(i),e('<div id="fr-image-hidden-container">').append(i),T.find(".fr-image-"+r).remove())}return t}function f(e){for(var a=e.length-1;a>=0;a--)d().append(e[a])}function u(e){if(void 0===e&&(e=!0),!I.is(":visible"))return!0;var t=i();if(t!=H){H=t;var r=m();n(),f(r)}a.modals.resize(j),e&&g()}function c(e){var a={},t=e.data();for(var r in t)t.hasOwnProperty(r)&&"url"!=r&&"tag"!=r&&(a[r]=t[r]);return a}function h(t){var r=e(t.currentTarget).siblings("img"),i=I.data("instance")||a,n=I.data("current-image");if(a.modals.hide(j),i.image.showProgressBar(),n)n.data("fr-old-src",n.attr("src")),n.trigger("click");else{i.events.focus(!0),i.selection.restore();var o=i.position.getBoundingRect(),s=o.left+o.width/2+e(a.doc).scrollLeft(),g=o.top+o.height+e(a.doc).scrollTop();i.popups.setContainer("image.insert",a.$sc),i.popups.show("image.insert",s,g)}i.image.insert(r.data("url"),!1,c(r),n)}function p(){I.find("#fr-modal-tags > a").each(function(){0===I.find('#fr-image-list [data-tag*="'+e(this).text()+'"]').length&&e(this).removeClass("fr-selected-tag").hide()}),b()}function v(t){var r=e(t.currentTarget).siblings("img"),i=a.language.translate("Are you sure? Image will be deleted.");confirm(i)&&(a.opts.imageManagerDeleteURL?!1!==a.events.trigger("imageManager.beforeDeleteImage",[r])&&(r.parent().addClass("fr-image-deleting"),e.ajax({method:a.opts.imageManagerDeleteMethod,url:a.opts.imageManagerDeleteURL,data:e.extend(e.extend({src:r.attr("src")},c(r)),a.opts.imageManagerDeleteParams),crossDomain:a.opts.requestWithCORS,xhrFields:{withCredentials:a.opts.requestWithCredentials},headers:a.opts.requestHeaders}).done(function(e){a.events.trigger("imageManager.imageDeleted",[e]);var t=m(parseInt(r.parent().attr("class").match(/fr-image-(\d+)/)[1],10)+1);r.parent().remove(),f(t),p(),u(!0)}).fail(function(){var e=this.xhr();M($,e.response||e.responseText)})):M(B))}function M(t,r){10<=t&&t<20?E.hide():20<=t&&t<30&&e(".fr-image-deleting").removeClass("fr-image-deleting"),a.events.trigger("imageManager.error",[{code:t,message:W[t]},r])}function w(){var e=x.find(".fr-modal-head-line").outerHeight(),a=q.outerHeight();x.toggleClass("fr-show-tags"),x.hasClass("fr-show-tags")?(x.css("height",e+a),q.find("a").css("opacity",1)):(x.css("height",e),q.find("a").css("opacity",0))}function b(){var a=q.find(".fr-selected-tag");a.length>0?(T.find("img").parent().show(),a.each(function(a,t){T.find("img").each(function(a,r){var i=e(r);L(i,t.text)||i.parent().hide()})})):T.find("img").parent().show(),f(m()),g()}function C(t){t.preventDefault();var r=e(t.currentTarget);r.toggleClass("fr-selected-tag"),a.opts.imageManagerToggleTags&&r.siblings("a").removeClass("fr-selected-tag"),b()}function L(e,a){for(var t=e.attr("data-tag").split(","),r=0;r<t.length;r++)if(t[r]==a)return!0;return!1}function y(){E=I.find("#fr-preloader"),T=I.find("#fr-image-list"),q=I.find("#fr-modal-tags"),H=i(),n(),x.css("height",x.find(".fr-modal-head-line").outerHeight()),a.events.$on(e(a.o_win),"resize",function(){u(!!S)}),a.helpers.isMobile()&&(a.events.bindClick(T,"div.fr-image-container",function(a){I.find(".fr-mobile-selected").removeClass("fr-mobile-selected"),e(a.currentTarget).addClass("fr-mobile-selected")}),I.on(a._mousedown,function(){I.find(".fr-mobile-selected").removeClass("fr-mobile-selected")})),a.events.bindClick(T,".fr-insert-img",h),a.events.bindClick(T,".fr-delete-img",v),I.on(a._mousedown+" "+a._mouseup,function(e){e.stopPropagation()}),I.on(a._mousedown,"*",function(){a.events.disableBlur()}),P.on("scroll",g),a.events.bindClick(I,"i#fr-modal-more-"+a.sid,w),a.events.bindClick(q,"a",C)}function D(){if(!a.$wp&&"IMG"!=a.el.tagName)return!1}var I,x,P,E,T,q,S,R,U,F,H,j="image_manager",k=10,O=11,z=12,_=13,A=14,N=15,$=21,B=22,W={};return W[k]="Image cannot be loaded from the passed link.",W[O]="Error during load images request.",W[z]="Missing imageManagerLoadURL option.",W[_]="Parsing load response failed.",W[A]="Missing image thumb.",W[N]="Missing image URL.",W[$]="Error during delete image request.",W[B]="Missing imageManagerDeleteURL option.",{require:["image"],_init:D,show:t,hide:r}},!e.FE.PLUGINS.image)throw new Error("Image manager plugin requires image plugin.");e.FE.DEFAULTS.imageInsertButtons.push("imageManager"),e.FE.RegisterCommand("imageManager",{title:"Browse",undo:!1,focus:!1,modal:!0,callback:function(){this.imageManager.show()},plugin:"imageManager"}),e.FE.DefineIcon("imageManager",{NAME:"folder"}),e.FE.DefineIcon("imageManagerInsert",{NAME:"plus"}),e.FE.DefineIcon("imageManagerDelete",{NAME:"trash"})});