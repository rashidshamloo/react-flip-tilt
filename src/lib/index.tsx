// react
import {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
  ReactNode,
  PropsWithChildren,
  memo,
  RefObject,
} from 'react';

// framer motion
import { motion, useMotionValue, animate, Transition } from 'framer-motion';

// tilt
import { Tilt, TiltRef } from 'react-next-tilt';

// utility
import { getHTMLElement, isDeepEqual } from './utility/utility';

// types
import { FlipTiltProps, FlipTiltRef } from './types/types';

const ReactFlipTilt = forwardRef<FlipTiltRef, FlipTiltProps>(
  (
    {
      //
      front = <></>,
      back = <></>,
      direction = 'horizontal',
      borderRadius = '8px',
      borderWidth = '2px',
      borderColor = 'white',
      borderStyle = 'solid',
      boxShadow = '0 0 1rem rgba(0,0,0,0.4)',
      mass = 0.5,
      stiffness = 120,
      flipped,
      flipReverse = false,
      flipBackReverse = false,
      disabled = false,
      testIdEnable,
      fullPageListening,
      controlElement,
      controlElementOnly,
      tiltStyle,
      onFlip,
      onFlipBack,
      onMouseEnter,
      onMouseMove,
      onTouchMove,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onKeyDown,
      onBlur,
      ...props
    }: FlipTiltProps,
    ref
  ) => {
    // state variables (non-re-rendering)
    // using ref instead of boolean so it can be used inside useCallback()
    const isFlipped = useRef(false);
    isFlipped.current = !!flipped;
    const isVertical = direction === 'vertical';
    const disableFlip = flipped !== undefined || disabled;
    const attachEvents =
      !fullPageListening &&
      (!controlElement || (controlElement && !controlElementOnly));

    // ref
    const tiltRef = useRef<TiltRef>(null);
    const motionDivRef = useRef<HTMLDivElement>(null);

    // initital rotation value
    const rotateInitialValue = flipped ? 0 : flipReverse ? 180 : -180;
    const rotate = useMotionValue(rotateInitialValue);

    // functions/values

    // transition setting
    const transition: Transition = useMemo(
      () => ({
        type: 'spring',
        mass,
        stiffness,
      }),
      [mass, stiffness]
    );

    // updates the "will-change" css property
    const updateWillChange = useCallback((add = true) => {
      if (motionDivRef.current)
        motionDivRef.current.style.willChange = add ? 'transform' : '';
    }, []);

    // flips the component, sets the value of isFlipped, and runs the callback functions
    const flip = useCallback(async (): Promise<void> => {
      if (!tiltRef.current?.element) return;

      updateWillChange();

      // flip
      if (!isFlipped.current) {
        isFlipped.current = true;

        if (onFlip) onFlip(tiltRef.current.element);

        // if flipBackReverse is false, jump to rotateInitialValue
        if (!flipBackReverse) {
          rotate.jump(rotateInitialValue);
        }

        await animate(rotate, 0, transition);
      }
      // flip back
      else {
        isFlipped.current = false;

        if (onFlipBack) onFlipBack(tiltRef.current.element);

        /*
         *  if flipBackReverse is false (doing a 360° rotation) and
         *  the animation has gone past the half point (90°),
         *  do the whole 360° rotation. otherwise don't rotate
         *  to the other side to prevent a whole 360° rotation
         *  on the slightest mouseenter->mouseleave or tap/touch
         */
        await animate(
          rotate,
          !flipBackReverse && Math.abs(rotate.get()) < 90
            ? -rotateInitialValue
            : rotateInitialValue,
          transition
        );
      }

      updateWillChange(false);
    }, [
      updateWillChange,
      onFlip,
      onFlipBack,
      flipBackReverse,
      rotate,
      transition,
      rotateInitialValue,
    ]);

    // returns the value of isFlipped
    const getIsFlipped = useCallback((): boolean => {
      return isFlipped.current;
    }, []);

    // FliptTiltRef
    useImperativeHandle(
      ref,
      () => {
        if (tiltRef.current)
          return {
            flip,
            isFlipped: getIsFlipped,
            ...tiltRef.current,
          };
        else
          return {
            flip,
            isFlipped: getIsFlipped,
            element: null,
            angle: () => ({ angleX: 0, angleY: 0 }),
            reset: () => {
              return;
            },
            tilt: () => {
              return;
            },
            updateWillChange: () => {
              return;
            },
          };
      },
      [flip, getIsFlipped]
    );

    // elements

    const FlipElement = memo(
      ({
        element,
        side,
      }: {
        element: string | ReactNode;
        side: 'front' | 'back';
      }) => {
        if (typeof element === 'string')
          return (
            <img
              src={element}
              alt=""
              data-testid={
                testIdEnable
                  ? side === 'front'
                    ? 'front-image'
                    : 'back-image'
                  : undefined
              }
              loading="lazy"
              aria-hidden="true"
              style={{
                pointerEvents: 'none',
                touchAction: 'none',
                userSelect: 'none',
                display: 'block',
                verticalAlign: 'middle',
                width: '100%',
                height: '100%',
                backgroundSize: '10px',
              }}
            />
          );
        else return element;
      }
    );
    const TiltWrapper = useCallback(
      ({ children }: PropsWithChildren) => {
        return (
          <motion.div
            ref={motionDivRef}
            data-testid={testIdEnable ? 'motion' : undefined}
            style={{
              display: 'grid',
              gridAutoRows: '100%',
              width: '100%',
              height: '100%',
              borderRadius,
              rotateX: isVertical ? rotate : undefined,
              rotateY: !isVertical ? rotate : undefined,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              data-testid={testIdEnable ? 'front-wrapper' : undefined}
              style={{
                width: '100%',
                height: '100%',
                gridArea: '1 / 1 / 1 / 1',
                borderRadius,
                overflow: typeof front === 'string' ? 'hidden' : undefined,
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
                transform: isVertical ? 'rotateX(180deg)' : 'rotateY(180deg)',
              }}
            >
              <FlipElement element={front} side="front" />
            </div>
            {children}
          </motion.div>
        );
      },
      [FlipElement, borderRadius, front, isVertical, rotate, testIdEnable]
    );

    // events

    const mouseEnterMoveTouchStartMove = useCallback(() => {
      if (!disableFlip && !isFlipped.current) flip();
    }, [disableFlip, flip]);

    const mouseLeave = useCallback(() => {
      if (!disableFlip && isFlipped.current) flip();
    }, [disableFlip, flip]);

    const touchEnd = useCallback(
      (e: TouchEvent | React.TouchEvent<HTMLDivElement>) => {
        // prevent mouseenter/mousemove events from firing
        // after the touchend event
        e.cancelable && e.preventDefault();
        if (!disableFlip && isFlipped.current) flip();
      },
      [disableFlip, flip]
    );

    const keyDown = useCallback(
      (e: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>) => {
        // only flip/flipBack on "keydown" if the target element is not a child
        let TargetElementIsAChild = false;
        if (
          e.currentTarget instanceof HTMLElement &&
          e.target instanceof HTMLElement &&
          e.currentTarget !== e.target &&
          e.currentTarget.contains(e.target)
        )
          TargetElementIsAChild = true;

        if ((e.key === ' ' || e.key === 'Enter') && !TargetElementIsAChild) {
          e.preventDefault();
          if (!disableFlip) flip();
        }
      },
      [disableFlip, flip]
    );

    const blur = useCallback(
      (e: FocusEvent | React.FocusEvent<HTMLDivElement>) => {
        // only flipBack on "blur" if the focused element is not a child
        let focusedElementIsAChild = false;
        if (
          e.currentTarget instanceof HTMLElement &&
          e.relatedTarget instanceof HTMLElement &&
          e.currentTarget !== e.relatedTarget &&
          e.currentTarget.contains(e.relatedTarget)
        )
          focusedElementIsAChild = true;
        if (!disableFlip && isFlipped.current && !focusedElementIsAChild)
          flip();
      },
      [disableFlip, flip]
    );

    // adding event listeners to controlElement(s)
    useEffect(() => {
      if (!controlElement && !fullPageListening) return;

      // if controlElement is not an array, convert it to one
      let controlElementArray: Array<
        HTMLElement | RefObject<HTMLElement> | Document
      >;
      if (fullPageListening || !controlElement)
        controlElementArray = [document];
      else
        controlElementArray = Array.isArray(controlElement)
          ? controlElement
          : [controlElement];

      for (let el of controlElementArray) {
        const convertedEl = getHTMLElement(el);
        if (!convertedEl) continue;
        el = convertedEl;

        el.addEventListener('mouseenter', mouseEnterMoveTouchStartMove);
        el.addEventListener('mousemove', mouseEnterMoveTouchStartMove);
        el.addEventListener('mouseleave', mouseLeave);
        el.addEventListener('touchstart', mouseEnterMoveTouchStartMove, {
          passive: true,
        });
        el.addEventListener('touchmove', mouseEnterMoveTouchStartMove, {
          passive: true,
        });
        el.addEventListener('touchend', touchEnd);
        el.addEventListener('keydown', keyDown, { passive: true });
        el.addEventListener('blur', blur, { passive: true });
      }

      return () => {
        for (let el of controlElementArray) {
          const convertedEl = getHTMLElement(el);
          if (!convertedEl) continue;
          el = convertedEl;

          el.removeEventListener('mouseenter', mouseEnterMoveTouchStartMove);
          el.removeEventListener('mousemove', mouseEnterMoveTouchStartMove);
          el.removeEventListener('mouseleave', mouseLeave);
          el.removeEventListener('touchstart', mouseEnterMoveTouchStartMove);
          el.removeEventListener('touchmove', mouseEnterMoveTouchStartMove);
          el.removeEventListener('touchend', touchEnd);
          el.removeEventListener('keydown', keyDown);
          el.removeEventListener('blur', blur);
        }
      };
    }, [
      mouseEnterMoveTouchStartMove,
      mouseLeave,
      touchEnd,
      flip,
      keyDown,
      blur,
      controlElement,
      fullPageListening,
    ]);

    return (
      <Tilt
        ref={tiltRef}
        onMouseEnter={
          attachEvents
            ? onMouseEnter
              ? (e) => {
                  mouseEnterMoveTouchStartMove();
                  onMouseEnter(e);
                }
              : mouseEnterMoveTouchStartMove
            : onMouseEnter
        }
        onTouchStart={
          attachEvents
            ? onTouchStart
              ? (e) => {
                  mouseEnterMoveTouchStartMove();
                  onTouchStart(e);
                }
              : mouseEnterMoveTouchStartMove
            : onTouchStart
        }
        onMouseMove={
          attachEvents
            ? onMouseMove
              ? (e) => {
                  mouseEnterMoveTouchStartMove();
                  onMouseMove(e);
                }
              : mouseEnterMoveTouchStartMove
            : onMouseMove
        }
        onTouchMove={
          attachEvents
            ? onTouchMove
              ? (e) => {
                  mouseEnterMoveTouchStartMove();
                  onTouchMove(e);
                }
              : mouseEnterMoveTouchStartMove
            : onTouchMove
        }
        onMouseLeave={
          attachEvents
            ? onMouseLeave
              ? (e) => {
                  mouseLeave();
                  onMouseLeave(e);
                }
              : mouseLeave
            : onMouseLeave
        }
        onTouchEnd={
          attachEvents
            ? onTouchEnd
              ? (e) => {
                  touchEnd(e);
                  onTouchEnd(e);
                }
              : touchEnd
            : onTouchEnd
        }
        onKeyDown={
          attachEvents
            ? onKeyDown
              ? (e) => {
                  keyDown(e);
                  onKeyDown(e);
                }
              : keyDown
            : onKeyDown
        }
        onBlur={
          attachEvents
            ? onBlur
              ? (e) => {
                  blur(e);
                  onBlur(e);
                }
              : blur
            : onBlur
        }
        tiltStyle={Object.assign(
          {
            gridArea: '1 / 1 / 1 / 1',
            width: '100%',
            height: '100%',
          },
          tiltStyle
        )}
        TiltWrapper={TiltWrapper}
        borderRadius={borderRadius}
        disabled={disabled}
        testIdEnable={testIdEnable}
        fullPageListening={fullPageListening}
        controlElement={controlElement}
        controlElementOnly={controlElementOnly}
        {...props}
      >
        <div
          data-testid={testIdEnable ? 'back-wrapper' : undefined}
          style={{
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            borderRadius,
            borderWidth,
            borderStyle,
            borderColor,
            boxShadow,
            overflow: typeof back === 'string' ? 'hidden' : undefined,
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          <FlipElement element={back} side="back" />
        </div>
      </Tilt>
    );
  }
);

export const FlipTilt = memo(ReactFlipTilt, (prevProps, nextProps) =>
  isDeepEqual(prevProps, nextProps)
);

FlipTilt.displayName = 'FlipTilt';

export default FlipTilt;
