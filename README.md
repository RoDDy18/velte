## velte - A small, fast, easy-to-use Frontend library for Modern Apps.

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
Velte is just another small, fast and easy-to-use frontend Javascript library with a declarative and component-based model for developing User Interfaces. velte in no way tries to reinvent the wheel, It takes the wheel and makes it easier to roll with. In summary, It's your typical modern framework or library but friendlier.

[Official Website](https://velte.netlify.app)

## Installation
Getting started with velte
* [velte starter kit (recommended for medium projects)](https://github.com/RoDDy18/velte-starter-kit)
* velte CLI (coming soon)

## Documentation

Full documentation at [veltedocs.netlify.app](https://veltedocs.netlify.app)


## Velte Class Component Example

```jsx
import {VelteComponent,VelteElement} from "velte"

export class GettingStarted extends VelteComponent{
    constructor(traits){
        super(traits)
        this.state = {}
    }

    render(){
        return(
            <div className="card">
                <h2 className="title"><i className="fas fa-book"></i> Getting Started</h2>
                <p>You should read the documentation, it covers every bit of the library.</p>
                <a href="./test.html" v-attr:role="button" className="button">Read the Docs</a>
            </div>
        )
    }
}
```
