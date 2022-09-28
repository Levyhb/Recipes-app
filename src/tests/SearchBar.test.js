import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Testa a renderização do componente SearchBar', () => {
  it('Verifica o componente Search renderiza corretamente', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.queryByText('Enter');
    const validEmail = 'trybe@trybe.com';
    const validPassword = '123abcd';

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    userEvent.click(button);

    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const searchButtonFilter = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');
    const searchIngredient = screen.getByTestId('ingredient-search-radio');
    const searchName = screen.getByTestId('name-search-radio');
    const searchFirstLetter = screen.getByTestId('first-letter-search-radio');
    await waitFor(() => {
      expect(searchIngredient).toBeInTheDocument();
      expect(searchInput).toBeInTheDocument();
      expect(searchButtonFilter).toBeInTheDocument();
      expect(searchName).toBeInTheDocument();
      expect(searchFirstLetter).toBeInTheDocument();
    });

    userEvent.type(searchInput, 'soup');
    userEvent.click(searchName);
    userEvent.click(searchButtonFilter);
    await waitFor(() => {
      expect(screen.getAllByTestId(/card-img/i)).toHaveLength(12);
    });

    userEvent.type(searchInput, 'orange');
    userEvent.click(searchButtonFilter);
  });
  it('Verifica se o SeachBar renderiza corretamente', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.queryByText('Enter');
    const validEmail = 'trybe@trybe.com';
    const validPassword = '123abcd';

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    userEvent.click(button);

    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const searchButtonFilter = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');
    const searchIngredient = screen.getByTestId('ingredient-search-radio');
    const searchName = screen.getByTestId('name-search-radio');

    userEvent.type(searchInput, 'orange');
    userEvent.click(searchIngredient);
    userEvent.click(searchButtonFilter);
    await waitFor(() => {
      expect(screen.getAllByTestId(/-card-img/i)).toHaveLength(8);
    });

    userEvent.click(searchName);
    userEvent.click(searchButtonFilter);

    await waitFor(() => {
      expect(screen.getByText(/RecipeDetails/i)).toBeInTheDocument();
    });
  });
});
