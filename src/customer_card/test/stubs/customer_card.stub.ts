import { CustomerCard } from '../../customer_card.model';

export const customer_cardStub = (): Partial<CustomerCard> => {
  return {
    id: 1,
    customer_id: 1,
    name: 'Murodjon',
    phone: '+998718889888',
    number: '9860 1030 4515 3901',
    year: '2023',
    month: 'March',
    is_active: false,
    is_main: true,
  };
};
