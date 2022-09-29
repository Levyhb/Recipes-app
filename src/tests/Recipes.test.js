import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import renderWithRouterAndRedux from './helpers/renderWith';
import meals from '../../cypress/mocks/meals';
import goatMeals from '../../cypress/mocks/goatMeals';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import Recipes from '../pages/Recipes';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Testa renderização da página Recipes', () => {
  it('verifica se a Api é chamada', async () => {
    fetchMock.once('https://www.themealdb.com/api/json/v1/1/search.php?s=', meals);
    renderWithRouterAndRedux(<Recipes />);

    await waitFor(() => {
      const fristCard = screen.getByTestId('0-recipe-card');
      const lestCard = screen.getByTestId('11-recipe-card');

      expect(fristCard).toBeInTheDocument();
      expect(lestCard).toBeInTheDocument();
    });

    const dinksBtn = screen.getByTestId('drinks-bottom-btn');

    fetchMock.once('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', drinks);

    userEvent.click(dinksBtn);

    await waitFor(() => {
      const dinksTitle = screen.getByRole('heading', { level: 2, name: /dinks/i });

      expect(dinksTitle).toBeInTheDocument();
    });
  });

  it('verifica se os filtros de categoria funcionam', async () => {
    fetchMock.once('https://www.themealdb.com/api/json/v1/1/search.php?s=', meals);

    fetchMock.once('https://www.themealdb.com/api/json/v1/1/list.php?c=list', mealCategories);

    renderWithRouterAndRedux(<Recipes />);
    await waitFor(() => {
      const categoryGoatBtn = screen.getByTestId('Goat-category-filter');

      fetchMock.once('https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat', goatMeals);

      userEvent.click(categoryGoatBtn);

      const goatRecipe = screen.getByText(/Mbuzi Choma/i);
      expect(goatRecipe).toBeInTheDocument();
    });
  });
});
