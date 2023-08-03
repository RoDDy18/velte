import * as snabbdom from "snabbdom";
import {
  propsModule,
  eventListenersModule,
  styleModule,
  attributesModule,
} from "snabbdom";
import Velte from "./core";

const reconcile = snabbdom.init(
  [propsModule, eventListenersModule, styleModule, attributesModule],
  undefined,
  {
    experimental: {
      fragments: true,
    },
  }
);

let rootVNode;

Velte.__reconcile = reconcile;

export const VelteRender = (element, rootDomElement) => {
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
