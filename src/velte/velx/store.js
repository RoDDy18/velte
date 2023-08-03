import PubSub from "./pubsub"

export default class velX {
    constructor(params = {actions:{}, mutations:{}, state:{}, devTools:false}) {
        let self = this
        self.actions = {}
        self.mutations = {}
        self.state = {}
        self.status = "resting"
        self.devTools = false
        self.events = new PubSub()
        
        if(params.hasOwnProperty("actions")) {
          self.actions = params.actions
        }
        
        if(params.hasOwnProperty("mutations")) {
          self.mutations = params.mutations
        }

        if(params.hasOwnProperty("devTools")) {
          self.devTools = params.devTools
        }

        self.state = new Proxy((params.state || {}), {
          set: function(state, key, value) {

            state[key] = value

            if(self.devTools){
              console.log(`stateChange: "${String(key)}" : ${value}`)
            }
        
            self.events.publish("stateChange", self.state)

            if(self.status !== "mutation") {
              console.warn(`You should use a mutation to set "${String(key)}"`)
            }
        
            self.status = "resting"
        
            return true
          }
        })
    }

    dispatch(actionKey, payload) {
      if(typeof this.actions[actionKey] !== "function") {
        console.error(`Action "${String(actionKey)}" doesn't exist.`)
        return false
      }

      if(this.devTools){
        console.groupCollapsed(`ACTION: ${String(actionKey)}`)

        this.status = "action"
    
        this.actions[actionKey](this, payload)
    
        console.groupEnd()
      }else{
        this.status = "action"
      
        this.actions[actionKey](this, payload)
      }
    
      return true
    }

    commit(mutationKey, payload) {
      if(typeof this.mutations[mutationKey] !== "function") {
        console.log(`Mutation "${String(mutationKey)}" doesn't exist.`)
        return false
      }
    
      this.status = "mutation"
    
      let newState = this.mutations[mutationKey](this.state, payload)
    
      this.state = Object.assign(this.state, newState)

      return true
    }
}