/*
 *  velte v2.0.0-alpha.2
 *  A lightweight, performant, event-driven Frontend framework for Modern Apps.
 *  Copyright (c) 2023 Emmanuel Oni
 *  Licence - https://github.com/RoDDy18/velte/blob/main/LICENSE
 */
import { VNode, jsx } from "snabbdom";
declare namespace _default {
    export { VelteElement };
    export { VelteComponent };
    export { createState };
    export { velX };
    export { PubSub };
    export { VelteRender };
    export { version };
}
export default _default;
import { VelteElement } from "./velte/core";
import { VelteComponent } from "./velte/core";
import { createState } from "./velte/core";
import velX from "./velte/velx/store";
import PubSub from "./velte/velx/pubsub";
import { VelteRender } from "./velte/dom";
import { version } from "./velte/core";
export { VelteElement, VelteComponent, createState, velX, PubSub, VelteRender, version, VNode, jsx };
