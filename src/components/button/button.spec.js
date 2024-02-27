import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './button.jsx';

describe('button props', () => {
  test('при клике выполняется функция-пропс onClick', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test('кнопка имеет тип переданный в пропс type', () => {
    render(<Button type="submit" />);
    const button = screen.getByTestId('button');
    expect(button.type).toBe('submit');
  });
});
