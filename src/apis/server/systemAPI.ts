import jwt from 'jsonwebtoken';
import { checkUserExist } from '@@src/apis/repositories/user';
import { CustomerError } from '@@src/utils/error';
const SECRET_KEY = 'yourSuperSecretKey';

async function login(data: { username: string; password: string }) {
  try {
    const user = await checkUserExist(data.username);
    if (user?.password === data.password && user?.username === data.username) {
      const token = jwt.sign({ username: data.username }, SECRET_KEY, { expiresIn: '1h' });
      return {
        token,
      };
    } else {
      throw new CustomerError(501, `User name or password is incorrect`);
    }
  } catch (error) {
    console.error(`[login]`, error);
    throw new CustomerError(500, `login fail`);
  }
}

async function logout() {}

const systemAPI = {
  login,
  logout,
};

export default systemAPI;
