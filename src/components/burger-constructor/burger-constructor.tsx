import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  clearConstructor,
  setOrderModalData,
  sendOrderThunk
} from '../../services/features/burgerConstructorSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const isOrderDisabled =
    !constructorItems.bun ||
    constructorItems.ingredients.length === 0 ||
    orderRequest;

  const onOrderClick = () => {
    if (isOrderDisabled) return;
    if (!isAuthChecked) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const bunId = constructorItems.bun?._id;
    if (!bunId) return;
    const ingredientIds = constructorItems.ingredients.map((item) => item._id);
    const orderData = [bunId, ...ingredientIds, bunId];

    dispatch(sendOrderThunk(orderData));
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      disabled={isOrderDisabled}
    />
  );
};
