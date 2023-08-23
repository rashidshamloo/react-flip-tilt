import type { Meta, StoryObj } from '@storybook/react';
import { FlipTilt } from '../lib/index';

const frontImage = 'test-front.webp';
const backImage = 'test-back.webp';

const Image = ({ side }: { side: 'front' | 'back' }) => (
  <img
    src={side === 'front' ? frontImage : backImage}
    alt={side === 'front' ? 'Front' : 'Back'}
    style={{
      display: 'block',
      verticalAlign: 'middle',
      width: '100%',
      height: '100%',
      objectFit: 'fill',
      borderRadius: 'inherit',
      outline: '3px solid #00ff01',
      outlineOffset: '-3px',
    }}
  />
);

const meta: Meta<typeof FlipTilt> = {
  title: 'FlipTilt (react-flip-tilt)',
  component: FlipTilt,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#333' }],
    },
    actions: { argTypesRegex: /onFlip.*/ },
    docs: {
      source: { language: 'tsx' },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { table: { disable: true } },
    borderWidth: { control: { type: 'text' } },
    borderColor: { control: { type: 'color' } },
    borderStyle: { control: { type: 'text' } },
    onMouseEnter: { table: { disable: true } },
    onMouseMove: { table: { disable: true } },
    onMouseLeave: { table: { disable: true } },
    onTouchStart: { table: { disable: true } },
    onTouchMove: { table: { disable: true } },
    onTouchEnd: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onKeyDown: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof FlipTilt>;

export const Default: Story = {
  args: {
    front: frontImage,
    back: backImage,
  },
};

export const Direction: Story = {
  parameters: {
    controls: {
      include: 'direction',
    },
  },
  args: {
    direction: 'vertical',
    front: frontImage,
    back: backImage,
  },
};

export const FlipReverse: Story = {
  parameters: {
    controls: {
      include: ['direction', 'flipReverse', 'flipBackReverse'],
    },
  },
  args: {
    direction: 'horizontal',
    flipReverse: false,
    flipBackReverse: false,
    front: frontImage,
    back: backImage,
  },
};

export const BorderRadius: Story = {
  parameters: {
    controls: {
      include: 'borderRadius',
    },
  },
  args: {
    borderRadius: '50%',
    front: <Image side="front" />,
    back: <Image side="back" />,
  },
};

export const Border: Story = {
  parameters: {
    controls: {
      include: ['borderWidth', 'borderColor', 'borderStyle'],
    },
  },
  args: {
    borderWidth: '10px',
    borderColor: 'yellow',
    borderStyle: 'dashed',
    front: frontImage,
    back: backImage,
  },
};

export const MassStiffness: Story = {
  name: 'Mass / Stiffness',
  parameters: {
    controls: {
      include: ['mass', 'stiffness'],
    },
  },
  args: {
    mass: 0.1,
    stiffness: 50,
    front: frontImage,
    back: backImage,
  },
};

export const Flipped: Story = {
  parameters: {
    controls: {
      include: 'flipped',
    },
  },
  args: {
    flipped: true,
    front: frontImage,
    back: backImage,
  },
};

export const FullPageListening: Story = {
  parameters: {
    controls: {
      include: 'fullPageListening',
    },
  },
  args: {
    fullPageListening: true,
    front: frontImage,
    back: backImage,
  },
};
