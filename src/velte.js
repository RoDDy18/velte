import {
  VelteElement,
  VelteComponent,
  useState,
  VELTE_VERSION,
} from "./velte/core"

import { VelteRender } from "./velte/dom"

import velX from "./velte/velx/store"
import PubSub from "./velte/velx/pubsub"

export { VelteElement, VelteComponent, useState, velX, PubSub, VelteRender, VELTE_VERSION }

export default {
  VelteElement,
  VelteComponent,
  useState,
  velX,
  PubSub,
  VelteRender,
  VELTE_VERSION
}
