import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

beforeEach(() => {
  fetchMock.resetMocks();
});

// global.fetch = jest.fn().mockResolvedValue({
//   json: () => Promise.resolve(meals),
// });

// document.execCommand = jest.fn().mockResolvedValue({
//   json: () => Promise.resolve(),
// });

describe('Testa a página de receitas em progresso', () => {
  it('Os elementos dá pagina são exibidos corretamente', async () => {
    // const oneMealURL = ('https://www.themealdb.com/api/json/v1/1/lookup.php?i=');

    // fetchMock.once(oneMealURL, oneMeal);

    // fetchMock.once('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', meals);
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/meals/52771/in-progress');
    expect(history.location.pathname).toBe('/meals/52771/in-progress');

    history.push('/drinks/15997/in-progress');
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');

    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-btn');
      const favoriteBtn = screen.getByTestId('favorite-btn');

      expect(shareBtn).toBeInTheDocument();
      expect(favoriteBtn).toBeInTheDocument();
    });
  });
});
