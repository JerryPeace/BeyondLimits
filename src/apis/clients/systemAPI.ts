import { User } from '@prisma/client';
import clientServices from '../clientServices';

async function login(
  { username, password }: { username: string; password: string },
  mode: 'general' | 'enhance' = 'enhance'
): Promise<User> {
  if (!username) {
    return Promise.reject('User name is required');
  }
  return clientServices[mode]
    .post(`/system/login`, { username, password })
    .then((result) => result.data);
}

async function logout(mode: 'general' | 'enhance' = 'enhance'): Promise<User> {
  return clientServices[mode].get(`/system/logout`);
}

const systemAPI = {
  login,
  logout,
};
export default systemAPI;
