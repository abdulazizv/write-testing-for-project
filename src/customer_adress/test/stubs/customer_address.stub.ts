import { CustomerAdress } from '../../customer_adress.model';

export const customer_addressStub = (): Partial<CustomerAdress> => {
  return {
    id: 1,
    customer_id: 1,
    name: 'Yunusobod',
    country_id: 1,
    region_id: 11,
    district_id: 1,
    street: 'Yusuf Rajabiy kochasi',
    house: 'A blok 2-uy',
    flat: 20,
    location: '2021 | 2031',
    post_index: 100096,
    info: 'Eto bolshoya informatsiya',
  };
};
