import { Country } from '../../country.model';

export const countryStub = (): Partial<Country> => {
  return {
    id: 1,
    country: 'Usa',
  };
};
