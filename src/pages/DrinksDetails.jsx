import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DrinksDetails() {
  const [drinkDetails, setDrinkDetails] = useState();
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setDrinkDetails(data));
    console.log(drinkDetails);
  }, []);
  return (
    <div>DrinksDetails</div>
  );
}
