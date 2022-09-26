import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipesDetails() {
  const [mealDetail, setMealDetail] = useState();
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setMealDetail(data));
    console.log(mealDetail);
  }, []);

  return (
    <div>RecipesDetails</div>
  );
}
