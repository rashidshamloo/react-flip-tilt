<h1 align="center">
   <b>
        React Flip Tilt<br>
    </b>
</h1>

<p align="center">A Performant Customizable React Component Providing the Flip-Tilt Effect</p>

<p align="center">
    <a href="https://rashidshamloo.github.io/react-flip-tilt_demo"><b>Main Demo</b></a> •
    <a href="https://rashidshamloo.github.io/react-flip-tilt_demo/parallax"><b>Parallax Demo</b></a> •
    <a href="https://rashidshamloo.github.io/react-flip-tilt_demo/control-element"><b>Control Element Demo</b></a> •
    <a href="https://rashidshamloo.github.io/react-flip-tilt/?path=/docs/fliptilt-react-flip-tilt--docs"><b>Storybook</b></a>
</p>

<div align="center">

[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=react-flip-tilt&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=react-flip-tilt)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-flip-tilt?style=flat-square)](https://bundlephobia.com/package/react-flip-tilt@latest)
[![npm downloads](https://img.shields.io/npm/dm/react-flip-tilt.svg?style=flat-square)](https://npm-stat.com/charts.html?package=react-flip-tilt)
[![Known Vulnerabilities](https://snyk.io/test/npm/react-flip-tilt/badge.svg)](https://snyk.io/test/npm/react-flip-tilt)

</div>

<div align="center">
   <img src="./demo.webp" alt="React Flip Tilt Demo Image" aria-hidden="true" />
</div>

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Events/Callbacks](#eventscallbacks)
- [Ref](#ref)
- [Credits](#credits)
- [Author](#author)
- [License](#license)

## Features

- Easy to use
- Highly customizable
- Built with performance in mind
- Built from the ground up using React Hooks/TypeScript (is not a port of another library)
- Minimum amount of component re-renders
- Typed props with JSDoc descriptions
- Tested extensively using Cypress/Storybook
- Plus all of the features of <a href="https://www.npmjs.com/package/react-next-tilt#features">react-next-tilt</a> like:
  - Touch and Gyroscope Support
  - Two customizable glare effects (spot/line)
  - Scale on Hover/Touch
  - Disable Scroll on Touch
  - Full-Page Listening
  - Control Element
  - Parallax ready
  - and more

## Installation

```bash
$ npm install framer-motion react-flip-tilt
```

Once the package is installed, you can `import` the component:

```js
import { FlipTilt } from 'react-flip-tilt';
```

## Usage
You can set the the `front`/`back` properties to either an image source as `string` or an element/component

### Image Source

```js
<FlipTilt front="/front.webp" back="/back.webp" />;
```

### Element/Component

```js
<FlipTilt front={<div>...</div>} back={<MyComponent />} />;
```

### Mixture of Both

```js
<FlipTilt front="/front.webp" back={<MyComponent />} />;
```
### Parallax Effect

This component is "parallax ready", meaning you don't need to change any settings for it to work.

You just need to set up your parallax effect in JSX/CSS and set it as the front/back element.

You can read [this article](https://dev.to/rashidshamloo/making-a-3d-parallax-effect-with-css-2kpp) to learn more about how to set up the 3D parallax effect.

## Props

> All props are optional

> In addition to these props, you can use:
>
> - Any valid `HTMLDivElement` props like `className=''`, `data-...='...'`, `onMouseMove={...}` etc. they will be applied to the container element.
> - Any of the [`react-next-tilt`](https://www.npmjs.com/package/react-next-tilt#props) props like `scale`, `disableScrollOnTouch`, `controlElement`, etc.

> While you can flip the component by changing the `flipped` prop, it will cause the component to re-render and interrupts the animation. It is advised to use the `flip()` function exposed by [the component's ref](#ref) instead.

<table aria-hidden="false"><thead><tr><th><span>Name</span></th><th><span>Description</span></th><th><span>Default</span></th></tr></thead><tbody><tr><td><span>front</span></td><td><div><span>Front image/element</span></div><div>note: You can pass either an image source as string or an element/component</div><div>example: 'path/to/image.jpg', &lt;div&gt;...&lt;/div&gt;, &lt;Component /&gt;</div><div><div><code><span>ReactNode</span></code></div></div></td><td><span>&lt;&gt;&lt;/&gt;</span></td></tr><tr><td><span>back</span></td><td><div><span>Back image/element</span></div><div>note: You can pass either an image source as string or an element/component</div><div>example: 'path/to/image.jpg', &lt;div&gt;...&lt;/div&gt;, &lt;Component /&gt;</div><div><div><code><span>ReactNode</span></code></div></div></td><td><span>&lt;&gt;&lt;/&gt;</span></td></tr><tr><td><span>direction</span></td><td><div><span>Direction of the flip animation</span></div><div><div><code><span>"horizontal"</span> | <span>"vertical"</span></code></div></div></td><td><div><span>"horizontal"</span></div></td></tr><tr><td><span>flipReverse</span></td><td><div><span>Reverses the rotation of the flip animation</span></div><div> see the <a href="https://rashidshamloo.github.io/react-flip-tilt_demo/parallax">Parallax Demo</a></div><div><div><code><span>boolean</span></code></div></div></td><td><div><span>false</span></div></td></tr><tr><td><span>flipBackReverse</span></td><td><div><span>Reverses the rotation of the flip back animation</span></div><div> see the <a href="https://rashidshamloo.github.io/react-flip-tilt_demo/parallax">Parallax Demo</a></div><div><div><code><span>boolean</span></code></div></div></td><td><div><span>false</span></div></td></tr><tr><td><span>borderWidth</span></td><td><div><span>Border width applied to the back image/element</span></div><div>example: '4px', '1em', '2rem'</div><div><div><code><span>string</span></code></div></div></td><td><div><span>"2px"</span></div></td></tr><tr><td><span>borderColor</span></td><td><div><span>Border color applied to the back image/element</span></div><div>example: 'lightblue', '#445566AA', 'rgba(50,150,250,0.5)', 'hsla(100,50%,50%,0.2)'</div><div><div><code><span>string(Property.BorderColor)</span></code></div></div></td><td><div><span>white</span></div></td></tr><tr><td><span>borderStyle</span></td><td><div><span>Border style applied to the back image/element</span></div><div>example: 'solid', 'dashed', 'dotted'</div><div><div><code><span>string (Property.BorderStyle)</span></code></div></div></td><td><div><span>solid</span></div></td></tr><tr><td><span>boxShadow</span></td><td><div><span>CSS <code>box-shadow</code> property applied to the back image/element</span></div><div>example: '0.5rem 0.5rem 0.5rem rgba(0,0,0,0.3)'</div><div><div><code><span>string</span></code></div></div></td><td><span>"0 0 1rem rgba(0,0,0,0.4)"</span></td></tr><tr><td><span>mass</span></td><td><div><span>Mass of the element in <code>framer-motion</code>'s <code>spring</code> animation. Higher values will result in more lethargic movement.</span></div><div><div><code><span>number</span></code></div></div></td><td><div><span>0.5</span></div></td></tr><tr><td><span>stiffness</span></td><td><div><span>Stiffness of the spring in <code>framer-motion</code>'s <code>spring</code> animation. Higher values will create more sudden movement.</span></div><div><div><code><span>number</span></code></div></div></td><td><div><span>120</span></div></td></tr><tr><td><span>flipped</span></td><td><div><div><p>Locks the component to one side</p><p style="margin-bottom:0;padding-bottom:0"><code>true</code>: back side</p><p style="margin-top:0;padding-top:0"><code>false</code>: front side</p></div></div><div><div><span>boolean</span></div></div></td><td><span>-</span></td></tr></tbody></table>

## Events/Callbacks

The component has the following events/callbacks in addition to [`react-next-tilt`](https://www.npmjs.com/package/react-next-tilt#eventscallbacks) events/callbacks:

<table aria-hidden="false"><thead><tr><th><span>Name</span></th><th><span>Description</span></th><th><span>Parameters</span></th></tr><tbody><tr><td><span>onFlip</span></td><td><div><span>Callback function that is called with the container element when the component flips and the back side is visible</span></div><div><code><span>(element: HTMLDivElement) => void</span></code></div></td><td><span><code>element</code>: The component's container element</span></td></tr><tr><td><span>onFlipBack</span></td><td><div><span>Callback function that is called with the container element when the component flips back and the front side is visible</span></div><div><code><span>(element: HTMLDivElement) => void</span></code></div></td><td><span><code>element</code>: The component's container element</span></td></tr></tbody></table>

## Ref

The components's ref object contains the following properties in addition to [`react-next-tilt`](https://www.npmjs.com/package/react-next-tilt#ref) ref properties:

<table aria-hidden="false"><thead><tr><th><span>Name</span></th><th><span>Description</span></th><th><span>Parameters</span></th></tr><tbody><tr><td><span>isFlipped</span></td><td><div><span>Returns whether the element is flipped or not</span></div><div><code><span>() => boolean</span></code></div></td><td><span>-</span></td></tr><tr><td><span>flip</span></td><td><div><span>Animates/Flips the component without re-rendering it.</span></div><div><code><span>() => Promise&lt;void&gt;</span></code></div></td><td><span>-</span></td></tr></tbody></table>

### Ref Usage (ref function)

```ts
import { FlipTilt, FlipTiltRef } from 'react-next-tilt';

const MyComponent = () => {
  return (
    <FlipTilt
      ref={(ref) => {
        if (ref) {
          //do something with the ref
        }
      }}
      ...
    />
  );
};
```

### Ref Usage (useEffect)

```js
import { useRef, useEffect } from 'react';
import { FlipTilt, FlipTiltRef } from 'react-flip-tilt';

const MyComponent = () => {
  const ref = useRef<FlipTiltRef>(null);

  useEffect(() => {
    if (ref.current) {
      //do something with the ref
    }
  }, []);

  return <FlipTilt ref={ref} ... />;
};
```

### Flip on Mount

```js
import { useRef, useEffect } from 'react';
import { FlipTilt, FlipTiltRef } from 'react-flip-tilt';

const MyComponent = () => {
  const ref = useRef<FlipTiltRef | null>(null);

  useEffect(()=>{
    if (ref.current) {
    //do something else with the ref
    }
  },[]);

  return (
    <FlipTilt
      ref={async (r) => {
        if (r) {
          console.log(`isFlipped = ${r.isFlipped()}`);
          await r.flip();
          console.log(`isFlipped = ${r.isFlipped()}`);
          ref.current = r;
        }
      }}
      ...
    />
  );
};
```

## Credits

Animated using <a href="https://www.npmjs.com/package/framer-motion">framer-motion</a>

Inspired by [evolany.com](https://evolany.com/)

## Author

Rashid Shamloo (<a href="https://github.com/rashidshamloo/">github.com/rashidshamloo</a>)

## License

[MIT](LICENSE)
