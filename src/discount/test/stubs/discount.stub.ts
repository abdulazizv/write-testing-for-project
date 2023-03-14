import { Discount } from '../../discount_model';

export const discountStub = (): Partial<Discount> => {
  return {
    id: 1,
    discount: 25,
    finish_date: new Date(),
  };
};
