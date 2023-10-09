import { User } from '@prisma/client';
import clientServices from '../clientServices';
import { toast } from 'react-toastify';
import { UserUpdateType } from '@@src/constants/user';

async function getAllUsers(mode: 'general' | 'enhance' = 'enhance'): Promise<Partial<User>[]> {
  return clientServices[mode].get('/rbac/users').then((result) => result?.data || []);
}

async function getSingleUser(
  { id }: { id?: number },
  mode: 'general' | 'enhance' = 'enhance'
): Promise<User> {
  if (!id) {
    return Promise.reject('User ID is required');
  }
  return clientServices[mode].get(`/rbac/user`, { params: { id } }).then((result) => result.data);
}

async function createUser(
  { data }: { data: User },
  mode: 'general' | 'enhance' = 'enhance'
): Promise<any> {
  return clientServices[mode].post(`/rbac/user`, data).then(() => {
    toast('Create a user successfully', { type: 'success' });
  });
}

async function updateUser(
  { data }: { data: UserUpdateType },
  mode: 'general' | 'enhance' = 'enhance'
): Promise<any> {
  return clientServices[mode].patch(`/rbac/user`, data).then(() => {
    toast('Update user successfully', { type: 'success' });
  });
}

async function removeUser(
  { id }: { id: number },
  mode: 'general' | 'enhance' = 'enhance'
): Promise<any> {
  if (!id) {
    return Promise.reject('User ID is required');
  }
  return clientServices[mode]
    .delete(`/rbac/user`, { params: { id } })
    .then((result) => result.data);
}

const userAPI = {
  updateUser,
  getAllUsers,
  getSingleUser,
  createUser,
  removeUser,
};
export default userAPI;
