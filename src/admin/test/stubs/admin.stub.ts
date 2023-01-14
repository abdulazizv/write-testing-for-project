import { Admin } from '../../admin.model';

export const adminStub = (): Partial<Admin> => {
  return {
    id: 1,
    name: 'name1',
    login: 'login1',
    hashed_password: 'kdshfaif@#$!$Rafdea11!@',
    is_active: false,
    is_creator: false,
    hashed_refresh_token: '#$#fewrerwer!@#@!#gre#$!@',
  };
};
