import React from 'react';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWith';
import Recipes from '../pages/Recipes';
import mealsMock from './helpers/mealsMock';

beforeEach(() => {
  global.fetch = jest.fn(async () => ({
    json: async () => mealsMock,
  }));
});

describe.only('Testa renderização da página Recipes', () => {
  it('verifica o caminho da página', () => {
    act(() => {
      renderWithRouterAndRedux(<Recipes />);
    });
    // console.log(store.getState());
  });
});
