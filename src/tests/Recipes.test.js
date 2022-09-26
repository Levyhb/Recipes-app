import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Recipes from '../pages/Recipes';
import mealsMock from './helpers/mealsMock';

beforeEach(() => {
  global.fetch = jest.fn(async () => ({
    json: async () => mealsMock,
  }));
});

describe('Testa renderização da página Recipes', () => {
  it('verifica o caminho da página', () => {
    renderWithRouterAndRedux(<Recipes />);
  });
});
