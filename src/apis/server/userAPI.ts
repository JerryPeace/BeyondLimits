import { User } from '@prisma/client';
import {
  checkUserExist,
  getAllUsers,
  getUser,
  create,
  update,
  remove,
} from '@@src/apis/repositories/user';
import { CustomerError } from '@@src/utils/error';
import { UserUpdateType } from '@@src/constants/user';

async function getSingleUser({ id }: { id: number }) {
  try {
    return await getUser(Number(id));
  } catch (error) {
    console.error('[getUser]', error);
    throw new CustomerError(500, `Get user fail`);
  }
}

async function createUser(data: User) {
  const user = await checkUserExist(data.username);
  if (!user) {
    try {
      return await create(data);
    } catch (error) {
      console.error('[createUser]', error);
      throw new CustomerError(500, `Create user fail`);
    }
  } else {
    throw new CustomerError(500, `User name is exist`);
  }
}

async function updateUser(data: UserUpdateType) {
  try {
    await update(data);
  } catch (error) {
    console.error(`[updateUser]`, error);
    throw new CustomerError(500, `update user fail`);
  }
}

async function removeUser({ id }: { id: number }) {
  try {
    await remove(Number(id));
  } catch (error) {
    console.error(`[removeUser]`, error);
    throw new CustomerError(500, `remove user fail`);
  }
}

const teardownAPI = {
  users: {
    GET: getAllUsers,
  },
  user: {
    GET: getSingleUser,
    POST: createUser,
    PATCH: updateUser,
    DELETE: removeUser,
  },
};

export default teardownAPI;
