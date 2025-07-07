import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';
import {
  fetchFeed,
  selectFeedOrders,
  selectFeedsLoading
} from '../../services/features/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedsLoading);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
