import PubSub from "./pubsub";

export default class velX {
  constructor(
    params = { actions: {}, mutations: {}, state: {}, devTools: false, strictMode: true }
  ) {
    let self = this;
    self.actions = {};
    self.mutations = {};
    self.state = {};
    self.status = "resting";
    self.devTools = false;
    self.strictMode = true;
    self.events = new PubSub();

    if (params.hasOwnProperty("actions")) {
      self.actions = params.actions;
    }

    if (params.hasOwnProperty("mutations")) {
      self.mutations = params.mutations;
    }

    if (params.hasOwnProperty("devTools")) {
      self.devTools = params.devTools;
    }

    if(params.hasOwnProperty("strictMode")) {
      self.strictMode = params.strictMode;
    }

    self.state = new Proxy(params.state || {}, {
      set: function (state, key, value) {
        state[key] = value;
        console.log(value)

        if (self.devTools) {
          console.log(`velX: stateChange: "${key}" : ${value}`);
        }

        if (self.status !== "mutation") {
          console.warn(`velX: You should use a mutation to set "${key}"`);
          if(self.strictMode === true){
            return false;
          }
        }

        self.events.publish("stateChange", self.state);

        return true;
      },
    });
  }

  dispatch(actionKey, payload) {
    let self = this;

    if (typeof self.actions[actionKey] !== "function") {
      console.error(`velX: Action "${actionKey}" doesn't exist.`);
      return false;
    }

    if (self.devTools) {
      console.groupCollapsed(`ACTION: ${actionKey}`);

      self.status = "action";

      self.actions[actionKey](self, payload);

      console.groupEnd();
    } else {
      self.status = "action";

      self.actions[actionKey](self, payload);
    }

    return true;
  }

  commit(mutationKey, payload) {
    let self = this;

    if (typeof self.mutations[mutationKey] !== "function") {
      console.error(`velX: Mutation "${mutationKey}" doesn't exist.`);
      return false;
    }

    if(self.status !== "action") {
        console.warn(`velX: You should commit "${mutationKey}" mutation from action`);
        if(self.strictMode === true){
          return false;
        }
    }

    self.status = "mutation";

    let newState = self.mutations[mutationKey](self.state, payload);

    self.state = Object.assign(self.state, newState);

    self.status = "resting";

    return true;
  }
}
