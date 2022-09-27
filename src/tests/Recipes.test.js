// import React from 'react';
// import renderWithRouterAndRedux from './helpers/renderWith';
// import Recipes from '../pages/Recipes';
// import mealsMock from './helpers/mealsMock';

// beforeEach(() => {
//   global.fetch = jest.fn(async () => ({
//     json: async () => mealsMock,
//   }));
// });

// const INITIAL_STATE = {
//   user: { email: 'BLA '},
//   meals: { MEALS: [] },
//   drinks: { drinks: [] },
// }

// describe('Testa renderização da página Recipes', () => {
//   it('verifica o caminho da página', () => {
//     const { store } = renderWithRouterAndRedux(<Recipes />, { initialState: INITIAL_STATE });

//     console.log(store.getState())
//   });
// });
