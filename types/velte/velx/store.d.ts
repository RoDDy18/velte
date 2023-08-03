/*
 *  velte v2.0.0-alpha.0
 *  A light, performant, easy-to-use Frontend framework for Modern Apps.
 *  Copyright (c) 2023 Emmanuel Oni
 *  Licence - https://github.com/RoDDy18/velte/blob/main/LICENSE
 */
export default class velX {
    constructor(params?: {
        actions: {};
        mutations: {};
        state: {};
        devTools?: boolean;
    });
    actions: {};
    mutations: {};
    state: {};
    status: string;
    devTools: boolean;
    events: PubSub;
    dispatch(actionKey: PropertyKey, payload?: any): boolean;
    commit(mutationKey: PropertyKey, payload?: any): boolean;
}
import PubSub from "./pubsub";
