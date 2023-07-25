/*
 *  velte v1.1.0
 *  A light(5kb), performant, easy-to-use Frontend library for Modern Apps.
 *  Copyright (c) 2023 Emmanuel Oni
 *  Licence - https://github.com/RoDDy18/velte/blob/main/LICENSE
 */

declare namespace _default {
    export { VelteElement };
    export { VelteComponent };
    export { VelteRender };
    export { VELTE_VERSION };
}
export default _default;
import { VelteElement } from "./velte/core";
import { VelteComponent } from "./velte/core";
import { VelteRender } from "./velte/dom";
import { VELTE_VERSION } from "./velte/core";
export { VelteElement, VelteComponent, VelteRender, VELTE_VERSION };
