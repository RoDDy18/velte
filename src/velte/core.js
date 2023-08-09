import { h, fragment } from "snabbdom";
import mergician from "mergician";
import velX from "./velx/store";

import PubSub from "./velx/pubsub";
const event = new PubSub();

export var version = "2.0.0-rc.0";

export const VelteElement = (dom, traits = {}, ...children) => {
  children = children.flat(2);

  if (dom === "v-wrap") {
    return fragment([...children]);
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
    return h(dom, traitType, children);
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
      prepatch: () => componentInstance.onBeforeUpdate(),
      update: () => componentInstance.onUpdated(),
      destroy: () => componentInstance.onBeforeUnmount(),
      remove: () => componentInstance.onUnmounted(),
    };

    return componentInstance.__VNode;
  }

  if (dom.prototype && dom.prototype.isPureVelteClassComponent) {
    const componentInstance = new dom(traits);

    componentInstance.__VNode = componentInstance.render();

    return componentInstance.__VNode;
  }

  if (typeof dom === "function") {
    const VNode = dom(traits);
    VNode.data.hook = {
      init: () => {
        if (
          traits.$hook?.hasOwnProperty("onCreated") &&
          typeof traits.$hook?.onCreated === "function"
        ) {
          traits.$hook.onCreated();
        }
      },
      create: () => {
        if (
          traits.$hook?.hasOwnProperty("onBeforeMount") &&
          typeof traits.$hook?.onBeforeMount === "function"
        ) {
          traits.$hook.onBeforeMount();
        }
      },
      insert: () => {
        if (
          traits.$hook?.hasOwnProperty("onMounted") &&
          typeof traits.$hook?.onMounted === "function"
        ) {
          traits.$hook.onMounted();
        }
      },
      prepatch: () => {
        if (
          traits.$hook?.hasOwnProperty("onBeforeUpdate") &&
          typeof traits.$hook?.onBeforeUpdate === "function"
        ) {
          traits.$hook.onBeforeUpdate();
        }
      },
      update: () => {
        if (
          traits.$hook?.hasOwnProperty("onUpdated") &&
          typeof traits.$hook?.onUpdated === "function"
        ) {
          traits.$hook.onUpdated();
        }
      },
      destroy: () => {
        if (
          traits.$hook?.hasOwnProperty("onBeforeUnmount") &&
          typeof traits.$hook?.onBeforeUnmount === "function"
        ) {
          traits.$hook.onBeforeUnmount();
        }
      },
      remove: () => {
        if (
          traits.$hook?.hasOwnProperty("onUnmounted") &&
          typeof traits.$hook?.onUnmounted === "function"
        ) {
          traits.$hook.onUnmounted();
        }
      },
    };

    let recentVNode = null;

    if (traits.$store instanceof velX) {
      traits.$store.events.subscribe("stateChange", () => {
        const newVNode = dom(traits);

        newVNode.data.hook = {
          init: () => {
            if (
              traits.$hook?.hasOwnProperty("onCreated") &&
              typeof traits.$hook?.onCreated === "function"
            ) {
              traits.$hook.onCreated();
            }
          },
          create: () => {
            if (
              traits.$hook?.hasOwnProperty("onBeforeMount") &&
              typeof traits.$hook?.onBeforeMount === "function"
            ) {
              traits.$hook.onBeforeMount();
            }
          },
          insert: () => {
            if (
              traits.$hook?.hasOwnProperty("onMounted") &&
              typeof traits.$hook?.onMounted === "function"
            ) {
              traits.$hook.onMounted();
            }
          },
          prepatch: () => {
            if (
              traits.$hook?.hasOwnProperty("onBeforeUpdate") &&
              typeof traits.$hook?.onBeforeUpdate === "function"
            ) {
              traits.$hook.onBeforeUpdate();
            }
          },
          update: () => {
            if (
              traits.$hook?.hasOwnProperty("onUpdated") &&
              typeof traits.$hook?.onUpdated === "function"
            ) {
              traits.$hook.onUpdated();
            }
          },
          destroy: () => {
            if (
              traits.$hook?.hasOwnProperty("onBeforeUnmount") &&
              typeof traits.$hook?.onBeforeUnmount === "function"
            ) {
              traits.$hook.onBeforeUnmount();
            }
          },
          remove: () => {
            if (
              traits.$hook?.hasOwnProperty("onUnmounted") &&
              typeof traits.$hook?.onUnmounted === "function"
            ) {
              traits.$hook.onUnmounted();
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

  const vh = h(dom, traitType, children);
  vh.data.hook = {
    init: () => {
      if (
        traits.$hook?.hasOwnProperty("onCreated") &&
        typeof traits.$hook?.onCreated === "function"
      ) {
        traits.$hook.onCreated();
      }
    },
    create: () => {
      if (
        traits.$hook?.hasOwnProperty("onBeforeMount") &&
        typeof traits.$hook?.onBeforeMount === "function"
      ) {
        traits.$hook.onBeforeMount();
      }
    },
    insert: () => {
      if (
        traits.$hook?.hasOwnProperty("onMounted") &&
        typeof traits.$hook?.onMounted === "function"
      ) {
        traits.$hook.onMounted();
      }
    },
    prepatch: () => {
      if (
        traits.$hook?.hasOwnProperty("onBeforeUpdate") &&
        typeof traits.$hook?.onBeforeUpdate === "function"
      ) {
        traits.$hook.onBeforeUpdate();
      }
    },
    update: () => {
      if (
        traits.$hook?.hasOwnProperty("onUpdated") &&
        typeof traits.$hook?.onUpdated === "function"
      ) {
        traits.$hook.onUpdated();
      }
    },
    destroy: () => {
      if (
        traits.$hook?.hasOwnProperty("onBeforeUnmount") &&
        typeof traits.$hook?.onBeforeUnmount === "function"
      ) {
        traits.$hook.onBeforeUnmount();
      }
    },
    remove: () => {
      if (
        traits.$hook?.hasOwnProperty("onUnmounted") &&
        typeof traits.$hook?.onUnmounted === "function"
      ) {
        traits.$hook.onUnmounted();
      }
    },
  };

  return vh;
};


export class VelteComponent {
  constructor(traits) {
    this.traits = traits;
    this.state = null;

    if (traits.$store instanceof velX) {
      traits.$store.events.subscribe("stateChange", () => Velte.__updater(this));
    }

    if (traits.$state === true){
      event.subscribe("signalStateChange", ({oldValue, value})=> {
        if(oldValue !== value){
          Velte.__updater(this);
        }
      });
    }
  }

  reactToState() {
    Velte.__updater(this);
  }

  setState(updatedState) {
    this.state = mergician(this.state, updatedState);
    Velte.__updater(this);
  }

  onCreated() {}

  onBeforeMount() {}

  onMounted() {}

  onBeforeUpdate() {}

  onUpdated() {}

  onBeforeUnmount() {}

  onUnmounted() {}

  render() {}
}

VelteComponent.prototype.isVelteClassComponent = true;

export class PureVelteComponent {
  constructor(traits) {
    this.traits = traits;

    if (traits.$store instanceof velX) {
      traits.$store.events.subscribe("stateChange", () => Velte.__updater(this));
    }

    if (traits.$state === true){
      event.subscribe("signalStateChange", ({oldValue, value})=> {
        if(oldValue !== value){
          Velte.__updater(this);
        }
      });
    }
  }

  render() {}
}

PureVelteComponent.prototype.isPureVelteClassComponent = true;

export const createState = (defaultValue) => {
  let value = defaultValue;
  const getValue = () => value;
  let setValue;
  if (typeof defaultValue === "object") {
    setValue = (newValue) => {
      let oldValue = value;
      value = mergician(value, newValue);
      event.publish("signalStateChange", {oldValue, value});
      return value;
    }
  }else{
    setValue = (newValue) => {
      let oldValue = value;
      value = newValue;
      event.publish("signalStateChange", {oldValue, value});
      return value;
    }
  }
  return [getValue, setValue];
}

const Velte = {
  VelteElement,
  createState,
  VelteComponent,
  PureVelteComponent,
  version
};

export default Velte;
