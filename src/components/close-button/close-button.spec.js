import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CloseButton from './close-button.jsx';

describe('close-button props', () => {
  test('при клике выполняется функция-пропс onClick', () => {
    const onClick = jest.fn();
    render(<CloseButton onClick={onClick} />);
    const button = screen.getByTestId('close-button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
