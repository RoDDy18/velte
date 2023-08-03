[![Velte banner](https://github.com/RoDDy18/velte/blob/main/logo/velte-banner.png?raw=true)](https://veltejs.cyclic.app)

## Welcome to Velte

* Lightweight
* Simple
* Scalable
* Event Driven
* Performant
* Out-of-the-box Proxy State Managment
* Deep (recursive) Merge State Updates via [mergician](https://www.npmjs.com/package/mergician)

<p>
<a href="https://www.npmjs.com/package/velte"><img src="https://img.shields.io/npm/v/velte?logo=npm&logoColor=fff&style=flat&colorA=18181B&colorB=7446CE" alt="Version"></a>
<a href="https://www.npmjs.com/package/velte"><img src="https://img.shields.io/npm/dm/velte?style=flat&colorA=18181B&colorB=7446CE" alt="Downloads"></a>
<a href="https://github.com/RoDDy18/velte/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-limegreen.svg?style=flat&colorA=18181B&colorB=7446CE" alt="License"></a>
<a href="https://veltejs.cyclic.app"><img src="https://img.shields.io/badge/Open%20Documentation-18181B" alt="Website"></a>
</p>

## What is Velte?
Velte is a simple, lightweight and Event Driven frontend Javascript UI framework with a declarative, scalable and component-based model for developing User Interfaces. Powered by [snabbdom](https://www.npmjs.com/package/snabbdom), one of the fastest virtual DOM libraries out there, velte inherits it's splendid performance. It's modularity makes velte powerful out of the box!<br/>
Love using snabbdom? well, think of velte as high level framework wrapped around snabbdom.<br/>
Velte in no way tries to reinvent the wheel, It takes the wheel and makes it easier to roll with. In summary, It's your typical modern UI framework but friendlier.

## Installation
Getting started with velte
* [velte webpack starter](https://github.com/RoDDy18/velte-webpack-starter)
* [velte rspack starter](https://github.com/RoDDy18/velte-rspack-starter)
* [velte vite starter](https://github.com/RoDDy18/velte-vite-starter)
* [velte app CLI](https://www.npmjs.com/package/create-velte-app)

## Documentation

Full documentation at [https://veltejsdocs.cyclic.app](https://veltejsdocs.cyclic.app)


## Code Example

```jsx
import { VelteElement, VelteRender } from "velte"

const variableValue = "Velte is Awesome"

const App = (
    <div>
        <h1>{variableValue}</h1>
        <p>Yes, velte uses JSX</p>
    </div>
)

VelteRender(App, document.getElementById("app"))
```
