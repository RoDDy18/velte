/*
 *  velte v2.0.0-alpha.1
 *  A lightweight, performant, event-driven Frontend framework for Modern Apps.
 *  Copyright (c) 2023 Emmanuel Oni
 *  Licence - https://github.com/RoDDy18/velte/blob/main/LICENSE
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('snabbdom'), require('mergician')) :
  typeof define === 'function' && define.amd ? define(['exports', 'snabbdom', 'mergician'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.velte = {}, global.snabbdom, global.mergician));
})(this, (function (exports, snabbdom, mergician) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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
  var mergician__default = /*#__PURE__*/_interopDefaultLegacy(mergician);

  class PubSub {
    constructor() {
      this.events = {};
    }

    subscribe(event, callback = () => {}) {
      if (!this.events.hasOwnProperty(event)) {
        this.events[event] = [];
      }

      return this.events[event].push(callback);
    }

    publish(event, data = {}) {
      if (!this.events.hasOwnProperty(event)) {
        return [];
      }

      return this.events[event].map((callback) => callback(data));
    }
  }

  class velX {
    constructor(
      params = { actions: {}, mutations: {}, state: {}, devTools: false, strictMode: true }
    ) {
      let self = this;
      self.actions = {};
      self.mutations = {};
      self.state = {};
      self.status = "resting";
      self.devTools = false;
      self.strictMode = true;
      self.events = new PubSub();

      if (params.hasOwnProperty("actions")) {
        self.actions = params.actions;
      }

      if (params.hasOwnProperty("mutations")) {
        self.mutations = params.mutations;
      }

      if (params.hasOwnProperty("devTools")) {
        self.devTools = params.devTools;
      }

      if(params.hasOwnProperty("strictMode")) {
        self.strictMode = params.strictMode;
      }

      self.state = new Proxy(params.state || {}, {
        set: function (state, key, value) {
          state[key] = value;
          console.log(value);

          if (self.devTools) {
            console.log(`velX: stateChange: "${key}" : ${value}`);
          }

          if (self.status !== "mutation") {
            console.warn(`velX: You should use a mutation to set "${key}"`);
            if(self.strictMode === true){
              return false;
            }
          }

          self.events.publish("stateChange", self.state);

          return true;
        },
      });
    }

    dispatch(actionKey, payload) {
      let self = this;

      if (typeof self.actions[actionKey] !== "function") {
        console.error(`velX: Action "${actionKey}" doesn't exist.`);
        return false;
      }

      if (self.devTools) {
        console.groupCollapsed(`ACTION: ${actionKey}`);

        self.status = "action";

        self.actions[actionKey](self, payload);

        console.groupEnd();
      } else {
        self.status = "action";

        self.actions[actionKey](self, payload);
      }

      return true;
    }

    commit(mutationKey, payload) {
      let self = this;

      if (typeof self.mutations[mutationKey] !== "function") {
        console.error(`velX: Mutation "${mutationKey}" doesn't exist.`);
        return false;
      }

      if(self.status !== "action") {
          console.warn(`velX: You should commit "${mutationKey}" mutation from action`);
          if(self.strictMode === true){
            return false;
          }
      }

      self.status = "mutation";

      let newState = self.mutations[mutationKey](self.state, payload);

      self.state = Object.assign(self.state, newState);

      self.status = "resting";

      return true;
    }
  }

  //import PubSub from "./velx/pubsub"
  //const event = new PubSub()

  var VELTE_VERSION = "2.0.0-alpha.1";

  const VelteElement = (dom, traits = {}, ...children) => {
    children = children.flat(2);

    if (dom === "v-wrap") {
      return snabbdom.fragment([...children]);
    }

    traits = traits || {};
    const eventTraits = {};
    const dataTraits = {};
    const styleTraits = {};
    const attributeTraits = {};

    if (
      dom === "svg" ||
      dom === "path" ||
      dom === "rect" ||
      dom === "animate" ||
      dom === "animateMotion" ||
      dom === "animateTransform" ||
      dom === "circle" ||
      dom === "clipPath" ||
      dom === "cursor" ||
      dom === "defs" ||
      dom === "desc" ||
      dom === "ellipse" ||
      dom === "feBlend" ||
      dom === "feColorMatrix" ||
      dom === "feComponentTransfer" ||
      dom === "feComposite" ||
      dom === "feConvolveMatrix" ||
      dom === "feDiffuseLighting" ||
      dom === "feDisplacementMap" ||
      dom === "feDistantLight" ||
      dom === "feDropShadow" ||
      dom === "feFlood" ||
      dom === "feDisplacementMap" ||
      dom === "feFuncA" ||
      dom === "feFuncB" ||
      dom === "feFuncG" ||
      dom === "feFuncR" ||
      dom === "feGaussianBlur" ||
      dom === "feImage" ||
      dom === "feMerge" ||
      dom === "feMergeNode" ||
      dom === "feMorphology" ||
      dom === "feOffset" ||
      dom === "fePointLight" ||
      dom === "feSpecularLighting" ||
      dom === "feSpotLight" ||
      dom === "feTile" ||
      dom === "feTurbulence" ||
      dom === "filter" ||
      dom === "font-face-format" ||
      dom === "font-face-name" ||
      dom === "font-face-src" ||
      dom === "font-face-uri" ||
      dom === "font-face" ||
      dom === "font" ||
      dom === "foreignObject" ||
      dom === "g" ||
      dom === "glyph" ||
      dom === "glyphRef" ||
      dom === "hkern" ||
      dom === "image" ||
      dom === "line" ||
      dom === "linearGradient" ||
      dom === "marker" ||
      dom === "mask" ||
      dom === "metadata" ||
      dom === "missing-glyph" ||
      dom === "m-path" ||
      dom === "pattern" ||
      dom === "polygon" ||
      dom === "polyline" ||
      dom === "radialGradient" ||
      dom === "script" ||
      dom === "set" ||
      dom === "stop" ||
      dom === "style" ||
      dom === "switch" ||
      dom === "symbol" ||
      dom === "text" ||
      dom === "textPath" ||
      dom === "title" ||
      dom === "tref" ||
      dom === "tspan" ||
      dom === "use" ||
      dom === "view" ||
      dom === "vkern"
    ) {
      for (const traitKey in traits) {
        if (traitKey.startsWith("v-on:")) {
          const events = traitKey.substring(5).toLowerCase();
          eventTraits[events] = traits[traitKey];
        } else {
          attributeTraits[traitKey] = traits[traitKey];
        }
      }
      const traitType = {
        on: eventTraits,
        attrs: attributeTraits,
      };
      return snabbdom.h(dom, traitType, children);
    }

    for (const traitKey in traits) {
      if (traitKey.startsWith("v-on:")) {
        const events = traitKey.substring(5).toLowerCase();
        eventTraits[events] = traits[traitKey];
      } else if (traitKey === "style") {
        styleTraits[traitKey] = traits[traitKey];
      } else if (traitKey.startsWith("v-attr:")) {
        const attribute = traitKey.substring(7).toLowerCase();
        attributeTraits[attribute] = traits[traitKey];
      } else if (traitKey.startsWith("data-")) {
        attributeTraits[traitKey] = traits[traitKey];
      } else if (traitKey.startsWith("aria-")) {
        attributeTraits[traitKey] = traits[traitKey];
      } else {
        dataTraits[traitKey] = traits[traitKey];
      }
    }

    if (dom.prototype && dom.prototype.isVelteClassComponent) {
      const componentInstance = new dom(traits);
      componentInstance.__VNode = componentInstance.render();

      componentInstance.__VNode.data.hook = {
        init: () => componentInstance.onCreated(),
        create: () => componentInstance.onBeforeMount(),
        insert: () => componentInstance.onMounted(),
        update: () => componentInstance.onUpdated(),
        destroy: () => componentInstance.onBeforeUnmount(),
        remove: () => componentInstance.onUnmounted(),
      };

      return componentInstance.__VNode;
    }

    if (typeof dom === "function") {
      const VNode = dom(traits);
      VNode.data.hook = {
        init: () => {
          if (
            traits.hook?.hasOwnProperty("onCreated") &&
            typeof traits.hook?.onCreated === "function"
          ) {
            traits.hook.onCreated();
          }
        },
        create: () => {
          if (
            traits.hook?.hasOwnProperty("onBeforeMount") &&
            typeof traits.hook?.onBeforeMount === "function"
          ) {
            traits.hook.onBeforeMount();
          }
        },
        insert: () => {
          if (
            traits.hook?.hasOwnProperty("onMounted") &&
            typeof traits.hook?.onMounted === "function"
          ) {
            traits.hook.onMounted();
          }
        },
        update: () => {
          if (
            traits.hook?.hasOwnProperty("onUpdated") &&
            typeof traits.hook?.onUpdated === "function"
          ) {
            traits.hook.onUpdated();
          }
        },
        destroy: () => {
          if (
            traits.hook?.hasOwnProperty("onBeforeUnmount") &&
            typeof traits.hook?.onBeforeUnmount === "function"
          ) {
            traits.hook.onBeforeUnmount();
          }
        },
        remove: () => {
          if (
            traits.hook?.hasOwnProperty("onUnmounted") &&
            typeof traits.hook?.onUnmounted === "function"
          ) {
            traits.hook.onUnmounted();
          }
        },
      };

      let recentVNode = null;

      if (traits.store instanceof velX) {
        traits.store.events.subscribe("stateChange", () => {
          const newVNode = dom(traits);

          newVNode.data.hook = {
            init: () => {
              if (
                traits.hook?.hasOwnProperty("onCreated") &&
                typeof traits.hook?.onCreated === "function"
              ) {
                traits.hook.onCreated();
              }
            },
            create: () => {
              if (
                traits.hook?.hasOwnProperty("onBeforeMount") &&
                typeof traits.hook?.onBeforeMount === "function"
              ) {
                traits.hook.onBeforeMount();
              }
            },
            insert: () => {
              if (
                traits.hook?.hasOwnProperty("onMounted") &&
                typeof traits.hook?.onMounted === "function"
              ) {
                traits.hook.onMounted();
              }
            },
            update: () => {
              if (
                traits.hook?.hasOwnProperty("onUpdated") &&
                typeof traits.hook?.onUpdated === "function"
              ) {
                traits.hook.onUpdated();
              }
            },
            destroy: () => {
              if (
                traits.hook?.hasOwnProperty("onBeforeUnmount") &&
                typeof traits.hook?.onBeforeUnmount === "function"
              ) {
                traits.hook.onBeforeUnmount();
              }
            },
            remove: () => {
              if (
                traits.hook?.hasOwnProperty("onUnmounted") &&
                typeof traits.hook?.onUnmounted === "function"
              ) {
                traits.hook.onUnmounted();
              }
            },
          };

          if (recentVNode === null) {
            const currentVNode = Velte.__reconcile(VNode, newVNode);
            recentVNode = currentVNode;
          } else {
            recentVNode = Velte.__reconcile(recentVNode, newVNode);
          }
        });
      }

      return VNode;
    }

    const traitType = {
      props: dataTraits,
      on: eventTraits,
      style: styleTraits.style,
      attrs: attributeTraits,
    };

    if (traits.store instanceof velX) {
      traits.store.events.subscribe("stateChange", () => {
        const vh = snabbdom.h(dom, traitType, children);
        vh.data.hook = {
          init: () => {
            if (
              traits.hook?.hasOwnProperty("onCreated") &&
              typeof traits.hook?.onCreated === "function"
            ) {
              traits.hook.onCreated();
            }
          },
          create: () => {
            if (
              traits.hook?.hasOwnProperty("onBeforeMount") &&
              typeof traits.hook?.onBeforeMount === "function"
            ) {
              traits.hook.onBeforeMount();
            }
          },
          insert: () => {
            if (
              traits.hook?.hasOwnProperty("onMounted") &&
              typeof traits.hook?.onMounted === "function"
            ) {
              traits.hook.onMounted();
            }
          },
          update: () => {
            if (
              traits.hook?.hasOwnProperty("onUpdated") &&
              typeof traits.hook?.onUpdated === "function"
            ) {
              traits.hook.onUpdated();
            }
          },
          destroy: () => {
            if (
              traits.hook?.hasOwnProperty("onBeforeUnmount") &&
              typeof traits.hook?.onBeforeUnmount === "function"
            ) {
              traits.hook.onBeforeUnmount();
            }
          },
          remove: () => {
            if (
              traits.hook?.hasOwnProperty("onUnmounted") &&
              typeof traits.hook?.onUnmounted === "function"
            ) {
              traits.hook.onUnmounted();
            }
          },
        };
        Velte.__reconcile(vh, snabbdom.h(dom, traitType, children));
        //return vh
      });
    }

    const vh = snabbdom.h(dom, traitType, children);
    vh.data.hook = {
      init: () => {
        if (
          traits.hook?.hasOwnProperty("onCreated") &&
          typeof traits.hook?.onCreated === "function"
        ) {
          traits.hook.onCreated();
        }
      },
      create: () => {
        if (
          traits.hook?.hasOwnProperty("onBeforeMount") &&
          typeof traits.hook?.onBeforeMount === "function"
        ) {
          traits.hook.onBeforeMount();
        }
      },
      insert: () => {
        if (
          traits.hook?.hasOwnProperty("onMounted") &&
          typeof traits.hook?.onMounted === "function"
        ) {
          traits.hook.onMounted();
        }
      },
      update: () => {
        if (
          traits.hook?.hasOwnProperty("onUpdated") &&
          typeof traits.hook?.onUpdated === "function"
        ) {
          traits.hook.onUpdated();
        }
      },
      destroy: () => {
        if (
          traits.hook?.hasOwnProperty("onBeforeUnmount") &&
          typeof traits.hook?.onBeforeUnmount === "function"
        ) {
          traits.hook.onBeforeUnmount();
        }
      },
      remove: () => {
        if (
          traits.hook?.hasOwnProperty("onUnmounted") &&
          typeof traits.hook?.onUnmounted === "function"
        ) {
          traits.hook.onUnmounted();
        }
      },
    };

    // event.subscribe("setState", (updatedState)=>{
    //     console.log("A local state has changed", updatedState)
    //     Velte.__reconcile(vh, h(dom, traitType, children))
    // })

    return vh;
  };

  class VelteComponent {
    constructor(traits) {
      this.traits = traits;
      this.state = null;

      if (traits.store instanceof velX) {
        traits.store.events.subscribe("stateChange", () => Velte.__updater(this));
      }
    }

    reactToState() {
      Velte.__updater(this);
    }

    setState(updatedState) {
      //this.state = {...this.state,...updatedState}
      this.state = mergician__default["default"](this.state, updatedState);
      Velte.__updater(this);
    }

    vExit() {
      return;
    }

    onCreated() {}

    onBeforeMount() {}

    onMounted() {}

    onUpdated() {}

    onBeforeUnmount() {}

    onUnmounted() {}

    render() {}
  }

  VelteComponent.prototype.isVelteClassComponent = true;

  class useState {
    constructor(defaultValue) {
      this.state = { value: defaultValue };

      const handler = {
        set: () => {
          return false;
        },
      };

      const data = new Proxy(this.state, handler);
      const stateBind = this.setState.bind(this);
      return [data, stateBind];
    }
    setState(newValue) {
      if (typeof this.state.value === "object") {
        //this.state.value = {...this.state.value, ...newValue}
        this.state.value = mergician__default["default"](this.state.value, newValue);
        //event.publish("setState", this.state.value)
      } else {
        this.state.value = newValue;
        //event.publish("setState", this.state.value)
      }
    }
  }

  const Velte = {
    VelteElement,
    useState,
    VelteComponent,
    VELTE_VERSION,
  };

  const reconcile = snabbdom__namespace.init(
    [snabbdom.propsModule, snabbdom.eventListenersModule, snabbdom.styleModule, snabbdom.attributesModule],
    undefined,
    {
      experimental: {
        fragments: true,
      },
    }
  );

  let rootVNode;

  Velte.__reconcile = reconcile;

  const VelteRender = (element, rootDomElement) => {
    if (rootVNode == null) {
      rootVNode = rootDomElement;
    }
    rootVNode = reconcile(rootVNode, element);
  };

  Velte.__updater = (componentInstance) => {
    const oldVNode = componentInstance.__VNode;
    const newVNode = componentInstance.render();

    componentInstance.__VNode = reconcile(oldVNode, newVNode);
  };

  var velte = {
    VelteElement,
    VelteComponent,
    useState,
    velX,
    PubSub,
    VelteRender,
    VELTE_VERSION
  };

  exports.PubSub = PubSub;
  exports.VELTE_VERSION = VELTE_VERSION;
  exports.VelteComponent = VelteComponent;
  exports.VelteElement = VelteElement;
  exports.VelteRender = VelteRender;
  exports["default"] = velte;
  exports.useState = useState;
  exports.velX = velX;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
