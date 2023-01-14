import { Customer } from '../../customer.model';

export const customerStub = (): Partial<Customer> => {
  return {
    id: 1,
    first_name: 'Asror',
    last_name: 'Abrorov',
    phone: '+998901023901',
    hashed_password: '!#@$%^&%$QWe',
    email: 'chatgpt@gmail.com',
    birth_date: '2022-12-05T22:00:00',
    gender: 1,
    lang_id: 2,
    hashed_refresh_token: '12343ndsfsaf@!321`34ap213$',
  };
};
