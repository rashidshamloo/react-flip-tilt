import { forwardRef } from 'react';
import { FlipTilt } from '..';
import { FlipTiltProps, FlipTiltRef } from '../types/types';
import frontImage from './img/test-front.webp';
import backImage from './img/test-back.webp';

const MockFlipTilt = forwardRef<FlipTiltRef, Partial<FlipTiltProps>>(
  (props, ref) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '484px',
        width: '100%',
      }}
    >
      <FlipTilt
        ref={ref}
        testIdEnable={true}
        front={props.front ? props.front : frontImage}
        back={props.back ? props.back : backImage}
        {...props}
      />
    </div>
  )
);

export default MockFlipTilt;
