/*
 *  velte v1.0.4
 *  A small, fast, easy-to-use Frontend library for Modern Apps.
 *  Copyright (c) 2022 Emmanuel Oni
 *  Licence - https://github.com/RoDDy18/velte/blob/main/LICENSE
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('snabbdom')) :
    typeof define === 'function' && define.amd ? define(['exports', 'snabbdom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.velte = {}, global.snabbdom));
})(this, (function (exports, snabbdom) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var snabbdom__namespace = /*#__PURE__*/_interopNamespace(snabbdom);

    var VELTE_VERSION = "1.0.4";

    const VelteElement = (dom,traits={},...children)=>{

        traits = traits || {};
        const eventTraits = {};
        const dataTraits = {};
        const styleTraits = {};
        const attributeTraits = {};

        for(const traitKey in traits){
            if(traitKey.startsWith("v-on:")){
                const events = traitKey.substring(5).toLowerCase();
                eventTraits[events] = traits[traitKey];
            }else {
                if(traitKey == "style"){
                    styleTraits[traitKey] = traits[traitKey];
                }else if(traitKey.startsWith("v-attr:")){
                    const attribute = traitKey.substring(7).toLowerCase();
                    attributeTraits[attribute] = traits[traitKey];
                }else {
                    dataTraits[traitKey] = traits[traitKey];
                }
            }
        }
        
        if(dom.prototype && dom.prototype.isVelteClassComponent){

            const componentInstance = new dom(traits);
            componentInstance.__VNode = componentInstance.render();

            componentInstance.__VNode.data.hook = {
                init:()=>componentInstance.velteCreated(),
                create:()=> componentInstance.velteMounted(),
                update:()=> componentInstance.velteUpdated(),
                remove:()=> componentInstance.velteDestroyed()
            };
            return componentInstance.__VNode
        }
        
        if(typeof dom == "function"){
            return dom(traits)
        }

        const traitType = {props:dataTraits, on:eventTraits, style:styleTraits.style, attrs:attributeTraits};
        return snabbdom.h(dom,traitType,children)
    };

    class VelteComponent{
        constructor(traits){
            this.traits = traits;
            this.state = null;
            
        }

        reactToState(){
            Velte.__updater(this);
        }

        setState(updatedState){
            this.state = {...this.state,...updatedState};
            Velte.__updater(this);
        }

        velteExit(){ return }

        velteCreated(){}

        velteMounted(){}

        velteUpdated(){}

        velteDestroyed(){}

        render(){}
    }

    VelteComponent.prototype.isVelteClassComponent = true;

    const Velte = {
        VelteElement,
        VelteComponent,
        VELTE_VERSION
    };

    const reconcile = snabbdom__namespace.init([snabbdom.propsModule,snabbdom.eventListenersModule,snabbdom.styleModule,snabbdom.attributesModule]);

    let rootVNode;
    const VelteRender = (element, rootDomElement)=>{
        if(rootVNode == null){
            rootVNode = rootDomElement;
        }
        rootVNode = reconcile(rootVNode, element);
    };

    Velte.__updater = (componentInstance)=>{
        
        const oldVNode = componentInstance.__VNode;

        const newVNode = componentInstance.render();

        componentInstance.__VNode = reconcile(oldVNode, newVNode);
    };

    var velte = {
        VelteElement,
        VelteComponent,
        VelteRender,
        VELTE_VERSION
    };

    exports.VELTE_VERSION = VELTE_VERSION;
    exports.VelteComponent = VelteComponent;
    exports.VelteElement = VelteElement;
    exports.VelteRender = VelteRender;
    exports["default"] = velte;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
