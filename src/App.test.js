import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe("Counter 1", () => {

  it('should have internal state equal to 0', () => {
	  const { getByTestId } = render(<App />); 
	  expect(getByTestId('counter-one')).toHaveTextContent(0)
  });

  it('should have increment button that is enabled', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('counter-one-button-up')).not.toHaveAttribute('disabled')
  });

  it('should have decrement button that is disabled', () => {
    const { getByTestId } = render(<App />); 
    expect(getByTestId('counter-one-button-down')).toBeDisabled()
  });

  it('increments counter', () => {
    const { getByTestId } = render(<App />); 
    
    fireEvent.click(getByTestId('counter-one-button-up'))

    expect(getByTestId('counter-one')).toHaveTextContent('1')
  });

  it('decrements counter', () => {
    const { getByTestId } = render(<App/>); 
    
    fireEvent.click(getByTestId('counter-one-button-up'))
    fireEvent.click(getByTestId('counter-one-button-down'))

    expect(getByTestId('counter-one')).toHaveTextContent('0')
  });

  it('resets counter', () => {
    const { getByTestId } = render(<App/>); 
    
    fireEvent.click(getByTestId('counter-one-button-up'))
    fireEvent.click(getByTestId('counter-one-button-up'))
    expect(getByTestId('counter-one')).toHaveTextContent('2')

    fireEvent.click(getByTestId('counter-one-reset-button'))
    expect(getByTestId('counter-one')).toHaveTextContent('0')
  });
});

describe("Counter 2", () => {

  it('should have internal state equal to 0', () => {
	  const { getByTestId } = render(<App />); 
	  expect(getByTestId('counter-two')).toHaveTextContent(0)
  });

  it('should have increment button that is enabled', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('counter-two-button-up')).not.toHaveAttribute('disabled')
  });

  it('should have decrement button that is disabled', () => {
    const { getByTestId } = render(<App />); 
    expect(getByTestId('counter-two-button-down')).toBeDisabled()
  });

  it('increments counter', () => {
    const { getByTestId } = render(<App />); 
    
    fireEvent.click(getByTestId('counter-two-button-up'))

    expect(getByTestId('counter-two')).toHaveTextContent('1')
  });

  it('decrements counter', () => {
    const { getByTestId } = render(<App/>); 
    
    fireEvent.click(getByTestId('counter-two-button-up'))
    fireEvent.click(getByTestId('counter-two-button-down'))

    expect(getByTestId('counter-two')).toHaveTextContent('0')
  });

  it('resets counter', () => {
    const { getByTestId } = render(<App/>); 
    
    fireEvent.click(getByTestId('counter-two-button-up'))
    fireEvent.click(getByTestId('counter-two-button-up'))
    expect(getByTestId('counter-two')).toHaveTextContent('2')

    fireEvent.click(getByTestId('counter-two-reset-button'))
    expect(getByTestId('counter-two')).toHaveTextContent('0')
  });
});

describe("Counter 3", () => {

  it('should have internal state equal to 0', () => {
	  const { getByTestId } = render(<App />); 
	  expect(getByTestId('counter-three')).toHaveTextContent(0)
  });

  it('should have increment button that is enabled', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('counter-three-button-up')).not.toHaveAttribute('disabled')
  });

  it('should have decrement button that is disabled', () => {
    const { getByTestId } = render(<App />); 
    expect(getByTestId('counter-three-button-down')).toBeDisabled()
  });

  it('increments counter', () => {
    const { getByTestId } = render(<App />); 
    
    fireEvent.click(getByTestId('counter-three-button-up'))

    expect(getByTestId('counter-three')).toHaveTextContent('1')
  });

  it('decrements counter', () => {
    const { getByTestId } = render(<App/>); 
    
    fireEvent.click(getByTestId('counter-three-button-up'))
    fireEvent.click(getByTestId('counter-three-button-down'))

    expect(getByTestId('counter-three')).toHaveTextContent('0')
  });

  it('resets counter', () => {
    const { getByTestId } = render(<App/>); 
    
    fireEvent.click(getByTestId('counter-three-button-up'))
    fireEvent.click(getByTestId('counter-three-button-up'))
    expect(getByTestId('counter-three')).toHaveTextContent('2')

    fireEvent.click(getByTestId('counter-three-reset-button'))
    expect(getByTestId('counter-three')).toHaveTextContent('0')
  });
});