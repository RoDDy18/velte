import {
  VelteElement,
  VelteComponent,
  PureVelteComponent,
  createState,
  version
} from "./velte/core"

import { VelteRender } from "./velte/dom"

import velX from "./velte/velx/store"
import PubSub from "./velte/velx/pubsub"

export { VelteElement, VelteComponent, PureVelteComponent, createState, velX, PubSub, VelteRender, version }

export default {
  VelteElement,
  VelteComponent,
  PureVelteComponent,
  createState,
  velX,
  PubSub,
  VelteRender,
  version
}
