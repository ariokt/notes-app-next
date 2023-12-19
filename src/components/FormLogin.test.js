/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from '@testing-library/jest-dom/matchers';
import "@testing-library/jest-dom";
import FormLogin from "./FormLogin";

expect.extend(matchers);

describe('Login page', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    render(<FormLogin login={() => {}} />);

    // arange
    const emailInput = screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'ari@mail.com');

    // assert
    expect(emailInput).toHaveValue('ari@mail.com');
  });

  it('should handle password typing correctly', async () => {
    render(<FormLogin login={() => {}} />);

    // arange
    const passwordInput = screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'ariari');

    // assert
    expect(passwordInput).toHaveValue('ariari');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = jest.fn();
    await render(<FormLogin login={mockLogin} />);
    
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'ari@mail.com');
    
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'ariari');
    
    const loginButton = await screen.getByRole('button', { name: 'Masuk' });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      email: 'ari@mail.com',
      password: 'ariari',
    });
  })
})