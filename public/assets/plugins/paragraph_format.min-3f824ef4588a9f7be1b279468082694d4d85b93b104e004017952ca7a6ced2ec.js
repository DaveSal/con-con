!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(t,e){return void 0===e&&(e="undefined"!=typeof window?require("jquery"):require("jquery")(t)),a(e)}:a(window.jQuery)}(function(a){a.extend(a.FE.DEFAULTS,{paragraphFormat:{N:"Normal",H1:"Heading 1",H2:"Heading 2",H3:"Heading 3",H4:"Heading 4",PRE:"Code"},paragraphFormatSelection:!1}),a.FE.PLUGINS.paragraphFormat=function(t){function e(e,r){var n=t.html.defaultTag();if(r&&r.toLowerCase()!=n)if(e.find("ul, ol").length>0){var o=a("<"+r+">");e.prepend(o);for(var i=t.node.contents(e.get(0))[0];i&&["UL","OL"].indexOf(i.tagName)<0;){var l=i.nextSibling;o.append(i),i=l}}else e.html("<"+r+">"+e.html()+"</"+r+">")}function r(e,r){var n=t.html.defaultTag();r||(r='div class="fr-temp-div" data-empty="true"'),r.toLowerCase()==n?e.replaceWith(e.html()):e.replaceWith(a("<"+r+">").html(e.html()))}function n(e,r){var n=t.html.defaultTag();r||(r='div class="fr-temp-div"'+(t.node.isEmpty(e.get(0),!0)?' data-empty="true"':"")),r.toLowerCase()==n?(t.node.isEmpty(e.get(0),!0)||e.append("<br/>"),e.replaceWith(e.html())):e.replaceWith(a("<"+r+">").html(e.html()))}function o(e,r){r||(r='div class="fr-temp-div"'+(t.node.isEmpty(e.get(0),!0)?' data-empty="true"':"")),e.replaceWith(a("<"+r+" "+t.node.attributes(e.get(0))+">").html(e.html()))}function i(i){"N"==i&&(i=t.html.defaultTag()),t.selection.save(),t.html.wrap(!0,!0,!0,!0),t.selection.restore();var l=t.selection.blocks();t.selection.save(),t.$el.find("pre").attr("skip",!0);for(var p=0;p<l.length;p++)if(l[p].tagName!=i&&!t.node.isList(l[p])){var s=a(l[p]);"LI"==l[p].tagName?e(s,i):"LI"==l[p].parentNode.tagName&&l[p]?r(s,i):["TD","TH"].indexOf(l[p].parentNode.tagName)>=0?n(s,i):o(s,i)}t.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function(){a(this).prev().append("<br>"+a(this).html()),a(this).remove()}),t.$el.find("pre").removeAttr("skip"),t.html.unwrap(),t.selection.restore()}function l(a,e){var r=t.selection.blocks();if(r.length){var n=r[0],o="N",i=t.html.defaultTag();n.tagName.toLowerCase()!=i&&n!=t.el&&(o=n.tagName),e.find('.fr-command[data-param1="'+o+'"]').addClass("fr-active").attr("aria-selected",!0)}else e.find('.fr-command[data-param1="N"]').addClass("fr-active").attr("aria-selected",!0)}function p(a){if(t.opts.paragraphFormatSelection){var e=t.selection.blocks();if(e.length){var r=e[0],n="N",o=t.html.defaultTag();r.tagName.toLowerCase()!=o&&r!=t.el&&(n=r.tagName),["LI","TD","TH"].indexOf(n)>=0&&(n="N"),a.find("> span").text(t.opts.paragraphFormat[n])}else a.find("> span").text(t.opts.paragraphFormat.N)}}return{apply:i,refreshOnShow:l,refresh:p}},a.FE.RegisterCommand("paragraphFormat",{type:"dropdown",displaySelection:function(a){return a.opts.paragraphFormatSelection},defaultSelection:"Normal",displaySelectionWidth:100,html:function(){var a='<ul class="fr-dropdown-list" role="presentation">',t=this.opts.paragraphFormat;for(var e in t)if(t.hasOwnProperty(e)){var r=this.shortcuts.get("paragraphFormat."+e);r=r?'<span class="fr-shortcut">'+r+"</span>":"",a+='<li role="presentation"><'+("N"==e?this.html.defaultTag()||"DIV":e)+' style="padding: 0 !important; margin: 0 !important;" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="paragraphFormat" data-param1="'+e+'" title="'+this.language.translate(t[e])+'">'+this.language.translate(t[e])+"</a></"+("N"==e?this.html.defaultTag()||"DIV":e)+"></li>"}return a+="</ul>"},title:"Paragraph Format",callback:function(a,t){this.paragraphFormat.apply(t)},refresh:function(a){this.paragraphFormat.refresh(a)},refreshOnShow:function(a,t){this.paragraphFormat.refreshOnShow(a,t)},plugin:"paragraphFormat"}),a.FE.DefineIcon("paragraphFormat",{NAME:"paragraph"})});