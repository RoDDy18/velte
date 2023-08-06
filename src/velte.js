import {
  VelteElement,
  VelteComponent,
  createState,
  version
} from "./velte/core"

import { VelteRender } from "./velte/dom"

import velX from "./velte/velx/store"
import PubSub from "./velte/velx/pubsub"

export { VelteElement, VelteComponent, createState, velX, PubSub, VelteRender, version }

export default {
  VelteElement,
  VelteComponent,
  createState,
  velX,
  PubSub,
  VelteRender,
  version
}
