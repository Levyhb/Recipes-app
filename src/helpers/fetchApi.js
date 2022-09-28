export default async function fetchApi(pathname, selectedOption, search) {
  let url = '';
  if (pathname === '/meals') {
    switch (selectedOption) {
    case 'ingredient':
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
      break;
    case 'name':
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
      break;
    case 'firstLetter':
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
      }
      break;
    default:
      return url;
    }
  } else {
    switch (selectedOption) {
    case 'ingredient':
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
      break;
    case 'name':
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
      break;
    case 'firstLetter':
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
      }
      break;
    default:
      return url;
    }
  }
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
