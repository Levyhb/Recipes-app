import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Profile from '../pages/Profile';

describe('Testa a renderização do Footer em Profile', () => {
  it('o componente footer possui dois elementos de icone', () => {
    renderWithRouterAndRedux(<Profile />);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealIcon = screen.getByTestId('meals-bottom-btn');

    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });
  it('Verifica se ao clicar no icone meal, é redirecionado para /meals', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);

    const mealIcon = screen.getByTestId('meals-bottom-btn');

    userEvent.click(mealIcon);

    expect(history.location.pathname).toEqual('/meals');
  });
  it('Verifica se ao clicar no icone drinks, é redirecionado para /drinks', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinkIcon);

    expect(history.location.pathname).toEqual('/drinks');
  });
});
