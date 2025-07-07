import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import {
  selectIngredientDetails,
  selectIngredientDetailsLoading,
  selectIngredientDetailsError,
  setIngredientDetails,
  clearIngredientDetails
} from '../../services/features/ingredientDetailsSlice';
import {
  fetchIngredients,
  selectIngredientsList
} from '../../services/features/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredientsList);
  const ingredient = ingredients.find((item) => item._id === id);

  const ingredientData = useSelector(selectIngredientDetails);
  const isLoading = useSelector(selectIngredientDetailsLoading);
  const error = useSelector(selectIngredientDetailsError);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    if (ingredient) {
      dispatch(setIngredientDetails(ingredient));
    }
    return () => {
      dispatch(clearIngredientDetails());
    };
  }, [dispatch, ingredient]);

  console.log(ingredient);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <p className='text text_type_main-default text_color_error'>{error}</p>
    );
  }

  if (!ingredientData) {
    return <p className='text text_type_main-default'>Ингредиент не найден</p>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
