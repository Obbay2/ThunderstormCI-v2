/*! 
* DevExpress Exporter (part of ChartJS)
* Version: 13.2.7
* Build date: Feb 10, 2014
*
* Copyright (c) 2012 - 2014 Developer Express Inc. ALL RIGHTS RESERVED
* EULA: http://chartjs.devexpress.com/EULA
*/
"use strict";DevExpress.MOD_TMP_WIDGETS_FOR_EXPORTER||(function(n,t){var e=t.ui,d=t.utils,r=e.events,o="<div />",a="<ul />",s="bottom",u="dxMenu",f="dxMenuItem",v=50,g=r.addNamespace("dxclick",u),y=r.addNamespace("mouseenter",u),p=r.addNamespace("mouseleave",u),nt=r.addNamespace("dxpointerdown",u),h=r.addNamespace("mousemove",u),w="dx-menu-item-items-over",c="dx-menu-item-hovered",l="dx-menu-item-highlight",b="dx-menu-item-disabled",k=t.Class.inherit({_addItems:function(t){var i=this;n.each(t.items,function(n,t){var r=new k(t,i);i._items.push(r)})},_createOverlay:function(n,i,r){var u=this;return n.dxOverlay({targetContainer:i,closeOnOutsideClick:!0,closeOnTargetScroll:!0,position:{offset:u._calculateOffset(r),my:t.inverseAlign(u._horizontalExpandDirection)+" "+t.inverseAlign(u._verticalExpandDirection),at:r?t.inverseAlign(u._horizontalExpandDirection)+" "+u._verticalExpandDirection:u._horizontalExpandDirection+" "+t.inverseAlign(u._verticalExpandDirection),of:u._$item,collision:"flip"},showTitle:!1,width:"auto",height:"auto",shading:!1,deferRendering:!1,animation:{show:{type:"fade",from:0,to:1,duration:v},hide:{type:"fade",from:1,to:0,delay:0,duration:0}},positionedAction:function(n){var i=u._parent._horizontalExpandDirection||u._horizontalExpandDirection,r=n.component.content().children();u._horizontalExpandDirection=n.position.h.flip?t.inverseAlign(i):i,u._$item.offset().top>u._overlay.content().offset().top&&u._$item.addClass(w)},showingAction:function(){r&&u._overlay.content().css("min-width",u._$item.outerWidth()),u._$item.addClass(c)},hiddenAction:function(){u._$item.removeClass(c).removeClass(w)}}).dxOverlay("instance")},_drawItem:function(){var t=this,u="<span />",i=n(o).addClass("dx-menu-item"),r,f,e;return(t.options.imageUrl||t.options.imageCSS)&&(r=n(u).addClass("dx-menu-image"),t.options.imageUrl&&r.append('<img src="'+t.options.imageUrl+'" />'),t.options.imageCSS&&r.addClass(t.options.imageCSS),i.append(r)),t.options.caption&&(f=n(u).addClass("dx-menu-caption").text(t.options.caption),i.append(f)),t._items.length&&(e=n(u).addClass("dx-menu-chouser-down"),i.append(e)),t.options.disabled&&i.addClass(b),i},_draw:function(t,i){var r=this,e,s=n(o),h=n(a),u=n("<li />");s.append(h),e=r._drawItem(),r._$item=e,r._$rootItem=u,u.append(e),u.data(f,r),t.append(u),r._items.length&&(u.append(s),r._overlay=r._createOverlay(s,u,i)),n.each(r._items,function(n,t){t._draw(r._overlay.content().children(),!1)})},_hideAllChildren:function(){n.each(this._items,function(){this._togglePopup(!1),this._hideAllChildren()})},_togglePopup:function(n){var i=this;!i.options.disabled&&i._overlay&&(i._visible||(i._hideAllChildren(),i._parent._visible&&i._overlay.option("position",{offset:i._calculateOffset(!1),my:t.inverseAlign(i._parent._horizontalExpandDirection)+" "+t.inverseAlign(i._verticalExpandDirection),at:i._parent._horizontalExpandDirection+" "+t.inverseAlign(i._verticalExpandDirection)})),i._overlay.toggle(n),i._visible=i._$item.hasClass(c))},_showPopupOnHoverStay:function(){function t(){Math.abs(n._pX-n._X)+Math.abs(n._pY-n._Y)<3?(n._togglePopup(!0),n._$rootItem.off(h)):n.compareTimer=setTimeout(function(){t()},v),n._pX=n._X,n._pY=n._Y}var n=this;n._$rootItem.on(h,function(t){n._X=t.pageX,n._Y=t.pageY});n.compareTimer=setTimeout(function(){t()})},_calculateOffset:function(n){var t=this,r,u,i=(t._$rootItem.innerWidth()-t._$rootItem.width())/2,f=(t._$rootItem.parent().outerWidth()-t._$rootItem.parent().innerWidth())/2;return n?(r=0,u=t._parent._verticalExpandDirection===s?-1:1):(r=t._parent._horizontalExpandDirection==="right"?i:-i,u=t._parent._verticalExpandDirection===s?-(f+i):f+i),r+" "+u},toggleItemEnabledState:function(n){this.options.disabled=d.isDefined(n)?n:!this.options.disabled,this._$item.toggleClass(b,n)},ctor:function(n,t){var i=this;i.options=n||{},i.options.disabled=n.disabled||!1,i._items=[],i._parent=t,i._horizontalExpandDirection=n.horizontalExpandDirection||t._horizontalExpandDirection,i._verticalExpandDirection=n.verticalExpandDirection||t._verticalExpandDirection,n.items&&n.items.length&&i._addItems(n)}});e.registerComponent("dxMenu",e.Widget.inherit({_init:function(){var n=this.option(["items","name","verticalExpandDirection","horizontalExpandDirection"]);this._mainMenuItem=new k(n)},_defaultOptions:function(){return{verticalExpandDirection:s,horizontalExpandDirection:"right",highlightActiveItem:!1,showPopupMode:"onhover",orientation:"horizontal"}},addItems:function(n){this._mainMenuItem._addItems(n),this._render()},_render:function(){var t=this,u=t.option("orientation")!=="vertical",r=t._element(),i=n(a),f=n(o).append(i);u?i.addClass("dx-menu-horizontal"):i.addClass("dx-menu-vertical"),r.addClass("dx-menu"),t._highlightActiveItem=t.option("highlightActiveItem"),t._clickAction=t._createActionByOption("itemClickAction"),r.append(f),t._resubscribeEventHandlers(r,"li"),n.each(t._mainMenuItem._items,function(n,t){t._draw(i,u)}),t._highlightActiveItem&&(t._$highlightedElement=t._mainMenuItem._items[0]._items[0]._$item,t._$highlightedElement.addClass(l))},_resubscribeEventHandlers:function(n,t){var r=this,u=r.option("showPopupMode")||"",i={};switch(u.toLowerCase()){case"onclick":break;case"onhoverstay":i[y]=r._itemOnHoverStayHandler(!0),i[p]=r._itemOnHoverStayHandler(!1);break;default:i[y]=r._itemOnHoverHandler(!0),i[p]=r._itemOnHoverHandler(!1)}i[nt]=function(n){n.stopPropagation()},i[g]=r._itemOnClickHandler();n.off(".dxMenu").on(i,t)},_itemOnHoverHandler:function(t){return function(){var i=n(this).data(f);i._togglePopup(t)}},_itemOnHoverStayHandler:function(t){return function(){var i=n(this).data(f);t?i._showPopupOnHoverStay():(clearTimeout(i.compareTimer),i._$rootItem.off(h),i._togglePopup(!1))}},_itemOnClickHandler:function(){var t=this;return function(i){var r=n(this).data(f);r._$item[0].contains(i.target)&&(r._overlay&&!r._overlay.option("visible")&&r._parent._hideAllChildren(),r._togglePopup()),r.options.disabled||r._items.length||(t._highlightActiveItem&&(t._$highlightedElement.removeClass(l),t._$highlightedElement=r._$item,t._$highlightedElement.addClass(l)),t._clickAction({item:r,itemElement:r._$item}),t._mainMenuItem._hideAllChildren())}}}))}(jQuery,DevExpress),function(n,t,i){var f=t.ui,o=t.utils,u=f.events,r="dx-overlay",h=r+"-wrapper",c=r+"-content",e=r+"-shader",l=r+"-modal",a=500,s=["showingAction","shownAction","hidingAction","hiddenAction","positioningAction","positionedAction"],v=1e3,y="dx-state-disabled";f.registerComponent("dxOverlay",f.ContainerWidget.inherit({_defaultOptions:function(){return n.extend(this.callBase(),{activeStateEnabled:!1,visible:!1,shading:!0,closeOnOutsideClick:!1,closeOnTargetScroll:!1,position:{my:"center",at:"center",of:window},animation:{show:{type:"pop",duration:400},hide:{type:"pop",duration:400,to:{opacity:0,scale:0},from:{opacity:1,scale:1}}},showingAction:null,shownAction:null,hidingAction:null,hiddenAction:null,width:function(){return n(window).width()*.8},height:function(){return n(window).height()*.8},deferRendering:!0,disabled:!1,targetContainer:i,positioningAction:null,positionedAction:null})},_optionsByReference:function(){return n.extend(this.callBase(),{animation:!0})},_wrapper:function(){return this._$wrapper},_clickEventContainer:function(){return this._$container},_init:function(){this.callBase(),this._actions={},this._deferredAnimate=i,this._attachCloseOnOutsideClickHandler(),this._windowResizeCallback=n.proxy(this._repaint,this),o.windowResizeCallbacks.add(this._windowResizeCallback),this._$wrapper=n("<div>").addClass(h)},_initOptions:function(n){this._setTargetContainer(n.targetContainer),this._backButtonHandler=n.backButtonHandler!==i?this.backButtonHandler:this._defaultBackButtonHandler,this.callBase(n)},_setTargetContainer:function(r){r=r===i?t.overlayTargetContainer():r;var f=this._element(),u=f.closest(r);u.length||(u=n(r).first()),this._$targetContainer=u.length?u:f.parent()},_closeOnOutsideClickHandler:function(t){var i=this.option("closeOnOutsideClick"),u=this.option("visible");if(n.isFunction(i)&&(i=i(t)),i&&u){var r=this._$container,f=!r.is(t.target)&&!n.contains(r.get(0),t.target),e=Math.abs(t.timeStamp-this._showTimestamp)<a;f&&!e&&this.hide()}},_attachCloseOnOutsideClickHandler:function(){var t=this,i=u.addNamespace("dxpointerdown",t.NAME);this._myCloseOnOutsideClickHandler=function(){return t._closeOnOutsideClickHandler.apply(t,arguments)};n(document).on(i,this._myCloseOnOutsideClickHandler)},_detachCloseOnOutsideClickHandler:function(){var t=u.addNamespace("dxpointerdown",this.NAME);n(document).off(t,this._myCloseOnOutsideClickHandler)},_render:function(){var t=this._element(),i=this.option("deferRendering");this._$container=n("<div>").addClass(c),this._$wrapper.addClass(t.attr("class")),this._renderActions(),this.callBase(),this._renderStyles(),t.addClass(r)},_renderStyles:function(){this._renderShader(),this._renderModalState(),this._renderDimensions(),this._renderVisibility()},_renderShader:function(){this._$wrapper.toggleClass(e,this.option("shading"))},_renderModalState:function(){this._$wrapper.toggleClass(l,this.option("shading")&&!this.option("targetContainer"))},_renderDimensions:function(){this._$container.width(this.option("width")).height(this.option("height"))},_renderVisibility:function(){var n=this.option("visible");t.fx.stop(this._$container,!0),n&&(this._renderContent(),this._renderPosition()),this._toggleVisibility(n)},_renderActions:function(){var t=this;n.each(s,function(n,i){t._actions[i]=t._createActionByOption(i)})},_renderContent:function(){this._contentAlreadyRendered||!this.option("visible")&&this.option("deferRendering")||(this._contentAlreadyRendered=!0,this._moveFromTargetContainer(),this.callBase())},_moveFromTargetContainer:function(){this._$container.appendTo(this._element()),this._detachWrapperToTargetContainer()},_detachWrapperToTargetContainer:function(){this._$wrapper.detach()},_renderContentImpl:function(n){this._renderInnerContent(n),this._moveToTargetContainer()},_renderInnerContent:function(n){var t=this._element();this._$container.append(t.contents()).appendTo(t),(n||this._templates.template).render(this.content())},_moveToTargetContainer:function(){this._attachWrapperToTargetContainer(),this._$container.appendTo(this._$wrapper)},_attachWrapperToTargetContainer:function(){var n=this._element();!this._$targetContainer||this._$targetContainer[0]===n.parent()[0]?this._$wrapper.appendTo(n):this._$wrapper.appendTo(this._$targetContainer)},_renderPosition:function(){var f=this.option("position"),r,i,u,e;this.option("shading")&&(r=this._$wrapper.show(),i=n(f.of),t.position(r,{my:"top left",at:"top left",of:i}),r.css({width:i.outerWidth(),height:i.outerHeight()})),this._$container.css("transform","none"),u=t.calculatePosition(this._$container,f),this._actions.positioningAction({position:u}),e=t.position(this._$container,u),this._actions.positionedAction({position:e})},_subscribeParentScroll:function(){var i=this,r=this.option("closeOnTargetScroll"),t=this.option("position");if(r&&t&&t.of)n(t.of).parents().on(u.addNamespace("scroll",i.NAME),function(n){n.overlayProcessed||(n.overlayProcessed=!0,i.hide())})},_unsubscribeParentScroll:function(){var i=this,r=this.option("closeOnTargetScroll"),t=this.option("position");r&&t&&t.of&&n(t.of).parents().off(u.addNamespace("scroll",i.NAME))},_clean:function(){delete this._contentAlreadyRendered},_refresh:function(){this._renderStyles()},_repaint:function(){this.option("visible")&&(this._renderDimensions(),this._renderPosition())},_dispose:function(){t.fx.stop(this._$container),o.windowResizeCallbacks.remove(this._windowResizeCallback),this.closeCallback&&t.backButtonCallback.remove(this.closeCallback),this._detachCloseOnOutsideClickHandler(),this._actions=null,this.callBase(),this._$wrapper.remove(),this._$container.remove()},_renderVisibilityAnimate:function(){var i=this.option("visible");i&&(this._showTimestamp=n.now()),t.fx.stop(this._$container,!0),i?this._makeVisible():this._makeHidden()},_makeVisible:function(){var t=this,i=t.option("animation")||{},r;this._$wrapper.css("z-index",++v),this._actions.showingAction(),this._toggleVisibility(!0),this._renderContent(),this._renderPosition(),i.show?(r=i.show.complete||n.noop,t._animate(n.extend({},i.show,{complete:function(){r.apply(this,arguments),t._notifyShowComplete()}}))):t._notifyShowComplete()},_notifyShowComplete:function(){this._actions.shownAction(),this._deferredAnimate&&this._deferredAnimate.resolveWith(this)},_makeHidden:function(){var t=this,i=this.option("animation")||{},r;this._actions.hidingAction(),this._$wrapper.toggleClass(e,!1),i.hide?(r=i.hide.complete||n.noop,t._animate(n.extend({},i.hide,{complete:function(){t._toggleVisibility(!1),r.apply(this,arguments),t._notifyHideComplete()}}))):(t._toggleVisibility(!1),t._notifyHideComplete())},_notifyHideComplete:function(){this._actions.hiddenAction(),this._deferredAnimate&&this._deferredAnimate.resolveWith(this)},_animate:function(i){n.isPlainObject(i)&&t.fx.animate(this._$container,i)},_toggleVisibility:function(n){n&&(this._moveToTargetContainer(),this._subscribeParentScroll()),this._$container.toggle(n),n||(this._moveFromTargetContainer(),this._unsubscribeParentScroll()),this._$wrapper.toggleClass(e,this.option("shading")&&n)},_defaultBackButtonHandler:function(){this.hide()},_toggleBackButtonCallback:function(){this._backButtonHandler&&(this.option("visible")?(this.closeCallback=n.proxy(this._backButtonHandler,this),t.backButtonCallback.add(this.closeCallback)):this.closeCallback&&t.backButtonCallback.remove(this.closeCallback))},_toggleDisabledState:function(n){this.callBase.apply(this,arguments),this._$container.toggleClass(y,n)},_optionChanged:function(t,i){if(n.inArray(t,s)>-1){this._renderActions();return}switch(t){case"position":this.option("visible")&&this._renderPosition();break;case"visible":this._toggleBackButtonCallback(),this._renderVisibilityAnimate();break;case"targetContainer":this._setTargetContainer(i),this._moveToTargetContainer(),this._renderStyles();break;case"closeOnOutsideClick":break;default:this.callBase.apply(this,arguments)}},toggle:function(t){return(t=t===i?!this.option("visible"):t,t===this.option("visible"))?n.Deferred().resolve().promise():(this._deferredAnimate=n.Deferred(),this.option("visible",t),this._deferredAnimate.promise())},show:function(){return this.toggle(!0)},hide:function(){return this.toggle(!1)},content:function(){return this._$container},repaint:function(){this._repaint()}}))}(jQuery,DevExpress),DevExpress.MOD_TMP_WIDGETS_FOR_EXPORTER=!0);DevExpress.MOD_TMP_EXPORTER||(function(n,t){var i=n.ui,h=n.utils,r="file",c="body",e="dx-exporter-icon-to",o="dx-exporter-icon-print",l="dx-non-printable",a="dx-printable",u=["PDF","PNG","SVG"],s=n.viz.core,f=i.Component.inherit({_normalizeHtml:function(n){return s.widgetMarkupMixin._normalizeHtml(n)},_getSvgElements:function(){var n=this,i=[];return t(t(n.option("sourceContainerId"))).find("svg").each(function(r){i[r]=n._normalizeHtml(t(this).clone().wrap("<div><\/div>").parent().html())}),JSON.stringify(i)},_appendTextArea:function(n,i,r){t("<textarea/>",{id:n,name:n,val:i}).appendTo(r)},_formSubmit:function(n){n.submit(),n.remove()},_defaultOptions:function(){return{menuAlign:"right",exportFormat:u,printingEnabled:!0,fileName:r}},_createWindow:function(){return window.open("","printDiv","")},_createExportItems:function(n){var i=this;return t.map(n,function(n){return(n=n.toUpperCase(),t(t(i.option("sourceContainerId"))).find("svg").length>1&&n==="SVG")?null:t.inArray(n.toUpperCase(),u)===-1?null:{name:n,caption:n+" "+r}})},_render:function(){var n=this,u=n.option("fileName"),f=n._createExportItems(n.option("exportFormat")),i=t("<div />"),r=[{name:"export",imageCSS:e,items:f}],s={align:n.option("menuAlign"),items:r,itemClickAction:function(t){switch(t.item.options.name){case"print":n.print();break;default:n.exportTo(u,t.item.options.name)}}};n.option("printingEnabled")&&r.push({imageCSS:o,name:"print",click:function(){n.print()}}),i.dxMenu(s),n._$element.empty(),n._$element.append(i)},print:function(){var i=t(this.option("sourceContainerId")).html(),n=this._createWindow();t(n.document.body).html(i),n.document.close(),n.focus(),n.print(),n.close()},exportTo:function(n,i){var r=this,f=t(r.option("sourceContainerId")),u=t("<form/>",{method:"POST",action:r.option("serverUrl"),enctype:"application/x-www-form-urlencoded",target:"_self",css:{display:"none",visibility:"hidden"}});r._appendTextArea("exportContent",f.clone().wrap("<div><\/div>").parent().html(),u),r._appendTextArea("svgElements",r._getSvgElements(),u),r._appendTextArea("fileName",n,u),r._appendTextArea("format",i.toLowerCase(),u),r._appendTextArea("width",f.width(),u),r._appendTextArea("height",f.height(),u),r._appendTextArea("url",window.location.host,u),t(document.body).append(u),r._formSubmit(u)}});t.extend(!0,n,{exporter:{Exporter:f}}),i.registerComponent("dxExporter",f)}(DevExpress,jQuery),DevExpress.MOD_TMP_EXPORTER=!0);