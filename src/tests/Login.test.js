import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('Testa renderização da página Login', () => {
  it('renderiza input de email e senha e botão enviar', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.queryByText('Enter');

    expect(button).toBeInTheDocument();
    expect(button.disabled).toBeTruthy();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
  it('Verifica a validação dos inputs', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.queryByText('Enter');
    const validEmail = 'trybe@trybe.com';
    const invalidEmail = 'trybe';
    const validPassword = '123abcd';
    const invalidPassword = '123ab';

    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');

    userEvent.type(emailInput, invalidEmail);
    expect(button.disabled).toBeTruthy();
    userEvent.type(passwordInput, invalidPassword);
    expect(button.disabled).toBeTruthy();
    userEvent.type(emailInput, validEmail);
    expect(button.disabled).toBeTruthy();
    userEvent.type(passwordInput, validPassword);
    expect(button.disabled).toBeFalsy();
  });
  it('Ao clicar no botão, direciona para a página /meals', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.queryByText('Enter');
    const validEmail = 'trybe@trybe.com';
    const validPassword = '123abcd';

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    userEvent.click(button);
    expect(history.location.pathname).toMatch('/meals');
  });
});
