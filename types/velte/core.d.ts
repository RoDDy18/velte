/*
 *  velte v2.0.0-alpha.1
 *  A lightweight, performant, event-driven Frontend framework for Modern Apps.
 *  Copyright (c) 2023 Emmanuel Oni
 *  Licence - https://github.com/RoDDy18/velte/blob/main/LICENSE
 */
import { VNode } from "snabbdom";

export const VELTE_VERSION: string;
export function VelteElement(dom: any, traits?: {}, ...children: any[]): VNode;
export class VelteComponent {
    constructor(traits: any);
    traits: any;
    state: any;
    reactToState(): void;
    setState(updatedState: any): void;
    vExit(): void;
    onCreated(): void;
    onBeforeMount(): void;
    onMounted(): void;
    onUpdated(): void;
    onBeforeUnmount(): void;
    onUnmounted(): void;
    render(): void;
    isVelteClassComponent: boolean;
}
export class useState {
    constructor(defaultValue: any);
    state: {
        value: any;
    };
    setState(newValue: any): void;
}
export default Velte;
declare namespace Velte {
    export { VelteElement };
    export { useState };
    export { VelteComponent };
    export { VELTE_VERSION };
}
