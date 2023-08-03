/*
 *  velte v2.0.0-alpha.1
 *  A lightweight, performant, event-driven Frontend framework for Modern Apps.
 *  Copyright (c) 2023 Emmanuel Oni
 *  Licence - https://github.com/RoDDy18/velte/blob/main/LICENSE
 */
import { VNode, jsx } from "snabbdom";
declare namespace _default {
    export { VelteElement };
    export { VelteComponent };
    export { useState };
    export { velX };
    export { PubSub };
    export { VelteRender };
    export { VELTE_VERSION };
}
export default _default;
import { VelteElement } from "./velte/core";
import { VelteComponent } from "./velte/core";
import { useState } from "./velte/core";
import velX from "./velte/velx/store";
import PubSub from "./velte/velx/pubsub";
import { VelteRender } from "./velte/dom";
import { VELTE_VERSION } from "./velte/core";
export { VelteElement, VelteComponent, useState, velX, PubSub, VelteRender, VELTE_VERSION, VNode, jsx };
