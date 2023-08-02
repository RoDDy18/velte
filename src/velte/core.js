import {h} from "snabbdom"

export var VELTE_VERSION = "1.1.0"

export const VelteElement = (dom,traits={},...children)=>{

    children = children.flat(2)
    traits = traits || {}
    const eventTraits = {}
    const dataTraits = {}
    const styleTraits = {}
    const attributeTraits = {}

    for(const traitKey in traits){
        if(traitKey.startsWith("v-on:")){
            const events = traitKey.substring(5).toLowerCase()
            eventTraits[events] = traits[traitKey]
        }else if(traitKey == "style"){
            styleTraits[traitKey] = traits[traitKey]
        }else if(traitKey.startsWith("v-attr:")){
            const attribute = traitKey.substring(7).toLowerCase()
            attributeTraits[attribute] = traits[traitKey]
        }else{
            dataTraits[traitKey] = traits[traitKey]
        }
        
    }
    
    if(dom.prototype && dom.prototype.isVelteClassComponent){

        const componentInstance = new dom(traits)
        componentInstance.__VNode = componentInstance.render()

        componentInstance.__VNode.data.hook = {
            init:()=>componentInstance.onCreated(),
            create:()=> componentInstance.onBeforeMount(),
            insert:()=> componentInstance.onMounted(),
            update:()=> componentInstance.onUpdated(),
            destroy:()=> componentInstance.onBeforeUnmount(),
            remove:()=> componentInstance.onUnmounted()
        }
        return componentInstance.__VNode
    }
    
    if(typeof dom == "function"){
        return dom(traits)
    }

    const traitType = {props:dataTraits, on:eventTraits, style:styleTraits.style, attrs:attributeTraits}
    return h(dom,traitType,children)
}

export class VelteComponent{
    constructor(traits){
        this.traits = traits
        this.state = null
        
    }

    reactToState(){
        Velte.__updater(this)
    }

    setState(updatedState){
        this.state = {...this.state,...updatedState}
        Velte.__updater(this)
    }

    vExit(){ return }

    onCreated(){}

    onBeforeMount(){}

    onMounted(){}

    onUpdated(){}

    onBeforeUnmount(){}
    
    onUnmounted(){}

    render(){}
}

VelteComponent.prototype.isVelteClassComponent = true

const Velte = {
    VelteElement,
    VelteComponent,
    VELTE_VERSION
}

export default Velte