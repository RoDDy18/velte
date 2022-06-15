export const VELTE_VERSION: string;
export function VelteElement(dom: any, traits?: {}, ...children: any[]): any;
export class VelteComponent {
    constructor(traits: any);
    traits: any;
    state: any;
    reactToState(): void;
    setState(updatedState: any): void;
    velteExit(): void;
    velteCreated(): void;
    velteMounted(): void;
    velteUpdated(): void;
    velteDestroyed(): void;
    render(): void;
    isVelteClassComponent: boolean;
}
export default Velte;
declare namespace Velte {
    export { VelteElement };
    export { VelteComponent };
    export { VELTE_VERSION };
}
