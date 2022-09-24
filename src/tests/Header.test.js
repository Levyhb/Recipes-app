import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Recipes from '../pages/Recipes';

describe('Testa a renderização da página Header', () => {
  it('o componente header possui um elemento de icone para profile, um icone para pesquisa, e possui um titulo', () => {
    renderWithRouterAndRedux(<Recipes />);

    const titleHeader = screen.getByTestId('page-title');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');

    expect(titleHeader).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
  it('Verifica se ao clicar no icone de busca, é renderizado o componente SearchBar.js', () => {
    renderWithRouterAndRedux(<Recipes />);

    const searchIcon = screen.getByTestId('search-top-btn');

    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();

    userEvent.click(searchIcon);
    expect(searchBar).not.toBeInTheDocument();
  });
});
