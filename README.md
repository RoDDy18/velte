## velte - A light(5kb), performant, easy-to-use Frontend Framework for Modern Apps.

<p align="center">

<a href="https://github.com/RoDDy18/velte/blob/main/LICENSE">
    <img src="https://github.com/RoDDy18/velte/blob/main/logo/velte-main.png?raw=true" alt="velte_logo"><br>
</a>&nbsp;
<a href="https://www.npmjs.com/velte">
    <img src="https://img.shields.io/npm/v/velte.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen" alt="velte on npm" />
</a>&nbsp;
<a href="https://github.com/RoDDy18/velte/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-limegreen.svg" alt="mit license" />
</a>&nbsp;

</p>

## What is Velte?
Velte is a light(5kb), performant and easy-to-use frontend Javascript framework with a declarative and component-based model for developing User Interfaces. velte in no way tries to reinvent the wheel, It takes the wheel and makes it easier to roll with. In summary, It's your typical modern framework or library but friendlier.

## Installation
Getting started with velte
* [velte webpack starter](https://github.com/RoDDy18/velte-webpack-starter)
* [velte rspack starter](https://github.com/RoDDy18/velte-rspack-starter)
* [velte vite starter](https://github.com/RoDDy18/velte-vite-starter)
* [velte app CLI](https://www.npmjs.com/package/create-velte-app)

## Documentation

Full documentation at [https://veltejsdocs.cyclic.app](https://veltejsdocs.cyclic.app)


## Velte Code Example

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
