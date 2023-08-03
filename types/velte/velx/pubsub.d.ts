/*
 *  velte v2.0.0-alpha.0
 *  A light, performant, easy-to-use Frontend framework for Modern Apps.
 *  Copyright (c) 2023 Emmanuel Oni
 *  Licence - https://github.com/RoDDy18/velte/blob/main/LICENSE
 */
export default class PubSub {
    events: {};
    subscribe(event: any, callback?: ()=> void): any;
    publish(event: any, data?: {}): any;
}
