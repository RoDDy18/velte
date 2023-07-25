/*
 *  velte v1.1.0
 *  A light(5kb), performant, easy-to-use Frontend library for Modern Apps.
 *  Copyright (c) 2023 Emmanuel Oni
 *  Licence - https://github.com/RoDDy18/velte/blob/main/LICENSE
 */

export const VELTE_VERSION: string;
export function VelteElement(dom: any, traits?: {}, ...children: any[]): any;
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
export default Velte;
declare namespace Velte {
    export { VelteElement };
    export { VelteComponent };
    export { VELTE_VERSION };
}
