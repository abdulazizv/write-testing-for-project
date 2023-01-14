import { Cart } from '../../cart.model';

export const cartStub = (): Partial<Cart> => {
  return {
    id: 1,
    ticket_id: 2,
    customer_id: 1,
    status_id: 1,
  };
};
