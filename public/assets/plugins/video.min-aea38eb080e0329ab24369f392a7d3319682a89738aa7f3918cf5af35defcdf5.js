!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,i){return void 0===i&&(i="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(i)}:e(window.jQuery)}(function(e){e.extend(e.FE.POPUP_TEMPLATES,{"video.insert":"[_BUTTONS_][_BY_URL_LAYER_][_EMBED_LAYER_][_UPLOAD_LAYER_][_PROGRESS_BAR_]","video.edit":"[_BUTTONS_]","video.size":"[_BUTTONS_][_SIZE_LAYER_]"}),e.extend(e.FE.DEFAULTS,{videoAllowedTypes:["mp4","webm","ogg"],videoAllowedProviders:[".*"],videoDefaultAlign:"center",videoDefaultDisplay:"block",videoDefaultWidth:600,videoEditButtons:["videoReplace","videoRemove","|","videoDisplay","videoAlign","videoSize"],videoInsertButtons:["videoBack","|","videoByURL","videoEmbed","videoUpload"],videoMaxSize:52428800,videoMove:!0,videoResize:!0,videoSizeButtons:["videoBack","|"],videoSplitHTML:!1,videoTextNear:!0,videoUploadMethod:"POST",videoUploadParam:"file",videoUploadParams:{},videoUploadToS3:!1,videoUploadURL:"https://i.froala.com/upload"}),e.FE.VIDEO_PROVIDERS=[{test_regex:/^.*((youtu.be)|(youtube.com))\/((v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))?\??v?=?([^#\&\?]*).*/,url_regex:/(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([0-9a-zA-Z_\-]+)(.+)?/g,url_text:"//www.youtube.com/embed/$1",html:'<iframe width="640" height="360" src="{url}?wmode=opaque" frameborder="0" allowfullscreen></iframe>',provider:"youtube"},{test_regex:/^.*(?:vimeo.com)\/(?:channels(\/\w+\/)?|groups\/*\/videos\/\u200b\d+\/|video\/|)(\d+)(?:$|\/|\?)/,url_regex:/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i,url_text:"//player.vimeo.com/video/$1",html:'<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',provider:"vimeo"},{test_regex:/^.+(dailymotion.com|dai.ly)\/(video|hub)?\/?([^_]+)[^#]*(#video=([^_&]+))?/,url_regex:/(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com|dai\.ly)\/(?:video|hub)?\/?(.+)/g,url_text:"//www.dailymotion.com/embed/video/$1",html:'<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',provider:"dailymotion"},{test_regex:/^.+(screen.yahoo.com)\/[^_&]+/,url_regex:"",url_text:"",html:'<iframe width="640" height="360" src="{url}?format=embed" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>',provider:"yahoo"},{test_regex:/^.+(rutube.ru)\/[^_&]+/,url_regex:/(?:https?:\/\/)?(?:www\.)?(?:rutube\.ru)\/(?:video)?\/?(.+)/g,url_text:"//rutube.ru/play/embed/$1",html:'<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>',provider:"rutube"},{test_regex:/^(?:.+)vidyard.com\/(?:watch)?\/?([^.&\/]+)\/?(?:[^_.&]+)?/,url_regex:/^(?:.+)vidyard.com\/(?:watch)?\/?([^.&\/]+)\/?(?:[^_.&]+)?/g,url_text:"//play.vidyard.com/$1",html:'<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',provider:"vidyard"}],e.FE.VIDEO_EMBED_REGEX=/^\W*((<iframe.*><\/iframe>)|(<embed.*>))\W*$/i,e.FE.PLUGINS.video=function(t){function i(){var e=t.popups.get("video.insert");e.find(".fr-video-by-url-layer input").val("").trigger("change");var i=e.find(".fr-video-embed-layer textarea");i.val("").trigger("change"),i=e.find(".fr-video-upload-layer input"),i.val("").trigger("change")}function o(){var e=t.$tb.find('.fr-command[data-cmd="insertVideo"]'),i=t.popups.get("video.insert");if(i||(i=s()),c(),!i.hasClass("fr-active")){t.popups.refresh("video.insert"),t.popups.setContainer("video.insert",t.$tb);var o=e.offset().left+e.outerWidth()/2,r=e.offset().top+(t.opts.toolbarBottom?10:e.outerHeight()-10);t.popups.show("video.insert",o,r,e.outerHeight())}}function r(){var e=t.popups.get("video.edit");if(e||(e=X()),e){t.popups.setContainer("video.edit",t.$sc),t.popups.refresh("video.edit");var i=me.find("iframe, embed, video"),o=i.offset().left+i.outerWidth()/2,r=i.offset().top+i.outerHeight();t.popups.show("video.edit",o,r,i.outerHeight())}}function s(e){if(e)return t.popups.onRefresh("video.insert",i),t.popups.onHide("image.insert",re),!0;var o="";t.opts.videoInsertButtons.length>1&&(o='<div class="fr-buttons">'+t.button.buildList(t.opts.videoInsertButtons)+"</div>");var r,s="",n=t.opts.videoInsertButtons.indexOf("videoUpload"),a=t.opts.videoInsertButtons.indexOf("videoByURL"),d=t.opts.videoInsertButtons.indexOf("videoEmbed");a>=0&&(r=" fr-active",(a>n&&n>=0||a>d&&d>=0)&&(r=""),s='<div class="fr-video-by-url-layer fr-layer'+r+'" id="fr-video-by-url-layer-'+t.id+'"><div class="fr-input-line"><input id="fr-video-by-url-layer-text-'+t.id+'" type="text" placeholder="http://" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertByURL" tabIndex="2" role="button">'+t.language.translate("Insert")+"</button></div></div>");var l="";d>=0&&(r=" fr-active",(d>n&&n>=0||d>a&&a>=0)&&(r=""),l='<div class="fr-video-embed-layer fr-layer'+r+'" id="fr-video-embed-layer-'+t.id+'"><div class="fr-input-line"><textarea id="fr-video-embed-layer-text'+t.id+'" type="text" placeholder="'+t.language.translate("Embedded Code")+'" tabIndex="1" aria-required="true" rows="5"></textarea></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertEmbed" tabIndex="2" role="button">'+t.language.translate("Insert")+"</button></div></div>");var f="";n>=0&&(r=" fr-active",(n>d&&d>=0||n>a&&a>=0)&&(r=""),f='<div class="fr-video-upload-layer fr-layer'+r+'" id="fr-video-upload-layer-'+t.id+'"><strong>'+t.language.translate("Drop video")+"</strong><br>("+t.language.translate("or click")+')<div class="fr-form"><input type="file" accept="video/'+t.opts.videoAllowedTypes.join(", video/").toLowerCase()+'" tabIndex="-1" aria-labelledby="fr-video-upload-layer-'+t.id+'" role="button"></div></div>');var v='<div class="fr-video-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="videoDismissError" tabIndex="2" role="button">OK</button></div></div>',p={buttons:o,by_url_layer:s,embed_layer:l,upload_layer:f,progress_bar:v},u=t.popups.create("video.insert",p);return V(u),u}function n(e){var i,o,r=t.popups.get("video.insert");if(!me&&!t.opts.toolbarInline){var s=t.$tb.find('.fr-command[data-cmd="insertVideo"]');i=s.offset().left+s.outerWidth()/2,o=s.offset().top+(t.opts.toolbarBottom?10:s.outerHeight()-10)}t.opts.toolbarInline&&(o=r.offset().top-t.helpers.getPX(r.css("margin-top")),r.hasClass("fr-above")&&(o+=r.outerHeight())),r.find(".fr-layer").removeClass("fr-active"),r.find(".fr-"+e+"-layer").addClass("fr-active"),t.popups.show("video.insert",i,o,0),t.accessibility.focusPopup(r)}function a(e){t.popups.get("video.insert").find(".fr-video-by-url-layer").hasClass("fr-active")&&e.addClass("fr-active").attr("aria-pressed",!0)}function d(e){t.popups.get("video.insert").find(".fr-video-embed-layer").hasClass("fr-active")&&e.addClass("fr-active").attr("aria-pressed",!0)}function l(e){t.popups.get("video.insert").find(".fr-video-upload-layer").hasClass("fr-active")&&e.addClass("fr-active").attr("aria-pressed",!0)}function f(e){t.events.focus(!0),t.selection.restore();var i=!1;me&&(oe(),i=!0),t.html.insert('<span contenteditable="false" draggable="true" class="fr-jiv fr-video">'+e+"</span>",!1,t.opts.videoSplitHTML),t.popups.hide("video.insert");var o=t.$el.find(".fr-jiv");o.removeClass("fr-jiv"),se(o,t.opts.videoDefaultDisplay,t.opts.videoDefaultAlign),o.toggleClass("fr-draggable",t.opts.videoMove),t.events.trigger(i?"video.replaced":"video.inserted",[o])}function v(){var i=e(this);t.popups.hide("video.insert"),i.removeClass("fr-uploading"),i.parent().next().is("br")&&i.parent().next().remove(),y(i.parent()),t.events.trigger("video.loaded",[i.parent()])}function p(e,i,o,r,s){t.edit.off(),h("Loading video"),i&&(e=t.helpers.sanitizeURL(e));var n=document.createElement("video");n.oncanplay=function(){var i,n;if(r){t.undo.canDo()||r.find("video").hasClass("fr-uploading")||t.undo.saveStep();var a=r.find("video").data("fr-old-src"),d=r.data("fr-replaced");r.data("fr-replaced",!1),t.$wp?(i=r.clone(),i.find("video").removeData("fr-old-src").removeClass("fr-uploading"),i.find("video").off("canplay"),a&&r.find("video").attr("src",a),r.replaceWith(i)):i=r;for(var l=i.find("video").get(0).attributes,f=0;f<l.length;f++){var p=l[f];0===p.nodeName.indexOf("data-")&&i.find("video").removeAttr(p.nodeName)}if(void 0!==o)for(n in o)o.hasOwnProperty(n)&&"link"!=n&&i.find("video").attr("data-"+n,o[n]);i.find("video").on("canplay",v),i.find("video").attr("src",e),t.edit.on(),B(),t.undo.saveStep(),t.$el.blur(),t.events.trigger(d?"video.replaced":"video.inserted",[i,s])}else i=D(e,o,v),B(),t.undo.saveStep(),t.events.trigger("video.inserted",[i,s])},n.onerror=function(){H(be)},u("Loading video"),n.src=e}function u(e){var i=t.popups.get("video.insert");if(i||(i=s()),i.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"),i.find(".fr-video-progress-bar-layer").addClass("fr-active"),i.find(".fr-buttons").hide(),me){var o=me.find("video");t.popups.setContainer("video.insert",t.$sc);var r=o.offset().left+o.width()/2,n=o.offset().top+o.height();t.popups.show("video.insert",r,n,o.outerHeight())}void 0===e&&h(t.language.translate("Uploading"),0)}function c(e){var i=t.popups.get("video.insert");if(i&&(i.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"),i.find(".fr-video-progress-bar-layer").removeClass("fr-active"),i.find(".fr-buttons").show(),e||t.$el.find("video.fr-error").length)){if(t.events.focus(),t.$el.find("video.fr-error").length&&(t.$el.find("video.fr-error").parent().remove(),t.undo.saveStep(),t.undo.run(),t.undo.dropRedo()),!t.$wp&&me){var o=me;O(!0),t.selection.setAfter(o.find("video").get(0)),t.selection.restore()}t.popups.hide("video.insert")}}function h(e,i){var o=t.popups.get("video.insert");if(o){var r=o.find(".fr-video-progress-bar-layer");r.find("h3").text(e+(i?" "+i+"%":"")),r.removeClass("fr-error"),i?(r.find("div").removeClass("fr-indeterminate"),r.find("div > span").css("width",i+"%")):r.find("div").addClass("fr-indeterminate")}}function g(e){u();var i=t.popups.get("video.insert"),o=i.find(".fr-video-progress-bar-layer");o.addClass("fr-error");var r=o.find("h3");r.text(e),t.events.disableBlur(),r.focus()}function m(i){void 0===i&&(i=t.popups.get("video.insert").find('.fr-video-by-url-layer input[type="text"]').val()||"");var o=null;if(t.helpers.isURL(i))for(var r=0;r<e.FE.VIDEO_PROVIDERS.length;r++){var s=e.FE.VIDEO_PROVIDERS[r];if(s.test_regex.test(i)&&new RegExp(t.opts.videoAllowedProviders.join("|")).test(s.provider)){o=i.replace(s.url_regex,s.url_text),o=s.html.replace(/\{url\}/,o);break}}o?f(o):t.events.trigger("video.linkError",[i])}function b(i){void 0===i&&(i=t.popups.get("video.insert").find(".fr-video-embed-layer textarea").val()||""),0!==i.length&&e.FE.VIDEO_EMBED_REGEX.test(i)?f(i):t.events.trigger("video.codeError",[i])}function y(e){z.call(e.get(0))}function E(i){try{if(!1===t.events.trigger("video.uploaded",[i],!0))return t.edit.on(),!1;var o=e.parseJSON(i);return o.link?o:(H(ye,i),!1)}catch(e){return H(we,i),!1}}function w(i){try{var o=e(i).find("Location").text(),r=e(i).find("Key").text();return!1===t.events.trigger("video.uploadedToS3",[o,r,i],!0)?(t.edit.on(),!1):o}catch(e){return H(we,i),!1}}function C(e){h("Loading video");var i=this.status,o=this.response,r=this.responseXML,s=this.responseText;try{if(t.opts.videoUploadToS3)if(201==i){var n=w(r);n&&p(n,!1,[],e,o||r)}else H(we,o||r);else if(i>=200&&i<300){var a=E(s);a&&p(a.link,!1,a,e,o||s)}else H(Ee,o||s)}catch(e){H(we,o||s)}}function _(){H(we,this.response||this.responseText||this.responseXML)}function x(e){if(e.lengthComputable){var i=e.loaded/e.total*100|0;h(t.language.translate("Uploading"),i)}}function A(){t.edit.on(),c(!0)}function D(i,o,r){var s,n="";if(o&&void 0!==o)for(s in o)o.hasOwnProperty(s)&&"link"!=s&&(n+=" data-"+s+'="'+o[s]+'"');var a=t.opts.videoDefaultWidth;a&&"auto"!=a&&(a+="px");var d=e('<span contenteditable="false" draggable="true" class="fr-video fr-dv'+t.opts.videoDefaultDisplay[0]+("center"!=t.opts.videoDefaultAlign?" fr-fv"+t.opts.videoDefaultAlign[0]:"")+'"><video src="'+i+'" '+n+(a?' style="width: '+a+';"':"")+'" controls>'+t.language.translate("Your browser does not support HTML5 video.")+"</video></span>");d.toggleClass("fr-draggable",t.opts.videoMove),d.find("video").on("canplay",r),t.edit.on(),t.events.focus(!0),t.selection.restore(),t.undo.saveStep(),t.opts.videoSplitHTML?t.markers.split():t.markers.insert();var l=t.$el.find(".fr-marker");return t.node.isLastSibling(l)&&l.parent().hasClass("fr-deletable")&&l.insertAfter(l.parent()),l.replaceWith(d),t.html.wrap(),t.selection.clear(),d}function S(i){if(!t.core.sameInstance(ge))return!0;i.preventDefault(),i.stopPropagation();var o=i.pageX||(i.originalEvent.touches?i.originalEvent.touches[0].pageX:null),r=i.pageY||(i.originalEvent.touches?i.originalEvent.touches[0].pageY:null);if(!o||!r)return!1;if("mousedown"==i.type){var s=t.$oel.get(0),n=s.ownerDocument,a=n.defaultView||n.parentWindow,d=!1;try{d=a.location!=a.parent.location}catch(e){}d&&a.frameElement&&(o+=t.helpers.getPX(e(a.frameElement).offset().left)+a.frameElement.clientLeft,r=i.clientY+t.helpers.getPX(e(a.frameElement).offset().top)+a.frameElement.clientTop)}t.undo.canDo()||t.undo.saveStep(),he=e(this),he.data("start-x",o),he.data("start-y",r),ce.show(),t.popups.hideAll(),P()}function R(e){if(!t.core.sameInstance(ge))return!0;if(he){e.preventDefault();var i=e.pageX||(e.originalEvent.touches?e.originalEvent.touches[0].pageX:null),o=e.pageY||(e.originalEvent.touches?e.originalEvent.touches[0].pageY:null);if(!i||!o)return!1;var r=he.data("start-x"),s=he.data("start-y");he.data("start-x",i),he.data("start-y",o);var n=i-r,a=o-s,d=me.find("iframe, embed, video"),l=d.width(),f=d.height();(he.hasClass("fr-hnw")||he.hasClass("fr-hsw"))&&(n=0-n),(he.hasClass("fr-hnw")||he.hasClass("fr-hne"))&&(a=0-a),d.css("width",l+n),d.css("height",f+a),d.removeAttr("width"),d.removeAttr("height"),F()}}function U(e){if(!t.core.sameInstance(ge))return!0;he&&me&&(e&&e.stopPropagation(),he=null,ce.hide(),F(),r(),t.undo.saveStep())}function I(e){return'<div class="fr-handler fr-h'+e+'"></div>'}function k(e,t,i,o){return e.pageX=t,e.pageY=t,S.call(this,e),e.pageX=e.pageX+i*Math.floor(Math.pow(1.1,o)),e.pageY=e.pageY+i*Math.floor(Math.pow(1.1,o)),R.call(this,e),U.call(this,e),++o}function $(){var i;if(t.shared.$video_resizer?(ge=t.shared.$video_resizer,ce=t.shared.$vid_overlay,t.events.on("destroy",function(){ge.removeClass("fr-active").appendTo(e("body:first"))},!0)):(t.shared.$video_resizer=e('<div class="fr-video-resizer"></div>'),ge=t.shared.$video_resizer,t.events.$on(ge,"mousedown",function(e){e.stopPropagation()},!0),t.opts.videoResize&&(ge.append(I("nw")+I("ne")+I("sw")+I("se")),t.shared.$vid_overlay=e('<div class="fr-video-overlay"></div>'),ce=t.shared.$vid_overlay,i=ge.get(0).ownerDocument,e(i).find("body:first").append(ce))),t.events.on("shared.destroy",function(){ge.html("").removeData().remove(),ge=null,t.opts.videoResize&&(ce.remove(),ce=null)},!0),t.helpers.isMobile()||t.events.$on(e(t.o_win),"resize.video",function(){O(!0)}),t.opts.videoResize){i=ge.get(0).ownerDocument,t.events.$on(ge,t._mousedown,".fr-handler",S),t.events.$on(e(i),t._mousemove,R),t.events.$on(e(i.defaultView||i.parentWindow),t._mouseup,U),t.events.$on(ce,"mouseleave",U);var o=1,r=null,s=0;t.events.on("keydown",function(i){if(me){var n=-1!=navigator.userAgent.indexOf("Mac OS X")?i.metaKey:i.ctrlKey,a=i.which;(a!==r||i.timeStamp-s>200)&&(o=1),(a==e.FE.KEYCODE.EQUALS||t.browser.mozilla&&a==e.FE.KEYCODE.FF_EQUALS)&&n&&!i.altKey?o=k.call(this,i,1,1,o):(a==e.FE.KEYCODE.HYPHEN||t.browser.mozilla&&a==e.FE.KEYCODE.FF_HYPHEN)&&n&&!i.altKey&&(o=k.call(this,i,2,-1,o)),r=a,s=i.timeStamp}}),t.events.on("keyup",function(){o=1})}}function B(){var i,o=Array.prototype.slice.call(t.el.querySelectorAll("video")),r=[];for(i=0;i<o.length;i++)r.push(o[i].getAttribute("src")),e(o[i]).toggleClass("fr-draggable",t.opts.videoMove),""===o[i].getAttribute("class")&&o[i].removeAttribute("class"),""===o[i].getAttribute("style")&&o[i].removeAttribute("style");if(Ae)for(i=0;i<Ae.length;i++)r.indexOf(Ae[i].getAttribute("src"))<0&&t.events.trigger("video.removed",[e(Ae[i])]);Ae=o}function F(){ge||$(),(t.$wp||t.$sc).append(ge),ge.data("instance",t);var e=me.find("iframe, embed, video");ge.css("top",(t.opts.iframe?e.offset().top-1:e.offset().top-t.$wp.offset().top-1)+t.$wp.scrollTop()).css("left",(t.opts.iframe?e.offset().left-1:e.offset().left-t.$wp.offset().left-1)+t.$wp.scrollLeft()).css("width",e.outerWidth()).css("height",e.height()).addClass("fr-active")}function z(i){if(i&&"touchend"==i.type&&De)return!0;if(i&&t.edit.isDisabled())return i.stopPropagation(),i.preventDefault(),!1;if(t.edit.isDisabled())return!1;for(var o=0;o<e.FE.INSTANCES.length;o++)e.FE.INSTANCES[o]!=t&&e.FE.INSTANCES[o].events.trigger("video.hideResizer");t.toolbar.disable(),t.helpers.isMobile()&&(t.events.disableBlur(),t.$el.blur(),t.events.enableBlur()),me=e(this),e(this).addClass("fr-active"),t.opts.iframe&&t.size.syncIframe(),fe(),F(),r(),t.selection.clear(),t.button.bulkRefresh(),t.events.trigger("image.hideResizer")}function O(e){me&&(T()||!0===e)&&(ge.removeClass("fr-active"),t.toolbar.enable(),me.removeClass("fr-active"),me=null,P())}function L(){t.shared.vid_exit_flag=!0}function P(){t.shared.vid_exit_flag=!1}function T(){return t.shared.vid_exit_flag}function M(i){var o=i.originalEvent.dataTransfer;if(o&&o.files&&o.files.length){var r=o.files[0];if(r&&r.type&&-1!==r.type.indexOf("video")){t.markers.remove(),t.markers.insertAtPoint(i.originalEvent),t.$el.find(".fr-marker").replaceWith(e.FE.MARKERS),t.popups.hideAll();var n=t.popups.get("video.insert");return n||(n=s()),t.popups.setContainer("video.insert",t.$sc),t.popups.show("video.insert",i.originalEvent.pageX,i.originalEvent.pageY),u(),t.opts.videoAllowedTypes.indexOf(r.type.replace(/video\//g,""))>=0?N(o.files):H(_e),i.preventDefault(),i.stopPropagation(),!1}}}function N(e){if(void 0!==e&&e.length>0){if(!1===t.events.trigger("video.beforeUpload",[e]))return!1;var i=e[0];if(i.size>t.opts.videoMaxSize)return H(Ce),!1;if(t.opts.videoAllowedTypes.indexOf(i.type.replace(/video\//g,""))<0)return H(_e),!1;var o;if(t.drag_support.formdata&&(o=t.drag_support.formdata?new FormData:null),o){var r;if(!1!==t.opts.videoUploadToS3){o.append("key",t.opts.videoUploadToS3.keyStart+(new Date).getTime()+"-"+(i.name||"untitled")),o.append("success_action_status","201"),o.append("X-Requested-With","xhr"),o.append("Content-Type",i.type);for(r in t.opts.videoUploadToS3.params)t.opts.videoUploadToS3.params.hasOwnProperty(r)&&o.append(r,t.opts.videoUploadToS3.params[r])}for(r in t.opts.videoUploadParams)t.opts.videoUploadParams.hasOwnProperty(r)&&o.append(r,t.opts.videoUploadParams[r]);o.append(t.opts.videoUploadParam,i);var s=t.opts.videoUploadURL;t.opts.videoUploadToS3&&(s=t.opts.videoUploadToS3.uploadURL?t.opts.videoUploadToS3.uploadURL:"https://"+t.opts.videoUploadToS3.region+".amazonaws.com/"+t.opts.videoUploadToS3.bucket);var n=t.core.getXHR(s,t.opts.videoUploadMethod);n.onload=function(){C.call(n,me)},n.onerror=_,n.upload.onprogress=x,n.onabort=A,u(),t.edit.off();var a=t.popups.get("video.insert");a&&a.off("abortUpload").on("abortUpload",function(){4!=n.readyState&&n.abort()}),n.send(o)}}}function V(i){t.events.$on(i,"dragover dragenter",".fr-video-upload-layer",function(){return e(this).addClass("fr-drop"),!1}),t.events.$on(i,"dragleave dragend",".fr-video-upload-layer",function(){return e(this).removeClass("fr-drop"),!1}),t.events.$on(i,"drop",".fr-video-upload-layer",function(o){o.preventDefault(),o.stopPropagation(),e(this).removeClass("fr-drop");var r=o.originalEvent.dataTransfer;if(r&&r.files){var s=i.data("instance")||t;s.events.disableBlur(),s.video.upload(r.files),s.events.enableBlur()}}),t.events.$on(i,"change",'.fr-video-upload-layer input[type="file"]',function(){if(this.files){var o=i.data("instance")||t;o.events.disableBlur(),i.find("input:focus").blur(),o.events.enableBlur(),o.video.upload(this.files)}e(this).val("")})}function Y(){t.events.on("drop",M,!0),t.events.on("mousedown window.mousedown",L),t.events.on("window.touchmove",P),t.events.on("mouseup window.mouseup",O),t.events.on("commands.mousedown",function(e){e.parents(".fr-toolbar").length>0&&O()}),t.events.on("blur video.hideResizer commands.undo commands.redo element.dropped",function(){O(!0)})}function H(e,i){t.edit.on(),me&&me.find("video").addClass("fr-error"),g(t.language.translate("Something went wrong. Please try again.")),t.events.trigger("video.error",[{code:e,message:xe[e]},i])}function X(){var e="";if(t.opts.videoEditButtons.length>0){e+='<div class="fr-buttons">',e+=t.button.buildList(t.opts.videoEditButtons),e+="</div>";var i={buttons:e},o=t.popups.create("video.edit",i);return t.events.$on(t.$wp,"scroll.video-edit",function(){me&&t.popups.isVisible("video.edit")&&(t.events.disableBlur(),y(me))}),o}return!1}function K(){if(me){var e=t.popups.get("video.size"),i=me.find("iframe, embed, video");e.find('input[name="width"]').val(i.get(0).style.width||i.attr("width")).trigger("change"),e.find('input[name="height"]').val(i.get(0).style.height||i.attr("height")).trigger("change")}}function W(){var e=t.popups.get("video.size");e||(e=j()),c(),t.popups.refresh("video.size"),t.popups.setContainer("video.size",t.$sc);var i=me.find("iframe, embed, video"),o=i.offset().left+i.width()/2,r=i.offset().top+i.height();t.popups.show("video.size",o,r,i.height())}function j(e){if(e)return t.popups.onRefresh("video.size",K),!0;var i="";i='<div class="fr-buttons">'+t.button.buildList(t.opts.videoSizeButtons)+"</div>";var o="";o='<div class="fr-video-size-layer fr-layer fr-active" id="fr-video-size-layer-'+t.id+'"><div class="fr-video-group"><div class="fr-input-line"><input id="fr-video-size-layer-width-'+t.id+'" type="text" name="width" placeholder="'+t.language.translate("Width")+'" tabIndex="1"></div><div class="fr-input-line"><input id="fr-video-size-layer-height-'+t.id+'" type="text" name="height" placeholder="'+t.language.translate("Height")+'" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoSetSize" tabIndex="2" role="button">'+t.language.translate("Update")+"</button></div></div>";var r={buttons:i,size_layer:o},s=t.popups.create("video.size",r);return t.events.$on(t.$wp,"scroll",function(){me&&t.popups.isVisible("video.size")&&(t.events.disableBlur(),y(me))}),s}function q(e){if(void 0===e&&(e=me),e){if(e.hasClass("fr-fvl"))return"left";if(e.hasClass("fr-fvr"))return"right";if(e.hasClass("fr-dvb")||e.hasClass("fr-dvi"))return"center";if("block"==e.css("display")){if("left"==e.css("text-algin"))return"left";if("right"==e.css("text-align"))return"right"}else{if("left"==e.css("float"))return"left";if("right"==e.css("float"))return"right"}}return"center"}function G(e){me.removeClass("fr-fvr fr-fvl"),!t.opts.htmlUntouched&&t.opts.useClasses?"left"==e?me.addClass("fr-fvl"):"right"==e&&me.addClass("fr-fvr"):se(me,J(),e),fe(),F(),r(),t.selection.clear()}function Q(e){if(!me)return!1;e.find("> *:first").replaceWith(t.icon.create("video-align-"+q()))}function Z(e,t){me&&t.find('.fr-command[data-param1="'+q()+'"]').addClass("fr-active").attr("aria-selected",!0)}function J(e){void 0===e&&(e=me);var t=e.css("float");return e.css("float","none"),"block"==e.css("display")?(e.css("float",""),e.css("float")!=t&&e.css("float",t),"block"):(e.css("float",""),e.css("float")!=t&&e.css("float",t),"inline")}function ee(e){me.removeClass("fr-dvi fr-dvb"),!t.opts.htmlUntouched&&t.opts.useClasses?"inline"==e?me.addClass("fr-dvi"):"block"==e&&me.addClass("fr-dvb"):se(me,e,q()),fe(),F(),r(),t.selection.clear()}function te(e,t){me&&t.find('.fr-command[data-param1="'+J()+'"]').addClass("fr-active").attr("aria-selected",!0)}function ie(){var e=t.popups.get("video.insert");e||(e=s()),t.popups.isVisible("video.insert")||(c(),t.popups.refresh("video.insert"),t.popups.setContainer("video.insert",t.$sc));var i=me.offset().left+me.width()/2,o=me.offset().top+me.height();t.popups.show("video.insert",i,o,me.outerHeight())}function oe(){if(me&&!1!==t.events.trigger("video.beforeRemove",[me])){var e=me;t.popups.hideAll(),O(!0),t.selection.setBefore(e.get(0))||t.selection.setAfter(e.get(0)),e.remove(),t.selection.restore(),t.html.fillEmptyBlocks(),t.events.trigger("video.removed",[e])}}function re(){c()}function se(e,i,o){!t.opts.htmlUntouched&&t.opts.useClasses?(e.removeClass("fr-fvl fr-fvr fr-dvb fr-dvi"),e.addClass("fr-fv"+o[0]+" fr-dv"+i[0])):"inline"==i?(e.css({display:"inline-block"}),"center"==o?e.css({"float":"none"}):"left"==o?e.css({"float":"left"}):e.css({"float":"right"})):(e.css({display:"block",clear:"both"}),"left"==o?e.css({textAlign:"left"}):"right"==o?e.css({textAlign:"right"}):e.css({textAlign:"center"}))}function ne(e){e.hasClass("fr-dvi")||e.hasClass("fr-dvb")||(e.addClass("fr-fv"+q(e)[0]),e.addClass("fr-dv"+J(e)[0]))}function ae(e){se(e,e.hasClass("fr-dvb")?"block":e.hasClass("fr-dvi")?"inline":null,e.hasClass("fr-fvl")?"left":e.hasClass("fr-fvr")?"right":q(e)),e.removeClass("fr-dvb fr-dvi fr-fvr fr-fvl")}function de(){t.$el.find("video").filter(function(){return 0===e(this).parents("span.fr-video").length}).wrap('<span class="fr-video" contenteditable="false"></span>'),t.$el.find("embed, iframe").filter(function(){if(t.browser.safari&&this.getAttribute("src")&&this.setAttribute("src",this.src),e(this).parents("span.fr-video").length>0)return!1;for(var i=e(this).attr("src"),o=0;o<e.FE.VIDEO_PROVIDERS.length;o++){var r=e.FE.VIDEO_PROVIDERS[o];if(r.test_regex.test(i)&&new RegExp(t.opts.videoAllowedProviders.join("|")).test(r.provider))return!0}return!1}).map(function(){return 0===e(this).parents("object").length?this:e(this).parents("object").get(0)}).wrap('<span class="fr-video" contenteditable="false"></span>');for(var i=t.$el.find("span.fr-video, video"),o=0;o<i.length;o++){var r=e(i[o]);!t.opts.htmlUntouched&&t.opts.useClasses?(ne(r),t.opts.videoTextNear||r.removeClass("fr-dvi").addClass("fr-dvb")):t.opts.htmlUntouched||t.opts.useClasses||ae(r)}i.toggleClass("fr-draggable",t.opts.videoMove)}function le(){Y(),t.helpers.isMobile()&&(t.events.$on(t.$el,"touchstart","span.fr-video",function(){De=!1}),t.events.$on(t.$el,"touchmove",function(){De=!0})),t.events.on("html.set",de),de(),t.events.$on(t.$el,"mousedown","span.fr-video",function(e){e.stopPropagation()}),t.events.$on(t.$el,"click touchend","span.fr-video",z),t.events.on("keydown",function(i){var o=i.which;return!me||o!=e.FE.KEYCODE.BACKSPACE&&o!=e.FE.KEYCODE.DELETE?me&&o==e.FE.KEYCODE.ESC?(O(!0),i.preventDefault(),!1):me&&o!=e.FE.KEYCODE.F10&&!t.keys.isBrowserAction(i)?(i.preventDefault(),!1):void 0:(i.preventDefault(),oe(),!1)},!0),t.events.on("toolbar.esc",function(){if(me)return t.events.disableBlur(),t.events.focus(),!1},!0),t.events.on("toolbar.focusEditor",function(){if(me)return!1},!0),t.events.on("keydown",function(){t.$el.find("span.fr-video:empty").remove()}),s(!0),j(!0)}function fe(){if(me){t.selection.clear();var e=t.doc.createRange();e.selectNode(me.get(0)),t.selection.get().addRange(e)}}function ve(){me?(t.events.disableBlur(),me.trigger("click")):(t.events.disableBlur(),t.selection.restore(),t.events.enableBlur(),t.popups.hide("video.insert"),t.toolbar.showInline())}function pe(e,i){if(me){var o=t.popups.get("video.size"),r=me.find("iframe, embed, video");r.css("width",e||o.find('input[name="width"]').val()),r.css("height",i||o.find('input[name="height"]').val()),r.get(0).style.width&&r.removeAttr("width"),r.get(0).style.height&&r.removeAttr("height"),o.find("input:focus").blur(),setTimeout(function(){me.trigger("click")},t.helpers.isAndroid()?50:0)}}function ue(){return me}var ce,he,ge,me,be=1,ye=2,Ee=3,we=4,Ce=5,_e=6,xe={};xe[be]="Video cannot be loaded from the passed link.",xe[ye]="No link in upload response.",xe[Ee]="Error during file upload.",xe[we]="Parsing response failed.",xe[Ce]="File is too large.",xe[_e]="Video file type is invalid.",xe[7]="Files can be uploaded only to same domain in IE 8 and IE 9.";var Ae,De;return t.shared.vid_exit_flag=!1,{_init:le,showInsertPopup:o,showLayer:n,refreshByURLButton:a,refreshEmbedButton:d,refreshUploadButton:l,upload:N,insertByURL:m,insertEmbed:b,insert:f,align:G,refreshAlign:Q,refreshAlignOnShow:Z,display:ee,refreshDisplayOnShow:te,remove:oe,hideProgressBar:c,showSizePopup:W,replace:ie,back:ve,setSize:pe,get:ue}},e.FE.RegisterCommand("insertVideo",{title:"Insert Video",undo:!1,focus:!0,refreshAfterCallback:!1,popup:!0,callback:function(){this.popups.isVisible("video.insert")?(this.$el.find(".fr-marker").length&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("video.insert")):this.video.showInsertPopup()},plugin:"video"}),e.FE.DefineIcon("insertVideo",{NAME:"video-camera"}),e.FE.DefineIcon("videoByURL",{NAME:"link"}),e.FE.RegisterCommand("videoByURL",{title:"By URL",undo:!1,focus:!1,toggle:!0,callback:function(){this.video.showLayer("video-by-url")},refresh:function(e){this.video.refreshByURLButton(e)}}),e.FE.DefineIcon("videoEmbed",{NAME:"code"}),e.FE.RegisterCommand("videoEmbed",{title:"Embedded Code",undo:!1,focus:!1,toggle:!0,callback:function(){this.video.showLayer("video-embed")},refresh:function(e){this.video.refreshEmbedButton(e)}}),e.FE.DefineIcon("videoUpload",{NAME:"upload"}),e.FE.RegisterCommand("videoUpload",{title:"Upload Video",undo:!1,focus:!1,toggle:!0,callback:function(){this.video.showLayer("video-upload")},refresh:function(e){this.video.refreshUploadButton(e)}}),e.FE.RegisterCommand("videoInsertByURL",{undo:!0,focus:!0,callback:function(){this.video.insertByURL()}}),e.FE.RegisterCommand("videoInsertEmbed",{undo:!0,focus:!0,callback:function(){this.video.insertEmbed()}}),e.FE.DefineIcon("videoDisplay",{NAME:"star"}),e.FE.RegisterCommand("videoDisplay",{title:"Display",type:"dropdown",options:{inline:"Inline",block:"Break Text"},callback:function(e,t){this.video.display(t)},refresh:function(e){this.opts.videoTextNear||e.addClass("fr-hidden")},refreshOnShow:function(e,t){this.video.refreshDisplayOnShow(e,t)}}),e.FE.DefineIcon("video-align",{NAME:"align-left"}),e.FE.DefineIcon("video-align-left",{NAME:"align-left"}),e.FE.DefineIcon("video-align-right",{NAME:"align-right"}),e.FE.DefineIcon("video-align-center",{NAME:"align-justify"}),e.FE.DefineIcon("videoAlign",{NAME:"align-center"}),e.FE.RegisterCommand("videoAlign",{type:"dropdown",title:"Align",options:{left:"Align Left",center:"None",right:"Align Right"},html:function(){var t='<ul class="fr-dropdown-list" role="presentation">',i=e.FE.COMMANDS.videoAlign.options;for(var o in i)i.hasOwnProperty(o)&&(t+='<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="videoAlign" data-param1="'+o+'" title="'+this.language.translate(i[o])+'">'+this.icon.create("video-align-"+o)+'<span class="fr-sr-only">'+this.language.translate(i[o])+"</span></a></li>");return t+="</ul>"},callback:function(e,t){this.video.align(t)},refresh:function(e){this.video.refreshAlign(e)},refreshOnShow:function(e,t){this.video.refreshAlignOnShow(e,t)}}),e.FE.DefineIcon("videoReplace",{NAME:"exchange"}),e.FE.RegisterCommand("videoReplace",{title:"Replace",undo:!1,focus:!1,popup:!0,refreshAfterCallback:!1,callback:function(){this.video.replace()}}),e.FE.DefineIcon("videoRemove",{NAME:"trash"}),e.FE.RegisterCommand("videoRemove",{title:"Remove",callback:function(){this.video.remove()}}),e.FE.DefineIcon("videoSize",{NAME:"arrows-alt"}),e.FE.RegisterCommand("videoSize",{undo:!1,focus:!1,popup:!0,title:"Change Size",callback:function(){this.video.showSizePopup()}}),e.FE.DefineIcon("videoBack",{NAME:"arrow-left"}),e.FE.RegisterCommand("videoBack",{title:"Back",undo:!1,focus:!1,back:!0,callback:function(){this.video.back()},refresh:function(e){this.video.get()||this.opts.toolbarInline?(e.removeClass("fr-hidden"),e.next(".fr-separator").removeClass("fr-hidden")):(e.addClass("fr-hidden"),e.next(".fr-separator").addClass("fr-hidden"))}}),e.FE.RegisterCommand("videoDismissError",{title:"OK",undo:!1,callback:function(){this.video.hideProgressBar(!0)}}),e.FE.RegisterCommand("videoSetSize",{undo:!0,focus:!1,title:"Update",refreshAfterCallback:!1,callback:function(){this.video.setSize()}})});