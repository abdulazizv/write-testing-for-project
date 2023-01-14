import { Booking } from '../../booking.model';

export const bookingStub = (): Partial<Booking> => {
  return {
    id: 1,
    cart_id: 2,
    payment_method_id: 2,
    delivery_method_id: 1,
    discount_id: 1,
    stastus_id: 2,
  };
};
