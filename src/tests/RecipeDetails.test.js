import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import meals from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';
import renderWithRouterAndRedux from './helpers/renderWith';
import RecipeDetails from '../pages/RecipeDetails';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Testa a pagina de RecipeDetails', () => {
  it('testa a renderização da pagina', async () => {
    const oneMealURL = RegExp('https://www.themealdb.com/api/json/v1/1/lookup.php?i=', i);

    fetchMock.once(oneMealURL, oneMeal);

    fetchMock.once('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', meals);
    renderWithRouterAndRedux(<RecipeDetails />);

    await waitFor(() => {
      const recipeImg = screen.getByTestId('recipe-photo');
      const recipeTitle = screen.getByTestId('recipe-title');
      const recipeCategory = screen.getByTestId('recipe-category');

      expect(recipeImg).toBeInTheDocument();
      expect(recipeTitle).toBeInTheDocument();
      expect(recipeCategory).toBeInTheDocument();
    });
  });
});
