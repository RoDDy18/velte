/*
 *  velte v2.0.0-rc.1
 *  A Lightweight, Event-driven, Performant, Frontend framework for Modern Apps.
 *  Copyright (c) 2023 Emmanuel Oni
 *  Licence - https://github.com/RoDDy18/velte/blob/main/LICENSE
*/
import { VNode } from "snabbdom";
export const version: string;
export function VelteElement(dom: any, traits?: {}, ...children: any[]): VNode;
export class VelteComponent {
    constructor(traits: any);
    traits: any;
    state: any;
    reactToState(): void;
    setState(updatedState: any): void;
    onCreated(): void;
    onBeforeMount(): void;
    onMounted(): void;
    onBeforeUpdate(): void;
    onUpdated(): void;
    onBeforeUnmount(): void;
    onUnmounted(): void;
    render(): void;
    isVelteClassComponent: boolean;
}
export class PureVelteComponent {
    constructor(traits: any);
    traits: any;
    render(): void;
    isPureVelteClassComponent: boolean;
}
export function createState(defaultValue: any): ((newValue: any) => any)[];
export default Velte;
declare namespace Velte {
    export { VelteElement };
    export { createState };
    export { VelteComponent };
    export { PureVelteComponent };
    export { version };
}
