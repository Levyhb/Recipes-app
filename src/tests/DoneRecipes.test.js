import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import DoneRecipes from '../pages/DoneRecipes';

const btnFilterAll = 'filter-by-all-btn';
const btnFilterDrinks = 'filter-by-drink-btn';
const btnFilterMeals = 'filter-by-meal-btn';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('testa a pagina DoneRecipes', () => {
  it('testa se a pagina sem localstorage renderiza corretamente', () => {
    renderWithRouterAndRedux(<DoneRecipes />);

    expect(screen.getByTestId('data-testid="0-horizontal-top-text"')).not.toBeInTheDocument();
    expect(screen.getByTestId('data-testid="0-horizontal-image"')).not.toBeInTheDocument();
  });
  it('teste se a pagina renderiza corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    history.push('/done-recipes');

    expect(screen.getByTestId('data-testid="0-horizontal-top-text"')).toBeInTheDocument();
    expect(screen.getByTestId('data-testid="0-horizontal-image"')).toBeInTheDocument();
    expect(screen.getByTestId('data-testid="0-horizontal-name"')).toBeInTheDocument();
    expect(screen.getByTestId('data-testid="0-horizontal-share-btn"')).toBeInTheDocument();
    expect(screen.getByTestId('data-testid="0-horizontal-done-date"')).toBeInTheDocument();
    expect(screen.getByTestId('data-testid="0-Pasta-horizontal-tag"')).toBeInTheDocument();
    expect(screen.getByTestId('data-testid="0-Curry-horizontal-tag"')).toBeInTheDocument();
    expect(screen.getByTestId(btnFilterAll)).toBeInTheDocument();
    expect(screen.getByTestId(btnFilterDrinks)).toBeInTheDocument();
    expect(screen.getByTestId(btnFilterMeals)).toBeInTheDocument();
  });
  it('testa o filtro por meals', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    renderWithRouterAndRedux(<DoneRecipes />);

    const button = screen.getByTestId(btnFilterMeals);

    userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByAltText('Spicy Arrabiata Penne')).toBeInTheDocument();
    });
    expect(button).toBeInTheDocument();
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn);
  });

  it('testa o filtro por drinks', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    renderWithRouterAndRedux(<DoneRecipes />);

    const button = screen.getByTestId(btnFilterDrinks);

    userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByAltText('Aquamarine')).toBeInTheDocument();
    });
    expect(button).toBeInTheDocument();

    expect(screen.getByTestId('data-testid="0-horizontal-name"')).toHaveTextContext('Aquamarine');
  });
  it('testa se remove os filtros', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    renderWithRouterAndRedux(<DoneRecipes />);

    const button = screen.getByTestId(btnFilterAll);

    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByAltText(/aquamarine/i)).toBeInTheDocument();
      expect(screen.getByAltText(/spicy/i)).toBeInTheDocument();
    });
  });
});
