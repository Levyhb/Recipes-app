import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Profile from '../pages/Profile';

const EMAIL = 'profile-email';

describe('Testa renderização da página Login', () => {
  it('renderiza email e botões', () => {
    renderWithRouterAndRedux(<Profile />);
    const profileText = screen.queryByText('Profile');
    const emailInput = screen.getByTestId(EMAIL);
    const emailText = screen.queryByText('email');
    const buttonDone = screen.queryByText('Done Recipes');
    const buttonFavorite = screen.queryByText('Favorite Recipes');
    const buttonLogout = screen.queryByText('Logout');
    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealsIcon = screen.getByTestId('meals-bottom-btn');

    expect(profileText).toBeInTheDocument();
    expect(emailText).toBeInTheDocument();
    expect(buttonDone).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();
    expect(buttonLogout).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(drinkIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();
  });

  it('Ao clicar no botão Favorite Recipes, direciona para a página /favorite-recipes', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const buttonFavorite = screen.queryByText('Favorite Recipes');
    userEvent.click(buttonFavorite);
    expect(history.location.pathname).toMatch('/favorite-recipes');
  });

  it('Ao clicar no botão Done Recipes, direciona para a página /done-recipes', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const buttonDone = screen.queryByText('Done Recipes');
    userEvent.click(buttonDone);
    expect(history.location.pathname).toMatch('/done-recipes');
  });

  it('Ao clicar no botão Logout, direciona para a página / ', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const buttonLogout = screen.queryByText('Logout');
    userEvent.click(buttonLogout);
    expect(history.location.pathname).toMatch('/');
  });

  it('Ao clicar no botão meals, direciona para a página /meals ', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsIcon);
    expect(history.location.pathname).toMatch('/meals');
  });

  it('Ao clicar no botão drinks, direciona para a página /drinks ', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkIcon);
    expect(history.location.pathname).toMatch('/drinks');
  });

  it('se o email é renderizado', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'tryber@teste.com' }));
    renderWithRouterAndRedux(<Profile />);
    const emailText = screen.queryByText('tryber@teste.com');
    expect(emailText).toBeInTheDocument();
  });
});
