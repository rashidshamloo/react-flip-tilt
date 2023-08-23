// react
import { createRef } from 'react';

// mock tilt
import MockFlipTilt from './MockFlipTilt';

// types
import { FlipTiltRef } from '../types/types';

describe('<FlipTilt />', () => {
  describe('Testing if component renders correctly', () => {
    it('front and back = image/string', () => {
      // front/back images are already set in the MockFlipTilt component
      cy.mount(<MockFlipTilt />);
      cy.get('[data-testid="front-image"]').should('exist');
      cy.get('[data-testid="back-image"]').should('exist');
    });
    it('front and back = ReactNode', () => {
      cy.mount(
        <MockFlipTilt
          front={<p data-testid="front">Front</p>}
          back={<p data-testid="back">Back</p>}
        />
      );
      cy.get('[data-testid="front"]').should('exist');
      cy.get('[data-testid="back"]').should('exist');
    });
  });
  it('Testing borderRadius (10px)', () => {
    cy.mount(<MockFlipTilt borderRadius="10px" />);
    cy.get('[data-testid="front-wrapper"]')
      .should('have.attr', 'style')
      .should('contain', 'border-radius: 10px');
    cy.get('[data-testid="back-wrapper"]')
      .should('have.attr', 'style')
      .should('contain', 'border-radius: 10px');
    cy.get('[data-testid="motion"]')
      .should('have.attr', 'style')
      .should('contain', 'border-radius: 10px');
  });
  it('Testing borderWidth (10px)', () => {
    cy.mount(<MockFlipTilt borderWidth="10px" />);
    cy.get('[data-testid="back-wrapper"]')
      .should('have.attr', 'style')
      .should('contain', 'border-width: 10px');
  });
  it('Testing borderColor (green)', () => {
    cy.mount(<MockFlipTilt borderColor="green" />);
    cy.get('[data-testid="back-wrapper"]')
      .should('have.attr', 'style')
      .should('contain', 'border-color: green');
  });
  it('Testing borderStyle (dashed)', () => {
    cy.mount(<MockFlipTilt borderStyle="dashed" />);
    cy.get('[data-testid="back-wrapper"]')
      .should('have.attr', 'style')
      .should('contain', 'border-style: dashed');
  });
  it('Testing shadow ("1px 1px 1px black")', () => {
    cy.mount(<MockFlipTilt shadow="1px 1px 1px black" />);
    cy.get('[data-testid="container"]').trigger('mouseover', 'center');
    cy.get('[data-testid="tilt"]')
      .should('have.attr', 'style')
      .should('contain', 'black')
      .should('contain', '1px 1px 1px');
  });
  it('Testing tiltStyle, tilt style should contain "color: green"', () => {
    cy.mount(<MockFlipTilt tiltStyle={{ color: 'green' }} />);
    cy.get('[data-testid="tilt"]')
      .should('have.attr', 'style')
      .should('contain', 'color: green');
  });
  describe('Testing flip functionality', () => {
    describe('Normal', () => {
      it('direction = "horizontal"', () => {
        cy.mount(<MockFlipTilt flipReverse={false} direction="horizontal" />);
        cy.get('[data-testid="motion"]')
          .should('have.attr', 'style')
          .should('contain', 'rotateY(-180deg)');
        cy.get('[data-testid="container"]')
          .trigger('mouseover', 'center')
          .then(() => {
            cy.get('[data-testid="motion"]')
              .should('have.attr', 'style')
              .should('contain', 'transform: none');
          });
      });
      it('direction = "vertical"', () => {
        cy.mount(<MockFlipTilt flipReverse={false} direction="vertical" />);
        cy.get('[data-testid="motion"]')
          .should('have.attr', 'style')
          .should('contain', 'rotateX(-180deg)');
        cy.get('[data-testid="container"]')
          .trigger('mouseover', 'center')
          .then(() => {
            cy.get('[data-testid="motion"]')
              .should('have.attr', 'style')
              .should('contain', 'transform: none');
          });
      });
    });
    describe('Reverse', () => {
      it('direction = "horizontal"', () => {
        cy.mount(<MockFlipTilt flipReverse={true} direction="horizontal" />);
        cy.get('[data-testid="motion"]')
          .should('have.attr', 'style')
          .should('contain', 'rotateY(180deg)');
        cy.get('[data-testid="container"]')
          .trigger('mouseover', 'center')
          .then(() => {
            cy.get('[data-testid="motion"]')
              .should('have.attr', 'style')
              .should('contain', 'transform: none');
          });
      });
      it('direction = "vertical"', () => {
        cy.mount(<MockFlipTilt flipReverse={true} direction="vertical" />);
        cy.get('[data-testid="motion"]')
          .should('have.attr', 'style')
          .should('contain', 'rotateX(180deg)');
        cy.get('[data-testid="container"]')
          .trigger('mouseover', 'center')
          .then(() => {
            cy.get('[data-testid="motion"]')
              .should('have.attr', 'style')
              .should('contain', 'transform: none');
          });
      });
    });
  });
  describe('Testing flipped = "true"', () => {
    it('direction = "horizontal"', () => {
      cy.mount(
        <MockFlipTilt
          flipReverse={false}
          direction="horizontal"
          flipped={true}
        />
      );
      cy.get('[data-testid="motion"]')
        .should('have.attr', 'style')
        .should('contain', 'transform: none');
    });
    it('direction = "vertical"', () => {
      cy.mount(
        <MockFlipTilt flipReverse={false} direction="vertical" flipped={true} />
      );
      cy.get('[data-testid="motion"]')
        .should('have.attr', 'style')
        .should('contain', 'transform: none');
    });
  });

  it('Testing full-page listening, transform should be "none"', () => {
    cy.mount(<MockFlipTilt fullPageListening={true} direction="horizontal" />);
    cy.get('[data-testid="container"]').trigger('mouseenter', {
      clientX: 0,
      clientY: 0,
    });
    cy.get('[data-testid="motion"]')
      .should('have.attr', 'style')
      .should('contain', 'transform: none');
  });

  describe('Testing callback functions', () => {
    it('Testing onFlip(), "testFunction" should be called and element should not be undefined', () => {
      let element: HTMLDivElement;
      const test = {
        testFunction: (el: HTMLDivElement) => {
          element = el;
        },
      };
      cy.spy(test, 'testFunction');
      cy.mount(<MockFlipTilt onFlip={test.testFunction} />);
      cy.get('[data-testid="container"]')
        .trigger('mouseover', 'center')
        .then(() => {
          expect(test.testFunction).to.be.called;
          expect(element).not.to.be.undefined;
        });
    });
    it('Testing onFlipBack(), "testFunction" should be called and element should not be undefined', () => {
      let element: HTMLDivElement;
      const test = {
        testFunction: (el: HTMLDivElement) => {
          element = el;
        },
      };
      cy.spy(test, 'testFunction');
      cy.mount(<MockFlipTilt onFlipBack={test.testFunction} />);
      cy.get('[data-testid="container"]')
        .trigger('mouseover', 'center')
        .trigger('mouseout', 'center')
        .then(() => {
          expect(test.testFunction).to.be.called;
          expect(element).not.to.be.undefined;
        });
    });
  });
  describe('Testing the ref object', () => {
    it('Testing ref.flip() and ref.isFlipped()', () => {
      const ref = createRef<FlipTiltRef>();
      cy.mount(<MockFlipTilt ref={ref} />);
      cy.get('[data-testid="container"]').then(() => {
        expect(ref.current).not.to.be.null;
        if (ref.current) {
          expect(ref.current.isFlipped()).to.be.false;
          ref.current.flip();
          expect(ref.current.isFlipped()).to.be.true;
          ref.current.flip();
          expect(ref.current.isFlipped()).to.be.false;
        }
      });
    });
  });
});
