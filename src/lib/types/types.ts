// react
import { ReactNode, KeyboardEventHandler } from 'react';

// csstype
import { Property } from 'csstype';

// react-next-tilt
import { TiltProps, TiltRef } from 'react-next-tilt';

// ref
export interface FlipTiltRef extends TiltRef {
  /**
   * Flips the component
   */
  flip: () => Promise<void>;
  /**
   * Returns whether the component is flipped or not
   */
  isFlipped: () => boolean;
}

// props
export interface FlipTiltProps extends TiltProps {
  /**
   * Front image/element
   *
   * @note You can pass either an image source as string or an element/component
   *
   * @default <></>
   *
   * @example
   * 'path/to/image.jpg', <div>...</div>, <Component />
   */
  front?: string | ReactNode;
  /**
   * Back image/element
   *
   * @note You can pass either an image source as string or an element/component
   *
   * @default <></>
   *
   * @example
   * 'path/to/image.jpg', <div>...</div>, <Component />
   */
  back?: string | ReactNode;
  /**
   * Direction of the flip animation
   *
   * @default 'horizontal'
   *
   * @example 'horizontal', 'vertical'
   *
   * @see {@link http://localhost:6006/?path=/story/fliptilt-react-flip-tilt--direction Storybook}
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Reverses the rotation of the flip animation
   *
   * @default false
   *
   * @see {@link http://localhost:6006/?path=/story/fliptilt-react-flip-tilt--flip-reverse Storybook}
   *
   * @see {@link https://rashidshamloo.github.io/react-flip-tilt_demo/parallax Parallax Demo}
   */
  flipReverse?: boolean;
  /**
   * Reverses the rotation of the flip back animation
   *
   * @default false
   *
   * @see {@link http://localhost:6006/?path=/story/fliptilt-react-flip-tilt--flip-reverse Storybook}
   *
   * @see {@link https://rashidshamloo.github.io/react-flip-tilt_demo/parallax Parallax Demo}
   */
  flipBackReverse?: boolean;
  /**
   * Border width applied to the back image/element
   *
   * @default '2px'
   *
   * @example '4px', '1em', '2rem'
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-width MDN - border-width}
   *
   * @see {@link http://localhost:6006/?path=/story/fliptilt-react-flip-tilt--border Storybook}
   */
  borderWidth?: string;
  /**
   * Border color applied to the back image/element
   *
   * @default 'white'
   *
   * @example 'lightblue', '#445566AA', 'rgba(50,150,250,0.5)', 'hsla(100,50%,50%,0.2)'
   *
   * @see {@link http://localhost:6006/?path=/story/fliptilt-react-flip-tilt--border Storybook}
   */
  borderColor?: Property.BorderColor;
  /**
   * Border style applied to the back image/element
   *
   * @default 'solid'
   *
   * @example 'solid', 'dashed', 'dotted'
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-style MDN - border-style}
   *
   * @see {@link http://localhost:6006/?path=/story/fliptilt-react-flip-tilt--border Storybook}
   */
  borderStyle?: Property.BorderStyle;
  /**
   * Mass of the element in `framer-motion`'s `spring` animation. Higher values will result in more lethargic movement.
   *
   * @default 0.5
   */
  mass?: number;
  /**
   * Stiffness of the spring in `framer-motion`'s `spring` animation. Higher values will create more sudden movement.
   *
   * @default 120
   */
  stiffness?: number;
  /**
   * Locks the component to one side
   *
   * @note
   * `true`: back side
   * `false`: front side
   *
   * @default undefined
   *
   * @see {@link http://localhost:6006/?path=/story/fliptilt-react-flip-tilt--flipped Storybook}
   */
  flipped?: boolean;
  /**
   * Callback function that is called with the container element when the component flips and the back side is visible
   *
   * @param {HTMLDivElement} element - The component's container element
   *
   * @default undefined
   */
  onFlip?: (elemenet: HTMLDivElement) => void;
  /**
   * Callback function that is called with the container element when the component flips back and the front side is visible
   *
   * @param {HTMLDivElement} element - The component's container element
   *
   * @default undefined
   */
  onFlipBack?: (element: HTMLDivElement) => void;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}

// exporting react-next-tilt types
export type {
  Angle,
  SpotGlarePosition,
  LineGlareHoverPosition,
  LineGlareDirection,
} from 'react-next-tilt';
